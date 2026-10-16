// SuppressionApi: API methods of the Suppression section.
import type { ApiClient } from "../../client/ApiClient.js";
import type { SuccessResponse } from "../../common/models.js";
import type { SuppressionDeleteRequest, SuppressionDeleteRequestJSON, SuppressionGetRequest, SuppressionGetRequestJSON, SuppressionGetResponse, SuppressionListRequest, SuppressionListRequestJSON, SuppressionListResponse, SuppressionSetRequest, SuppressionSetRequestJSON } from "./models.js";

/**
 * Methods for managing suppression lists. An email can be added to suppression list because of
 * unsubscription, bounce or complain.
 */
export declare class SuppressionApi {
  constructor(client: ApiClient);
  client: ApiClient;

  /**
   * Adds an email address to the suppression list. You can always remove this address from the
   * suppression list later using the
   * [suppression/delete](https://docs.unione.io/en/web-api-ref#suppression-delete) method.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#suppression-set
   * @throws {ApiError}
   */
  set(request: SuppressionSetRequest | SuppressionSetRequestJSON): Promise<SuccessResponse>;

  /**
   * Gets a reason and date of email suppression.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#suppression-get
   * @throws {ApiError}
   */
  get(request: SuppressionGetRequest | SuppressionGetRequestJSON): Promise<SuppressionGetResponse>;

  /**
   * Returns a suppression list since provided date.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#suppression-list
   * @throws {ApiError}
   */
  list(request?: SuppressionListRequest | SuppressionListRequestJSON): Promise<SuppressionListResponse>;

  /**
   * Deletes an email from suppression list (only records with is_deletable=true). If there are no
   * entries of this email in the suppression list, API error 3003 is returned. If such entries exist but
   * no one can be deleted, API error 3004 is returned. If daily limit of deletes exceeded, API error 906
   * is returned.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#suppression-delete
   * @throws {ApiError}
   */
  delete(request: SuppressionDeleteRequest | SuppressionDeleteRequestJSON): Promise<SuccessResponse>;
}
