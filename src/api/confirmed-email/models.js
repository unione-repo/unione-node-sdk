// Models of the ConfirmedEmail section.
import { compact, toModel, toPlain } from "../../client/ApiClient.js";

/** ConfirmedEmailRequest */
export class ConfirmedEmailRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} data.email Email address to add or delete.
   */
  constructor({ email } = {}) {
    /**
     * Email address to add or delete.
     * @type {string|undefined}
     */
    this.email = email;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {ConfirmedEmailRequest}
   */
  static fromJSON(data) {
    return new ConfirmedEmailRequest({
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

/** ConfirmedEmailCreateResponse */
export class ConfirmedEmailCreateResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {ConfirmedEmail} [data.confirmedEmail]
   */
  constructor({ status, confirmedEmail } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /** @type {ConfirmedEmail|undefined} */
    this.confirmedEmail = confirmedEmail == null ? confirmedEmail : toModel(confirmedEmail, ConfirmedEmail);
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {ConfirmedEmailCreateResponse}
   */
  static fromJSON(data) {
    return new ConfirmedEmailCreateResponse({
      status: data["status"],
      confirmedEmail: data["confirmed_email"] == null ? undefined : toModel(data["confirmed_email"], ConfirmedEmail),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "confirmed_email": this.confirmedEmail == null ? undefined : toPlain(this.confirmedEmail),
    });
  }
}

/** ConfirmedEmail */
export class ConfirmedEmail {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.email]
   * @param {"confirmed"|"unconfirmed"} [data.status] Confirmation status of the email address.
   */
  constructor({ email, status } = {}) {
    /** @type {string|undefined} */
    this.email = email;
    /**
     * Confirmation status of the email address.
     * @type {"confirmed"|"unconfirmed"|undefined}
     */
    this.status = status;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {ConfirmedEmail}
   */
  static fromJSON(data) {
    return new ConfirmedEmail({
      email: data["email"],
      status: data["status"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "email": this.email,
      "status": this.status,
    });
  }
}

/** ConfirmedEmailListResponse */
export class ConfirmedEmailListResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {ConfirmedEmail[]} [data.confirmedEmails]
   */
  constructor({ status, confirmedEmails } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /** @type {ConfirmedEmail[]|undefined} */
    this.confirmedEmails = confirmedEmails == null ? confirmedEmails : confirmedEmails.map((item0) => toModel(item0, ConfirmedEmail));
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {ConfirmedEmailListResponse}
   */
  static fromJSON(data) {
    return new ConfirmedEmailListResponse({
      status: data["status"],
      confirmedEmails: data["confirmed_emails"] == null ? undefined : data["confirmed_emails"].map((item0) => toModel(item0, ConfirmedEmail)),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "confirmed_emails": this.confirmedEmails == null ? undefined : this.confirmedEmails.map((item0) => toPlain(item0)),
    });
  }
}

/** ConfirmedEmailDeleteResponse */
export class ConfirmedEmailDeleteResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {string} [data.message]
   */
  constructor({ status, message } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /** @type {string|undefined} */
    this.message = message;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {ConfirmedEmailDeleteResponse}
   */
  static fromJSON(data) {
    return new ConfirmedEmailDeleteResponse({
      status: data["status"],
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
      "message": this.message,
    });
  }
}
