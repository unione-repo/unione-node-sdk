import { ApiError } from "./ApiError.js";

/** Removes undefined/null fields, used by the models' toJSON(). */
export function compact(object) {
  return Object.fromEntries(Object.entries(object).filter(([, value]) => value !== undefined && value !== null));
}

/**
 * Value of a model field given to a constructor: a model (anything with toJSON()) is kept, a plain object in the API
 * format (the keys of toJSON(): "global_language", not "globalLanguage") is converted by fromJSON() of the class.
 * @param {any} value
 * @param {{fromJSON(data: Record<string, any>): any}} model
 */
export function toModel(value, model) {
  return value === undefined || value === null || typeof value.toJSON === "function" ? value : model.fromJSON(value);
}

/**
 * JSON-ready value of a model field: toJSON() of a model, anything else (a plain object in the API format) as is.
 * @param {any} value
 */
export function toPlain(value) {
  return value !== undefined && value !== null && typeof value.toJSON === "function" ? value.toJSON() : value;
}

/**
 * Keys of a decoded object that are not named fields of its model: the "extra" map of the models that take any key.
 * @param {Record<string, any>} data
 * @param {string[]} names
 * @returns {Record<string, any>}
 */
export function extraFields(data, names) {
  return Object.fromEntries(Object.entries(data).filter(([key]) => !names.includes(key)));
}

/** The SDK and its version in the "platform" query parameter of every request. */
export const PLATFORM = "node-sdk.2.1.2";

/**
 * Sets a header, replacing one of the same name in another case.
 * @param {Record<string, string>} headers
 * @param {string} name
 * @param {string} value
 */
function setHeader(headers, name, value) {
  for (const key of Object.keys(headers)) {
    if (key.toLowerCase() === name.toLowerCase()) {
      delete headers[key];
    }
  }
  headers[name] = String(value);
}

/** @param {unknown} error */
function messageOf(error) {
  return error instanceof Error ? error.message : String(error);
}

/**
 * Sends a request through a fetch-compatible function and reads the response body within a time limit (also when
 * the function ignores the abort signal). The status is put into `result` as soon as it is known.
 * @param {import("./Configuration.js").FetchFunction} send
 * @param {string} url
 * @param {{method: string, headers: Record<string, string>, body: string}} init
 * @param {number} timeout Time limit of the whole request in milliseconds.
 * @param {{status: number, text: string}} result
 */
async function fetchText(send, url, init, timeout, result) {
  const controller = new AbortController();
  let timer;
  const expired = new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      reject(new Error(`timeout of ${timeout} ms exceeded`));
      controller.abort();
    }, timeout);
  });
  try {
    const response = await Promise.race([send.call(globalThis, url, { ...init, signal: controller.signal }), expired]);
    result.status = response.status;
    result.text = await Promise.race([response.text(), expired]);
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Low level transport: every API method is a POST request with a JSON body that returns JSON. The requests go
 * through config.fetch, globalThis.fetch by default.
 */
export class ApiClient {
  /** @param {import("./Configuration.js").Configuration} config */
  constructor(config) {
    this.config = config;
  }

  /**
   * Headers of a request: the defaults, the extra headers of the configuration (a default one of the same name is
   * replaced) and the API key.
   * @returns {Record<string, string>}
   */
  headers() {
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "User-Agent": this.config.userAgent,
    };
    for (const [name, value] of Object.entries(this.config.headers || {})) {
      setHeader(headers, name, value);
    }
    setHeader(headers, "X-API-KEY", this.config.apiKey);
    return headers;
  }

  /**
   * URL of an API method with the "platform" query parameter.
   * @param {string} path
   * @returns {string}
   */
  url(path) {
    return this.config.baseUrl + "/" + path.replace(/^\/+/, "")
      + "?" + new URLSearchParams({ platform: this.config.platform ? `${this.config.platform},${PLATFORM}` : PLATFORM }).toString();
  }

  /**
   * Calls an API method and returns the decoded response.
   * @param {string} path Method path, e.g. "/email/send.json".
   * @param {object} [body] Request model or plain object in the API format.
   * @returns {Promise<Record<string, any>>}
   * @throws {ApiError}
   */
  async call(path, body = {}) {
    const send = this.config.fetch || globalThis.fetch;
    const result = { status: 0, text: "" };
    try {
      if (typeof send !== "function") {
        throw new Error("fetch is not available, pass the fetch option of the configuration");
      }
      await fetchText(send, this.url(path), { method: "POST", headers: this.headers(), body: JSON.stringify(body ?? {}) },
        this.config.timeout, result);
    } catch (error) {
      throw new ApiError(`HTTP request failed: ${messageOf(error)}`, { httpStatus: result.status, cause: error });
    }
    const { status, text: raw } = result;

    let data;
    try {
      data = JSON.parse(raw);
    } catch (error) {
      throw new ApiError(`Invalid JSON in response (HTTP ${status}): ${raw.slice(0, 500)}`, {
        httpStatus: status,
        cause: error,
      });
    }
    if (data === null || typeof data !== "object" || Array.isArray(data)) {
      throw new ApiError(`Unexpected response (HTTP ${status}): ${raw.slice(0, 500)}`, {
        httpStatus: status,
      });
    }
    if (status >= 400 || data.status === "error") {
      throw new ApiError(String(data.message ?? "API error"), {
        httpStatus: status,
        errorCode: data.code === undefined || data.code === null ? null : Number(data.code),
        responseBody: data,
      });
    }
    return data;
  }
}
