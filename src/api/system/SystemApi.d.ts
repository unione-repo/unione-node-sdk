// SystemApi: API methods of the System section.
import type { ApiClient } from "../../client/ApiClient.js";
import type { SystemInfoResponse, SystemPingResponse } from "./models.js";

/** System operations. */
export declare class SystemApi {
  constructor(client: ApiClient);
  client: ApiClient;

  /**
   * Checks API key validity and returns user ID.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#system-ping
   * @throws {ApiError}
   */
  ping(): Promise<SystemPingResponse>;

  /**
   * Gets user or project info by API key.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#system-info
   * @throws {ApiError}
   */
  info(): Promise<SystemInfoResponse>;
}
