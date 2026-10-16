// Models of the System section.
import { compact, toModel, toPlain } from "../../client/ApiClient.js";

/** SystemPingResponse */
export class SystemPingResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {number} [data.userId] Unique user identifier.
   */
  constructor({ status, userId } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * Unique user identifier.
     * @type {number|undefined}
     */
    this.userId = userId;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {SystemPingResponse}
   */
  static fromJSON(data) {
    return new SystemPingResponse({
      status: data["status"],
      userId: data["user_id"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "user_id": this.userId,
    });
  }
}

/** SystemInfoResponse */
export class SystemInfoResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {number} [data.userId] Unique user identifier.
   * @param {string} [data.email] Email of the user.
   * @param {string} [data.projectId] Unqiue project identifier, ASCII string up to 36 characters long. Present only if the API key used for request is the project API key.
   * @param {string} [data.projectName] Project name, unique for user account. Present only if the API key used for request is the project API key.
   * @param {ProjectAccountingObject} [data.projectAccounting] Object with email counter properties. Present only if the API key used for request is the user API key.
   * @param {SystemInfoResponseAccounting} [data.accounting] Object with accounting period properties. Present only if the API key used for request is the user API key.
   */
  constructor({ status, userId, email, projectId, projectName, projectAccounting, accounting } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * Unique user identifier.
     * @type {number|undefined}
     */
    this.userId = userId;
    /**
     * Email of the user.
     * @type {string|undefined}
     */
    this.email = email;
    /**
     * Unqiue project identifier, ASCII string up to 36 characters long. Present only if the API key used
     * for request is the project API key.
     * @type {string|undefined}
     */
    this.projectId = projectId;
    /**
     * Project name, unique for user account. Present only if the API key used for request is the project
     * API key.
     * @type {string|undefined}
     */
    this.projectName = projectName;
    /**
     * Object with email counter properties. Present only if the API key used for request is the user API
     * key.
     * @type {ProjectAccountingObject|undefined}
     */
    this.projectAccounting = projectAccounting == null ? projectAccounting : toModel(projectAccounting, ProjectAccountingObject);
    /**
     * Object with accounting period properties. Present only if the API key used for request is the user
     * API key.
     * @type {SystemInfoResponseAccounting|undefined}
     */
    this.accounting = accounting == null ? accounting : toModel(accounting, SystemInfoResponseAccounting);
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {SystemInfoResponse}
   */
  static fromJSON(data) {
    return new SystemInfoResponse({
      status: data["status"],
      userId: data["user_id"],
      email: data["email"],
      projectId: data["project_id"],
      projectName: data["project_name"],
      projectAccounting: data["project_accounting"] == null ? undefined : toModel(data["project_accounting"], ProjectAccountingObject),
      accounting: data["accounting"] == null ? undefined : toModel(data["accounting"], SystemInfoResponseAccounting),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "user_id": this.userId,
      "email": this.email,
      "project_id": this.projectId,
      "project_name": this.projectName,
      "project_accounting": this.projectAccounting == null ? undefined : toPlain(this.projectAccounting),
      "accounting": this.accounting == null ? undefined : toPlain(this.accounting),
    });
  }
}

/**
 * Object with email counter properties. Present only if the API key used for request is the user API
 * key.
 */
export class ProjectAccountingObject {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {number} [data.emailCounter] Project's email counter value. It increases on every email sent.
   * @param {number} [data.emailCounterLimit] Allows you to limit the number of emails sent by the project. The sending stops when the limit is reached. Any non-negative 64-bit integer is acceptable. 0 means no limit.
   * @param {"default"|"permanent"} [data.emailCounterMode] 'default' - the counter resets to zero automatically at the beginning of each accounting period. 'permanent' - the counter never resets automatically.
   */
  constructor({ emailCounter, emailCounterLimit, emailCounterMode } = {}) {
    /**
     * Project's email counter value. It increases on every email sent.
     * @type {number|undefined}
     */
    this.emailCounter = emailCounter;
    /**
     * Allows you to limit the number of emails sent by the project. The sending stops when the limit is
     * reached. Any non-negative 64-bit integer is acceptable. 0 means no limit.
     * @type {number|undefined}
     */
    this.emailCounterLimit = emailCounterLimit;
    /**
     * 'default' - the counter resets to zero automatically at the beginning of each accounting period.
     * 'permanent' - the counter never resets automatically.
     * Default: `default`.
     * @type {"default"|"permanent"|undefined}
     */
    this.emailCounterMode = emailCounterMode;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {ProjectAccountingObject}
   */
  static fromJSON(data) {
    return new ProjectAccountingObject({
      emailCounter: data["email_counter"],
      emailCounterLimit: data["email_counter_limit"],
      emailCounterMode: data["email_counter_mode"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "email_counter": this.emailCounter,
      "email_counter_limit": this.emailCounterLimit,
      "email_counter_mode": this.emailCounterMode,
    });
  }
}

/**
 * Object with accounting period properties. Present only if the API key used for request is the user
 * API key.
 */
export class SystemInfoResponseAccounting {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.periodStart] Date and time of accounting period start in UTC in "YYYY-MM-DD hh:mm:ss" format.
   * @param {string} [data.periodEnd] Date and time of accounting period end in UTC in "YYYY-MM-DD hh:mm:ss" format.
   * @param {number} [data.emailsIncluded] Number of emails included into accounting period.
   * @param {number} [data.emailsSent] Number of emails sent during accounting period. Can be bigger than emails_included in case of overage.
   */
  constructor({ periodStart, periodEnd, emailsIncluded, emailsSent } = {}) {
    /**
     * Date and time of accounting period start in UTC in "YYYY-MM-DD hh:mm:ss" format.
     * @type {string|undefined}
     */
    this.periodStart = periodStart;
    /**
     * Date and time of accounting period end in UTC in "YYYY-MM-DD hh:mm:ss" format.
     * @type {string|undefined}
     */
    this.periodEnd = periodEnd;
    /**
     * Number of emails included into accounting period.
     * @type {number|undefined}
     */
    this.emailsIncluded = emailsIncluded;
    /**
     * Number of emails sent during accounting period. Can be bigger than emails_included in case of
     * overage.
     * @type {number|undefined}
     */
    this.emailsSent = emailsSent;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {SystemInfoResponseAccounting}
   */
  static fromJSON(data) {
    return new SystemInfoResponseAccounting({
      periodStart: data["period_start"],
      periodEnd: data["period_end"],
      emailsIncluded: data["emails_included"],
      emailsSent: data["emails_sent"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "period_start": this.periodStart,
      "period_end": this.periodEnd,
      "emails_included": this.emailsIncluded,
      "emails_sent": this.emailsSent,
    });
  }
}
