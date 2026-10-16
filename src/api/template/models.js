// Models of the Template section.
import { compact, toModel, toPlain } from "../../client/ApiClient.js";
import { AttachmentsArrayItem, BodyObject, HeadersObject, InlineAttachmentsArrayItem } from "../../common/models.js";

/**
 * Editor type, "html" or "visual". Default is "html". You can create a template with "visual" editor
 * type only in web interface.
 */
export const EditorType = Object.freeze({
  HTML: "html",
  VISUAL: "visual",
});

/** Object with all the properties of the template. */
export class TemplateSetRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {TemplateObject} data.template Object with all the template properties.
   */
  constructor({ template } = {}) {
    /**
     * Object with all the template properties.
     * @type {TemplateObject|undefined}
     */
    this.template = template == null ? template : toModel(template, TemplateObject);
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {TemplateSetRequest}
   */
  static fromJSON(data) {
    return new TemplateSetRequest({
      template: data["template"] == null ? undefined : toModel(data["template"], TemplateObject),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "template": this.template == null ? undefined : toPlain(this.template),
    });
  }
}

/** Object with all the template properties. */
export class TemplateObject {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.id] Template unique identifier. If you omit the "id" field then new template will be created. If you specify the "id" field, the system will try to find a template with the specified id and edit it.
   * @param {string} data.name Template name.
   * @param {"html"|"visual"} [data.editorType] Editor type, "html" or "visual". Default is "html". You can create a template with "visual" editor type only in web interface.
   * @param {"simple"|"velocity"|"liquid"|"none"} [data.templateEngine] The [template engine](https://docs.unione.io/en/template-engines) for handling the substitutions(merge tags), "simple", "velocity", "liquid" or "none". Default value is "simple".
   * @param {Record<string, string>} [data.globalSubstitutions] Object for passing the substitutions(merge tags) common for all recipients - e.g., company name. If the substitution names are duplicated in object "substitutions", the values of the variables will be taken from the object "substitutions". The substitutions can be used in the following parameters:  - body.html - body.plaintext - body.amp - subject - from_name - options.unsubscribe_url A substitution name can consist from latin characeters, numbers and "_" symbol, and should start with the letter.
   * @param {Record<string, string>} [data.globalMetadata] Object for passing the metadata common for all the recipients, such as "key": "value". Max key quantity: 10. Max key length: 64 symbols. Max value length: 1024 symbols. The metadata is returned by [webhook](https://docs.unione.io/en/web-api-ref#webhook). To group single emails into a campaign, you can use the system key 'campaign_id' with a value in the form of a non-negative decimal integer up to 128 bits or a UUID in the format 'c7703772-453e-4c77-a9ae-9a1b94051b5a'. Incorrect values will be treated as '0'.
   * @param {BodyObject} [data.body] Contains HTML/plaintext/AMP parts of the email. Either html or plaintext part is required.
   * @param {string} [data.subject] Email subject.
   * @param {string} data.fromEmail Sender's email.
   * @param {string} [data.fromName] Sender's name.
   * @param {string} [data.replyTo] Optional Reply-To email (in case it's different to sender's email)
   * @param {string} [data.replyToName] Optional Reply-To name (if reply_to email is specified and you want to display not only this email but also the name)
   * @param {number} [data.trackLinks] 1 = click tracking is on (default), 0 = click tracking is off. To use track_links = 0, you need to ask support to enable this feature.
   * @param {number} [data.trackRead] 1 = read tracking is on (default), 0=read tracking is off. To use track_read = 0, you need to ask support to enable this feature.
   * @param {HeadersObject} [data.headers] Contains email headers, maximum 50. Only headers with “X-” name prefix are accepted, all other are ignored, for example X-UNIONE-Global-Language, X-UNIONE-Template-Engine. Standard headers "To," "CC," and "BCC" are passed without the "X-." Yet, they are processed in a particular way and, as a result, have a number of restrictions. You can find more details about it [here](/cc-and-bcc). If our support have approved omitting standard unsubscription block for you, you can also pass List-Unsubscribe, List-Subscribe, List-Help, List-Owner, List-Archive, In-Reply-To and References headers.
   * @param {AttachmentsArrayItem[]} [data.attachments] Optional array of attachments
   * @param {InlineAttachmentsArrayItem[]} [data.inlineAttachments] Optional array of inline attachments, e.g. for including images in email instead of loading them from external URL.
   */
  constructor({ id, name, editorType, templateEngine, globalSubstitutions, globalMetadata, body, subject, fromEmail, fromName, replyTo, replyToName, trackLinks, trackRead, headers, attachments, inlineAttachments } = {}) {
    /**
     * Template unique identifier. If you omit the "id" field then new template will be created. If you
     * specify the "id" field, the system will try to find a template with the specified id and edit it.
     * @type {string|undefined}
     */
    this.id = id;
    /**
     * Template name.
     * @type {string|undefined}
     */
    this.name = name;
    /**
     * Editor type, "html" or "visual". Default is "html". You can create a template with "visual" editor
     * type only in web interface.
     * @type {"html"|"visual"|undefined}
     */
    this.editorType = editorType;
    /**
     * The [template engine](https://docs.unione.io/en/template-engines) for handling the
     * substitutions(merge tags), "simple", "velocity", "liquid" or "none". Default value is "simple".
     * @type {"simple"|"velocity"|"liquid"|"none"|undefined}
     */
    this.templateEngine = templateEngine;
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
     * @type {Record<string, string>|undefined}
     */
    this.globalSubstitutions = globalSubstitutions;
    /**
     * Object for passing the metadata common for all the recipients, such as "key": "value". Max key
     * quantity: 10. Max key length: 64 symbols. Max value length: 1024 symbols. The metadata is returned
     * by [webhook](https://docs.unione.io/en/web-api-ref#webhook). To group single emails into a campaign,
     * you can use the system key 'campaign_id' with a value in the form of a non-negative decimal integer
     * up to 128 bits or a UUID in the format 'c7703772-453e-4c77-a9ae-9a1b94051b5a'. Incorrect values will
     * be treated as '0'.
     * @type {Record<string, string>|undefined}
     */
    this.globalMetadata = globalMetadata;
    /**
     * Contains HTML/plaintext/AMP parts of the email. Either html or plaintext part is required.
     * @type {BodyObject|undefined}
     */
    this.body = body == null ? body : toModel(body, BodyObject);
    /**
     * Email subject.
     * @type {string|undefined}
     */
    this.subject = subject;
    /**
     * Sender's email.
     * @type {string|undefined}
     */
    this.fromEmail = fromEmail;
    /**
     * Sender's name.
     * @type {string|undefined}
     */
    this.fromName = fromName;
    /**
     * Optional Reply-To email (in case it's different to sender's email)
     * @type {string|undefined}
     */
    this.replyTo = replyTo;
    /**
     * Optional Reply-To name (if reply_to email is specified and you want to display not only this email
     * but also the name)
     * @type {string|undefined}
     */
    this.replyToName = replyToName;
    /**
     * 1 = click tracking is on (default), 0 = click tracking is off. To use track_links = 0, you need to
     * ask support to enable this feature.
     * Allowed values: `0`, `1`.
     * @type {number|undefined}
     */
    this.trackLinks = trackLinks;
    /**
     * 1 = read tracking is on (default), 0=read tracking is off. To use track_read = 0, you need to ask
     * support to enable this feature.
     * Allowed values: `0`, `1`.
     * @type {number|undefined}
     */
    this.trackRead = trackRead;
    /**
     * Contains email headers, maximum 50. Only headers with “X-” name prefix are accepted, all other are
     * ignored, for example X-UNIONE-Global-Language, X-UNIONE-Template-Engine. Standard headers "To,"
     * "CC," and "BCC" are passed without the "X-." Yet, they are processed in a particular way and, as a
     * result, have a number of restrictions. You can find more details about it [here](/cc-and-bcc). If
     * our support have approved omitting standard unsubscription block for you, you can also pass
     * List-Unsubscribe, List-Subscribe, List-Help, List-Owner, List-Archive, In-Reply-To and References
     * headers.
     * @type {HeadersObject|undefined}
     */
    this.headers = headers == null ? headers : toModel(headers, HeadersObject);
    /**
     * Optional array of attachments
     * @type {AttachmentsArrayItem[]|undefined}
     */
    this.attachments = attachments == null ? attachments : attachments.map((item0) => toModel(item0, AttachmentsArrayItem));
    /**
     * Optional array of inline attachments, e.g. for including images in email instead of loading them
     * from external URL.
     * @type {InlineAttachmentsArrayItem[]|undefined}
     */
    this.inlineAttachments = inlineAttachments == null ? inlineAttachments : inlineAttachments.map((item0) => toModel(item0, InlineAttachmentsArrayItem));
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {TemplateObject}
   */
  static fromJSON(data) {
    return new TemplateObject({
      id: data["id"],
      name: data["name"],
      editorType: data["editor_type"],
      templateEngine: data["template_engine"],
      globalSubstitutions: data["global_substitutions"],
      globalMetadata: data["global_metadata"],
      body: data["body"] == null ? undefined : toModel(data["body"], BodyObject),
      subject: data["subject"],
      fromEmail: data["from_email"],
      fromName: data["from_name"],
      replyTo: data["reply_to"],
      replyToName: data["reply_to_name"],
      trackLinks: data["track_links"],
      trackRead: data["track_read"],
      headers: data["headers"] == null ? undefined : toModel(data["headers"], HeadersObject),
      attachments: data["attachments"] == null ? undefined : data["attachments"].map((item0) => toModel(item0, AttachmentsArrayItem)),
      inlineAttachments: data["inline_attachments"] == null ? undefined : data["inline_attachments"].map((item0) => toModel(item0, InlineAttachmentsArrayItem)),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "id": this.id,
      "name": this.name,
      "editor_type": this.editorType,
      "template_engine": this.templateEngine,
      "global_substitutions": this.globalSubstitutions,
      "global_metadata": this.globalMetadata,
      "body": this.body == null ? undefined : toPlain(this.body),
      "subject": this.subject,
      "from_email": this.fromEmail,
      "from_name": this.fromName,
      "reply_to": this.replyTo,
      "reply_to_name": this.replyToName,
      "track_links": this.trackLinks,
      "track_read": this.trackRead,
      "headers": this.headers == null ? undefined : toPlain(this.headers),
      "attachments": this.attachments == null ? undefined : this.attachments.map((item0) => toPlain(item0)),
      "inline_attachments": this.inlineAttachments == null ? undefined : this.inlineAttachments.map((item0) => toPlain(item0)),
    });
  }
}

/** TemplateSetResponse */
export class TemplateSetResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {TemplateObject} [data.template] Object with all the template properties.
   */
  constructor({ status, template } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * Object with all the template properties.
     * @type {TemplateObject|undefined}
     */
    this.template = template == null ? template : toModel(template, TemplateObject);
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {TemplateSetResponse}
   */
  static fromJSON(data) {
    return new TemplateSetResponse({
      status: data["status"],
      template: data["template"] == null ? undefined : toModel(data["template"], TemplateObject),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "template": this.template == null ? undefined : toPlain(this.template),
    });
  }
}

/** TemplateGetRequest */
export class TemplateGetRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} data.id Template id.
   */
  constructor({ id } = {}) {
    /**
     * Template id.
     * @type {string|undefined}
     */
    this.id = id;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {TemplateGetRequest}
   */
  static fromJSON(data) {
    return new TemplateGetRequest({
      id: data["id"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "id": this.id,
    });
  }
}

/** TemplateGetResponse */
export class TemplateGetResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {TemplateObject} [data.template] Object with all the template properties.
   */
  constructor({ status, template } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * Object with all the template properties.
     * @type {TemplateObject|undefined}
     */
    this.template = template == null ? template : toModel(template, TemplateObject);
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {TemplateGetResponse}
   */
  static fromJSON(data) {
    return new TemplateGetResponse({
      status: data["status"],
      template: data["template"] == null ? undefined : toModel(data["template"], TemplateObject),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "template": this.template == null ? undefined : toPlain(this.template),
    });
  }
}

/** TemplateListRequest */
export class TemplateListRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {number} [data.limit] Limits the number of templates returned, default is 50.
   * @param {number} [data.offset] Index of the first template in the list, starting with 0.
   */
  constructor({ limit, offset } = {}) {
    /**
     * Limits the number of templates returned, default is 50.
     * Default: `50`.
     * @type {number|undefined}
     */
    this.limit = limit;
    /**
     * Index of the first template in the list, starting with 0.
     * Default: `0`.
     * @type {number|undefined}
     */
    this.offset = offset;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {TemplateListRequest}
   */
  static fromJSON(data) {
    return new TemplateListRequest({
      limit: data["limit"],
      offset: data["offset"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "limit": this.limit,
      "offset": this.offset,
    });
  }
}

/** TemplateListResponse */
export class TemplateListResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {TemplateListObject[]} [data.templates] Array of template objects.
   */
  constructor({ status, templates } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * Array of template objects.
     * @type {TemplateListObject[]|undefined}
     */
    this.templates = templates == null ? templates : templates.map((item0) => toModel(item0, TemplateListObject));
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {TemplateListResponse}
   */
  static fromJSON(data) {
    return new TemplateListResponse({
      status: data["status"],
      templates: data["templates"] == null ? undefined : data["templates"].map((item0) => toModel(item0, TemplateListObject)),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "templates": this.templates == null ? undefined : this.templates.map((item0) => toPlain(item0)),
    });
  }
}

/** TemplateListObject */
export class TemplateListObject {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.id] Template unique identifier.
   * @param {string} [data.name] Template name.
   * @param {"html"|"visual"} [data.editorType] Editor type, "html" or "visual". Default is "html". You can create a template with "visual" editor type only in web interface.
   * @param {"simple"|"velocity"|"liquid"|"none"} [data.templateEngine] The [template engine](https://docs.unione.io/en/template-engines) for handling the substitutions(merge tags), "simple", "velocity", "liquid" or "none". Default value is "simple".
   * @param {Record<string, string>} [data.globalSubstitutions] Object for passing the substitutions(merge tags) common for all recipients - e.g., company name. If the substitution names are duplicated in object "substitutions", the values of the variables will be taken from the object "substitutions". The substitutions can be used in the following parameters:  - body.html - body.plaintext - body.amp - subject - from_name - options.unsubscribe_url A substitution name can consist from latin characeters, numbers and "_" symbol, and should start with the letter.
   * @param {Record<string, string>} [data.globalMetadata] Object for passing the metadata common for all the recipients, such as "key": "value". Max key quantity: 10. Max key length: 64 symbols. Max value length: 1024 symbols. The metadata is returned by [webhook](https://docs.unione.io/en/web-api-ref#webhook). To group single emails into a campaign, you can use the system key 'campaign_id' with a value in the form of a non-negative decimal integer up to 128 bits or a UUID in the format 'c7703772-453e-4c77-a9ae-9a1b94051b5a'. Incorrect values will be treated as '0'.
   * @param {BodyObject} [data.body] Contains HTML/plaintext/AMP parts of the email. Either html or plaintext part is required.
   * @param {string} [data.subject] Email subject.
   * @param {string} [data.fromEmail] Sender's email.
   * @param {string} [data.fromName] Sender's name.
   * @param {string} [data.replyTo] Optional Reply-To email (in case it's different to sender's email)
   * @param {string} [data.replyToName] Optional Reply-To name (if reply_to email is specified and you want to display not only this email but also the name)
   * @param {number} [data.trackLinks] 1 = click tracking is on (default), 0 = click tracking is off. To use track_links = 0, you need to ask support to enable this feature.
   * @param {number} [data.trackRead] 1 = read tracking is on (default), 0=read tracking is off. To use track_read = 0, you need to ask support to enable this feature.
   * @param {HeadersObject} [data.headers] Contains email headers, maximum 50. Only headers with “X-” name prefix are accepted, all other are ignored, for example X-UNIONE-Global-Language, X-UNIONE-Template-Engine. Standard headers "To," "CC," and "BCC" are passed without the "X-." Yet, they are processed in a particular way and, as a result, have a number of restrictions. You can find more details about it [here](/cc-and-bcc). If our support have approved omitting standard unsubscription block for you, you can also pass List-Unsubscribe, List-Subscribe, List-Help, List-Owner, List-Archive, In-Reply-To and References headers.
   * @param {AttachmentsArrayItem[]} [data.attachments] Optional array of attachments
   * @param {InlineAttachmentsArrayItem[]} [data.inlineAttachments] Optional array of inline attachments, e.g. for including images in email instead of loading them from external URL.
   * @param {string} [data.created] Template creation date and time in UTC timezone in format "YYYY-MM-DD hh:mm:ss"
   * @param {number} [data.userId] Unique user identifier.
   * @param {string} [data.projectId] Unqiue project identifier, ASCII string up to 36 characters long.
   * @param {string} [data.projectName] Project name, unique for user account.
   */
  constructor({ id, name, editorType, templateEngine, globalSubstitutions, globalMetadata, body, subject, fromEmail, fromName, replyTo, replyToName, trackLinks, trackRead, headers, attachments, inlineAttachments, created, userId, projectId, projectName } = {}) {
    /**
     * Template unique identifier.
     * @type {string|undefined}
     */
    this.id = id;
    /**
     * Template name.
     * @type {string|undefined}
     */
    this.name = name;
    /**
     * Editor type, "html" or "visual". Default is "html". You can create a template with "visual" editor
     * type only in web interface.
     * @type {"html"|"visual"|undefined}
     */
    this.editorType = editorType;
    /**
     * The [template engine](https://docs.unione.io/en/template-engines) for handling the
     * substitutions(merge tags), "simple", "velocity", "liquid" or "none". Default value is "simple".
     * @type {"simple"|"velocity"|"liquid"|"none"|undefined}
     */
    this.templateEngine = templateEngine;
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
     * @type {Record<string, string>|undefined}
     */
    this.globalSubstitutions = globalSubstitutions;
    /**
     * Object for passing the metadata common for all the recipients, such as "key": "value". Max key
     * quantity: 10. Max key length: 64 symbols. Max value length: 1024 symbols. The metadata is returned
     * by [webhook](https://docs.unione.io/en/web-api-ref#webhook). To group single emails into a campaign,
     * you can use the system key 'campaign_id' with a value in the form of a non-negative decimal integer
     * up to 128 bits or a UUID in the format 'c7703772-453e-4c77-a9ae-9a1b94051b5a'. Incorrect values will
     * be treated as '0'.
     * @type {Record<string, string>|undefined}
     */
    this.globalMetadata = globalMetadata;
    /**
     * Contains HTML/plaintext/AMP parts of the email. Either html or plaintext part is required.
     * @type {BodyObject|undefined}
     */
    this.body = body == null ? body : toModel(body, BodyObject);
    /**
     * Email subject.
     * @type {string|undefined}
     */
    this.subject = subject;
    /**
     * Sender's email.
     * @type {string|undefined}
     */
    this.fromEmail = fromEmail;
    /**
     * Sender's name.
     * @type {string|undefined}
     */
    this.fromName = fromName;
    /**
     * Optional Reply-To email (in case it's different to sender's email)
     * @type {string|undefined}
     */
    this.replyTo = replyTo;
    /**
     * Optional Reply-To name (if reply_to email is specified and you want to display not only this email
     * but also the name)
     * @type {string|undefined}
     */
    this.replyToName = replyToName;
    /**
     * 1 = click tracking is on (default), 0 = click tracking is off. To use track_links = 0, you need to
     * ask support to enable this feature.
     * Allowed values: `0`, `1`.
     * @type {number|undefined}
     */
    this.trackLinks = trackLinks;
    /**
     * 1 = read tracking is on (default), 0=read tracking is off. To use track_read = 0, you need to ask
     * support to enable this feature.
     * Allowed values: `0`, `1`.
     * @type {number|undefined}
     */
    this.trackRead = trackRead;
    /**
     * Contains email headers, maximum 50. Only headers with “X-” name prefix are accepted, all other are
     * ignored, for example X-UNIONE-Global-Language, X-UNIONE-Template-Engine. Standard headers "To,"
     * "CC," and "BCC" are passed without the "X-." Yet, they are processed in a particular way and, as a
     * result, have a number of restrictions. You can find more details about it [here](/cc-and-bcc). If
     * our support have approved omitting standard unsubscription block for you, you can also pass
     * List-Unsubscribe, List-Subscribe, List-Help, List-Owner, List-Archive, In-Reply-To and References
     * headers.
     * @type {HeadersObject|undefined}
     */
    this.headers = headers == null ? headers : toModel(headers, HeadersObject);
    /**
     * Optional array of attachments
     * @type {AttachmentsArrayItem[]|undefined}
     */
    this.attachments = attachments == null ? attachments : attachments.map((item0) => toModel(item0, AttachmentsArrayItem));
    /**
     * Optional array of inline attachments, e.g. for including images in email instead of loading them
     * from external URL.
     * @type {InlineAttachmentsArrayItem[]|undefined}
     */
    this.inlineAttachments = inlineAttachments == null ? inlineAttachments : inlineAttachments.map((item0) => toModel(item0, InlineAttachmentsArrayItem));
    /**
     * Template creation date and time in UTC timezone in format "YYYY-MM-DD hh:mm:ss"
     * @type {string|undefined}
     */
    this.created = created;
    /**
     * Unique user identifier.
     * @type {number|undefined}
     */
    this.userId = userId;
    /**
     * Unqiue project identifier, ASCII string up to 36 characters long.
     * @type {string|undefined}
     */
    this.projectId = projectId;
    /**
     * Project name, unique for user account.
     * @type {string|undefined}
     */
    this.projectName = projectName;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {TemplateListObject}
   */
  static fromJSON(data) {
    return new TemplateListObject({
      id: data["id"],
      name: data["name"],
      editorType: data["editor_type"],
      templateEngine: data["template_engine"],
      globalSubstitutions: data["global_substitutions"],
      globalMetadata: data["global_metadata"],
      body: data["body"] == null ? undefined : toModel(data["body"], BodyObject),
      subject: data["subject"],
      fromEmail: data["from_email"],
      fromName: data["from_name"],
      replyTo: data["reply_to"],
      replyToName: data["reply_to_name"],
      trackLinks: data["track_links"],
      trackRead: data["track_read"],
      headers: data["headers"] == null ? undefined : toModel(data["headers"], HeadersObject),
      attachments: data["attachments"] == null ? undefined : data["attachments"].map((item0) => toModel(item0, AttachmentsArrayItem)),
      inlineAttachments: data["inline_attachments"] == null ? undefined : data["inline_attachments"].map((item0) => toModel(item0, InlineAttachmentsArrayItem)),
      created: data["created"],
      userId: data["user_id"],
      projectId: data["project_id"],
      projectName: data["project_name"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "id": this.id,
      "name": this.name,
      "editor_type": this.editorType,
      "template_engine": this.templateEngine,
      "global_substitutions": this.globalSubstitutions,
      "global_metadata": this.globalMetadata,
      "body": this.body == null ? undefined : toPlain(this.body),
      "subject": this.subject,
      "from_email": this.fromEmail,
      "from_name": this.fromName,
      "reply_to": this.replyTo,
      "reply_to_name": this.replyToName,
      "track_links": this.trackLinks,
      "track_read": this.trackRead,
      "headers": this.headers == null ? undefined : toPlain(this.headers),
      "attachments": this.attachments == null ? undefined : this.attachments.map((item0) => toPlain(item0)),
      "inline_attachments": this.inlineAttachments == null ? undefined : this.inlineAttachments.map((item0) => toPlain(item0)),
      "created": this.created,
      "user_id": this.userId,
      "project_id": this.projectId,
      "project_name": this.projectName,
    });
  }
}

/** TemplateDeleteRequest */
export class TemplateDeleteRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} data.id Template id.
   */
  constructor({ id } = {}) {
    /**
     * Template id.
     * @type {string|undefined}
     */
    this.id = id;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {TemplateDeleteRequest}
   */
  static fromJSON(data) {
    return new TemplateDeleteRequest({
      id: data["id"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "id": this.id,
    });
  }
}
