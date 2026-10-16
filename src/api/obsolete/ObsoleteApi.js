// ObsoleteApi: API methods of the Obsolete section.
import { ObsoleteUnsubscribedCheckRequest, ObsoleteUnsubscribedCheckResponse, ObsoleteUnsubscribedListRequest, ObsoleteUnsubscribedListResponse, ObsoleteUnsubscribedSetRequest, ObsoleteUnsubscribedSetResponse } from "./models.js";

/**
 * Obsolete methods dealing with unsubscribes. We recommend using the more flexible
 * [suppression](https://docs.unione.io/en/web-api-ref#suppression) methods instead. Note that you
 * can't resubscribe an unsubscribed recipient using WebAPI, but you can send him an email with
 * subscription link using email/subscribe method.
 */
export class ObsoleteApi {
  /** @param {import("../../client/ApiClient.js").ApiClient} client */
  constructor(client) {
    this.client = client;
  }

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
   * @param {ObsoleteUnsubscribedSetRequest|Record<string, any>} request Request model or plain object in the API format.
   * @returns {Promise<ObsoleteUnsubscribedSetResponse>}
   * @throws {ApiError}
   */
  async unsubscribedSet(request) {
    return ObsoleteUnsubscribedSetResponse.fromJSON(await this.client.call("/unsubscribed/set.json", request));
  }

  /**
   * Checks if an email is unsubscribed.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#unsubscribed-check
   * @param {ObsoleteUnsubscribedCheckRequest|Record<string, any>} request Request model or plain object in the API format.
   * @returns {Promise<ObsoleteUnsubscribedCheckResponse>}
   * @throws {ApiError}
   */
  async unsubscribedCheck(request) {
    return ObsoleteUnsubscribedCheckResponse.fromJSON(await this.client.call("/unsubscribed/check.json", request));
  }

  /**
   * Returns a list of all unsubscribed emails since provided date.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#unsubscribed-list
   * @param {ObsoleteUnsubscribedListRequest|Record<string, any>} request Request model or plain object in the API format.
   * @returns {Promise<ObsoleteUnsubscribedListResponse>}
   * @throws {ApiError}
   */
  async unsubscribedList(request) {
    return ObsoleteUnsubscribedListResponse.fromJSON(await this.client.call("/unsubscribed/list.json", request));
  }
}
