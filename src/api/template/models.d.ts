// Types of the models of the Template section.
import type { AttachmentsArrayItem, AttachmentsArrayItemJSON, BodyObject, BodyObjectJSON, HeadersObject, HeadersObjectJSON, InlineAttachmentsArrayItem, InlineAttachmentsArrayItemJSON, TemplateEngine } from "../../common/models.js";

/**
 * Editor type, "html" or "visual". Default is "html". You can create a template with "visual" editor
 * type only in web interface.
 */
export declare const EditorType: Readonly<{
  HTML: "html";
  VISUAL: "visual";
}>;
/**
 * Editor type, "html" or "visual". Default is "html". You can create a template with "visual" editor
 * type only in web interface.
 */
export type EditorType = "html" | "visual";

/** TemplateSetRequest in the API format: the object sent and received as JSON. */
export interface TemplateSetRequestJSON {
  "template": TemplateObjectJSON;
}

/** Fields of new TemplateSetRequest(): a nested model may be a plain object in the API format. */
export interface TemplateSetRequestInit {
  /** Object with all the template properties. */
  template: TemplateObject | TemplateObjectJSON;
}

/** Object with all the properties of the template. */
export declare class TemplateSetRequest {
  constructor(data: TemplateSetRequestInit);
  /** Object with all the template properties. */
  template: TemplateObject;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): TemplateSetRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): TemplateSetRequestJSON;
}

/** TemplateObject in the API format: the object sent and received as JSON. */
export interface TemplateObjectJSON {
  "id"?: string;
  "name": string;
  "editor_type"?: EditorType;
  "template_engine"?: TemplateEngine;
  "global_substitutions"?: Record<string, string>;
  "global_metadata"?: Record<string, string>;
  "body"?: BodyObjectJSON;
  "subject"?: string;
  "from_email": string;
  "from_name"?: string;
  "reply_to"?: string;
  "reply_to_name"?: string;
  "track_links"?: number;
  "track_read"?: number;
  "headers"?: HeadersObjectJSON;
  "attachments"?: Array<AttachmentsArrayItemJSON>;
  "inline_attachments"?: Array<InlineAttachmentsArrayItemJSON>;
}

/** Fields of new TemplateObject(): a nested model may be a plain object in the API format. */
export interface TemplateObjectInit {
  /**
   * Template unique identifier. If you omit the "id" field then new template will be created. If you
   * specify the "id" field, the system will try to find a template with the specified id and edit it.
   */
  id?: string;
  /** Template name. */
  name: string;
  /**
   * Editor type, "html" or "visual". Default is "html". You can create a template with "visual" editor
   * type only in web interface.
   */
  editorType?: EditorType;
  /**
   * The [template engine](https://docs.unione.io/en/template-engines) for handling the
   * substitutions(merge tags), "simple", "velocity", "liquid" or "none". Default value is "simple".
   */
  templateEngine?: TemplateEngine;
  /**
   * Object for passing the substitutions(merge tags) common for all recipients - e.g., company name. If
   * the substitution names are duplicated in object "substitutions", the values of the variables will be
   * taken from the object "substitutions". The substitutions can be used in the following parameters:
   *
   * - body.html
   * - body.plaintext
   * - body.amp
   * - subject
   * - from_name
   * - options.unsubscribe_url
   * A substitution name can consist from latin characeters, numbers and "_" symbol, and should start
   * with the letter.
   */
  globalSubstitutions?: Record<string, string>;
  /**
   * Object for passing the metadata common for all the recipients, such as "key": "value". Max key
   * quantity: 10. Max key length: 64 symbols. Max value length: 1024 symbols. The metadata is returned
   * by [webhook](https://docs.unione.io/en/web-api-ref#webhook). To group single emails into a campaign,
   * you can use the system key 'campaign_id' with a value in the form of a non-negative decimal integer
   * up to 128 bits or a UUID in the format 'c7703772-453e-4c77-a9ae-9a1b94051b5a'. Incorrect values will
   * be treated as '0'.
   */
  globalMetadata?: Record<string, string>;
  /** Contains HTML/plaintext/AMP parts of the email. Either html or plaintext part is required. */
  body?: BodyObject | BodyObjectJSON;
  /** Email subject. */
  subject?: string;
  /** Sender's email. */
  fromEmail: string;
  /** Sender's name. */
  fromName?: string;
  /** Optional Reply-To email (in case it's different to sender's email) */
  replyTo?: string;
  /**
   * Optional Reply-To name (if reply_to email is specified and you want to display not only this email
   * but also the name)
   */
  replyToName?: string;
  /**
   * 1 = click tracking is on (default), 0 = click tracking is off. To use track_links = 0, you need to
   * ask support to enable this feature.
   * Allowed values: `0`, `1`.
   */
  trackLinks?: number;
  /**
   * 1 = read tracking is on (default), 0=read tracking is off. To use track_read = 0, you need to ask
   * support to enable this feature.
   * Allowed values: `0`, `1`.
   */
  trackRead?: number;
  /**
   * Contains email headers, maximum 50. Only headers with “X-” name prefix are accepted, all other are
   * ignored, for example X-UNIONE-Global-Language, X-UNIONE-Template-Engine. Standard headers "To,"
   * "CC," and "BCC" are passed without the "X-." Yet, they are processed in a particular way and, as a
   * result, have a number of restrictions. You can find more details about it [here](/cc-and-bcc). If
   * our support have approved omitting standard unsubscription block for you, you can also pass
   * List-Unsubscribe, List-Subscribe, List-Help, List-Owner, List-Archive, In-Reply-To and References
   * headers.
   */
  headers?: HeadersObject | HeadersObjectJSON;
  /** Optional array of attachments */
  attachments?: Array<AttachmentsArrayItem | AttachmentsArrayItemJSON>;
  /**
   * Optional array of inline attachments, e.g. for including images in email instead of loading them
   * from external URL.
   */
  inlineAttachments?: Array<InlineAttachmentsArrayItem | InlineAttachmentsArrayItemJSON>;
}

/** Object with all the template properties. */
export declare class TemplateObject {
  constructor(data: TemplateObjectInit);
  /**
   * Template unique identifier. If you omit the "id" field then new template will be created. If you
   * specify the "id" field, the system will try to find a template with the specified id and edit it.
   */
  id?: string;
  /** Template name. */
  name: string;
  /**
   * Editor type, "html" or "visual". Default is "html". You can create a template with "visual" editor
   * type only in web interface.
   */
  editorType?: EditorType;
  /**
   * The [template engine](https://docs.unione.io/en/template-engines) for handling the
   * substitutions(merge tags), "simple", "velocity", "liquid" or "none". Default value is "simple".
   */
  templateEngine?: TemplateEngine;
  /**
   * Object for passing the substitutions(merge tags) common for all recipients - e.g., company name. If
   * the substitution names are duplicated in object "substitutions", the values of the variables will be
   * taken from the object "substitutions". The substitutions can be used in the following parameters:
   *
   * - body.html
   * - body.plaintext
   * - body.amp
   * - subject
   * - from_name
   * - options.unsubscribe_url
   * A substitution name can consist from latin characeters, numbers and "_" symbol, and should start
   * with the letter.
   */
  globalSubstitutions?: Record<string, string>;
  /**
   * Object for passing the metadata common for all the recipients, such as "key": "value". Max key
   * quantity: 10. Max key length: 64 symbols. Max value length: 1024 symbols. The metadata is returned
   * by [webhook](https://docs.unione.io/en/web-api-ref#webhook). To group single emails into a campaign,
   * you can use the system key 'campaign_id' with a value in the form of a non-negative decimal integer
   * up to 128 bits or a UUID in the format 'c7703772-453e-4c77-a9ae-9a1b94051b5a'. Incorrect values will
   * be treated as '0'.
   */
  globalMetadata?: Record<string, string>;
  /** Contains HTML/plaintext/AMP parts of the email. Either html or plaintext part is required. */
  body?: BodyObject;
  /** Email subject. */
  subject?: string;
  /** Sender's email. */
  fromEmail: string;
  /** Sender's name. */
  fromName?: string;
  /** Optional Reply-To email (in case it's different to sender's email) */
  replyTo?: string;
  /**
   * Optional Reply-To name (if reply_to email is specified and you want to display not only this email
   * but also the name)
   */
  replyToName?: string;
  /**
   * 1 = click tracking is on (default), 0 = click tracking is off. To use track_links = 0, you need to
   * ask support to enable this feature.
   * Allowed values: `0`, `1`.
   */
  trackLinks?: number;
  /**
   * 1 = read tracking is on (default), 0=read tracking is off. To use track_read = 0, you need to ask
   * support to enable this feature.
   * Allowed values: `0`, `1`.
   */
  trackRead?: number;
  /**
   * Contains email headers, maximum 50. Only headers with “X-” name prefix are accepted, all other are
   * ignored, for example X-UNIONE-Global-Language, X-UNIONE-Template-Engine. Standard headers "To,"
   * "CC," and "BCC" are passed without the "X-." Yet, they are processed in a particular way and, as a
   * result, have a number of restrictions. You can find more details about it [here](/cc-and-bcc). If
   * our support have approved omitting standard unsubscription block for you, you can also pass
   * List-Unsubscribe, List-Subscribe, List-Help, List-Owner, List-Archive, In-Reply-To and References
   * headers.
   */
  headers?: HeadersObject;
  /** Optional array of attachments */
  attachments?: Array<AttachmentsArrayItem>;
  /**
   * Optional array of inline attachments, e.g. for including images in email instead of loading them
   * from external URL.
   */
  inlineAttachments?: Array<InlineAttachmentsArrayItem>;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): TemplateObject;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): TemplateObjectJSON;
}

/** TemplateSetResponse in the API format: the object sent and received as JSON. */
export interface TemplateSetResponseJSON {
  "status"?: string;
  "template"?: TemplateObjectJSON;
}

/** Fields of new TemplateSetResponse(): a nested model may be a plain object in the API format. */
export interface TemplateSetResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Object with all the template properties. */
  template?: TemplateObject | TemplateObjectJSON;
}

/** TemplateSetResponse */
export declare class TemplateSetResponse {
  constructor(data?: TemplateSetResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Object with all the template properties. */
  template?: TemplateObject;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): TemplateSetResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): TemplateSetResponseJSON;
}

/** TemplateGetRequest in the API format: the object sent and received as JSON. */
export interface TemplateGetRequestJSON {
  "id": string;
}

/** Fields of new TemplateGetRequest(): a nested model may be a plain object in the API format. */
export interface TemplateGetRequestInit {
  /** Template id. */
  id: string;
}

/** TemplateGetRequest */
export declare class TemplateGetRequest {
  constructor(data: TemplateGetRequestInit);
  /** Template id. */
  id: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): TemplateGetRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): TemplateGetRequestJSON;
}

/** TemplateGetResponse in the API format: the object sent and received as JSON. */
export interface TemplateGetResponseJSON {
  "status"?: string;
  "template"?: TemplateObjectJSON;
}

/** Fields of new TemplateGetResponse(): a nested model may be a plain object in the API format. */
export interface TemplateGetResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Object with all the template properties. */
  template?: TemplateObject | TemplateObjectJSON;
}

/** TemplateGetResponse */
export declare class TemplateGetResponse {
  constructor(data?: TemplateGetResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Object with all the template properties. */
  template?: TemplateObject;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): TemplateGetResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): TemplateGetResponseJSON;
}

/** TemplateListRequest in the API format: the object sent and received as JSON. */
export interface TemplateListRequestJSON {
  "limit"?: number;
  "offset"?: number;
}

/** Fields of new TemplateListRequest(): a nested model may be a plain object in the API format. */
export interface TemplateListRequestInit {
  /**
   * Limits the number of templates returned, default is 50.
   * Default: `50`.
   */
  limit?: number;
  /**
   * Index of the first template in the list, starting with 0.
   * Default: `0`.
   */
  offset?: number;
}

/** TemplateListRequest */
export declare class TemplateListRequest {
  constructor(data?: TemplateListRequestInit);
  /**
   * Limits the number of templates returned, default is 50.
   * Default: `50`.
   */
  limit?: number;
  /**
   * Index of the first template in the list, starting with 0.
   * Default: `0`.
   */
  offset?: number;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): TemplateListRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): TemplateListRequestJSON;
}

/** TemplateListResponse in the API format: the object sent and received as JSON. */
export interface TemplateListResponseJSON {
  "status"?: string;
  "templates"?: Array<TemplateListObjectJSON>;
}

/** Fields of new TemplateListResponse(): a nested model may be a plain object in the API format. */
export interface TemplateListResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Array of template objects. */
  templates?: Array<TemplateListObject | TemplateListObjectJSON>;
}

/** TemplateListResponse */
export declare class TemplateListResponse {
  constructor(data?: TemplateListResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Array of template objects. */
  templates?: Array<TemplateListObject>;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): TemplateListResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): TemplateListResponseJSON;
}

/** TemplateListObject in the API format: the object sent and received as JSON. */
export interface TemplateListObjectJSON {
  "id"?: string;
  "name"?: string;
  "editor_type"?: EditorType;
  "template_engine"?: TemplateEngine;
  "global_substitutions"?: Record<string, string>;
  "global_metadata"?: Record<string, string>;
  "body"?: BodyObjectJSON;
  "subject"?: string;
  "from_email"?: string;
  "from_name"?: string;
  "reply_to"?: string;
  "reply_to_name"?: string;
  "track_links"?: number;
  "track_read"?: number;
  "headers"?: HeadersObjectJSON;
  "attachments"?: Array<AttachmentsArrayItemJSON>;
  "inline_attachments"?: Array<InlineAttachmentsArrayItemJSON>;
  "created"?: string;
  "user_id"?: number;
  "project_id"?: string;
  "project_name"?: string;
}

/** Fields of new TemplateListObject(): a nested model may be a plain object in the API format. */
export interface TemplateListObjectInit {
  /** Template unique identifier. */
  id?: string;
  /** Template name. */
  name?: string;
  /**
   * Editor type, "html" or "visual". Default is "html". You can create a template with "visual" editor
   * type only in web interface.
   */
  editorType?: EditorType;
  /**
   * The [template engine](https://docs.unione.io/en/template-engines) for handling the
   * substitutions(merge tags), "simple", "velocity", "liquid" or "none". Default value is "simple".
   */
  templateEngine?: TemplateEngine;
  /**
   * Object for passing the substitutions(merge tags) common for all recipients - e.g., company name. If
   * the substitution names are duplicated in object "substitutions", the values of the variables will be
   * taken from the object "substitutions". The substitutions can be used in the following parameters:
   *
   * - body.html
   * - body.plaintext
   * - body.amp
   * - subject
   * - from_name
   * - options.unsubscribe_url
   * A substitution name can consist from latin characeters, numbers and "_" symbol, and should start
   * with the letter.
   */
  globalSubstitutions?: Record<string, string>;
  /**
   * Object for passing the metadata common for all the recipients, such as "key": "value". Max key
   * quantity: 10. Max key length: 64 symbols. Max value length: 1024 symbols. The metadata is returned
   * by [webhook](https://docs.unione.io/en/web-api-ref#webhook). To group single emails into a campaign,
   * you can use the system key 'campaign_id' with a value in the form of a non-negative decimal integer
   * up to 128 bits or a UUID in the format 'c7703772-453e-4c77-a9ae-9a1b94051b5a'. Incorrect values will
   * be treated as '0'.
   */
  globalMetadata?: Record<string, string>;
  /** Contains HTML/plaintext/AMP parts of the email. Either html or plaintext part is required. */
  body?: BodyObject | BodyObjectJSON;
  /** Email subject. */
  subject?: string;
  /** Sender's email. */
  fromEmail?: string;
  /** Sender's name. */
  fromName?: string;
  /** Optional Reply-To email (in case it's different to sender's email) */
  replyTo?: string;
  /**
   * Optional Reply-To name (if reply_to email is specified and you want to display not only this email
   * but also the name)
   */
  replyToName?: string;
  /**
   * 1 = click tracking is on (default), 0 = click tracking is off. To use track_links = 0, you need to
   * ask support to enable this feature.
   * Allowed values: `0`, `1`.
   */
  trackLinks?: number;
  /**
   * 1 = read tracking is on (default), 0=read tracking is off. To use track_read = 0, you need to ask
   * support to enable this feature.
   * Allowed values: `0`, `1`.
   */
  trackRead?: number;
  /**
   * Contains email headers, maximum 50. Only headers with “X-” name prefix are accepted, all other are
   * ignored, for example X-UNIONE-Global-Language, X-UNIONE-Template-Engine. Standard headers "To,"
   * "CC," and "BCC" are passed without the "X-." Yet, they are processed in a particular way and, as a
   * result, have a number of restrictions. You can find more details about it [here](/cc-and-bcc). If
   * our support have approved omitting standard unsubscription block for you, you can also pass
   * List-Unsubscribe, List-Subscribe, List-Help, List-Owner, List-Archive, In-Reply-To and References
   * headers.
   */
  headers?: HeadersObject | HeadersObjectJSON;
  /** Optional array of attachments */
  attachments?: Array<AttachmentsArrayItem | AttachmentsArrayItemJSON>;
  /**
   * Optional array of inline attachments, e.g. for including images in email instead of loading them
   * from external URL.
   */
  inlineAttachments?: Array<InlineAttachmentsArrayItem | InlineAttachmentsArrayItemJSON>;
  /** Template creation date and time in UTC timezone in format "YYYY-MM-DD hh:mm:ss" */
  created?: string;
  /** Unique user identifier. */
  userId?: number;
  /** Unqiue project identifier, ASCII string up to 36 characters long. */
  projectId?: string;
  /** Project name, unique for user account. */
  projectName?: string;
}

/** TemplateListObject */
export declare class TemplateListObject {
  constructor(data?: TemplateListObjectInit);
  /** Template unique identifier. */
  id?: string;
  /** Template name. */
  name?: string;
  /**
   * Editor type, "html" or "visual". Default is "html". You can create a template with "visual" editor
   * type only in web interface.
   */
  editorType?: EditorType;
  /**
   * The [template engine](https://docs.unione.io/en/template-engines) for handling the
   * substitutions(merge tags), "simple", "velocity", "liquid" or "none". Default value is "simple".
   */
  templateEngine?: TemplateEngine;
  /**
   * Object for passing the substitutions(merge tags) common for all recipients - e.g., company name. If
   * the substitution names are duplicated in object "substitutions", the values of the variables will be
   * taken from the object "substitutions". The substitutions can be used in the following parameters:
   *
   * - body.html
   * - body.plaintext
   * - body.amp
   * - subject
   * - from_name
   * - options.unsubscribe_url
   * A substitution name can consist from latin characeters, numbers and "_" symbol, and should start
   * with the letter.
   */
  globalSubstitutions?: Record<string, string>;
  /**
   * Object for passing the metadata common for all the recipients, such as "key": "value". Max key
   * quantity: 10. Max key length: 64 symbols. Max value length: 1024 symbols. The metadata is returned
   * by [webhook](https://docs.unione.io/en/web-api-ref#webhook). To group single emails into a campaign,
   * you can use the system key 'campaign_id' with a value in the form of a non-negative decimal integer
   * up to 128 bits or a UUID in the format 'c7703772-453e-4c77-a9ae-9a1b94051b5a'. Incorrect values will
   * be treated as '0'.
   */
  globalMetadata?: Record<string, string>;
  /** Contains HTML/plaintext/AMP parts of the email. Either html or plaintext part is required. */
  body?: BodyObject;
  /** Email subject. */
  subject?: string;
  /** Sender's email. */
  fromEmail?: string;
  /** Sender's name. */
  fromName?: string;
  /** Optional Reply-To email (in case it's different to sender's email) */
  replyTo?: string;
  /**
   * Optional Reply-To name (if reply_to email is specified and you want to display not only this email
   * but also the name)
   */
  replyToName?: string;
  /**
   * 1 = click tracking is on (default), 0 = click tracking is off. To use track_links = 0, you need to
   * ask support to enable this feature.
   * Allowed values: `0`, `1`.
   */
  trackLinks?: number;
  /**
   * 1 = read tracking is on (default), 0=read tracking is off. To use track_read = 0, you need to ask
   * support to enable this feature.
   * Allowed values: `0`, `1`.
   */
  trackRead?: number;
  /**
   * Contains email headers, maximum 50. Only headers with “X-” name prefix are accepted, all other are
   * ignored, for example X-UNIONE-Global-Language, X-UNIONE-Template-Engine. Standard headers "To,"
   * "CC," and "BCC" are passed without the "X-." Yet, they are processed in a particular way and, as a
   * result, have a number of restrictions. You can find more details about it [here](/cc-and-bcc). If
   * our support have approved omitting standard unsubscription block for you, you can also pass
   * List-Unsubscribe, List-Subscribe, List-Help, List-Owner, List-Archive, In-Reply-To and References
   * headers.
   */
  headers?: HeadersObject;
  /** Optional array of attachments */
  attachments?: Array<AttachmentsArrayItem>;
  /**
   * Optional array of inline attachments, e.g. for including images in email instead of loading them
   * from external URL.
   */
  inlineAttachments?: Array<InlineAttachmentsArrayItem>;
  /** Template creation date and time in UTC timezone in format "YYYY-MM-DD hh:mm:ss" */
  created?: string;
  /** Unique user identifier. */
  userId?: number;
  /** Unqiue project identifier, ASCII string up to 36 characters long. */
  projectId?: string;
  /** Project name, unique for user account. */
  projectName?: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): TemplateListObject;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): TemplateListObjectJSON;
}

/** TemplateDeleteRequest in the API format: the object sent and received as JSON. */
export interface TemplateDeleteRequestJSON {
  "id": string;
}

/** Fields of new TemplateDeleteRequest(): a nested model may be a plain object in the API format. */
export interface TemplateDeleteRequestInit {
  /** Template id. */
  id: string;
}

/** TemplateDeleteRequest */
export declare class TemplateDeleteRequest {
  constructor(data: TemplateDeleteRequestInit);
  /** Template id. */
  id: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): TemplateDeleteRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): TemplateDeleteRequestJSON;
}
