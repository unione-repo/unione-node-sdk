// Types of the models of the Common section.

/**
 * The [template engine](https://docs.unione.io/en/template-engines) for handling the
 * substitutions(merge tags), "simple", "velocity", "liquid" or "none". Default value is "simple".
 */
export declare const TemplateEngine: Readonly<{
  SIMPLE: "simple";
  VELOCITY: "velocity";
  LIQUID: "liquid";
  NONE: "none";
}>;
/**
 * The [template engine](https://docs.unione.io/en/template-engines) for handling the
 * substitutions(merge tags), "simple", "velocity", "liquid" or "none". Default value is "simple".
 */
export type TemplateEngine = "simple" | "velocity" | "liquid" | "none";

/** EmailStatus */
export declare const EmailStatus: Readonly<{
  SENT: "sent";
  DELIVERED: "delivered";
  OPENED: "opened";
  CLICKED: "clicked";
  UNSUBSCRIBED: "unsubscribed";
  SUBSCRIBED: "subscribed";
  SOFT_BOUNCED: "soft_bounced";
  HARD_BOUNCED: "hard_bounced";
  SPAM: "spam";
}>;
/** EmailStatus */
export type EmailStatus = "sent" | "delivered" | "opened" | "clicked" | "unsubscribed" | "subscribed" | "soft_bounced" | "hard_bounced" | "spam";

/** Only domains with "confirmed" verification record are allowed as sender domains. */
export declare const VerificationRecordStatus: Readonly<{
  CONFIRMED: "confirmed";
  UNCONFIRMED: "unconfirmed";
}>;
/** Only domains with "confirmed" verification record are allowed as sender domains. */
export type VerificationRecordStatus = "confirmed" | "unconfirmed";

/**
 * Sets the email counter mode. It allows you to choose whether the counter should reset automatically,
 * or remain permanent. The following values are acceptable: 'default' - the counter resets to zero
 * automatically at the beginning of each accounting period, 'permanent' - the counter never resets
 * automatically. The reset can be done only manually by the user in the request with the passes 0
 * value in the email_counter field. If the request doesn't contain the field or contains a null value,
 * the limit value doesn't change.
 */
export declare const EmailCounterMode: Readonly<{
  DEFAULT: "default";
  PERMANENT: "permanent";
}>;
/**
 * Sets the email counter mode. It allows you to choose whether the counter should reset automatically,
 * or remain permanent. The following values are acceptable: 'default' - the counter resets to zero
 * automatically at the beginning of each accounting period, 'permanent' - the counter never resets
 * automatically. The reset can be done only manually by the user in the request with the passes 0
 * value in the email_counter field. If the request doesn't contain the field or contains a null value,
 * the limit value doesn't change.
 */
export type EmailCounterMode = "default" | "permanent";

/** BodyObject in the API format: the object sent and received as JSON. */
export interface BodyObjectJSON {
  "html"?: string;
  "plaintext"?: string;
  "amp"?: string;
}

/** Fields of new BodyObject(): a nested model may be a plain object in the API format. */
export interface BodyObjectInit {
  /** HTML part of the email body */
  html?: string;
  /** Plaintext part of the email body. */
  plaintext?: string;
  /**
   * Optional [AMP](http://amp.dev/documentation/guides-and-tutorials/learn/email_fundamentals/) part of
   * the email body.
   */
  amp?: string;
}

/** Contains HTML/plaintext/AMP parts of the email. Either html or plaintext part is required. */
export declare class BodyObject {
  constructor(data?: BodyObjectInit);
  /** HTML part of the email body */
  html?: string;
  /** Plaintext part of the email body. */
  plaintext?: string;
  /**
   * Optional [AMP](http://amp.dev/documentation/guides-and-tutorials/learn/email_fundamentals/) part of
   * the email body.
   */
  amp?: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): BodyObject;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): BodyObjectJSON;
}

/** HeadersObject in the API format: the object sent and received as JSON. */
export interface HeadersObjectJSON {
  "X-UNIONE-Global-Language"?: string;
  "X-UNIONE-Template-Engine"?: string;
  [key: string]: string | undefined;
}

/** Fields of new HeadersObject(): a nested model may be a plain object in the API format. */
export interface HeadersObjectInit {
  /**
   * The language of the unsubscribe footer and unsubscribe page. Languages supported are: "be", "de",
   * "en", "es", "fr", "it", "pl", "pt", "ru", "ua", "kz".
   */
  xUNIONEGlobalLanguage?: string;
  /**
   * The template engine for handling the substitutions(merge tags), “simple”, “velocity”, “liquid” or
   * “none”. Default value is “simple”. Has a priority over the value allowed in the “template_engine”
   * parameter.
   */
  xUNIONETemplateEngine?: string;
  /**
   * Keys besides the named fields, sent next to them (a named field wins over the same key here); keys
   * of a response that are not named fields come here.
   */
  extra?: Record<string, string>;
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
export declare class HeadersObject {
  constructor(data?: HeadersObjectInit);
  /**
   * The language of the unsubscribe footer and unsubscribe page. Languages supported are: "be", "de",
   * "en", "es", "fr", "it", "pl", "pt", "ru", "ua", "kz".
   */
  xUNIONEGlobalLanguage?: string;
  /**
   * The template engine for handling the substitutions(merge tags), “simple”, “velocity”, “liquid” or
   * “none”. Default value is “simple”. Has a priority over the value allowed in the “template_engine”
   * parameter.
   */
  xUNIONETemplateEngine?: string;
  /**
   * Keys besides the named fields, sent next to them (a named field wins over the same key here); keys
   * of a response that are not named fields come here.
   */
  extra: Record<string, string>;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): HeadersObject;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): HeadersObjectJSON;
}

/** AttachmentsArrayItem in the API format: the object sent and received as JSON. */
export interface AttachmentsArrayItemJSON {
  "type": string;
  "name": string;
  "content": string;
}

/** Fields of new AttachmentsArrayItem(): a nested model may be a plain object in the API format. */
export interface AttachmentsArrayItemInit {
  /**
   * Attachment type, see [MIME](https://en.wikipedia.org/wiki/MIME). If unsure, use
   * "application/octet-stream".
   */
  type: string;
  /**
   * Attachment name in the format: "name.extension". When multiple attachments are passed, their names
   * must be unique. The symbol ‘/’ is not allowed in attachment names.
   */
  name: string;
  /**
   * File contents in [base64](https://en.wikipedia.org/wiki/Base64). Maximum file size 7MB (9786710
   * bytes in base64).
   */
  content: string;
}

/** AttachmentsArrayItem */
export declare class AttachmentsArrayItem {
  constructor(data: AttachmentsArrayItemInit);
  /**
   * Attachment type, see [MIME](https://en.wikipedia.org/wiki/MIME). If unsure, use
   * "application/octet-stream".
   */
  type: string;
  /**
   * Attachment name in the format: "name.extension". When multiple attachments are passed, their names
   * must be unique. The symbol ‘/’ is not allowed in attachment names.
   */
  name: string;
  /**
   * File contents in [base64](https://en.wikipedia.org/wiki/Base64). Maximum file size 7MB (9786710
   * bytes in base64).
   */
  content: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): AttachmentsArrayItem;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): AttachmentsArrayItemJSON;
}

/** InlineAttachmentsArrayItem in the API format: the object sent and received as JSON. */
export interface InlineAttachmentsArrayItemJSON {
  "type": string;
  "name": string;
  "content": string;
}

/** Fields of new InlineAttachmentsArrayItem(): a nested model may be a plain object in the API format. */
export interface InlineAttachmentsArrayItemInit {
  /**
   * Attachment type, see [MIME](https://en.wikipedia.org/wiki/MIME). If unsure, use
   * "application/octet-stream".
   */
  type: string;
  /**
   * Attachment content id. For example, "name"="IMAGECID1" should be referenced in HTML like <img
   * src="cid:IMAGECID1">.
   */
  name: string;
  /**
   * File contents in [base64](https://en.wikipedia.org/wiki/Base64). Maximum file size 7MB (9786710
   * bytes in base64).
   */
  content: string;
}

/** InlineAttachmentsArrayItem */
export declare class InlineAttachmentsArrayItem {
  constructor(data: InlineAttachmentsArrayItemInit);
  /**
   * Attachment type, see [MIME](https://en.wikipedia.org/wiki/MIME). If unsure, use
   * "application/octet-stream".
   */
  type: string;
  /**
   * Attachment content id. For example, "name"="IMAGECID1" should be referenced in HTML like <img
   * src="cid:IMAGECID1">.
   */
  name: string;
  /**
   * File contents in [base64](https://en.wikipedia.org/wiki/Base64). Maximum file size 7MB (9786710
   * bytes in base64).
   */
  content: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): InlineAttachmentsArrayItem;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): InlineAttachmentsArrayItemJSON;
}

/** SuccessResponse in the API format: the object sent and received as JSON. */
export interface SuccessResponseJSON {
  "status"?: string;
}

/** Fields of new SuccessResponse(): a nested model may be a plain object in the API format. */
export interface SuccessResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
}

/** SuccessResponse */
export declare class SuccessResponse {
  constructor(data?: SuccessResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): SuccessResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): SuccessResponseJSON;
}
