// Types of the models of the Email section.
import type { AttachmentsArrayItem, AttachmentsArrayItemJSON, BodyObject, BodyObjectJSON, HeadersObject, HeadersObjectJSON, InlineAttachmentsArrayItem, InlineAttachmentsArrayItemJSON, TemplateEngine } from "../../common/models.js";

/** EmailSendRequest in the API format: the object sent and received as JSON. */
export interface EmailSendRequestJSON {
  "message": MessageObjectJSON;
}

/** Fields of new EmailSendRequest(): a nested model may be a plain object in the API format. */
export interface EmailSendRequestInit {
  /** Object containing all message properties. */
  message: MessageObject | MessageObjectJSON;
}

/** EmailSendRequest */
export declare class EmailSendRequest {
  constructor(data: EmailSendRequestInit);
  /** Object containing all message properties. */
  message: MessageObject;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): EmailSendRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): EmailSendRequestJSON;
}

/** MessageObject in the API format: the object sent and received as JSON. */
export interface MessageObjectJSON {
  "recipients": Array<MessageObjectRecipientsItemJSON>;
  "template_id"?: string;
  "tags"?: Array<string>;
  "skip_unsubscribe"?: number;
  "global_language"?: string;
  "template_engine"?: TemplateEngine;
  "global_substitutions"?: Record<string, string>;
  "global_metadata"?: Record<string, string>;
  "body": BodyObjectJSON;
  "subject": string;
  "from_email"?: string;
  "from_name"?: string;
  "reply_to"?: string;
  "reply_to_name"?: string;
  "track_links"?: number;
  "track_read"?: number;
  "bypass_global"?: number;
  "bypass_unavailable"?: number;
  "bypass_unsubscribed"?: number;
  "bypass_complained"?: number;
  "idempotence_key"?: string;
  "headers"?: HeadersObjectJSON;
  "attachments"?: Array<AttachmentsArrayItemJSON>;
  "inline_attachments"?: Array<InlineAttachmentsArrayItemJSON>;
  "options"?: MessageObjectOptionsJSON;
}

/** Fields of new MessageObject(): a nested model may be a plain object in the API format. */
export interface MessageObjectInit {
  /** Contains recipient emails, substitutions(merge tags) and metadata. */
  recipients: Array<MessageObjectRecipientsItem | MessageObjectRecipientsItemJSON>;
  /**
   * Optional identifier of the template that had been created by
   * [template/set](https://docs.unione.io/en/web-api-ref#template-set) method. If template_id is passed
   * then fields from the template are used instead of missed email/send parameters. E.g. if "body"
   * parameter in email/send is omitted, "body" from template will be used. If "subject" in email/send is
   * omitted, "subject" from template will be used.
   */
  templateId?: string;
  /**
   * An array of strings. The maximum string length is 100 characters. You can include up to 4 strings
   * which must be unique. No more than 10 000 tags are allowed per project; if you try to add more,
   * email/send will return an error. You may use tags to categorize emails by your own criteria, and
   * they will be passed along by event-dump methods.
   */
  tags?: Array<string>;
  /**
   * Whether to skip or not appending default unsubscribe footer. 1=skip, 0=append, default is 0. You
   * should [ask support](https://cp.unione.io/en/support) to approve
   * usage of skip_unsubscribe=1. [Read more](https://docs.unione.io/en/unsubscribe-link).
   * Allowed values: `0`, `1`.
   */
  skipUnsubscribe?: number;
  /**
   * The language of the unsubscribe footer and unsubscribe page. Languages supported are: "be", "de",
   * "en", "es", "fr", "it", "pl", "pt", "ru", "ua", "kz".
   */
  globalLanguage?: string;
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
  body: BodyObject | BodyObjectJSON;
  /** Email subject. */
  subject: string;
  /** Sender's email. Required only if template_id parameter is empty. */
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
   * (allowed values 0 or 1, default 0) If set to 1, the global unavailability list will be ignored. Even
   * if the address was found to be unreachable while sending other UniOne users' emails, or its owner
   * has issued complaints, the message will still be sent. The setting may be ignored for certain
   * addresses.
   * Allowed values: `0`, `1`.
   */
  bypassGlobal?: number;
  /**
   * (allowed values 0 or 1, default 0) If set to 1, the current user's or project's unavailability list
   * will be ignored. Works only if bypass_global is set to 1.
   * Allowed values: `0`, `1`.
   */
  bypassUnavailable?: number;
  /**
   * (allowed values 0 or 1, default 0) If set to 1, the current list of unsubscribed addresses for this
   * account or project will be ignored. Works only if bypass_global is set to 1. The setting is
   * available only for users that have been granted the right to omit the unsubscribe link (to request,
   * please contact [support](https://cp.unione.io/en/support)).
   * Allowed values: `0`, `1`.
   */
  bypassUnsubscribed?: number;
  /**
   * (allowed values 0 or 1, default 0) If set to 1, the user's or project's complaint list will be
   * ignored. Works only if bypass_global is set to 1. The setting is available only for users that have
   * been granted the right to omit the unsubscribe link (to request, please contact
   * [support](https://cp.unione.io/en/support)).
   * Allowed values: `0`, `1`.
   */
  bypassComplained?: number;
  /**
   * A string of up to 64 characters containing a unique message key. This can be used to prevent
   * occasional message duplicates. If you send another API request with the same message key within the
   * next minute, it will be declined. We can generate a message key for each letter automatically; to
   * enable this option, please contact our [tech support](https://cp.unione.io/en/support).
   */
  idempotenceKey?: string;
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
  /** Additional message options. */
  options?: MessageObjectOptions | MessageObjectOptionsJSON;
}

/** Object containing all message properties. */
export declare class MessageObject {
  constructor(data: MessageObjectInit);
  /** Contains recipient emails, substitutions(merge tags) and metadata. */
  recipients: Array<MessageObjectRecipientsItem>;
  /**
   * Optional identifier of the template that had been created by
   * [template/set](https://docs.unione.io/en/web-api-ref#template-set) method. If template_id is passed
   * then fields from the template are used instead of missed email/send parameters. E.g. if "body"
   * parameter in email/send is omitted, "body" from template will be used. If "subject" in email/send is
   * omitted, "subject" from template will be used.
   */
  templateId?: string;
  /**
   * An array of strings. The maximum string length is 100 characters. You can include up to 4 strings
   * which must be unique. No more than 10 000 tags are allowed per project; if you try to add more,
   * email/send will return an error. You may use tags to categorize emails by your own criteria, and
   * they will be passed along by event-dump methods.
   */
  tags?: Array<string>;
  /**
   * Whether to skip or not appending default unsubscribe footer. 1=skip, 0=append, default is 0. You
   * should [ask support](https://cp.unione.io/en/support) to approve
   * usage of skip_unsubscribe=1. [Read more](https://docs.unione.io/en/unsubscribe-link).
   * Allowed values: `0`, `1`.
   */
  skipUnsubscribe?: number;
  /**
   * The language of the unsubscribe footer and unsubscribe page. Languages supported are: "be", "de",
   * "en", "es", "fr", "it", "pl", "pt", "ru", "ua", "kz".
   */
  globalLanguage?: string;
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
  body: BodyObject;
  /** Email subject. */
  subject: string;
  /** Sender's email. Required only if template_id parameter is empty. */
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
   * (allowed values 0 or 1, default 0) If set to 1, the global unavailability list will be ignored. Even
   * if the address was found to be unreachable while sending other UniOne users' emails, or its owner
   * has issued complaints, the message will still be sent. The setting may be ignored for certain
   * addresses.
   * Allowed values: `0`, `1`.
   */
  bypassGlobal?: number;
  /**
   * (allowed values 0 or 1, default 0) If set to 1, the current user's or project's unavailability list
   * will be ignored. Works only if bypass_global is set to 1.
   * Allowed values: `0`, `1`.
   */
  bypassUnavailable?: number;
  /**
   * (allowed values 0 or 1, default 0) If set to 1, the current list of unsubscribed addresses for this
   * account or project will be ignored. Works only if bypass_global is set to 1. The setting is
   * available only for users that have been granted the right to omit the unsubscribe link (to request,
   * please contact [support](https://cp.unione.io/en/support)).
   * Allowed values: `0`, `1`.
   */
  bypassUnsubscribed?: number;
  /**
   * (allowed values 0 or 1, default 0) If set to 1, the user's or project's complaint list will be
   * ignored. Works only if bypass_global is set to 1. The setting is available only for users that have
   * been granted the right to omit the unsubscribe link (to request, please contact
   * [support](https://cp.unione.io/en/support)).
   * Allowed values: `0`, `1`.
   */
  bypassComplained?: number;
  /**
   * A string of up to 64 characters containing a unique message key. This can be used to prevent
   * occasional message duplicates. If you send another API request with the same message key within the
   * next minute, it will be declined. We can generate a message key for each letter automatically; to
   * enable this option, please contact our [tech support](https://cp.unione.io/en/support).
   */
  idempotenceKey?: string;
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
  /** Additional message options. */
  options?: MessageObjectOptions;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): MessageObject;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): MessageObjectJSON;
}

/** MessageObjectRecipientsItem in the API format: the object sent and received as JSON. */
export interface MessageObjectRecipientsItemJSON {
  "email": string;
  "substitutions"?: Record<string, string>;
  "metadata"?: Record<string, string>;
}

/** Fields of new MessageObjectRecipientsItem(): a nested model may be a plain object in the API format. */
export interface MessageObjectRecipientsItemInit {
  /** Recipient email */
  email: string;
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
   */
  substitutions?: Record<string, string>;
  /**
   * Object for passing the metadata, such as "key": "value". Max key quantity: 10. Max key length: 64
   * symbols. Max value length: 1024 symbols. The metadata is returned by
   * [webhook](https://docs.unione.io/en/web-api-ref#webhook) and
   * [event-dump](https://docs.unione.io/en/web-api-ref#event-dump) methods. If you pass strign up to 128
   * bit with "campaign_id" field name (name is configurable thru support), it will be considered as
   * campaign identifier in statistics.
   */
  metadata?: Record<string, string>;
}

/** MessageObjectRecipientsItem */
export declare class MessageObjectRecipientsItem {
  constructor(data: MessageObjectRecipientsItemInit);
  /** Recipient email */
  email: string;
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
   */
  substitutions?: Record<string, string>;
  /**
   * Object for passing the metadata, such as "key": "value". Max key quantity: 10. Max key length: 64
   * symbols. Max value length: 1024 symbols. The metadata is returned by
   * [webhook](https://docs.unione.io/en/web-api-ref#webhook) and
   * [event-dump](https://docs.unione.io/en/web-api-ref#event-dump) methods. If you pass strign up to 128
   * bit with "campaign_id" field name (name is configurable thru support), it will be considered as
   * campaign identifier in statistics.
   */
  metadata?: Record<string, string>;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): MessageObjectRecipientsItem;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): MessageObjectRecipientsItemJSON;
}

/** MessageObjectOptions in the API format: the object sent and received as JSON. */
export interface MessageObjectOptionsJSON {
  "send_at"?: string;
  "unsubscribe_url"?: string;
  "custom_backend_id"?: number;
  "smtp_pool_id"?: string;
}

/** Fields of new MessageObjectOptions(): a nested model may be a plain object in the API format. */
export interface MessageObjectOptionsInit {
  /**
   * Date and time in "YYYY-MM-DD hh:mm:ss" format in the UTC timezone. Allows schedule sending up to 24
   * hours in advance.
   */
  sendAt?: string;
  /** Custom unsubscribe link. Read more [here](https://docs.unione.io/en/unsubscribe-link). */
  unsubscribeUrl?: string;
  /**
   * Backend-domain identifier to send message with. If custom_backend_id is not set, default one for
   * your account/project will be used. You can pay for one or more dedicated IPs and use this option.
   */
  customBackendId?: number;
  /**
   * SMTP pool identifier to send message with. Usually you don't need to pass this parameter because
   * correct smtp_pool_id is selected automatically based on the default one for your account/project or
   * according to custom_backend_id parameter.
   */
  smtpPoolId?: string;
}

/** Additional message options. */
export declare class MessageObjectOptions {
  constructor(data?: MessageObjectOptionsInit);
  /**
   * Date and time in "YYYY-MM-DD hh:mm:ss" format in the UTC timezone. Allows schedule sending up to 24
   * hours in advance.
   */
  sendAt?: string;
  /** Custom unsubscribe link. Read more [here](https://docs.unione.io/en/unsubscribe-link). */
  unsubscribeUrl?: string;
  /**
   * Backend-domain identifier to send message with. If custom_backend_id is not set, default one for
   * your account/project will be used. You can pay for one or more dedicated IPs and use this option.
   */
  customBackendId?: number;
  /**
   * SMTP pool identifier to send message with. Usually you don't need to pass this parameter because
   * correct smtp_pool_id is selected automatically based on the default one for your account/project or
   * according to custom_backend_id parameter.
   */
  smtpPoolId?: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): MessageObjectOptions;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): MessageObjectOptionsJSON;
}

/** EmailSendResponse in the API format: the object sent and received as JSON. */
export interface EmailSendResponseJSON {
  "status"?: string;
  "job_id"?: string;
  "emails"?: Array<string>;
  "failed_emails"?: Record<string, string>;
}

/** Fields of new EmailSendResponse(): a nested model may be a plain object in the API format. */
export interface EmailSendResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Job identifier, might be useful for investigating errors. */
  jobId?: string;
  /** Array of recipients emails successfully accepted for sending. */
  emails?: Array<string>;
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
   */
  failedEmails?: Record<string, string>;
}

/** EmailSendResponse */
export declare class EmailSendResponse {
  constructor(data?: EmailSendResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Job identifier, might be useful for investigating errors. */
  jobId?: string;
  /** Array of recipients emails successfully accepted for sending. */
  emails?: Array<string>;
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
   */
  failedEmails?: Record<string, string>;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): EmailSendResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): EmailSendResponseJSON;
}

/** EmailSubscribeRequest in the API format: the object sent and received as JSON. */
export interface EmailSubscribeRequestJSON {
  "from_email": string;
  "from_name": string;
  "to_email": string;
}

/** Fields of new EmailSubscribeRequest(): a nested model may be a plain object in the API format. */
export interface EmailSubscribeRequestInit {
  /** Sender’s email on a confirmed domain. (Field alias "email_address_from" is supported, too). */
  fromEmail: string;
  /** Sender’s name. (Field alias "name_from" is supported, too). */
  fromName: string;
  /** Recipient’s email. (Field alias "email_address_to" is supported, too). */
  toEmail: string;
}

/** EmailSubscribeRequest */
export declare class EmailSubscribeRequest {
  constructor(data: EmailSubscribeRequestInit);
  /** Sender’s email on a confirmed domain. (Field alias "email_address_from" is supported, too). */
  fromEmail: string;
  /** Sender’s name. (Field alias "name_from" is supported, too). */
  fromName: string;
  /** Recipient’s email. (Field alias "email_address_to" is supported, too). */
  toEmail: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): EmailSubscribeRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): EmailSubscribeRequestJSON;
}
