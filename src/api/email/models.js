// Models of the Email section.
import { compact, toModel, toPlain } from "../../client/ApiClient.js";
import { AttachmentsArrayItem, BodyObject, HeadersObject, InlineAttachmentsArrayItem } from "../../common/models.js";

/** EmailSendRequest */
export class EmailSendRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {MessageObject} data.message Object containing all message properties.
   */
  constructor({ message } = {}) {
    /**
     * Object containing all message properties.
     * @type {MessageObject|undefined}
     */
    this.message = message == null ? message : toModel(message, MessageObject);
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {EmailSendRequest}
   */
  static fromJSON(data) {
    return new EmailSendRequest({
      message: data["message"] == null ? undefined : toModel(data["message"], MessageObject),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "message": this.message == null ? undefined : toPlain(this.message),
    });
  }
}

/** Object containing all message properties. */
export class MessageObject {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {MessageObjectRecipientsItem[]} data.recipients Contains recipient emails, substitutions(merge tags) and metadata.
   * @param {string} [data.templateId] Optional identifier of the template that had been created by [template/set](https://docs.unione.io/en/web-api-ref#template-set) method. If template_id is passed then fields from the template are used instead of missed email/send parameters. E.g. if "body" parameter in email/send is omitted, "body" from template will be used. If "subject" in email/send is omitted, "subject" from template will be used.
   * @param {string[]} [data.tags] An array of strings. The maximum string length is 100 characters. You can include up to 4 strings which must be unique. No more than 10 000 tags are allowed per project; if you try to add more, email/send will return an error. You may use tags to categorize emails by your own criteria, and they will be passed along by event-dump methods.
   * @param {number} [data.skipUnsubscribe] Whether to skip or not appending default unsubscribe footer. 1=skip, 0=append, default is 0. You should [ask support](https://cp.unione.io/en/support) to approve usage of skip_unsubscribe=1. [Read more](https://docs.unione.io/en/unsubscribe-link).
   * @param {string} [data.globalLanguage] The language of the unsubscribe footer and unsubscribe page. Languages supported are: "be", "de", "en", "es", "fr", "it", "pl", "pt", "ru", "ua", "kz".
   * @param {"simple"|"velocity"|"liquid"|"none"} [data.templateEngine] The [template engine](https://docs.unione.io/en/template-engines) for handling the substitutions(merge tags), "simple", "velocity", "liquid" or "none". Default value is "simple".
   * @param {Record<string, string>} [data.globalSubstitutions] Object for passing the substitutions(merge tags) common for all recipients - e.g., company name. If the substitution names are duplicated in object "substitutions", the values of the variables will be taken from the object "substitutions". The substitutions can be used in the following parameters:  - body.html - body.plaintext - body.amp - subject - from_name - options.unsubscribe_url A substitution name can consist from latin characeters, numbers and "_" symbol, and should start with the letter.
   * @param {Record<string, string>} [data.globalMetadata] Object for passing the metadata common for all the recipients, such as "key": "value". Max key quantity: 10. Max key length: 64 symbols. Max value length: 1024 symbols. The metadata is returned by [webhook](https://docs.unione.io/en/web-api-ref#webhook). To group single emails into a campaign, you can use the system key 'campaign_id' with a value in the form of a non-negative decimal integer up to 128 bits or a UUID in the format 'c7703772-453e-4c77-a9ae-9a1b94051b5a'. Incorrect values will be treated as '0'.
   * @param {BodyObject} data.body Contains HTML/plaintext/AMP parts of the email. Either html or plaintext part is required.
   * @param {string} data.subject Email subject.
   * @param {string} [data.fromEmail] Sender's email. Required only if template_id parameter is empty.
   * @param {string} [data.fromName] Sender's name.
   * @param {string} [data.replyTo] Optional Reply-To email (in case it's different to sender's email)
   * @param {string} [data.replyToName] Optional Reply-To name (if reply_to email is specified and you want to display not only this email but also the name)
   * @param {number} [data.trackLinks] 1 = click tracking is on (default), 0 = click tracking is off. To use track_links = 0, you need to ask support to enable this feature.
   * @param {number} [data.trackRead] 1 = read tracking is on (default), 0=read tracking is off. To use track_read = 0, you need to ask support to enable this feature.
   * @param {number} [data.bypassGlobal] (allowed values 0 or 1, default 0) If set to 1, the global unavailability list will be ignored. Even if the address was found to be unreachable while sending other UniOne users' emails, or its owner has issued complaints, the message will still be sent. The setting may be ignored for certain addresses.
   * @param {number} [data.bypassUnavailable] (allowed values 0 or 1, default 0) If set to 1, the current user's or project's unavailability list will be ignored. Works only if bypass_global is set to 1.
   * @param {number} [data.bypassUnsubscribed] (allowed values 0 or 1, default 0) If set to 1, the current list of unsubscribed addresses for this account or project will be ignored. Works only if bypass_global is set to 1. The setting is available only for users that have been granted the right to omit the unsubscribe link (to request, please contact [support](https://cp.unione.io/en/support)).
   * @param {number} [data.bypassComplained] (allowed values 0 or 1, default 0) If set to 1, the user's or project's complaint list will be ignored. Works only if bypass_global is set to 1. The setting is available only for users that have been granted the right to omit the unsubscribe link (to request, please contact [support](https://cp.unione.io/en/support)).
   * @param {string} [data.idempotenceKey] A string of up to 64 characters containing a unique message key. This can be used to prevent occasional message duplicates. If you send another API request with the same message key within the next minute, it will be declined. We can generate a message key for each letter automatically; to enable this option, please contact our [tech support](https://cp.unione.io/en/support).
   * @param {HeadersObject} [data.headers] Contains email headers, maximum 50. Only headers with “X-” name prefix are accepted, all other are ignored, for example X-UNIONE-Global-Language, X-UNIONE-Template-Engine. Standard headers "To," "CC," and "BCC" are passed without the "X-." Yet, they are processed in a particular way and, as a result, have a number of restrictions. You can find more details about it [here](/cc-and-bcc). If our support have approved omitting standard unsubscription block for you, you can also pass List-Unsubscribe, List-Subscribe, List-Help, List-Owner, List-Archive, In-Reply-To and References headers.
   * @param {AttachmentsArrayItem[]} [data.attachments] Optional array of attachments
   * @param {InlineAttachmentsArrayItem[]} [data.inlineAttachments] Optional array of inline attachments, e.g. for including images in email instead of loading them from external URL.
   * @param {MessageObjectOptions} [data.options] Additional message options.
   */
  constructor({ recipients, templateId, tags, skipUnsubscribe, globalLanguage, templateEngine, globalSubstitutions, globalMetadata, body, subject, fromEmail, fromName, replyTo, replyToName, trackLinks, trackRead, bypassGlobal, bypassUnavailable, bypassUnsubscribed, bypassComplained, idempotenceKey, headers, attachments, inlineAttachments, options } = {}) {
    /**
     * Contains recipient emails, substitutions(merge tags) and metadata.
     * @type {MessageObjectRecipientsItem[]|undefined}
     */
    this.recipients = recipients == null ? recipients : recipients.map((item0) => toModel(item0, MessageObjectRecipientsItem));
    /**
     * Optional identifier of the template that had been created by
     * [template/set](https://docs.unione.io/en/web-api-ref#template-set) method. If template_id is passed
     * then fields from the template are used instead of missed email/send parameters. E.g. if "body"
     * parameter in email/send is omitted, "body" from template will be used. If "subject" in email/send is
     * omitted, "subject" from template will be used.
     * @type {string|undefined}
     */
    this.templateId = templateId;
    /**
     * An array of strings. The maximum string length is 100 characters. You can include up to 4 strings
     * which must be unique. No more than 10 000 tags are allowed per project; if you try to add more,
     * email/send will return an error. You may use tags to categorize emails by your own criteria, and
     * they will be passed along by event-dump methods.
     * @type {string[]|undefined}
     */
    this.tags = tags;
    /**
     * Whether to skip or not appending default unsubscribe footer. 1=skip, 0=append, default is 0. You
     * should [ask support](https://cp.unione.io/en/support) to approve
     * usage of skip_unsubscribe=1. [Read more](https://docs.unione.io/en/unsubscribe-link).
     * Allowed values: `0`, `1`.
     * @type {number|undefined}
     */
    this.skipUnsubscribe = skipUnsubscribe;
    /**
     * The language of the unsubscribe footer and unsubscribe page. Languages supported are: "be", "de",
     * "en", "es", "fr", "it", "pl", "pt", "ru", "ua", "kz".
     * @type {string|undefined}
     */
    this.globalLanguage = globalLanguage;
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
     * Sender's email. Required only if template_id parameter is empty.
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
     * (allowed values 0 or 1, default 0) If set to 1, the global unavailability list will be ignored. Even
     * if the address was found to be unreachable while sending other UniOne users' emails, or its owner
     * has issued complaints, the message will still be sent. The setting may be ignored for certain
     * addresses.
     * Allowed values: `0`, `1`.
     * @type {number|undefined}
     */
    this.bypassGlobal = bypassGlobal;
    /**
     * (allowed values 0 or 1, default 0) If set to 1, the current user's or project's unavailability list
     * will be ignored. Works only if bypass_global is set to 1.
     * Allowed values: `0`, `1`.
     * @type {number|undefined}
     */
    this.bypassUnavailable = bypassUnavailable;
    /**
     * (allowed values 0 or 1, default 0) If set to 1, the current list of unsubscribed addresses for this
     * account or project will be ignored. Works only if bypass_global is set to 1. The setting is
     * available only for users that have been granted the right to omit the unsubscribe link (to request,
     * please contact [support](https://cp.unione.io/en/support)).
     * Allowed values: `0`, `1`.
     * @type {number|undefined}
     */
    this.bypassUnsubscribed = bypassUnsubscribed;
    /**
     * (allowed values 0 or 1, default 0) If set to 1, the user's or project's complaint list will be
     * ignored. Works only if bypass_global is set to 1. The setting is available only for users that have
     * been granted the right to omit the unsubscribe link (to request, please contact
     * [support](https://cp.unione.io/en/support)).
     * Allowed values: `0`, `1`.
     * @type {number|undefined}
     */
    this.bypassComplained = bypassComplained;
    /**
     * A string of up to 64 characters containing a unique message key. This can be used to prevent
     * occasional message duplicates. If you send another API request with the same message key within the
     * next minute, it will be declined. We can generate a message key for each letter automatically; to
     * enable this option, please contact our [tech support](https://cp.unione.io/en/support).
     * @type {string|undefined}
     */
    this.idempotenceKey = idempotenceKey;
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
     * Additional message options.
     * @type {MessageObjectOptions|undefined}
     */
    this.options = options == null ? options : toModel(options, MessageObjectOptions);
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {MessageObject}
   */
  static fromJSON(data) {
    return new MessageObject({
      recipients: data["recipients"] == null ? undefined : data["recipients"].map((item0) => toModel(item0, MessageObjectRecipientsItem)),
      templateId: data["template_id"],
      tags: data["tags"],
      skipUnsubscribe: data["skip_unsubscribe"],
      globalLanguage: data["global_language"],
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
      bypassGlobal: data["bypass_global"],
      bypassUnavailable: data["bypass_unavailable"],
      bypassUnsubscribed: data["bypass_unsubscribed"],
      bypassComplained: data["bypass_complained"],
      idempotenceKey: data["idempotence_key"],
      headers: data["headers"] == null ? undefined : toModel(data["headers"], HeadersObject),
      attachments: data["attachments"] == null ? undefined : data["attachments"].map((item0) => toModel(item0, AttachmentsArrayItem)),
      inlineAttachments: data["inline_attachments"] == null ? undefined : data["inline_attachments"].map((item0) => toModel(item0, InlineAttachmentsArrayItem)),
      options: data["options"] == null ? undefined : toModel(data["options"], MessageObjectOptions),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "recipients": this.recipients == null ? undefined : this.recipients.map((item0) => toPlain(item0)),
      "template_id": this.templateId,
      "tags": this.tags,
      "skip_unsubscribe": this.skipUnsubscribe,
      "global_language": this.globalLanguage,
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
      "bypass_global": this.bypassGlobal,
      "bypass_unavailable": this.bypassUnavailable,
      "bypass_unsubscribed": this.bypassUnsubscribed,
      "bypass_complained": this.bypassComplained,
      "idempotence_key": this.idempotenceKey,
      "headers": this.headers == null ? undefined : toPlain(this.headers),
      "attachments": this.attachments == null ? undefined : this.attachments.map((item0) => toPlain(item0)),
      "inline_attachments": this.inlineAttachments == null ? undefined : this.inlineAttachments.map((item0) => toPlain(item0)),
      "options": this.options == null ? undefined : toPlain(this.options),
    });
  }
}

/** MessageObjectRecipientsItem */
export class MessageObjectRecipientsItem {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} data.email Recipient email
   * @param {Record<string, string>} [data.substitutions] Object to pass the substitutions(merge tags) for the recipient (e.g. recipient name, discount code, password change link, etc. See [Template engines](https://docs.unione.io/en/template-engines)). The substitutions can be used in the following parameters:  - body.html - body.plaintext - body.amp - subject - from_name - headers["List-Unsubscribe"] - options.unsubscribe_url A substitution name can consist from latin characters, numbers and "_" symbol, and should start with the letter. There's a special substitution "to_name" which is used to put recipent's name like "Name Surname" to include it to SMTP header "To" in the form "Name Surname <email@example.com>". The "to_name" length is limited to 78 symbols.
   * @param {Record<string, string>} [data.metadata] Object for passing the metadata, such as "key": "value". Max key quantity: 10. Max key length: 64 symbols. Max value length: 1024 symbols. The metadata is returned by [webhook](https://docs.unione.io/en/web-api-ref#webhook) and [event-dump](https://docs.unione.io/en/web-api-ref#event-dump) methods. If you pass strign up to 128 bit with "campaign_id" field name (name is configurable thru support), it will be considered as campaign identifier in statistics.
   */
  constructor({ email, substitutions, metadata } = {}) {
    /**
     * Recipient email
     * @type {string|undefined}
     */
    this.email = email;
    /**
     * Object to pass the substitutions(merge tags) for the recipient (e.g. recipient name, discount code,
     * password change link, etc. See [Template engines](https://docs.unione.io/en/template-engines)). The
     * substitutions can be used in the following parameters:
     *
     * - body.html
     * - body.plaintext
     * - body.amp
     * - subject
     * - from_name
     * - headers["List-Unsubscribe"]
     * - options.unsubscribe_url
     * A substitution name can consist from latin characters, numbers and "_" symbol, and should start with
     * the letter. There's a special substitution "to_name" which is used to put recipent's name like "Name
     * Surname" to include it to SMTP header "To" in the form "Name Surname <email@example.com>". The
     * "to_name" length is limited to 78 symbols.
     * @type {Record<string, string>|undefined}
     */
    this.substitutions = substitutions;
    /**
     * Object for passing the metadata, such as "key": "value". Max key quantity: 10. Max key length: 64
     * symbols. Max value length: 1024 symbols. The metadata is returned by
     * [webhook](https://docs.unione.io/en/web-api-ref#webhook) and
     * [event-dump](https://docs.unione.io/en/web-api-ref#event-dump) methods. If you pass strign up to 128
     * bit with "campaign_id" field name (name is configurable thru support), it will be considered as
     * campaign identifier in statistics.
     * @type {Record<string, string>|undefined}
     */
    this.metadata = metadata;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {MessageObjectRecipientsItem}
   */
  static fromJSON(data) {
    return new MessageObjectRecipientsItem({
      email: data["email"],
      substitutions: data["substitutions"],
      metadata: data["metadata"],
    });
  }

  /**
   * A recipient from "email" or "Name <email>": the name goes to the to_name substitution (the name in the
   * "To" header).
   * @param {string} address
   * @param {Record<string, string>} [substitutions] More substitutions of the recipient.
   * @returns {MessageObjectRecipientsItem}
   */
  static fromAddress(address, substitutions) {
    let email = String(address).trim();
    let name = "";
    const match = /^(.*)<([^>]+)>$/s.exec(email);
    if (match) {
      email = match[2].trim();
      name = match[1].trim().replace(/^"|"$/g, "");
    }
    const subs = name ? { to_name: name, ...substitutions } : substitutions;
    return new MessageObjectRecipientsItem({ email: email, substitutions: subs });
  }

  /**
   * Sets the metadata of the recipient (returned in its webhook events) and returns the recipient.
   * @param {Record<string, string>} metadata
   * @returns {this}
   */
  withMetadata(metadata) {
    this.metadata = metadata;
    return this;
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "email": this.email,
      "substitutions": this.substitutions,
      "metadata": this.metadata,
    });
  }
}

/** Additional message options. */
export class MessageObjectOptions {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.sendAt] Date and time in "YYYY-MM-DD hh:mm:ss" format in the UTC timezone. Allows schedule sending up to 24 hours in advance.
   * @param {string} [data.unsubscribeUrl] Custom unsubscribe link. Read more [here](https://docs.unione.io/en/unsubscribe-link).
   * @param {number} [data.customBackendId] Backend-domain identifier to send message with. If custom_backend_id is not set, default one for your account/project will be used. You can pay for one or more dedicated IPs and use this option.
   * @param {string} [data.smtpPoolId] SMTP pool identifier to send message with. Usually you don't need to pass this parameter because correct smtp_pool_id is selected automatically based on the default one for your account/project or according to custom_backend_id parameter.
   */
  constructor({ sendAt, unsubscribeUrl, customBackendId, smtpPoolId } = {}) {
    /**
     * Date and time in "YYYY-MM-DD hh:mm:ss" format in the UTC timezone. Allows schedule sending up to 24
     * hours in advance.
     * @type {string|undefined}
     */
    this.sendAt = sendAt;
    /**
     * Custom unsubscribe link. Read more [here](https://docs.unione.io/en/unsubscribe-link).
     * @type {string|undefined}
     */
    this.unsubscribeUrl = unsubscribeUrl;
    /**
     * Backend-domain identifier to send message with. If custom_backend_id is not set, default one for
     * your account/project will be used. You can pay for one or more dedicated IPs and use this option.
     * @type {number|undefined}
     */
    this.customBackendId = customBackendId;
    /**
     * SMTP pool identifier to send message with. Usually you don't need to pass this parameter because
     * correct smtp_pool_id is selected automatically based on the default one for your account/project or
     * according to custom_backend_id parameter.
     * @type {string|undefined}
     */
    this.smtpPoolId = smtpPoolId;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {MessageObjectOptions}
   */
  static fromJSON(data) {
    return new MessageObjectOptions({
      sendAt: data["send_at"],
      unsubscribeUrl: data["unsubscribe_url"],
      customBackendId: data["custom_backend_id"],
      smtpPoolId: data["smtp_pool_id"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "send_at": this.sendAt,
      "unsubscribe_url": this.unsubscribeUrl,
      "custom_backend_id": this.customBackendId,
      "smtp_pool_id": this.smtpPoolId,
    });
  }
}

/** EmailSendResponse */
export class EmailSendResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {string} [data.jobId] Job identifier, might be useful for investigating errors.
   * @param {string[]} [data.emails] Array of recipients emails successfully accepted for sending.
   * @param {Record<string, string>} [data.failedEmails] Object with emails rejected for sending as property names and their statuses as property values, e.g.: {"email1@gmail.com": "temporary_unavailable"}. Possible statuses:  - __unsubscribed__ - specified email is unsubscribed; - __invalid__ - the email does not exist or has been entered incorrectly; - __duplicate__ - the email already exists in the request, email duplicating is prevented; - __temporary_unavailable__ - the email address is unavailable. This means that over the next three days sending to this address will return an error. Email may be temporarily unavailable due to several reasons, e.g.:  - a previous email has been rejected by the recipient's server for spam; - the recipient's mailbox is full or is not used; - recipient's domain does not accept mail; - sending server was rejected due to blacklisting;  - __permanent_unavailable__ - the email address is permanently unavailable or unsubscribed globally. - __complained__ -  the recipient reported spam in the previous emails; - __blocked__ -  sending to the email is prohibited by administration of UniOne. We may added new statuses in the future.
   */
  constructor({ status, jobId, emails, failedEmails } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * Job identifier, might be useful for investigating errors.
     * @type {string|undefined}
     */
    this.jobId = jobId;
    /**
     * Array of recipients emails successfully accepted for sending.
     * @type {string[]|undefined}
     */
    this.emails = emails;
    /**
     * Object with emails rejected for sending as property names and their statuses as property values,
     * e.g.: {"email1@gmail.com": "temporary_unavailable"}. Possible statuses:
     *
     * - __unsubscribed__ - specified email is unsubscribed;
     * - __invalid__ - the email does not exist or has been entered incorrectly;
     * - __duplicate__ - the email already exists in the request, email duplicating is prevented;
     * - __temporary_unavailable__ - the email address is unavailable. This means that over the next three days sending to this address will return an error. Email may be temporarily unavailable due to several reasons, e.g.:
     *
     * - a previous email has been rejected by the recipient's server for spam;
     * - the recipient's mailbox is full or is not used;
     * - recipient's domain does not accept mail;
     * - sending server was rejected due to blacklisting;
     *
     * - __permanent_unavailable__ - the email address is permanently unavailable or unsubscribed globally.
     * - __complained__ -  the recipient reported spam in the previous emails;
     * - __blocked__ -  sending to the email is prohibited by administration of UniOne.
     * We may added new statuses in the future.
     * @type {Record<string, string>|undefined}
     */
    this.failedEmails = failedEmails;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {EmailSendResponse}
   */
  static fromJSON(data) {
    return new EmailSendResponse({
      status: data["status"],
      jobId: data["job_id"],
      emails: data["emails"],
      failedEmails: data["failed_emails"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "job_id": this.jobId,
      "emails": this.emails,
      "failed_emails": this.failedEmails,
    });
  }
}

/** EmailSubscribeRequest */
export class EmailSubscribeRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} data.fromEmail Sender’s email on a confirmed domain. (Field alias "email_address_from" is supported, too).
   * @param {string} data.fromName Sender’s name. (Field alias "name_from" is supported, too).
   * @param {string} data.toEmail Recipient’s email. (Field alias "email_address_to" is supported, too).
   */
  constructor({ fromEmail, fromName, toEmail } = {}) {
    /**
     * Sender’s email on a confirmed domain. (Field alias "email_address_from" is supported, too).
     * @type {string|undefined}
     */
    this.fromEmail = fromEmail;
    /**
     * Sender’s name. (Field alias "name_from" is supported, too).
     * @type {string|undefined}
     */
    this.fromName = fromName;
    /**
     * Recipient’s email. (Field alias "email_address_to" is supported, too).
     * @type {string|undefined}
     */
    this.toEmail = toEmail;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {EmailSubscribeRequest}
   */
  static fromJSON(data) {
    return new EmailSubscribeRequest({
      fromEmail: data["from_email"],
      fromName: data["from_name"],
      toEmail: data["to_email"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "from_email": this.fromEmail,
      "from_name": this.fromName,
      "to_email": this.toEmail,
    });
  }
}
