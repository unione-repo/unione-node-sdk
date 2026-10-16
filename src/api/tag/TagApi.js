// TagApi: API methods of the Tag section.
import { SuccessResponse } from "../../common/models.js";
import { TagDeleteRequest, TagListResponse } from "./models.js";

/**
 * This family of methods is used to manage user-defined tags. Tags are used to categorize letters
 * based on your own criteria, e. g. to create a distinction between marketing and transactional
 * letters or group together all notifications for a particular order type. UniOne allows you to assign
 * tags to all outgoing emails, and the tags you’ve set may then be used to filter and analyze delivery
 * statistics.
 */
export class TagApi {
  /** @param {import("../../client/ApiClient.js").ApiClient} client */
  constructor(client) {
    this.client = client;
  }

  /**
   * This method returns the full list of user-defined tags. Does not receive any parameters.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#tag-list
   * @returns {Promise<TagListResponse>}
   * @throws {ApiError}
   */
  async list() {
    return TagListResponse.fromJSON(await this.client.call("/tag/list.json"));
  }

  /**
   * Removes tag.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#tag-delete
   * @param {TagDeleteRequest|Record<string, any>} request Request model or plain object in the API format.
   * @returns {Promise<SuccessResponse>}
   * @throws {ApiError}
   */
  async delete(request) {
    return SuccessResponse.fromJSON(await this.client.call("/tag/delete.json", request));
  }
}
