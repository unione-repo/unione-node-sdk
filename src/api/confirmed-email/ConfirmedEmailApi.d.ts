// ConfirmedEmailApi: API methods of the ConfirmedEmail section.
import type { ApiClient } from "../../client/ApiClient.js";
import type { ConfirmedEmailCreateResponse, ConfirmedEmailDeleteResponse, ConfirmedEmailListResponse, ConfirmedEmailRequest, ConfirmedEmailRequestJSON } from "./models.js";

/**
 * Manage email addresses confirmed for sandbox-domain sending. These methods are available only with a
 * main account API key.
 */
export declare class ConfirmedEmailApi {
  constructor(client: ApiClient);
  client: ApiClient;

  /**
   * Adds an email address and sends a confirmation link.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#confirmed-email-create
   * @throws {ApiError}
   */
  create(request: ConfirmedEmailRequest | ConfirmedEmailRequestJSON): Promise<ConfirmedEmailCreateResponse>;

  /**
   * Lists confirmed and unconfirmed email addresses for the account.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#confirmed-email-list
   * @throws {ApiError}
   */
  list(): Promise<ConfirmedEmailListResponse>;

  /**
   * Deletes an email address from the account's confirmed email list.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#confirmed-email-delete
   * @throws {ApiError}
   */
  delete(request: ConfirmedEmailRequest | ConfirmedEmailRequestJSON): Promise<ConfirmedEmailDeleteResponse>;
}
