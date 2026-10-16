// ObsoleteApi: API methods of the Obsolete section.
import type { ApiClient } from "../../client/ApiClient.js";
import type { ObsoleteUnsubscribedCheckRequest, ObsoleteUnsubscribedCheckRequestJSON, ObsoleteUnsubscribedCheckResponse, ObsoleteUnsubscribedListRequest, ObsoleteUnsubscribedListRequestJSON, ObsoleteUnsubscribedListResponse, ObsoleteUnsubscribedSetRequest, ObsoleteUnsubscribedSetRequestJSON, ObsoleteUnsubscribedSetResponse } from "./models.js";

/**
 * Obsolete methods dealing with unsubscribes. We recommend using the more flexible
 * [suppression](https://docs.unione.io/en/web-api-ref#suppression) methods instead. Note that you
 * can't resubscribe an unsubscribed recipient using WebAPI, but you can send him an email with
 * subscription link using email/subscribe method.
 */
export declare class ObsoleteApi {
  constructor(client: ApiClient);
  client: ApiClient;

  /**
   * Registers a new unsubscribed email.
   *
   * After registering an email as unsubscribed all future attempts to send a message to this email will
   * be rejected. Please note that there's no way to remove an email from unsubscribed thru the API. But
   * you can send an email with a link to resubscribe using
   * [email/subscribe](https://docs.unione.io/en/web-api-ref#email-subscribe) method or remove
   * "unsubscribed" status manually on [Email Search page](https://cp.unione.io/en/user/email) in control
   * panel (but only a limited number of unsubscribed email per day can be removed).
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#unsubscribed-set
   * @throws {ApiError}
   */
  unsubscribedSet(request: ObsoleteUnsubscribedSetRequest | ObsoleteUnsubscribedSetRequestJSON): Promise<ObsoleteUnsubscribedSetResponse>;

  /**
   * Checks if an email is unsubscribed.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#unsubscribed-check
   * @throws {ApiError}
   */
  unsubscribedCheck(request: ObsoleteUnsubscribedCheckRequest | ObsoleteUnsubscribedCheckRequestJSON): Promise<ObsoleteUnsubscribedCheckResponse>;

  /**
   * Returns a list of all unsubscribed emails since provided date.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#unsubscribed-list
   * @throws {ApiError}
   */
  unsubscribedList(request?: ObsoleteUnsubscribedListRequest | ObsoleteUnsubscribedListRequestJSON): Promise<ObsoleteUnsubscribedListResponse>;
}
