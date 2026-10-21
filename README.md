# UniOne Node.js SDK

[![Node.js](https://img.shields.io/npm/v/unione)](https://www.npmjs.com/package/unione) [![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

Official Node.js library for the [UniOne](https://unione.io) transactional email API.

[API reference](https://docs.unione.io/en/web-api-ref) · Docs for LLMs: [llms.txt](https://docs.unione.io/llms.txt)

> **On Express or NestJS?** Install [`unione-express`](https://github.com/unione-repo/unione-express) or [`unione-nestjs`](https://github.com/unione-repo/unione-nestjs) instead: this SDK plus configuration, a mailer and a webhook route.

## Install

```bash
npm install unione
```

Requirements: Node.js 18+. No third-party dependencies.

For Node.js 14 use the 1.x line (branch `1.x`), the same API.

Get an API key in the [control panel](https://cp.unione.io/en/settings/security/api) and keep it in the environment, never in code:

```bash
export UNIONE_API_KEY="your-api-key"
```

## Send an email

```javascript
import { UniOneClient } from "unione";
import { MessageObjectRecipientsItem as Recipient } from "unione/api/email";

const client = new UniOneClient(process.env.UNIONE_API_KEY);

const { jobId } = await client.email.send({
  message: {
    recipients: [Recipient.fromAddress("Alex <alex@example.com>")],
    from_email: "shop@example.com",
    from_name: "Shop",
    subject: "Your order",
    body: { html: "<p>Hello, {{to_name}}! Your order has shipped.</p>" },
  },
});
console.log(jobId);
```

The sender address must be on a domain verified in your account. No domain yet? Send from the [sandbox domain](#no-domain-yet-the-test-sandbox-domain) in three steps.

## Contents

- [Recipes](#recipes): personalization · attachments · CC and BCC · scheduling · safe retries · errors · webhooks
- [No domain yet: the test sandbox domain](#no-domain-yet-the-test-sandbox-domain)
- [Going to production](#going-to-production)
- [Reference](#reference)
- [Help](#help)

## Recipes

Every recipe continues the example above: the client and its imports are there.

### Personalize for each recipient

Up to 500 recipients per call, each gets a separate copy with its own substitutions. Metadata of a recipient comes back in its webhook events.

```javascript
await client.email.send({
  message: {
    recipients: [
      Recipient.fromAddress("Alex <alex@example.com>", { order: "1001" })
        .withMetadata({ user_id: "42" }),
      Recipient.fromAddress("Maria <maria@example.com>", { order: "1002" })
        .withMetadata({ user_id: "43" }),
    ],
    from_email: "shop@example.com",
    subject: "Order #{{order}}",
    body: { html: "<p>{{to_name}}, order #{{order}} has shipped.</p>" },
  },
});
```

### Attach a file

```javascript
import { readFile } from "node:fs/promises";

const content = (await readFile("invoice.pdf")).toString("base64");

await client.email.send({
  message: {
    recipients: [Recipient.fromAddress("alex@example.com")],
    from_email: "shop@example.com",
    subject: "Invoice",
    body: { html: "<p>Your invoice is attached.</p>" },
    attachments: [{ type: "application/pdf", name: "invoice.pdf", content }],
  },
});
```

### CC and BCC

Every address goes to `recipients` (each gets a copy); the visible ones also go to the headers. `audit@example.com` is in neither header: a BCC. The rules and limits: [CC and BCC](https://docs.unione.io/en/cc-and-bcc).

```javascript
await client.email.send({
  message: {
    recipients: ["alex@example.com", "boss@example.com", "audit@example.com"].map((a) => Recipient.fromAddress(a)),
    from_email: "shop@example.com",
    subject: "Weekly report",
    body: { html: "<p>The report is attached.</p>" },
    headers: { To: "alex@example.com", CC: "boss@example.com" },
  },
});
```

### Schedule

`send_at` is UTC, up to 24 hours ahead.

```javascript
// UTC, "YYYY-MM-DD hh:mm:ss"
const inOneHour = new Date(Date.now() + 3600_000).toISOString().slice(0, 19).replace("T", " ");

await client.email.send({
  message: {
    recipients: [Recipient.fromAddress("alex@example.com")],
    from_email: "shop@example.com",
    subject: "Reminder",
    body: { plaintext: "See you tomorrow!" },
    options: { send_at: inOneHour },
  },
});
```

### Retry safely

A repeat with the same `idempotence_key` within a minute is not sent twice: retry network errors, timeouts, 429 and 5xx with it.

```javascript
await client.email.send({
  message: {
    recipients: [Recipient.fromAddress("alex@example.com")],
    from_email: "shop@example.com",
    subject: "Reset your password",
    body: { html: "<p>Use this link to reset your password.</p>" },
    idempotence_key: "password-reset-8f3a",
  },
});
```

### Handle errors

Recipients the API drops (unsubscribed, invalid, suppressed) are not an error: they are in `failed_emails` of the response, the rest still get the message.

```javascript
import { ApiError } from "unione";

try {
  await client.email.send(request);
} catch (e) {
  if (!(e instanceof ApiError)) throw e;
  // HTTP status (0: network error or timeout), API error code, message
  console.error(e.httpStatus, e.errorCode, e.message);
}
```

### Receive delivery events

Register your HTTPS endpoint once (`webhook/set`). Then check the signature of every notification (`auth`: MD5 of the raw body with the `auth` value replaced by your API key; a wrong one gets 401) and process the events.

```javascript
import { createHash } from "node:crypto";
import { WebhookApi } from "unione/api/webhook";

// rawBody: the body of the POST request as received; returns the HTTP status to answer
function handleWebhook(rawBody) {
  const callback = WebhookApi.parseCallback(rawBody);
  // auth: MD5 of the raw body with the auth value replaced by your API key
  const signed = rawBody.replace(callback.auth, process.env.UNIONE_API_KEY);
  if (createHash("md5").update(signed).digest("hex") !== callback.auth) return 401;

  for (const user of callback.eventsByUser ?? []) {
    for (const event of user.events ?? []) {
      // event.eventData: email, status (delivered, opened, hard_bounced, spam, ...), jobId, metadata
    }
  }
  return 200;
}
```

> **Answer 200 within 3 seconds** and process the events in the background (a queue): otherwise UniOne repeats the request every 10 minutes for 24 hours (`retry_count` grows), and a handler that failed every request for at least 10 events of a day is turned inactive. The handler must take at least **5 parallel requests of up to 100 events each**; deduplicate, a repeat delivers the same events again.

## No domain yet: the test sandbox domain

Until your domain is verified, send from the **sandbox domain**: a test domain every account has, already verified, with DKIM and SPF set. It delivers only to addresses you confirm (the confirmation link comes by email, valid 48 hours), up to 100 emails a day. The sandbox domain is deleted 31 days after it was created, but you can get it again: the next `domain/get-sandbox-domain` call creates a new one (with a new name, so read it from the call, do not hardcode it).

```javascript
// 1. Your sandbox domain: created on the first call, the same one afterwards
const { domain } = await client.domain.getSandboxDomain();

// 2. Confirm your inbox: UniOne sends a link, click it within 48 hours
await client.confirmedEmail.create({ email: "you@example.com" });

// 3. Send from any address on the sandbox domain to the confirmed one
await client.email.send({
  message: {
    recipients: [Recipient.fromAddress("you@example.com")],
    from_email: `noreply@${domain}`,
    subject: "Hello from UniOne",
    body: { html: "<p>It works!</p>" },
  },
});
```

<details>
<summary>Sandbox limits</summary>

- Sends only to confirmed addresses: up to 10 per account.
- Up to 100 emails a day.
- The sandbox domain expires after 31 days; call `domain/get-sandbox-domain` again to get a new one.
- Works only with the account API key, not a project key.
- Not listed in `domain/list`; the other `domain/*` methods do not apply to it.

The sandbox is for development and testing. Do not use a sandbox domain as the sender in production.

</details>

<details>
<summary>The same with curl</summary>

```bash
BASE=https://api.unione.io/en/transactional/api/v1

curl -s -X POST $BASE/domain/get-sandbox-domain.json \
  -H "Content-Type: application/json" -H "X-API-KEY: $UNIONE_API_KEY" -d '{}'

curl -s -X POST $BASE/confirmed-email/create.json \
  -H "Content-Type: application/json" -H "X-API-KEY: $UNIONE_API_KEY" \
  -d '{"email": "you@example.com"}'

curl -s -X POST $BASE/email/send.json \
  -H "Content-Type: application/json" -H "X-API-KEY: $UNIONE_API_KEY" \
  -d '{
        "message": {
          "recipients": [
            {
              "email": "you@example.com"
            }
          ],
          "from_email": "noreply@<sandbox-domain>",
          "subject": "Hello from UniOne",
          "body": {
            "html": "<p>It works!</p>"
          }
        }
      }'
```

</details>

## Going to production

**1. Verify your sending domain.** `domain/get-dns-records` returns the verification record, the DKIM key and the DMARC target; add the records at your DNS provider, then `domain/validate-verification-record` and `domain/validate-dkim`.

| Type | Host | Value | Where it comes from |
|---|---|---|---|
| TXT | `@` | `unione-validate-hash=…` | `verification-record` of the response, as is |
| TXT | `<selector>._domainkey` (the selector is on the domain page of the control panel, e.g. `us`) | `v=DKIM1; k=rsa; p=<dkim>` | `dkim` of the response after `v=DKIM1; k=rsa; p=` |
| TXT | `@` | `v=spf1 include:spf.unione.io ~all` | not in the response; add the include to your SPF record if you have one |
| CNAME | `_dmarc` | `<domain>.dmarc.…` | `dmarc` of the response (UniOne publishes the DMARC policy); keep your own DMARC TXT record instead if the domain has one |

**2. Make sending reliable.**

| | |
|---|---|
| Retries | `429` and `5xx` with backoff and the same `idempotence_key`; fix other errors instead of retrying |
| Limits | 500 recipients and 10 MB per request, attachments included: base64 makes a file about a third larger |
| Body | always `html` or `plaintext` (a template can supply it) |
| Delivery status | a webhook, not polling |
| Queue | send from a background job, not inside the web request |
| Config | `from_email` from config, so the sandbox → production switch needs no code change |
| Defaults | keep the unsubscribe footer and tracking; changing them needs UniOne support |

## Reference

### Sections

| Section | Methods | Description |
|---|---|---|
| [Email](docs/Email.md) | `send`, `subscribe` | This group of methods is related with email sending. |
| [EmailValidation](docs/EmailValidation.md) | `single` | Email validation methods. As a result of the check, you’ll get detailed information on email validity. It will help eliminate nonexistent emails, decrease the number of complaints, clean up the subscribers list and eventually enhance your sender reputation score. For example, you may add validation to a subscription form on your site to let users know they’ve just entered an invalid address. |
| [ConfirmedEmail](docs/ConfirmedEmail.md) | `create`, `list`, `delete` | Manage email addresses confirmed for sandbox-domain sending. These methods are available only with a main account API key. |
| [Template](docs/Template.md) | `set`, `get`, `list`, `delete` | You have the option of storing a template on the UniOne side and then using it by id, which is highly recommended for sending repetitive messages or high volume traffic. UniOne supports two different [template engines](https://docs.unione.io/en/template-engines). |
| [Webhook](docs/Webhook.md) | `set`, `get`, `list`, `delete` | UniOne lets you recieve notifications about email status changes or spam blocks. You provide an URL and every time a watched event occurs we will notify you by submitting a request with JSON data to this URL. |
| [Suppression](docs/Suppression.md) | `set`, `get`, `list`, `delete` | Methods for managing suppression lists. An email can be added to suppression list because of unsubscription, bounce or complain. |
| [Domain](docs/Domain.md) | `getDnsRecords`, `validateVerificationRecord`, `validateDkim`, `list`, `getSandboxDomain`, `delete` | You can use these methods to setup sender domains and check their statuses. They might be useful in case you want to automate adding domains for your own clients. |
| [EventDump](docs/EventDump.md) | `create`, `get`, `list`, `delete` | These methods are used to obtain a list of events for a given period of time. The data is stored for up to 45 days, depending on your tariff, i. e. you may fetch all event data starting from 00:00:00 31 days ago and up to current time. For custom tarifs with big sending volumes event dumps are available only for the last 7 days. |
| [Tag](docs/Tag.md) | `list`, `delete` | This family of methods is used to manage user-defined tags. Tags are used to categorize letters based on your own criteria, e. g. to create a distinction between marketing and transactional letters or group together all notifications for a particular order type. UniOne allows you to assign tags to all outgoing emails, and the tags you’ve set may then be used to filter and analyze delivery statistics. |
| [Project](docs/Project.md) | `create`, `update`, `list`, `delete` | Projects allow you to group several independent domains, webhooks, templates, and unsubscription lists together. It's very useful if you have your own clients and manage their data from a single UniOne account. Each project receives its own API key, and all API calls with that API key only deal with the data of that project. This way, you can assign a separate project for each client and be sure that they won't conflict; e.g. unsubscribing from one project won't affect another. |
| [System](docs/System.md) | `ping`, `info` | System operations. |
| [Obsolete](docs/Obsolete.md) | `unsubscribedSet`, `unsubscribedCheck`, `unsubscribedList` | Obsolete methods dealing with unsubscribes. We recommend using the more flexible [suppression](https://docs.unione.io/en/web-api-ref#suppression) methods instead. Note that you can't resubscribe an unsubscribed recipient using WebAPI, but you can send him an email with subscription link using email/subscribe method. |

### API host

The second argument selects the API host (datacenter) or a full base URL.

```javascript
import { UniOneClient, Host } from "unione";

const client = new UniOneClient("YOUR_API_KEY", "us1.unione.io");
const other = new UniOneClient("YOUR_API_KEY", Host.US1, { timeout: 10000 });
```

### Error handling

Every method raises `ApiError` when the API returns an error; it carries the [API error code](https://docs.unione.io/en/web-api-ref#api-errors) and the HTTP status.

### Custom HTTP client and headers

`headers` adds headers to every request; `fetch` replaces the function the requests go through (default: `globalThis.fetch`): undici, node-fetch or a wrapper that adds retries, logging or a proxy. Network errors, timeouts and errors of reading the response raise `ApiError` (the original error is its `cause`).

```javascript
import { UniOneClient, ApiError } from "unione";

// retries of network errors and HTTP 5xx, a log line per request
async function fetchWithRetries(url, init) {
  for (let attempt = 1; ; attempt++) {
    try {
      const response = await fetch(url, init);
      if (response.status < 500 || attempt === 3) {
        console.log(`POST ${url} -> ${response.status}`);
        return response;
      }
    } catch (error) {
      if (attempt === 3) throw error;
    }
  }
}

const client = new UniOneClient("YOUR_API_KEY", {
  headers: { "X-Request-Id": "42" },
  fetch: fetchWithRetries,
});
try {
  console.log(await client.confirmedEmail.list());
} catch (error) {
  if (!(error instanceof ApiError)) throw error;
  console.log(error.httpStatus, error.errorCode, error.message, error.cause);
}
```

### Models

Request models take an object of their fields; a nested model can be given as a model or as a plain object in the API format (the keys of the API: `global_language`, not `globalLanguage`), it is converted by `fromJSON()` of its class. A request may also be a plain object in the API format. Models that take any key (`HeadersObject`) keep the keys besides their named fields in the `extra` map: it is sent next to the fields (a named field wins over the same key of `extra`), and the keys of a response that are not named fields go there.

```javascript
import { EmailSendRequest } from "unione/api/email";
import { HeadersObject } from "unione/common";

const headers = new HeadersObject({
  extra: {
    "X-MyHeader": "some data",
    "CC": "copy@example.com",
    "List-Unsubscribe": "<mailto:unsubscribe@example.com?subject=unsubscribe>",
  },
});

const request = new EmailSendRequest({
  message: {
    "body": { html: "<b>Hello, {{to_name}}</b>" },
    "subject": "Hello",
    "from_email": "user@example.com",
    "recipients": [{ email: "recipient@example.com" }],
    "headers": headers,
  },
});
console.log(JSON.stringify(request));
```

### TypeScript

The package has type declarations: the client, the API classes, the models (with their `...JSON` shape in the API format and `...Init` constructor options) and the enums (frozen objects and string literal types).

```typescript
import { UniOneClient, type ConfigurationOptions } from "unione";
import { EmailSendRequest, MessageObject, MessageObjectRecipientsItem, type EmailSendResponse } from "unione/api/email";
import { TemplateEngine, BodyObject } from "unione/common";

const options: ConfigurationOptions = { timeout: 10000, headers: { "X-Request-Id": "42" } };
const client = new UniOneClient("YOUR_API_KEY", options);
const response: EmailSendResponse = await client.email.send(new EmailSendRequest({
  message: new MessageObject({
    recipients: [
      new MessageObjectRecipientsItem({
        email: "user@example.com",
        substitutions: {
          "CustomerId": "12452",
          "to_name": "John Smith",
        },
        metadata: {
          "campaign_id": "c77f4f4e-3561-49f7-9f07-c35be01b4f43",
          "customer_hash": "b253ac7",
        },
      }),
    ],
    templateId: "00000000-0000-0000-0000-000000000000",
    globalLanguage: "en",
    templateEngine: TemplateEngine.VELOCITY,
    body: new BodyObject({
      html: "<b>Hello, {{to_name}}</b>",
      plaintext: "Hello, {{to_name}}",
      amp: "<!doctype html><html amp4email><head> <meta charset=\"utf-8\"><script async src=\"https://cdn.ampproject.org/v0.js\"></script> <style amp4email-boilerplate>body{visibility:hidden}</style></head><body> Hello, AMP4EMAIL world.</body></html>",
    }),
    subject: "UniOne test email ",
    fromEmail: "email@example.com",
    fromName: "John Smith",
    replyTo: "email@example.com",
    replyToName: "John Smith",
    idempotenceKey: "SG1VsbG68sIH2dvc5mx890kIQ",
  }),
}));
```

## Help

- [Integration guides](https://docs.unione.io/en/integrations)
- AI coding agents: [llms.txt](https://docs.unione.io/llms.txt), the [MCP server](https://unione.io/en/agents), skills: `npx skills add https://github.com/unione-repo/unione-skills.git`
- [Support](https://cp.unione.io/en/support) · [Issues](https://github.com/unione-repo/unione-node-sdk/issues)
- Contributing: [AGENTS.md](AGENTS.md) — the SDK is generated from the OpenAPI spec.
