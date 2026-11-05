// TemplateApi: API methods of the Template section.
import type { ApiClient } from "../../client/ApiClient.js";
import type { SuccessResponse } from "../../common/models.js";
import type { TemplateDeleteRequest, TemplateDeleteRequestInput, TemplateGetRequest, TemplateGetRequestInput, TemplateGetResponse, TemplateListRequest, TemplateListRequestInput, TemplateListResponse, TemplateSetRequest, TemplateSetRequestInput, TemplateSetResponse } from "./models.js";

/**
 * You have the option of storing a template on the UniOne side and then using it by id, which is
 * highly recommended for sending repetitive messages or high volume traffic. UniOne supports two
 * different [template engines](https://docs.unione.io/en/template-engines).
 */
export declare class TemplateApi {
  constructor(client: ApiClient);
  client: ApiClient;

  /**
   * Creates or updates an email template.
   *
   * Restrictions:
   * * The maximum request size is 10 MB.
   * * The number of templates is limited to 10000.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#template-set
   * @throws {ApiError}
   */
  set(request: TemplateSetRequest | TemplateSetRequestInput): Promise<TemplateSetResponse>;

  /**
   * Gets template properties by it's id.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#template-get
   * @throws {ApiError}
   */
  get(request: TemplateGetRequest | TemplateGetRequestInput): Promise<TemplateGetResponse>;

  /**
   * Returns the list of all or some templates of the account.
   *
   * You can iterate thru large list using "offset" and "limit" parameters. When less than "limit"
   * templates are returned then the end of list is reached.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#template-list
   * @throws {ApiError}
   */
  list(request?: TemplateListRequest | TemplateListRequestInput): Promise<TemplateListResponse>;

  /**
   * Deletes a template by id.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#template-delete
   * @throws {ApiError}
   */
  delete(request: TemplateDeleteRequest | TemplateDeleteRequestInput): Promise<SuccessResponse>;
}
