// Models of the Obsolete section.
import { compact, toModel, toPlain } from "../../client/ApiClient.js";

/**
 * Unsubscription process details:
 *
 * - "unsubscribed" if email has just been unsubscribed,
 * - "was inactive" if it was inactive due some reason,
 * - "was unsubscribed" if it already was unsubscribed before the call,
 * - "added and unsubscribed" if it's a new email without status history and it was added and then unsubscribed immediately.
 */
export const ObsoleteUnsubscribedSetMessage = Object.freeze({
  UNSUBSCRIBED: "unsubscribed",
  WAS_INACTIVE: "was inactive",
  WAS_UNSUBSCRIBED: "was unsubscribed",
  ADDED_AND_UNSUBSCRIBED: "added and unsubscribed",
});

/** ObsoleteUnsubscribedSetRequest */
export class ObsoleteUnsubscribedSetRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} data.address Email to be unsubscribed.
   */
  constructor({ address } = {}) {
    /**
     * Email to be unsubscribed.
     * @type {string|undefined}
     */
    this.address = address;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {ObsoleteUnsubscribedSetRequest}
   */
  static fromJSON(data) {
    return new ObsoleteUnsubscribedSetRequest({
      address: data["address"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "address": this.address,
    });
  }
}

/** ObsoleteUnsubscribedSetResponse */
export class ObsoleteUnsubscribedSetResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {string} [data.address] The unsubscribed email.
   * @param {"unsubscribed"|"was inactive"|"was unsubscribed"|"added and unsubscribed"} [data.message] Unsubscription process details:  - "unsubscribed" if email has just been unsubscribed, - "was inactive" if it was inactive due some reason, - "was unsubscribed" if it already was unsubscribed before the call, - "added and unsubscribed" if it's a new email without status history and it was added and then unsubscribed immediately.
   */
  constructor({ status, address, message } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * The unsubscribed email.
     * @type {string|undefined}
     */
    this.address = address;
    /**
     * Unsubscription process details:
     *
     * - "unsubscribed" if email has just been unsubscribed,
     * - "was inactive" if it was inactive due some reason,
     * - "was unsubscribed" if it already was unsubscribed before the call,
     * - "added and unsubscribed" if it's a new email without status history and it was added and then unsubscribed immediately.
     * @type {"unsubscribed"|"was inactive"|"was unsubscribed"|"added and unsubscribed"|undefined}
     */
    this.message = message;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {ObsoleteUnsubscribedSetResponse}
   */
  static fromJSON(data) {
    return new ObsoleteUnsubscribedSetResponse({
      status: data["status"],
      address: data["address"],
      message: data["message"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "address": this.address,
      "message": this.message,
    });
  }
}

/** ObsoleteUnsubscribedCheckRequest */
export class ObsoleteUnsubscribedCheckRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} data.address Email to check.
   */
  constructor({ address } = {}) {
    /**
     * Email to check.
     * @type {string|undefined}
     */
    this.address = address;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {ObsoleteUnsubscribedCheckRequest}
   */
  static fromJSON(data) {
    return new ObsoleteUnsubscribedCheckRequest({
      address: data["address"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "address": this.address,
    });
  }
}

/** ObsoleteUnsubscribedCheckResponse */
export class ObsoleteUnsubscribedCheckResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {string} [data.address] Email that was checked.
   * @param {boolean} [data.isUnsubscribed] true if unsubscribed, false if not.
   */
  constructor({ status, address, isUnsubscribed } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * Email that was checked.
     * @type {string|undefined}
     */
    this.address = address;
    /**
     * true if unsubscribed, false if not.
     * @type {boolean|undefined}
     */
    this.isUnsubscribed = isUnsubscribed;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {ObsoleteUnsubscribedCheckResponse}
   */
  static fromJSON(data) {
    return new ObsoleteUnsubscribedCheckResponse({
      status: data["status"],
      address: data["address"],
      isUnsubscribed: data["is_unsubscribed"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "address": this.address,
      "is_unsubscribed": this.isUnsubscribed,
    });
  }
}

/** ObsoleteUnsubscribedListRequest */
export class ObsoleteUnsubscribedListRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.dateFrom] Date in the format YYYY-MM-DD to get all unsubscribed emails from the "date_from" to the present day. If the parameter is not specified, the default period is today (from 00:00 UTC).
   */
  constructor({ dateFrom } = {}) {
    /**
     * Date in the format YYYY-MM-DD to get all unsubscribed emails from the "date_from" to the present
     * day. If the parameter is not specified, the default period is today (from 00:00 UTC).
     * @type {string|undefined}
     */
    this.dateFrom = dateFrom;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {ObsoleteUnsubscribedListRequest}
   */
  static fromJSON(data) {
    return new ObsoleteUnsubscribedListRequest({
      dateFrom: data["date_from"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "date_from": this.dateFrom,
    });
  }
}

/** ObsoleteUnsubscribedListResponse */
export class ObsoleteUnsubscribedListResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {ObsoleteUnsubscribedListResponseUnsubscribedItem[]} [data.unsubscribed] Array of object describing unsubscribed emails.
   */
  constructor({ status, unsubscribed } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * Array of object describing unsubscribed emails.
     * @type {ObsoleteUnsubscribedListResponseUnsubscribedItem[]|undefined}
     */
    this.unsubscribed = unsubscribed == null ? unsubscribed : unsubscribed.map((item0) => toModel(item0, ObsoleteUnsubscribedListResponseUnsubscribedItem));
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {ObsoleteUnsubscribedListResponse}
   */
  static fromJSON(data) {
    return new ObsoleteUnsubscribedListResponse({
      status: data["status"],
      unsubscribed: data["unsubscribed"] == null ? undefined : data["unsubscribed"].map((item0) => toModel(item0, ObsoleteUnsubscribedListResponseUnsubscribedItem)),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "unsubscribed": this.unsubscribed == null ? undefined : this.unsubscribed.map((item0) => toPlain(item0)),
    });
  }
}

/** ObsoleteUnsubscribedListResponseUnsubscribedItem */
export class ObsoleteUnsubscribedListResponseUnsubscribedItem {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.address] Unsubscribed email.
   * @param {string} [data.unsubscribedOn] Date and time when a recipient unsubscribed, in UTC timezone and "YYYY-MM-DD hh:mm:ss" format.
   */
  constructor({ address, unsubscribedOn } = {}) {
    /**
     * Unsubscribed email.
     * @type {string|undefined}
     */
    this.address = address;
    /**
     * Date and time when a recipient unsubscribed, in UTC timezone and "YYYY-MM-DD hh:mm:ss" format.
     * @type {string|undefined}
     */
    this.unsubscribedOn = unsubscribedOn;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {ObsoleteUnsubscribedListResponseUnsubscribedItem}
   */
  static fromJSON(data) {
    return new ObsoleteUnsubscribedListResponseUnsubscribedItem({
      address: data["address"],
      unsubscribedOn: data["unsubscribed_on"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "address": this.address,
      "unsubscribed_on": this.unsubscribedOn,
    });
  }
}
