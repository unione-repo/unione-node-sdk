// TagApi: API methods of the Tag section.
import type { ApiClient } from "../../client/ApiClient.js";
import type { SuccessResponse } from "../../common/models.js";
import type { TagDeleteRequest, TagDeleteRequestJSON, TagListResponse } from "./models.js";

/**
 * This family of methods is used to manage user-defined tags. Tags are used to categorize letters
 * based on your own criteria, e. g. to create a distinction between marketing and transactional
 * letters or group together all notifications for a particular order type. UniOne allows you to assign
 * tags to all outgoing emails, and the tags you’ve set may then be used to filter and analyze delivery
 * statistics.
 */
export declare class TagApi {
  constructor(client: ApiClient);
  client: ApiClient;

  /**
   * This method returns the full list of user-defined tags. Does not receive any parameters.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#tag-list
   * @throws {ApiError}
   */
  list(): Promise<TagListResponse>;

  /**
   * Removes tag.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#tag-delete
   * @throws {ApiError}
   */
  delete(request: TagDeleteRequest | TagDeleteRequestJSON): Promise<SuccessResponse>;
}
