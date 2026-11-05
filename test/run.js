// Node.js 14 has no node:test: the tests are collected by test() and run at the end (exit code 1 on a failure).
import assert from "assert";
import http from "http";
import { MessageObjectRecipientsItem as Recipient } from "../src/api/email/index.js";
import { PLATFORM } from "../src/client/ApiClient.js";
import { ApiError, ErrorKind, UniOneClient } from "../src/index.js";

const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

const API_KEY = "test-key";
// Never the real API: the requests go to the fake fetch below or to a server of the test on 127.0.0.1.
const BASE = "http://127.0.0.1:9/en/transactional/api/v1";
const LONG = "x".repeat(600);
const SEND_REPLY = {
  status: "success",
  job_id: "1ZymBc-00041N-9X",
  emails: ["user@example.com"],
  failed_emails: { "bad@example.com": "invalid" },
};
const SYSTEM_INFO_REPLY = {
  status: "success",
  user_id: 11344,
  email: "text",
  project_id: "6123462132634",
  project_name: "Project 1A",
  project_accounting: { email_counter: 7, email_counter_limit: 7, email_counter_mode: "default" },
  accounting: {
    period_start: "2016-08-29 09:12:33",
    period_end: "2016-09-29 09:12:33",
    emails_included: 7,
    emails_sent: 7,
  },
};

/** A fetch-compatible function that records the requests and answers with `replies` in turn (the last one repeats). */
function fakeFetch(...replies) {
  const calls = [];
  const fetch = async (url, init) => {
    calls.push({ url, init, body: init.body === undefined ? undefined : JSON.parse(init.body) });
    const next = replies.length > 1 ? replies.shift() : replies[0];
    if (typeof next === "function") {
      return next(url, init);
    }
    if (next instanceof Error) {
      throw next;
    }
    const text = typeof next.body === "string" ? next.body : JSON.stringify(next.body);
    return { status: next.status, text: async () => text };
  };
  fetch.calls = calls;
  return fetch;
}

function reply(status, body) {
  return { status, body };
}

function apiError(code, message = "Unknown recipient") {
  return { status: "error", message, code };
}

function client(fetch, options = {}) {
  return new UniOneClient(API_KEY, { baseUrl: BASE, fetch, ...options });
}

function message(fields = {}) {
  return {
    recipients: [Recipient.fromAddress("User <user@example.com>")],
    from_email: "shop@example.com",
    subject: "Hello",
    body: { html: "<b>Hi</b>" },
    ...fields,
  };
}

function send(api, fields = {}) {
  return api.email.send({ message: message(fields) });
}

/** The ApiError the promise is rejected with. */
async function failure(promise) {
  try {
    await promise;
  } catch (error) {
    assert.ok(error instanceof ApiError, `ApiError expected: ${error}`);
    return error;
  }
  assert.fail("an ApiError expected");
}

/** HTTP server on 127.0.0.1 for the default transport; handler(req, body, res). */
async function localServer(handler) {
  const sockets = new Set();
  const server = http.createServer((req, res) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => handler(req, Buffer.concat(chunks).toString("utf8"), res));
  });
  server.on("connection", (socket) => {
    sockets.add(socket);
    socket.on("close", () => sockets.delete(socket));
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const url = `http://127.0.0.1:${server.address().port}/en/transactional/api/v1`;
  const close = () => new Promise((resolve) => {
    for (const socket of sockets) {
      socket.destroy();
    }
    server.close(() => resolve());
  });
  return { url, close };
}

test("email/send: request and response", async () => {
  const fetch = fakeFetch(reply(200, SEND_REPLY));
  const response = await send(client(fetch));
  assert.strictEqual(fetch.calls.length, 1);
  const { url, init, body } = fetch.calls[0];
  const target = new URL(url);
  assert.strictEqual(target.origin + target.pathname, BASE + "/email/send.json");
  assert.strictEqual(target.searchParams.get("platform"), PLATFORM);
  assert.strictEqual(PLATFORM, "node-sdk.1.3.1");
  assert.strictEqual(init.method, "POST");
  assert.strictEqual(init.headers["X-API-KEY"], API_KEY);
  assert.strictEqual(init.headers["Content-Type"], "application/json");
  assert.deepStrictEqual(body, {
    message: {
      recipients: [{ email: "user@example.com", substitutions: { to_name: "User" } }],
      from_email: "shop@example.com",
      subject: "Hello",
      body: { html: "<b>Hi</b>" },
    },
  });
  assert.strictEqual(response.jobId, "1ZymBc-00041N-9X");
  assert.deepStrictEqual(response.emails, ["user@example.com"]);
  assert.deepStrictEqual(response.failedEmails, { "bad@example.com": "invalid" });
});

test("platform of an integration and extra headers", async () => {
  const fetch = fakeFetch(reply(200, SEND_REPLY));
  await send(client(fetch, { platform: "express.1.0.0", headers: { "x-api-key": "other", "X-Trace": "1" } }));
  const { url, init } = fetch.calls[0];
  assert.strictEqual(new URL(url).searchParams.get("platform"), `express.1.0.0,${PLATFORM}`);
  assert.strictEqual(init.headers["X-API-KEY"], API_KEY);
  assert.strictEqual(init.headers["X-Trace"], "1");
});

test("system/info: request and response", async () => {
  const fetch = fakeFetch(reply(200, SYSTEM_INFO_REPLY));
  const data = await client(fetch).system.info();
  assert.strictEqual(new URL(fetch.calls[0].url).pathname, "/en/transactional/api/v1/system/info.json");
  assert.deepStrictEqual(fetch.calls[0].body, {});
  assert.strictEqual(data.status, "success");
  assert.strictEqual(data.userId, 11344);
  assert.strictEqual(data.email, "text");
  assert.strictEqual(data.projectId, "6123462132634");
  assert.strictEqual(data.projectName, "Project 1A");
});

test("API error: kind, code, hint and message", async () => {
  const fetch = fakeFetch(reply(400, apiError(204, "Unknown recipient")));
  const error = await failure(send(client(fetch)));
  assert.strictEqual(error.kind, ErrorKind.API);
  assert.strictEqual(error.retryable, false);
  assert.strictEqual(error.errorCode, 204);
  assert.strictEqual(error.httpStatus, 400);
  assert.strictEqual(error.method, "email/send");
  assert.ok(error.hint, "a hint of the error code");
  assert.strictEqual(error.apiMessage, "Unknown recipient");
  assert.deepStrictEqual(error.responseBody, apiError(204, "Unknown recipient"));
  assert.ok(error.message.startsWith("email/send: Unknown recipient"), error.message);
  assert.ok(error.message.includes("(API error 204, HTTP 400)"), error.message);
  assert.ok(error.message.includes("Fix: "), error.message);
});

test("HTTP 429 and 503 are retryable", async () => {
  for (const status of [429, 503]) {
    const error = await failure(send(client(fakeFetch(reply(status, apiError(204, "Try later"))))));
    assert.strictEqual(error.kind, ErrorKind.API);
    assert.strictEqual(error.httpStatus, status);
    assert.strictEqual(error.retryable, true, `HTTP ${status}`);
  }
});

test("a response that is not JSON is invalid_response", async () => {
  const proxy = await failure(send(client(fakeFetch(reply(502, "<html>Bad Gateway</html>")))));
  assert.strictEqual(proxy.kind, ErrorKind.INVALID_RESPONSE);
  assert.strictEqual(proxy.httpStatus, 502);
  assert.strictEqual(proxy.retryable, true);
  assert.ok(proxy.message.includes("<html>Bad Gateway</html>"), proxy.message);
  const broken = await failure(send(client(fakeFetch(reply(200, "not json")))));
  assert.strictEqual(broken.kind, ErrorKind.INVALID_RESPONSE);
  assert.strictEqual(broken.retryable, false);
  const list = await failure(send(client(fakeFetch(reply(200, "[1]")))));
  assert.strictEqual(list.kind, ErrorKind.INVALID_RESPONSE);
});

test("a network failure is retryable", async () => {
  const cause = Object.assign(new Error("connect ECONNREFUSED 127.0.0.1:9"), { code: "ECONNREFUSED" });
  const failed = Object.assign(new TypeError("fetch failed"), { cause });
  const error = await failure(send(client(fakeFetch(failed))));
  assert.strictEqual(error.kind, ErrorKind.NETWORK);
  assert.strictEqual(error.retryable, true);
  assert.strictEqual(error.httpStatus, 0);
  assert.strictEqual(error.method, "email/send");
  assert.strictEqual(error.cause, failed);
  assert.ok(error.message.startsWith("email/send: HTTP request failed: fetch failed"), error.message);
  assert.ok(error.message.includes("ECONNREFUSED"), error.message);
});

test("a timeout is retryable", async () => {
  const error = await failure(send(client(fakeFetch(() => new Promise(() => {})), { timeout: 50 })));
  assert.strictEqual(error.kind, ErrorKind.TIMEOUT);
  assert.strictEqual(error.retryable, true);
  assert.ok(error.message.includes("timed out"), error.message);
  const cause = Object.assign(new Error("Connect Timeout Error"), { code: "UND_ERR_CONNECT_TIMEOUT" });
  const connect = await failure(send(client(fakeFetch(Object.assign(new TypeError("fetch failed"), { cause })))));
  assert.strictEqual(connect.kind, ErrorKind.TIMEOUT);
});

test("an empty API key: no request", async () => {
  const fetch = fakeFetch(reply(200, SEND_REPLY));
  const error = await failure(send(new UniOneClient("", { baseUrl: BASE, fetch })));
  assert.strictEqual(error.kind, ErrorKind.INVALID_REQUEST);
  assert.strictEqual(error.retryable, false);
  assert.strictEqual(error.httpStatus, 0);
  assert.strictEqual(fetch.calls.length, 0);
});

test("email/send without recipients: no request", async () => {
  const fetch = fakeFetch(reply(200, SEND_REPLY));
  const api = client(fetch);
  const cases = [
    [{ recipients: undefined }, "email/send: message.recipients is required"],
    [{ recipients: [] }, "email/send: message.recipients is required"],
    [{ recipients: [{ email: "" }] }, "email/send: message.recipients[0].email is required"],
  ];
  for (const [fields, text] of cases) {
    const error = await failure(send(api, fields));
    assert.strictEqual(error.kind, ErrorKind.INVALID_REQUEST);
    assert.strictEqual(error.message, text);
    assert.strictEqual(error.method, "email/send");
  }
  assert.strictEqual(fetch.calls.length, 0);
});

test("a long API message is cut in the message, kept in apiMessage", async () => {
  const error = await failure(send(client(fakeFetch(reply(400, apiError(204, LONG))))));
  assert.strictEqual(error.apiMessage, LONG);
  assert.ok(error.message.includes("x".repeat(500) + "... (600 chars)"), error.message);
  assert.ok(!error.message.includes("x".repeat(501)), "the message quotes at most 500 characters");
});

test("error code as a string", async () => {
  const digits = await failure(send(client(fakeFetch(reply(400, apiError(String(204)))))));
  assert.strictEqual(digits.errorCode, 204);
  const text = await failure(send(client(fakeFetch(reply(400, apiError("abc"))))));
  assert.strictEqual(text.errorCode, null);
  assert.strictEqual(text.hint, null);
  assert.ok(text.message.includes("(HTTP 400)"), text.message);
});

test("an ApiError of a custom fetch keeps its fields", async () => {
  const own = new ApiError("rate limited by the proxy", { httpStatus: 429, errorCode: 0, kind: ErrorKind.API });
  const error = await failure(send(client(fakeFetch(own))));
  assert.strictEqual(error, own);
  assert.strictEqual(error.method, "email/send");
  assert.strictEqual(error.message, "email/send: rate limited by the proxy");
  assert.strictEqual(error.errorCode, 0);
  assert.strictEqual(error.httpStatus, 429);
  assert.strictEqual(error.retryable, true);
  const bare = await failure(send(client(fakeFetch(new ApiError("proxy is down")))));
  assert.strictEqual(bare.kind, ErrorKind.NETWORK);
  const named = new ApiError("other: failed", { method: "other", kind: ErrorKind.TIMEOUT });
  assert.strictEqual(await failure(send(client(fakeFetch(named)))), named);
  assert.strictEqual(named.message, "other: failed");
});

test("default transport: a request to a local server", async () => {
  const seen = [];
  const server = await localServer((req, body, res) => {
    seen.push({ method: req.method, url: req.url, headers: req.headers, body: JSON.parse(body) });
    res.writeHead(200, { "Content-Type": "application/json", "Connection": "close" });
    res.end(JSON.stringify(SEND_REPLY));
  });
  try {
    const response = await send(new UniOneClient(API_KEY, { baseUrl: server.url }));
    assert.strictEqual(response.jobId, "1ZymBc-00041N-9X");
  } finally {
    await server.close();
  }
  assert.strictEqual(seen.length, 1);
  assert.strictEqual(seen[0].method, "POST");
  const target = new URL(seen[0].url, "http://127.0.0.1");
  assert.strictEqual(target.pathname, "/en/transactional/api/v1/email/send.json");
  assert.strictEqual(target.searchParams.get("platform"), PLATFORM);
  assert.strictEqual(seen[0].headers["x-api-key"], API_KEY);
  assert.strictEqual(seen[0].body.message.subject, "Hello");
});

test("default transport: connection refused and timeout", async () => {
  const closed = await localServer(() => {});
  await closed.close();
  const refused = await failure(send(new UniOneClient(API_KEY, { baseUrl: closed.url })));
  assert.strictEqual(refused.kind, ErrorKind.NETWORK);
  assert.strictEqual(refused.retryable, true);

  const silent = await localServer(() => {}); // never answers
  try {
    const error = await failure(send(new UniOneClient(API_KEY, { baseUrl: silent.url, timeout: 200 })));
    assert.strictEqual(error.kind, ErrorKind.TIMEOUT);
    assert.strictEqual(error.retryable, true);
  } finally {
    await silent.close();
  }
});

let failed = 0;
for (const { name, fn } of tests) {
  try {
    await fn();
    console.log(`ok - ${name}`);
  } catch (error) {
    failed++;
    console.log(`not ok - ${name}`);
    console.log(String((error && error.stack) || error).split("\n").map((line) => `  ${line}`).join("\n"));
  }
}
console.log(`${tests.length - failed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
