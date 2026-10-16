// SuppressionApi: API methods of the Suppression section.
import { SuccessResponse } from "../../common/models.js";
import { SuppressionDeleteRequest, SuppressionGetRequest, SuppressionGetResponse, SuppressionListRequest, SuppressionListResponse, SuppressionSetRequest } from "./models.js";

/**
 * Methods for managing suppression lists. An email can be added to suppression list because of
 * unsubscription, bounce or complain.
 */
export class SuppressionApi {
  /** @param {import("../../client/ApiClient.js").ApiClient} client */
  constructor(client) {
    this.client = client;
  }

  /**
   * Adds an email address to the suppression list. You can always remove this address from the
   * suppression list later using the
   * [suppression/delete](https://docs.unione.io/en/web-api-ref#suppression-delete) method.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#suppression-set
   * @param {SuppressionSetRequest|Record<string, any>} request Request model or plain object in the API format.
   * @returns {Promise<SuccessResponse>}
   * @throws {ApiError}
   */
  async set(request) {
    return SuccessResponse.fromJSON(await this.client.call("/suppression/set.json", request));
  }

  /**
   * Gets a reason and date of email suppression.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#suppression-get
   * @param {SuppressionGetRequest|Record<string, any>} request Request model or plain object in the API format.
   * @returns {Promise<SuppressionGetResponse>}
   * @throws {ApiError}
   */
  async get(request) {
    return SuppressionGetResponse.fromJSON(await this.client.call("/suppression/get.json", request));
  }

  /**
   * Returns a suppression list since provided date.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#suppression-list
   * @param {SuppressionListRequest|Record<string, any>} request Request model or plain object in the API format.
   * @returns {Promise<SuppressionListResponse>}
   * @throws {ApiError}
   */
  async list(request) {
    return SuppressionListResponse.fromJSON(await this.client.call("/suppression/list.json", request));
  }

  /**
   * Deletes an email from suppression list (only records with is_deletable=true). If there are no
   * entries of this email in the suppression list, API error 3003 is returned. If such entries exist but
   * no one can be deleted, API error 3004 is returned. If daily limit of deletes exceeded, API error 906
   * is returned.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#suppression-delete
   * @param {SuppressionDeleteRequest|Record<string, any>} request Request model or plain object in the API format.
   * @returns {Promise<SuccessResponse>}
   * @throws {ApiError}
   */
  async delete(request) {
    return SuccessResponse.fromJSON(await this.client.call("/suppression/delete.json", request));
  }
}
