// Models of the EmailValidation section.
import { compact, toModel, toPlain } from "../../client/ApiClient.js";

/** EmailValidationSingleRequest */
export class EmailValidationSingleRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} data.email Email address to be checked.
   */
  constructor({ email } = {}) {
    /**
     * Email address to be checked.
     * @type {string|undefined}
     */
    this.email = email;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {EmailValidationSingleRequest}
   */
  static fromJSON(data) {
    return new EmailValidationSingleRequest({
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

/** EmailValidationSingleResponse */
export class EmailValidationSingleResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {string} [data.email] Email address to be checked.
   * @param {string} [data.result] Possible statuses:  - "valid" - the address is valid, - "invalid" - the address is invalid, - "suspicious" - the address looks suspicious, - "unknown" - could not perform validation, the domain’s mail server has not responded within the time limit.
   * @param {string} [data.cause] Possible statuses:  - "no_mx_record" - no MX record found for the target domain, - "syntax_error" - the address syntax is invalid, - "possible_typo" - the address is likely to have a typo, - "mailbox_not_found" - the address does not exist, - "global_suppression" - the address has been marked as unreachable due to multiple previous delivery errors, - "disposable" - this is a disposable one-time email address which is usually valid for a few minutes only, - "role" - the address is not likely to belong to an actual person, but rather to a certain business staff role, - "abuse" - the address is known to be a source of a large number of complaints, sometimes issued automatically, - "spamtrap" - this email is a spam trap, it is published openly but never used for actual emails. Sending messages to such addresses has a huge negative impact on reputation score, - "smtp_connection_failed" - the domain’s SMTP server does not respond; the address may contain a typo.
   * @param {number} [data.validity] Validity score, from 0 to 100 (0 – invalid, 100 – valid).
   * @param {string} [data.localPart] Local part (everything preceding the @ sign).
   * @param {string} [data.domain] Domain name part.
   * @param {boolean} [data.mxFound] True if the address’ domain does have an MX record, false if does not.
   * @param {string} [data.mxRecord] Preferred MX record for the domain.
   * @param {string} [data.didYouMean] For addresses which are likely to have typing errors (cause=possible_typo), a suggested variant with a fixed typo.
   * @param {string} [data.processedAt] Email check date and time, YYYY-MM-DD hh:mm:ss UTC.
   */
  constructor({ status, email, result, cause, validity, localPart, domain, mxFound, mxRecord, didYouMean, processedAt } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * Email address to be checked.
     * @type {string|undefined}
     */
    this.email = email;
    /**
     * Possible statuses:
     *
     * - "valid" - the address is valid,
     * - "invalid" - the address is invalid,
     * - "suspicious" - the address looks suspicious,
     * - "unknown" - could not perform validation, the domain’s mail server has not responded within the time limit.
     * @type {string|undefined}
     */
    this.result = result;
    /**
     * Possible statuses:
     *
     * - "no_mx_record" - no MX record found for the target domain,
     * - "syntax_error" - the address syntax is invalid,
     * - "possible_typo" - the address is likely to have a typo,
     * - "mailbox_not_found" - the address does not exist,
     * - "global_suppression" - the address has been marked as unreachable due to multiple previous delivery errors,
     * - "disposable" - this is a disposable one-time email address which is usually valid for a few minutes only,
     * - "role" - the address is not likely to belong to an actual person, but rather to a certain business staff role,
     * - "abuse" - the address is known to be a source of a large number of complaints, sometimes issued automatically,
     * - "spamtrap" - this email is a spam trap, it is published openly but never used for actual emails. Sending messages to such addresses has a huge negative impact on reputation score,
     * - "smtp_connection_failed" - the domain’s SMTP server does not respond; the address may contain a typo.
     * @type {string|undefined}
     */
    this.cause = cause;
    /**
     * Validity score, from 0 to 100 (0 – invalid, 100 – valid).
     * @type {number|undefined}
     */
    this.validity = validity;
    /**
     * Local part (everything preceding the @ sign).
     * @type {string|undefined}
     */
    this.localPart = localPart;
    /**
     * Domain name part.
     * @type {string|undefined}
     */
    this.domain = domain;
    /**
     * True if the address’ domain does have an MX record, false if does not.
     * @type {boolean|undefined}
     */
    this.mxFound = mxFound;
    /**
     * Preferred MX record for the domain.
     * @type {string|undefined}
     */
    this.mxRecord = mxRecord;
    /**
     * For addresses which are likely to have typing errors (cause=possible_typo), a suggested variant with
     * a fixed typo.
     * @type {string|undefined}
     */
    this.didYouMean = didYouMean;
    /**
     * Email check date and time, YYYY-MM-DD hh:mm:ss UTC.
     * @type {string|undefined}
     */
    this.processedAt = processedAt;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {EmailValidationSingleResponse}
   */
  static fromJSON(data) {
    return new EmailValidationSingleResponse({
      status: data["status"],
      email: data["email"],
      result: data["result"],
      cause: data["cause"],
      validity: data["validity"],
      localPart: data["local_part"],
      domain: data["domain"],
      mxFound: data["mx_found"],
      mxRecord: data["mx_record"],
      didYouMean: data["did_you_mean"],
      processedAt: data["processed_at"],
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
      "result": this.result,
      "cause": this.cause,
      "validity": this.validity,
      "local_part": this.localPart,
      "domain": this.domain,
      "mx_found": this.mxFound,
      "mx_record": this.mxRecord,
      "did_you_mean": this.didYouMean,
      "processed_at": this.processedAt,
    });
  }
}
