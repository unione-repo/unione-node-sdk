// TemplateApi: API methods of the Template section.
import { SuccessResponse } from "../../common/models.js";
import { TemplateDeleteRequest, TemplateGetRequest, TemplateGetResponse, TemplateListRequest, TemplateListResponse, TemplateSetRequest, TemplateSetResponse } from "./models.js";

/**
 * You have the option of storing a template on the UniOne side and then using it by id, which is
 * highly recommended for sending repetitive messages or high volume traffic. UniOne supports two
 * different [template engines](https://docs.unione.io/en/template-engines).
 */
export class TemplateApi {
  /** @param {import("../../client/ApiClient.js").ApiClient} client */
  constructor(client) {
    this.client = client;
  }

  /**
   * Creates or updates an email template.
   *
   * Restrictions:
   * * The maximum request size is 10 MB.
   * * The number of templates is limited to 10000.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#template-set
   * @param {TemplateSetRequest|Record<string, any>} request Request model or plain object in the API format.
   * @returns {Promise<TemplateSetResponse>}
   * @throws {ApiError}
   */
  async set(request) {
    return TemplateSetResponse.fromJSON(await this.client.call("/template/set.json", request));
  }

  /**
   * Gets template properties by it's id.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#template-get
   * @param {TemplateGetRequest|Record<string, any>} request Request model or plain object in the API format.
   * @returns {Promise<TemplateGetResponse>}
   * @throws {ApiError}
   */
  async get(request) {
    return TemplateGetResponse.fromJSON(await this.client.call("/template/get.json", request));
  }

  /**
   * Returns the list of all or some templates of the account.
   *
   * You can iterate thru large list using "offset" and "limit" parameters. When less than "limit"
   * templates are returned then the end of list is reached.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#template-list
   * @param {TemplateListRequest|Record<string, any>} request Request model or plain object in the API format.
   * @returns {Promise<TemplateListResponse>}
   * @throws {ApiError}
   */
  async list(request) {
    return TemplateListResponse.fromJSON(await this.client.call("/template/list.json", request));
  }

  /**
   * Deletes a template by id.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#template-delete
   * @param {TemplateDeleteRequest|Record<string, any>} request Request model or plain object in the API format.
   * @returns {Promise<SuccessResponse>}
   * @throws {ApiError}
   */
  async delete(request) {
    return SuccessResponse.fromJSON(await this.client.call("/template/delete.json", request));
  }
}
