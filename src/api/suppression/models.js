// Models of the Suppression section.
import { compact, toModel, toPlain } from "../../client/ApiClient.js";

/** SuppressionSetRequest */
export class SuppressionSetRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} data.email Email to add in suppression list.
   * @param {string} data.cause Cause of email being suppressed. One of:  - __unsubscribed__ - email is unsubscribed; - __temporary_unavailable__ - the email address is unavailable. This means that over the next three days sending to this address will return an error. Email may be temporarily unavailable due to several reasons, e.g.:  - a previous email has been rejected by the recipient's server for spam; - the recipient's mailbox is full or is not used; - recipient's domain does not accept mail; - sending server was rejected due to blacklisting;  - __permanent_unavailable__ - the email address is permanently unavailable due to multiple hard bounces; - __complained__ -  the recipient reported spam in the previous emails;
   * @param {string} [data.created] When suppression was created, in UTC timezone in "YYYY-MM-DD hh:mm:ss" format.
   */
  constructor({ email, cause, created } = {}) {
    /**
     * Email to add in suppression list.
     * @type {string|undefined}
     */
    this.email = email;
    /**
     * Cause of email being suppressed. One of:
     *
     * - __unsubscribed__ - email is unsubscribed;
     * - __temporary_unavailable__ - the email address is unavailable. This means that over the next three days sending to this address will return an error. Email may be temporarily unavailable due to several reasons, e.g.:
     *
     * - a previous email has been rejected by the recipient's server for spam;
     * - the recipient's mailbox is full or is not used;
     * - recipient's domain does not accept mail;
     * - sending server was rejected due to blacklisting;
     *
     * - __permanent_unavailable__ - the email address is permanently unavailable due to multiple hard bounces;
     * - __complained__ -  the recipient reported spam in the previous emails;
     * @type {string|undefined}
     */
    this.cause = cause;
    /**
     * When suppression was created, in UTC timezone in "YYYY-MM-DD hh:mm:ss" format.
     * @type {string|undefined}
     */
    this.created = created;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {SuppressionSetRequest}
   */
  static fromJSON(data) {
    return new SuppressionSetRequest({
      email: data["email"],
      cause: data["cause"],
      created: data["created"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "email": this.email,
      "cause": this.cause,
      "created": this.created,
    });
  }
}

/** SuppressionGetRequest */
export class SuppressionGetRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} data.email Email to get suppression details for.
   * @param {boolean} [data.allProjects] If a user has projects functionality enabled, he/she can pass all_projects=true to search in all projects' data.
   */
  constructor({ email, allProjects } = {}) {
    /**
     * Email to get suppression details for.
     * @type {string|undefined}
     */
    this.email = email;
    /**
     * If a user has projects functionality enabled, he/she can pass all_projects=true to search in all
     * projects' data.
     * Default: `False`.
     * @type {boolean|undefined}
     */
    this.allProjects = allProjects;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {SuppressionGetRequest}
   */
  static fromJSON(data) {
    return new SuppressionGetRequest({
      email: data["email"],
      allProjects: data["all_projects"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "email": this.email,
      "all_projects": this.allProjects,
    });
  }
}

/** SuppressionGetResponse */
export class SuppressionGetResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {string} [data.email] The email for which suppression details were requested.
   * @param {SuppressionGetObject[]} [data.suppressions] Array of suppression objects.
   */
  constructor({ status, email, suppressions } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * The email for which suppression details were requested.
     * @type {string|undefined}
     */
    this.email = email;
    /**
     * Array of suppression objects.
     * @type {SuppressionGetObject[]|undefined}
     */
    this.suppressions = suppressions == null ? suppressions : suppressions.map((item0) => toModel(item0, SuppressionGetObject));
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {SuppressionGetResponse}
   */
  static fromJSON(data) {
    return new SuppressionGetResponse({
      status: data["status"],
      email: data["email"],
      suppressions: data["suppressions"] == null ? undefined : data["suppressions"].map((item0) => toModel(item0, SuppressionGetObject)),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "email": this.email,
      "suppressions": this.suppressions == null ? undefined : this.suppressions.map((item0) => toPlain(item0)),
    });
  }
}

/** Object with suppression details. */
export class SuppressionGetObject {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.projectId] Unqiue project identifier, ASCII string up to 36 characters long.
   * @param {string} [data.cause] Cause of email being suppressed. One of:  - __unsubscribed__ - email is unsubscribed; - __temporary_unavailable__ - the email address is unavailable. This means that over the next three days sending to this address will return an error. Email may be temporarily unavailable due to several reasons, e.g.:  - a previous email has been rejected by the recipient's server for spam; - the recipient's mailbox is full or is not used; - recipient's domain does not accept mail; - sending server was rejected due to blacklisting;  - __permanent_unavailable__ - the email address is permanently unavailable due to multiple hard bounces; - __complained__ -  the recipient reported spam in the previous emails; - __blocked__ -  sending to the email is prohibited by administration of UniOne. We may add some new causes in the future.
   * @param {string} [data.source] Source of email being suppressed. One of:  - __user__ - suppressed by user with    [suppression/set](https://docs.unione.io/en/web-api-ref#suppression-set); - __system__ - sending to the email is prohibited by system, for example due to multiple hard bounces; - __subscriber__ - the recipient reported spam or unsubscribed in the previous emails.
   * @param {boolean} [data.isDeletable] Is it possible to delete this suppression by calling suppression/delete method.
   * @param {string} [data.created] When suppression was created, in UTC timezone in "YYYY-MM-DD hh:mm:ss" format.
   */
  constructor({ projectId, cause, source, isDeletable, created } = {}) {
    /**
     * Unqiue project identifier, ASCII string up to 36 characters long.
     * @type {string|undefined}
     */
    this.projectId = projectId;
    /**
     * Cause of email being suppressed. One of:
     *
     * - __unsubscribed__ - email is unsubscribed;
     * - __temporary_unavailable__ - the email address is unavailable. This means that over the next three days sending to this address will return an error. Email may be temporarily unavailable due to several reasons, e.g.:
     *
     * - a previous email has been rejected by the recipient's server for spam;
     * - the recipient's mailbox is full or is not used;
     * - recipient's domain does not accept mail;
     * - sending server was rejected due to blacklisting;
     *
     * - __permanent_unavailable__ - the email address is permanently unavailable due to multiple hard bounces;
     * - __complained__ -  the recipient reported spam in the previous emails;
     * - __blocked__ -  sending to the email is prohibited by administration of UniOne.
     * We may add some new causes in the future.
     * @type {string|undefined}
     */
    this.cause = cause;
    /**
     * Source of email being suppressed. One of:
     *
     * - __user__ - suppressed by user with    [suppression/set](https://docs.unione.io/en/web-api-ref#suppression-set);
     * - __system__ - sending to the email is prohibited by system, for example due to multiple hard bounces;
     * - __subscriber__ - the recipient reported spam or unsubscribed in the previous emails.
     * @type {string|undefined}
     */
    this.source = source;
    /**
     * Is it possible to delete this suppression by calling suppression/delete method.
     * @type {boolean|undefined}
     */
    this.isDeletable = isDeletable;
    /**
     * When suppression was created, in UTC timezone in "YYYY-MM-DD hh:mm:ss" format.
     * @type {string|undefined}
     */
    this.created = created;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {SuppressionGetObject}
   */
  static fromJSON(data) {
    return new SuppressionGetObject({
      projectId: data["project_id"],
      cause: data["cause"],
      source: data["source"],
      isDeletable: data["is_deletable"],
      created: data["created"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "project_id": this.projectId,
      "cause": this.cause,
      "source": this.source,
      "is_deletable": this.isDeletable,
      "created": this.created,
    });
  }
}

/** SuppressionListRequest */
export class SuppressionListRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.cause] Cause of email being suppressed. One of:  - __unsubscribed__ - email is unsubscribed; - __temporary_unavailable__ - the email address is unavailable. This means that over the next three days sending to this address will return an error. Email may be temporarily unavailable due to several reasons, e.g.:  - a previous email has been rejected by the recipient's server for spam; - the recipient's mailbox is full or is not used; - recipient's domain does not accept mail; - sending server was rejected due to blacklisting;  - __permanent_unavailable__ - the email address is permanently unavailable due to multiple hard bounces; - __complained__ -  the recipient reported spam in the previous emails; - __blocked__ -  sending to the email is prohibited by administration of UniOne. We may add some new causes in the future.
   * @param {string} [data.source] Source of email being suppressed. One of:  - __user__ - suppressed by user with    [suppression/set](https://docs.unione.io/en/web-api-ref#suppression-set); - __system__ - sending to the email is prohibited by system, for example due to multiple hard bounces; - __subscriber__ - the recipient reported spam or unsubscribed in the previous emails.
   * @param {string} [data.startTime] Date in the format YYYY-MM-DD hh:mm:ss to get suppression list from the "start_time" to the present day. Ignored if "cursor" is not empty.
   * @param {string} [data.cursor] The parameter indicates from which position the selection is to be started. Must be empty or omitted for the first data chunk. In order to get subsequent chunks, you must set the "cursor" parameter in your request, using the value received in response to the previous request.
   * @param {number} [data.limit] Limits the number of records to be returned at one time, default is 50.
   */
  constructor({ cause, source, startTime, cursor, limit } = {}) {
    /**
     * Cause of email being suppressed. One of:
     *
     * - __unsubscribed__ - email is unsubscribed;
     * - __temporary_unavailable__ - the email address is unavailable. This means that over the next three days sending to this address will return an error. Email may be temporarily unavailable due to several reasons, e.g.:
     *
     * - a previous email has been rejected by the recipient's server for spam;
     * - the recipient's mailbox is full or is not used;
     * - recipient's domain does not accept mail;
     * - sending server was rejected due to blacklisting;
     *
     * - __permanent_unavailable__ - the email address is permanently unavailable due to multiple hard bounces;
     * - __complained__ -  the recipient reported spam in the previous emails;
     * - __blocked__ -  sending to the email is prohibited by administration of UniOne.
     * We may add some new causes in the future.
     * @type {string|undefined}
     */
    this.cause = cause;
    /**
     * Source of email being suppressed. One of:
     *
     * - __user__ - suppressed by user with    [suppression/set](https://docs.unione.io/en/web-api-ref#suppression-set);
     * - __system__ - sending to the email is prohibited by system, for example due to multiple hard bounces;
     * - __subscriber__ - the recipient reported spam or unsubscribed in the previous emails.
     * @type {string|undefined}
     */
    this.source = source;
    /**
     * Date in the format YYYY-MM-DD hh:mm:ss to get suppression list from the "start_time" to the present
     * day. Ignored if "cursor" is not empty.
     * @type {string|undefined}
     */
    this.startTime = startTime;
    /**
     * The parameter indicates from which position the selection is to be started. Must be empty or omitted
     * for the first data chunk. In order to get subsequent chunks, you must set the "cursor" parameter in
     * your request, using the value received in response to the previous request.
     * @type {string|undefined}
     */
    this.cursor = cursor;
    /**
     * Limits the number of records to be returned at one time, default is 50.
     * @type {number|undefined}
     */
    this.limit = limit;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {SuppressionListRequest}
   */
  static fromJSON(data) {
    return new SuppressionListRequest({
      cause: data["cause"],
      source: data["source"],
      startTime: data["start_time"],
      cursor: data["cursor"],
      limit: data["limit"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "cause": this.cause,
      "source": this.source,
      "start_time": this.startTime,
      "cursor": this.cursor,
      "limit": this.limit,
    });
  }
}

/** SuppressionListResponse */
export class SuppressionListResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {SuppressionListObject[]} [data.suppressions] Array of suppression objects.
   * @param {string} [data.cursor] The parameter indicates from which position the selection is to be started. Must be empty or omitted for the first data chunk. In order to get subsequent chunks, you must set the "cursor" parameter in your request, using the value received in response to the previous request.
   */
  constructor({ status, suppressions, cursor } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * Array of suppression objects.
     * @type {SuppressionListObject[]|undefined}
     */
    this.suppressions = suppressions == null ? suppressions : suppressions.map((item0) => toModel(item0, SuppressionListObject));
    /**
     * The parameter indicates from which position the selection is to be started. Must be empty or omitted
     * for the first data chunk. In order to get subsequent chunks, you must set the "cursor" parameter in
     * your request, using the value received in response to the previous request.
     * @type {string|undefined}
     */
    this.cursor = cursor;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {SuppressionListResponse}
   */
  static fromJSON(data) {
    return new SuppressionListResponse({
      status: data["status"],
      suppressions: data["suppressions"] == null ? undefined : data["suppressions"].map((item0) => toModel(item0, SuppressionListObject)),
      cursor: data["cursor"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "suppressions": this.suppressions == null ? undefined : this.suppressions.map((item0) => toPlain(item0)),
      "cursor": this.cursor,
    });
  }
}

/** Object with suppression details. */
export class SuppressionListObject {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.email] Email to get suppression details for.
   * @param {string} [data.cause] Cause of email being suppressed. One of:  - __unsubscribed__ - email is unsubscribed; - __temporary_unavailable__ - the email address is unavailable. This means that over the next three days sending to this address will return an error. Email may be temporarily unavailable due to several reasons, e.g.:  - a previous email has been rejected by the recipient's server for spam; - the recipient's mailbox is full or is not used; - recipient's domain does not accept mail; - sending server was rejected due to blacklisting;  - __permanent_unavailable__ - the email address is permanently unavailable due to multiple hard bounces; - __complained__ -  the recipient reported spam in the previous emails; - __blocked__ -  sending to the email is prohibited by administration of UniOne. We may add some new causes in the future.
   * @param {string} [data.source] Source of email being suppressed. One of:  - __user__ - suppressed by user with    [suppression/set](https://docs.unione.io/en/web-api-ref#suppression-set); - __system__ - sending to the email is prohibited by system, for example due to multiple hard bounces; - __subscriber__ - the recipient reported spam or unsubscribed in the previous emails.
   * @param {boolean} [data.isDeletable] Is it possible to delete this suppression by calling suppression/delete method.
   * @param {string} [data.created] When suppression was created, in UTC timezone in "YYYY-MM-DD hh:mm:ss" format.
   */
  constructor({ email, cause, source, isDeletable, created } = {}) {
    /**
     * Email to get suppression details for.
     * @type {string|undefined}
     */
    this.email = email;
    /**
     * Cause of email being suppressed. One of:
     *
     * - __unsubscribed__ - email is unsubscribed;
     * - __temporary_unavailable__ - the email address is unavailable. This means that over the next three days sending to this address will return an error. Email may be temporarily unavailable due to several reasons, e.g.:
     *
     * - a previous email has been rejected by the recipient's server for spam;
     * - the recipient's mailbox is full or is not used;
     * - recipient's domain does not accept mail;
     * - sending server was rejected due to blacklisting;
     *
     * - __permanent_unavailable__ - the email address is permanently unavailable due to multiple hard bounces;
     * - __complained__ -  the recipient reported spam in the previous emails;
     * - __blocked__ -  sending to the email is prohibited by administration of UniOne.
     * We may add some new causes in the future.
     * @type {string|undefined}
     */
    this.cause = cause;
    /**
     * Source of email being suppressed. One of:
     *
     * - __user__ - suppressed by user with    [suppression/set](https://docs.unione.io/en/web-api-ref#suppression-set);
     * - __system__ - sending to the email is prohibited by system, for example due to multiple hard bounces;
     * - __subscriber__ - the recipient reported spam or unsubscribed in the previous emails.
     * @type {string|undefined}
     */
    this.source = source;
    /**
     * Is it possible to delete this suppression by calling suppression/delete method.
     * @type {boolean|undefined}
     */
    this.isDeletable = isDeletable;
    /**
     * When suppression was created, in UTC timezone in "YYYY-MM-DD hh:mm:ss" format.
     * @type {string|undefined}
     */
    this.created = created;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {SuppressionListObject}
   */
  static fromJSON(data) {
    return new SuppressionListObject({
      email: data["email"],
      cause: data["cause"],
      source: data["source"],
      isDeletable: data["is_deletable"],
      created: data["created"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "email": this.email,
      "cause": this.cause,
      "source": this.source,
      "is_deletable": this.isDeletable,
      "created": this.created,
    });
  }
}

/** SuppressionDeleteRequest */
export class SuppressionDeleteRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} data.email An email to delete from suppression list.
   */
  constructor({ email } = {}) {
    /**
     * An email to delete from suppression list.
     * @type {string|undefined}
     */
    this.email = email;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {SuppressionDeleteRequest}
   */
  static fromJSON(data) {
    return new SuppressionDeleteRequest({
      email: data["email"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "email": this.email,
    });
  }
}
