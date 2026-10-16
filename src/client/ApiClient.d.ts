import type { Configuration } from "./Configuration.js";

/** Removes undefined/null fields, used by the models' toJSON(). */
export declare function compact(object: Record<string, any>): Record<string, any>;

/** The SDK and its version in the "platform" query parameter of every request. */
export declare const PLATFORM: string;

/** Low level transport: every API method is a POST request with a JSON body that returns JSON. */
export declare class ApiClient {
  constructor(config: Configuration);
  config: Configuration;
  /** Headers of a request: the defaults, the extra headers of the configuration and the API key. */
  headers(): Record<string, string>;
  /** URL of an API method with the "platform" query parameter. */
  url(path: string): string;
  /**
   * Calls an API method and returns the decoded response.
   * @param path Method path, e.g. "/email/send.json".
   * @param body Request model or plain object in the API format.
   * @throws {ApiError}
   */
  call(path: string, body?: object): Promise<Record<string, any>>;
}
