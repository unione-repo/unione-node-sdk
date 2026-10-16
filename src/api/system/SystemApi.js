// SystemApi: API methods of the System section.
import { SystemInfoResponse, SystemPingResponse } from "./models.js";

/** System operations. */
export class SystemApi {
  /** @param {import("../../client/ApiClient.js").ApiClient} client */
  constructor(client) {
    this.client = client;
  }

  /**
   * Checks API key validity and returns user ID.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#system-ping
   * @returns {Promise<SystemPingResponse>}
   * @throws {ApiError}
   */
  async ping() {
    return SystemPingResponse.fromJSON(await this.client.call("/system/ping.json"));
  }

  /**
   * Gets user or project info by API key.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#system-info
   * @returns {Promise<SystemInfoResponse>}
   * @throws {ApiError}
   */
  async info() {
    return SystemInfoResponse.fromJSON(await this.client.call("/system/info.json"));
  }
}
