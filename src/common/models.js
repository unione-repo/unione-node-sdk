// Models of the Common section.
import { compact, extraFields, toModel, toPlain } from "../client/ApiClient.js";

/**
 * The [template engine](https://docs.unione.io/en/template-engines) for handling the
 * substitutions(merge tags), "simple", "velocity", "liquid" or "none". Default value is "simple".
 */
export const TemplateEngine = Object.freeze({
  SIMPLE: "simple",
  VELOCITY: "velocity",
  LIQUID: "liquid",
  NONE: "none",
});

/** EmailStatus */
export const EmailStatus = Object.freeze({
  SENT: "sent",
  DELIVERED: "delivered",
  OPENED: "opened",
  CLICKED: "clicked",
  UNSUBSCRIBED: "unsubscribed",
  SUBSCRIBED: "subscribed",
  SOFT_BOUNCED: "soft_bounced",
  HARD_BOUNCED: "hard_bounced",
  SPAM: "spam",
});

/** Only domains with "confirmed" verification record are allowed as sender domains. */
export const VerificationRecordStatus = Object.freeze({
  CONFIRMED: "confirmed",
  UNCONFIRMED: "unconfirmed",
});

/**
 * Sets the email counter mode. It allows you to choose whether the counter should reset automatically,
 * or remain permanent. The following values are acceptable: 'default' - the counter resets to zero
 * automatically at the beginning of each accounting period, 'permanent' - the counter never resets
 * automatically. The reset can be done only manually by the user in the request with the passes 0
 * value in the email_counter field. If the request doesn't contain the field or contains a null value,
 * the limit value doesn't change.
 */
export const EmailCounterMode = Object.freeze({
  DEFAULT: "default",
  PERMANENT: "permanent",
});

/** Contains HTML/plaintext/AMP parts of the email. Either html or plaintext part is required. */
export class BodyObject {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.html] HTML part of the email body
   * @param {string} [data.plaintext] Plaintext part of the email body.
   * @param {string} [data.amp] Optional [AMP](http://amp.dev/documentation/guides-and-tutorials/learn/email_fundamentals/) part of the email body.
   */
  constructor({ html, plaintext, amp } = {}) {
    /**
     * HTML part of the email body
     * @type {string|undefined}
     */
    this.html = html;
    /**
     * Plaintext part of the email body.
     * @type {string|undefined}
     */
    this.plaintext = plaintext;
    /**
     * Optional [AMP](http://amp.dev/documentation/guides-and-tutorials/learn/email_fundamentals/) part of
     * the email body.
     * @type {string|undefined}
     */
    this.amp = amp;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {BodyObject}
   */
  static fromJSON(data) {
    return new BodyObject({
      html: data["html"],
      plaintext: data["plaintext"],
      amp: data["amp"],
    });
  }

  /**
   * An HTML body, with an optional plain-text part.
   * @param {string} html
   * @param {string} [plaintext]
   * @returns {BodyObject}
   */
  static html(html, plaintext) {
    return new BodyObject({ html: html, plaintext: plaintext });
  }

  /**
   * A plain-text body.
   * @param {string} plaintext
   * @returns {BodyObject}
   */
  static text(plaintext) {
    return new BodyObject({ plaintext: plaintext });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "html": this.html,
      "plaintext": this.plaintext,
      "amp": this.amp,
    });
  }
}

/**
 * Contains email headers, maximum 50. Only headers with “X-” name prefix are accepted, all other are
 * ignored, for example X-UNIONE-Global-Language, X-UNIONE-Template-Engine. Standard headers "To,"
 * "CC," and "BCC" are passed without the "X-." Yet, they are processed in a particular way and, as a
 * result, have a number of restrictions. You can find more details about it [here](/cc-and-bcc). If
 * our support have approved omitting standard unsubscription block for you, you can also pass
 * List-Unsubscribe, List-Subscribe, List-Help, List-Owner, List-Archive, In-Reply-To and References
 * headers.
 */
export class HeadersObject {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.xUNIONEGlobalLanguage] The language of the unsubscribe footer and unsubscribe page. Languages supported are: "be", "de", "en", "es", "fr", "it", "pl", "pt", "ru", "ua", "kz".
   * @param {string} [data.xUNIONETemplateEngine] The template engine for handling the substitutions(merge tags), “simple”, “velocity”, “liquid” or “none”. Default value is “simple”. Has a priority over the value allowed in the “template_engine” parameter.
   * @param {Record<string, string>} [data.extra] Keys besides the named fields, sent next to them (a named field wins over the same key here); keys of a response that are not named fields come here.
   */
  constructor({ xUNIONEGlobalLanguage, xUNIONETemplateEngine, extra = {} } = {}) {
    /**
     * The language of the unsubscribe footer and unsubscribe page. Languages supported are: "be", "de",
     * "en", "es", "fr", "it", "pl", "pt", "ru", "ua", "kz".
     * @type {string|undefined}
     */
    this.xUNIONEGlobalLanguage = xUNIONEGlobalLanguage;
    /**
     * The template engine for handling the substitutions(merge tags), “simple”, “velocity”, “liquid” or
     * “none”. Default value is “simple”. Has a priority over the value allowed in the “template_engine”
     * parameter.
     * @type {string|undefined}
     */
    this.xUNIONETemplateEngine = xUNIONETemplateEngine;
    /**
     * Keys besides the named fields, sent next to them (a named field wins over the same key here); keys
     * of a response that are not named fields come here.
     * @type {Record<string, string>}
     */
    this.extra = extra;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {HeadersObject}
   */
  static fromJSON(data) {
    return new HeadersObject({
      xUNIONEGlobalLanguage: data["X-UNIONE-Global-Language"],
      xUNIONETemplateEngine: data["X-UNIONE-Template-Engine"],
      extra: extraFields(data, ["X-UNIONE-Global-Language", "X-UNIONE-Template-Engine"]),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return {
      ...compact(this.extra || {}),
      ...compact({
        "X-UNIONE-Global-Language": this.xUNIONEGlobalLanguage,
        "X-UNIONE-Template-Engine": this.xUNIONETemplateEngine,
      }),
    };
  }
}

/** AttachmentsArrayItem */
export class AttachmentsArrayItem {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} data.type Attachment type, see [MIME](https://en.wikipedia.org/wiki/MIME). If unsure, use "application/octet-stream".
   * @param {string} data.name Attachment name in the format: "name.extension". When multiple attachments are passed, their names must be unique. The symbol ‘/’ is not allowed in attachment names.
   * @param {string} data.content File contents in [base64](https://en.wikipedia.org/wiki/Base64). Maximum file size 7MB (9786710 bytes in base64).
   */
  constructor({ type, name, content } = {}) {
    /**
     * Attachment type, see [MIME](https://en.wikipedia.org/wiki/MIME). If unsure, use
     * "application/octet-stream".
     * @type {string|undefined}
     */
    this.type = type;
    /**
     * Attachment name in the format: "name.extension". When multiple attachments are passed, their names
     * must be unique. The symbol ‘/’ is not allowed in attachment names.
     * @type {string|undefined}
     */
    this.name = name;
    /**
     * File contents in [base64](https://en.wikipedia.org/wiki/Base64). Maximum file size 7MB (9786710
     * bytes in base64).
     * @type {string|undefined}
     */
    this.content = content;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {AttachmentsArrayItem}
   */
  static fromJSON(data) {
    return new AttachmentsArrayItem({
      type: data["type"],
      name: data["name"],
      content: data["content"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "type": this.type,
      "name": this.name,
      "content": this.content,
    });
  }
}

/** InlineAttachmentsArrayItem */
export class InlineAttachmentsArrayItem {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} data.type Attachment type, see [MIME](https://en.wikipedia.org/wiki/MIME). If unsure, use "application/octet-stream".
   * @param {string} data.name Attachment content id. For example, "name"="IMAGECID1" should be referenced in HTML like <img src="cid:IMAGECID1">.
   * @param {string} data.content File contents in [base64](https://en.wikipedia.org/wiki/Base64). Maximum file size 7MB (9786710 bytes in base64).
   */
  constructor({ type, name, content } = {}) {
    /**
     * Attachment type, see [MIME](https://en.wikipedia.org/wiki/MIME). If unsure, use
     * "application/octet-stream".
     * @type {string|undefined}
     */
    this.type = type;
    /**
     * Attachment content id. For example, "name"="IMAGECID1" should be referenced in HTML like <img
     * src="cid:IMAGECID1">.
     * @type {string|undefined}
     */
    this.name = name;
    /**
     * File contents in [base64](https://en.wikipedia.org/wiki/Base64). Maximum file size 7MB (9786710
     * bytes in base64).
     * @type {string|undefined}
     */
    this.content = content;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {InlineAttachmentsArrayItem}
   */
  static fromJSON(data) {
    return new InlineAttachmentsArrayItem({
      type: data["type"],
      name: data["name"],
      content: data["content"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "type": this.type,
      "name": this.name,
      "content": this.content,
    });
  }
}

/** SuccessResponse */
export class SuccessResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   */
  constructor({ status } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {SuccessResponse}
   */
  static fromJSON(data) {
    return new SuccessResponse({
      status: data["status"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
    });
  }
}
