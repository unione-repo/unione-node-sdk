// WebhookApi: API methods of the Webhook section.
import { SuccessResponse } from "../../common/models.js";
import { WebhookCallback, WebhookDeleteRequest, WebhookGetRequest, WebhookGetResponse, WebhookListRequest, WebhookListResponse, WebhookSetRequest, WebhookSetResponse } from "./models.js";

/**
 * UniOne lets you recieve notifications about email status changes or spam blocks. You provide an URL
 * and every time a watched event occurs we will notify you by submitting a request with JSON data to
 * this URL.
 *
 * You can configure the format of webhook calls (JSON or gzipped JSON), which events you want to be
 * notified of, whether or not you let us groups several events in one request, do you want to receive
 * extra details like SMTP answer or recipient's user agent, etc.
 *
 * Please note that your webhook handler should be able to process at least 5 parallel requests, up to
 * 100 events each (but you can configure the maximum number of parallel connections up to 100, which
 * is recommended).
 *
 * If the URL of your webhook handler is not available (the response is not HTTP 200 OK within 3
 * seconds timeout), the system will repeat requests each 10 minutes during 24 hours, passing extra
 * parameter retry_count. If there were at least 10 events during last 24 hours and all the webhook
 * requests about these events have failed then we consider webhook handler broken and change it's
 * status to inactive automatically. A notification about that is sent to an email [configured in
 * control panel](https://cp.unione.io/en/user/alerting/technical/).
 *
 * The format of webhook request and details of each event are described
 * [here](https://docs.unione.io/en/web-api-ref#callback-format).
 */
export class WebhookApi {
  /** @param {import("../../client/ApiClient.js").ApiClient} client */
  constructor(client) {
    this.client = client;
  }

  /**
   * Sets or edits a [webhook](https://docs.unione.io/en/web-api-ref#webhook), i.e. an event notification
   * handler.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#webhook-set
   * @param {WebhookSetRequest|Record<string, any>} request Request model or plain object in the API format.
   * @returns {Promise<WebhookSetResponse>}
   * @throws {ApiError}
   */
  async set(request) {
    return WebhookSetResponse.fromJSON(await this.client.call("/webhook/set.json", request));
  }

  /**
   * Gets properties of a [webhook](https://docs.unione.io/en/web-api-ref#webhook).
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#webhook-get
   * @param {WebhookGetRequest|Record<string, any>} request Request model or plain object in the API format.
   * @returns {Promise<WebhookGetResponse>}
   * @throws {ApiError}
   */
  async get(request) {
    return WebhookGetResponse.fromJSON(await this.client.call("/webhook/get.json", request));
  }

  /**
   * List all or some [webhooks](https://docs.unione.io/en/web-api-ref#webhook) (event notification
   * handlers) of a user or a project.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#webhook-list
   * @param {WebhookListRequest|Record<string, any>} request Request model or plain object in the API format.
   * @returns {Promise<WebhookListResponse>}
   * @throws {ApiError}
   */
  async list(request) {
    return WebhookListResponse.fromJSON(await this.client.call("/webhook/list.json", request));
  }

  /**
   * Deletes an event notification handler
   *
   * You can also temporarily deactivate webhook without deleting it by setting it's status to "disabled"
   * in [webhook/set](https://docs.unione.io/en/web-api-ref#webhook-set) method.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#webhook-delete
   * @param {WebhookDeleteRequest|Record<string, any>} request Request model or plain object in the API format.
   * @returns {Promise<SuccessResponse>}
   * @throws {ApiError}
   */
  async delete(request) {
    return SuccessResponse.fromJSON(await this.client.call("/webhook/delete.json", request));
  }

  /**
   * Webhook callback format description.
   * @param {string} body Raw body of the incoming request.
   * @returns {WebhookCallback}
   */
  static parseCallback(body) {
    return WebhookCallback.fromJSON(JSON.parse(body));
  }
}
