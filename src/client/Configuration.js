/** Base URL of the API. */
export const DEFAULT_BASE_URL = "https://api.unione.io/en/transactional/api/v1";

/** API hosts, e.g. `new UniOneClient("YOUR_API_KEY", Host.US1)`. */
export const Host = Object.freeze({
  API: "api.unione.io",
  EU1: "eu1.unione.io",
  US1: "us1.unione.io",
});

/** Path of the API on every host. */
export const BASE_PATH = "/en/transactional/api/v1";

/**
 * Base URL for an API host: "eu1.unione.io" -> "https://eu1.unione.io" + BASE_PATH; a full URL is kept as is.
 * @param {string} host
 * @returns {string}
 */
export function baseUrlFor(host) {
  return host.includes("://") ? host.replace(/\/+$/, "") : "https://" + host.replace(/^\/+|\/+$/g, "") + BASE_PATH;
}

/**
 * fetch-compatible function the requests go through: globalThis.fetch, undici, node-fetch or a wrapper of one of
 * them (retries, logging, proxy).
 * @typedef {(url: string, init: {method: string, headers: Record<string, string>, body: string, signal?: any}) =>
 *   Promise<{status: number, text(): Promise<string>}>} FetchFunction
 */

/** API connection settings. */
export class Configuration {
  /**
   * @param {string} apiKey User or project API key, sent in the X-API-KEY header.
   * @param {{baseUrl?: string, timeout?: number, userAgent?: string, platform?: string,
   *   headers?: Record<string, string>, fetch?: FetchFunction}} [options] timeout in milliseconds; platform: package
   *   that uses the SDK and its version (e.g. "express.1.0.0"), sent in the "platform" query parameter before the SDK
   *   one (PLATFORM); headers: extra headers of every request; fetch: a fetch-compatible function, default: globalThis.fetch.
   */
  constructor(apiKey, { baseUrl = DEFAULT_BASE_URL, timeout = 30000, userAgent = "unione-node-sdk/2.1.2", platform, headers = {}, fetch } = {}) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl.replace(/\/+$/, "");
    this.timeout = timeout;
    this.userAgent = userAgent;
    /** @type {string | undefined} */
    this.platform = platform;
    /**
     * Extra headers of every request; a default one of the same name (any case) is replaced.
     * @type {Record<string, string>}
     */
    this.headers = { ...headers };
    /**
     * Function the requests go through, a fetch-compatible function, default: globalThis.fetch.
     * @type {FetchFunction | undefined}
     */
    this.fetch = fetch;
  }
}
