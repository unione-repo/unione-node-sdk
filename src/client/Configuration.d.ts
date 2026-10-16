/** Base URL of the API. */
export declare const DEFAULT_BASE_URL: string;

/** API hosts, e.g. `new UniOneClient("YOUR_API_KEY", Host.US1)`. */
export declare const Host: Readonly<{
  API: "api.unione.io";
  EU1: "eu1.unione.io";
  US1: "us1.unione.io";
}>;
/** One of the API hosts. */
export type Host = (typeof Host)[keyof typeof Host];

/** Path of the API on every host. */
export declare const BASE_PATH: string;

/** Base URL for an API host: "eu1.unione.io" -> "https://eu1.unione.io" + BASE_PATH; a full URL is kept as is. */
export declare function baseUrlFor(host: string): string;

/** Request given to the fetch function of the configuration. */
export interface FetchRequestInit {
  method: string;
  headers: Record<string, string>;
  body: string;
  /** Aborts the request on the timeout of the configuration. */
  signal?: any;
}

/** What the SDK reads of a fetch response. */
export interface FetchResponse {
  readonly status: number;
  text(): Promise<string>;
}

/**
 * fetch-compatible function the requests go through: globalThis.fetch, undici, node-fetch or a wrapper of one of
 * them (retries, logging, proxy).
 */
export type FetchFunction = (url: string, init: FetchRequestInit) => Promise<FetchResponse>;

/** Options of Configuration. */
export interface ConfigurationOptions {
  /** Full base URL of the API, default: DEFAULT_BASE_URL. */
  baseUrl?: string;
  /** Request timeout in milliseconds, default: 30000. */
  timeout?: number;
  userAgent?: string;
  /** Package that uses the SDK and its version (e.g. "express.1.0.0"), sent in the "platform" query parameter. */
  platform?: string;
  /** Extra headers of every request; a default one of the same name (any case) is replaced. */
  headers?: Record<string, string>;
  /** Function the requests go through, a fetch-compatible function, default: the built-in http/https modules. */
  fetch?: FetchFunction;
}

/** API connection settings. */
export declare class Configuration {
  /** @param apiKey User or project API key, sent in the X-API-KEY header. */
  constructor(apiKey: string, options?: ConfigurationOptions);
  apiKey: string;
  baseUrl: string;
  timeout: number;
  userAgent: string;
  platform: string | undefined;
  headers: Record<string, string>;
  fetch: FetchFunction | undefined;
}
