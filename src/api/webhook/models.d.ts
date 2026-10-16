// Types of the models of the Webhook section.
import type { EmailStatus } from "../../common/models.js";

/**
 * Webhook status, "active" by default. "disabled" means that webhook has been disabled by the user,
 * "stopped" means that webhook has been stopped by the system after 24h of failed calls (with minimum
 * of 10 distinct events).
 */
export declare const WebhookStatus: Readonly<{
  ACTIVE: "active";
  DISABLED: "disabled";
  STOPPED: "stopped";
}>;
/**
 * Webhook status, "active" by default. "disabled" means that webhook has been disabled by the user,
 * "stopped" means that webhook has been stopped by the system after 24h of failed calls (with minimum
 * of 10 distinct events).
 */
export type WebhookStatus = "active" | "disabled" | "stopped";

/** Notification format. "json_post"(default) or "json_post_gzip". */
export declare const WebhookEventFormat: Readonly<{
  JSON_POST: "json_post";
  JSON_POST_GZIP: "json_post_gzip";
}>;
/** Notification format. "json_post"(default) or "json_post_gzip". */
export type WebhookEventFormat = "json_post" | "json_post_gzip";

/**
 * Type of event data contained in event_data field, either "transactional_email_status" or
 * "transactional_spam_block".
 */
export declare const EventName: Readonly<{
  TRANSACTIONAL_EMAIL_STATUS: "transactional_email_status";
  TRANSACTIONAL_SPAM_BLOCK: "transactional_spam_block";
}>;
/**
 * Type of event data contained in event_data field, either "transactional_email_status" or
 * "transactional_spam_block".
 */
export type EventName = "transactional_email_status" | "transactional_spam_block";

/**
 * Recipient's device type, detected from the user agent. Present for "clicked" and "opened" statuses;
 * equals "unknown" if the device type couldn't be detected.
 */
export declare const DeviceType: Readonly<{
  DESKTOP: "desktop";
  MOBILE: "mobile";
  TABLET: "tablet";
  OTHER: "other";
  UNKNOWN: "unknown";
}>;
/**
 * Recipient's device type, detected from the user agent. Present for "clicked" and "opened" statuses;
 * equals "unknown" if the device type couldn't be detected.
 */
export type DeviceType = "desktop" | "mobile" | "tablet" | "other" | "unknown";

/**
 * Traffic quality for "opened" and "clicked" statuses. "human" means a recognized browser or email
 * client without machine signs; "machine" means a bot, link scanner or security proxy; "protected"
 * means a mailbox/OS privacy proxy where a human action cannot be confirmed (Apple Mail Privacy
 * Protection / iCloud Private Relay, Gmail Image Proxy — Apple MPP is protected, not machine);
 * "unknown" means the user agent is missing, broken or not recognized.
 */
export declare const TrafficType: Readonly<{
  HUMAN: "human";
  MACHINE: "machine";
  PROTECTED: "protected";
  UNKNOWN: "unknown";
}>;
/**
 * Traffic quality for "opened" and "clicked" statuses. "human" means a recognized browser or email
 * client without machine signs; "machine" means a bot, link scanner or security proxy; "protected"
 * means a mailbox/OS privacy proxy where a human action cannot be confirmed (Apple Mail Privacy
 * Protection / iCloud Private Relay, Gmail Image Proxy — Apple MPP is protected, not machine);
 * "unknown" means the user agent is missing, broken or not recognized.
 */
export type TrafficType = "human" | "machine" | "protected" | "unknown";

/**
 * Spam block type, either single or multiple sending SMTP. For single sending SMTP block in common
 * pool UniOne retries several other SMTPs. This property exists only if
 * event_name="transactional_spam_block".
 */
export declare const BlockType: Readonly<{
  ONE_SMTP: "one_smtp";
  ALL_SMTP: "all_smtp";
}>;
/**
 * Spam block type, either single or multiple sending SMTP. For single sending SMTP block in common
 * pool UniOne retries several other SMTPs. This property exists only if
 * event_name="transactional_spam_block".
 */
export type BlockType = "one_smtp" | "all_smtp";

/**
 * Whether it's a block or unblock event. This property exists only if
 * event_name="transactional_spam_block".
 */
export declare const DomainStatus: Readonly<{
  BLOCKED: "blocked";
  UNBLOCKED: "unblocked";
}>;
/**
 * Whether it's a block or unblock event. This property exists only if
 * event_name="transactional_spam_block".
 */
export type DomainStatus = "blocked" | "unblocked";

/** WebhookSetRequest in the API format: the object sent and received as JSON. */
export interface WebhookSetRequestJSON {
  "url": string;
  "status"?: WebhookStatus;
  "event_format"?: WebhookEventFormat;
  "delivery_info"?: number;
  "single_event"?: number;
  "max_parallel"?: number;
  "events"?: WebhookEventsObjectJSON;
}

/** Fields of new WebhookSetRequest(): a nested model may be a plain object in the API format. */
export interface WebhookSetRequestInit {
  /**
   * URL that will receive the notification when an event occurs. The URL should be unique for a user or
   * a project. Only ASCII characters are supported for now in URL, please convert to
   * [Punycode](https://en.wikipedia.org/wiki/Punycode) if you need to use non-ASCII characters.
   */
  url: string;
  /**
   * Webhook status, "active" by default. "disabled" means that webhook has been disabled by the user,
   * "stopped" means that webhook has been stopped by the system after 24h of failed calls (with minimum
   * of 10 distinct events).
   * Default: `active`.
   */
  status?: WebhookStatus;
  /**
   * Notification format. "json_post"(default) or "json_post_gzip".
   * Default: `json_post`.
   */
  eventFormat?: WebhookEventFormat;
  /**
   * Shall detailed delivery info be returned(1) or not(0). When it's 1, the information about SMTP
   * response and internal delivery status is returned for "hard_bounced" and "soft_bounced" email
   * statuses; the user agent, recipient IP address, detected geo fields, device info detected from the
   * user agent (device type and brand, OS name, browser or email client name) and traffic_type (human,
   * machine, protected or unknown) are returned for "opened" and "clicked" statuses; URL is returned for
   * "clicked" status. For "delivered", "soft_bounced" and "hard_bounced" statuses UniOne may also return
   * sender_ip, the IP address of the SMTP server that sent the message, if available.
   * Allowed values: `0`, `1`.
   * Default: `0`.
   */
  deliveryInfo?: number;
  /**
   * 0=several event notifications can be reported in single webhook call, 1=only single event can be
   * reported in one call (not recommended).
   * Allowed values: `0`, `1`.
   * Default: `0`.
   */
  singleEvent?: number;
  /**
   * Maximum quantity of permitted parallel queries to your server. The more your server can handle - the
   * better.
   * Default: `10`.
   */
  maxParallel?: number;
  /** Object containing events to notify of. */
  events?: WebhookEventsObject | WebhookEventsObjectJSON;
}

/** WebhookSetRequest */
export declare class WebhookSetRequest {
  constructor(data: WebhookSetRequestInit);
  /**
   * URL that will receive the notification when an event occurs. The URL should be unique for a user or
   * a project. Only ASCII characters are supported for now in URL, please convert to
   * [Punycode](https://en.wikipedia.org/wiki/Punycode) if you need to use non-ASCII characters.
   */
  url: string;
  /**
   * Webhook status, "active" by default. "disabled" means that webhook has been disabled by the user,
   * "stopped" means that webhook has been stopped by the system after 24h of failed calls (with minimum
   * of 10 distinct events).
   * Default: `active`.
   */
  status?: WebhookStatus;
  /**
   * Notification format. "json_post"(default) or "json_post_gzip".
   * Default: `json_post`.
   */
  eventFormat?: WebhookEventFormat;
  /**
   * Shall detailed delivery info be returned(1) or not(0). When it's 1, the information about SMTP
   * response and internal delivery status is returned for "hard_bounced" and "soft_bounced" email
   * statuses; the user agent, recipient IP address, detected geo fields, device info detected from the
   * user agent (device type and brand, OS name, browser or email client name) and traffic_type (human,
   * machine, protected or unknown) are returned for "opened" and "clicked" statuses; URL is returned for
   * "clicked" status. For "delivered", "soft_bounced" and "hard_bounced" statuses UniOne may also return
   * sender_ip, the IP address of the SMTP server that sent the message, if available.
   * Allowed values: `0`, `1`.
   * Default: `0`.
   */
  deliveryInfo?: number;
  /**
   * 0=several event notifications can be reported in single webhook call, 1=only single event can be
   * reported in one call (not recommended).
   * Allowed values: `0`, `1`.
   * Default: `0`.
   */
  singleEvent?: number;
  /**
   * Maximum quantity of permitted parallel queries to your server. The more your server can handle - the
   * better.
   * Default: `10`.
   */
  maxParallel?: number;
  /** Object containing events to notify of. */
  events?: WebhookEventsObject;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): WebhookSetRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): WebhookSetRequestJSON;
}

/** WebhookEventsObject in the API format: the object sent and received as JSON. */
export interface WebhookEventsObjectJSON {
  "spam_block"?: Array<string>;
  "email_status"?: Array<EmailStatus>;
}

/** Fields of new WebhookEventsObject(): a nested model may be a plain object in the API format. */
export interface WebhookEventsObjectInit {
  /**
   * If present then spam block events will be reported. Should contain single array element with "*"
   * string.
   */
  spamBlock?: Array<string>;
  /**
   * If present then email status change events will be reported. Contains names of statuses to notify
   * of.
   */
  emailStatus?: Array<EmailStatus>;
}

/** Object containing events to notify of. */
export declare class WebhookEventsObject {
  constructor(data?: WebhookEventsObjectInit);
  /**
   * If present then spam block events will be reported. Should contain single array element with "*"
   * string.
   */
  spamBlock?: Array<string>;
  /**
   * If present then email status change events will be reported. Contains names of statuses to notify
   * of.
   */
  emailStatus?: Array<EmailStatus>;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): WebhookEventsObject;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): WebhookEventsObjectJSON;
}

/** WebhookSetResponse in the API format: the object sent and received as JSON. */
export interface WebhookSetResponseJSON {
  "status"?: string;
  "object"?: WebhookObjectJSON;
}

/** Fields of new WebhookSetResponse(): a nested model may be a plain object in the API format. */
export interface WebhookSetResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Object with all the webhook properties. */
  object?: WebhookObject | WebhookObjectJSON;
}

/** WebhookSetResponse */
export declare class WebhookSetResponse {
  constructor(data?: WebhookSetResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Object with all the webhook properties. */
  object?: WebhookObject;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): WebhookSetResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): WebhookSetResponseJSON;
}

/** WebhookObject in the API format: the object sent and received as JSON. */
export interface WebhookObjectJSON {
  "id"?: number;
  "url"?: string;
  "status"?: WebhookStatus;
  "event_format"?: WebhookEventFormat;
  "delivery_info"?: number;
  "single_event"?: number;
  "max_parallel"?: number;
  "updated_at"?: string;
  "events"?: WebhookEventsObjectJSON;
}

/** Fields of new WebhookObject(): a nested model may be a plain object in the API format. */
export interface WebhookObjectInit {
  /** Webhook unique identifier. */
  id?: number;
  /** Webhook URL. */
  url?: string;
  /**
   * Webhook status, "active" by default. "disabled" means that webhook has been disabled by the user,
   * "stopped" means that webhook has been stopped by the system after 24h of failed calls (with minimum
   * of 10 distinct events).
   * Default: `active`.
   */
  status?: WebhookStatus;
  /**
   * Notification format. "json_post"(default) or "json_post_gzip".
   * Default: `json_post`.
   */
  eventFormat?: WebhookEventFormat;
  /**
   * Shall detailed delivery info be returned(1) or not(0). When it's 1, the information about SMTP
   * response and internal delivery status is returned for "hard_bounced" and "soft_bounced" email
   * statuses; the user agent, recipient IP address, detected geo fields, device info detected from the
   * user agent (device type and brand, OS name, browser or email client name) and traffic_type (human,
   * machine, protected or unknown) are returned for "opened" and "clicked" statuses; URL is returned for
   * "clicked" status. For "delivered", "soft_bounced" and "hard_bounced" statuses UniOne may also return
   * sender_ip, the IP address of the SMTP server that sent the message, if available.
   * Allowed values: `0`, `1`.
   * Default: `0`.
   */
  deliveryInfo?: number;
  /**
   * 0=several event notifications can be reported in single webhook call, 1=only single event can be
   * reported in one call (not recommended).
   * Allowed values: `0`, `1`.
   * Default: `0`.
   */
  singleEvent?: number;
  /**
   * Maximum quantity of permitted parallel queries to your server. The more your server can handle - the
   * better.
   * Default: `10`.
   */
  maxParallel?: number;
  /** Webhook properties last update date and time in UTC timezone in "YYYY-MM-DD hh:mm:ss" format. */
  updatedAt?: string;
  /** Object containing events to notify of. */
  events?: WebhookEventsObject | WebhookEventsObjectJSON;
}

/** Object with all the webhook properties. */
export declare class WebhookObject {
  constructor(data?: WebhookObjectInit);
  /** Webhook unique identifier. */
  id?: number;
  /** Webhook URL. */
  url?: string;
  /**
   * Webhook status, "active" by default. "disabled" means that webhook has been disabled by the user,
   * "stopped" means that webhook has been stopped by the system after 24h of failed calls (with minimum
   * of 10 distinct events).
   * Default: `active`.
   */
  status?: WebhookStatus;
  /**
   * Notification format. "json_post"(default) or "json_post_gzip".
   * Default: `json_post`.
   */
  eventFormat?: WebhookEventFormat;
  /**
   * Shall detailed delivery info be returned(1) or not(0). When it's 1, the information about SMTP
   * response and internal delivery status is returned for "hard_bounced" and "soft_bounced" email
   * statuses; the user agent, recipient IP address, detected geo fields, device info detected from the
   * user agent (device type and brand, OS name, browser or email client name) and traffic_type (human,
   * machine, protected or unknown) are returned for "opened" and "clicked" statuses; URL is returned for
   * "clicked" status. For "delivered", "soft_bounced" and "hard_bounced" statuses UniOne may also return
   * sender_ip, the IP address of the SMTP server that sent the message, if available.
   * Allowed values: `0`, `1`.
   * Default: `0`.
   */
  deliveryInfo?: number;
  /**
   * 0=several event notifications can be reported in single webhook call, 1=only single event can be
   * reported in one call (not recommended).
   * Allowed values: `0`, `1`.
   * Default: `0`.
   */
  singleEvent?: number;
  /**
   * Maximum quantity of permitted parallel queries to your server. The more your server can handle - the
   * better.
   * Default: `10`.
   */
  maxParallel?: number;
  /** Webhook properties last update date and time in UTC timezone in "YYYY-MM-DD hh:mm:ss" format. */
  updatedAt?: string;
  /** Object containing events to notify of. */
  events?: WebhookEventsObject;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): WebhookObject;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): WebhookObjectJSON;
}

/** WebhookCallback in the API format: the object sent and received as JSON. */
export interface WebhookCallbackJSON {
  "auth"?: string;
  "events_by_user"?: Array<WebhookCallbackEventsByUserItemJSON>;
}

/** Fields of new WebhookCallback(): a nested model may be a plain object in the API format. */
export interface WebhookCallbackInit {
  /**
   * MD5-hash of the message body, in which the value "auth" is replaced by api key of the user/project;
   * with this field the recipient of the notification can both authenticate and verify the notification
   * integrity
   */
  auth?: string;
  /** Array with only one element, containing events of a user/project. */
  eventsByUser?: Array<WebhookCallbackEventsByUserItem | WebhookCallbackEventsByUserItemJSON>;
}

/** Webhook callback format description. */
export declare class WebhookCallback {
  constructor(data?: WebhookCallbackInit);
  /**
   * MD5-hash of the message body, in which the value "auth" is replaced by api key of the user/project;
   * with this field the recipient of the notification can both authenticate and verify the notification
   * integrity
   */
  auth?: string;
  /** Array with only one element, containing events of a user/project. */
  eventsByUser?: Array<WebhookCallbackEventsByUserItem>;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): WebhookCallback;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): WebhookCallbackJSON;
}

/** WebhookCallbackEventsByUserItem in the API format: the object sent and received as JSON. */
export interface WebhookCallbackEventsByUserItemJSON {
  "user_id"?: number;
  "project_id"?: string;
  "project_name"?: string;
  "events"?: Array<WebhookCallbackEventsByUserItemEventsItemJSON>;
}

/** Fields of new WebhookCallbackEventsByUserItem(): a nested model may be a plain object in the API format. */
export interface WebhookCallbackEventsByUserItemInit {
  /** Unique user identifier. */
  userId?: number;
  /** Project identifier, present only if webhook was registered for the project using project API key. */
  projectId?: string;
  /** Project name, present only if webhook was registered for the project using project API key. */
  projectName?: string;
  /** Array of events reported by webhook. */
  events?: Array<WebhookCallbackEventsByUserItemEventsItem | WebhookCallbackEventsByUserItemEventsItemJSON>;
}

/** WebhookCallbackEventsByUserItem */
export declare class WebhookCallbackEventsByUserItem {
  constructor(data?: WebhookCallbackEventsByUserItemInit);
  /** Unique user identifier. */
  userId?: number;
  /** Project identifier, present only if webhook was registered for the project using project API key. */
  projectId?: string;
  /** Project name, present only if webhook was registered for the project using project API key. */
  projectName?: string;
  /** Array of events reported by webhook. */
  events?: Array<WebhookCallbackEventsByUserItemEventsItem>;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): WebhookCallbackEventsByUserItem;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): WebhookCallbackEventsByUserItemJSON;
}

/** WebhookCallbackEventsByUserItemEventsItem in the API format: the object sent and received as JSON. */
export interface WebhookCallbackEventsByUserItemEventsItemJSON {
  "event_name"?: EventName;
  "event_data"?: WebhookCallbackEventsByUserItemEventsItemEventDataJSON;
}

/** Fields of new WebhookCallbackEventsByUserItemEventsItem(): a nested model may be a plain object in the API format. */
export interface WebhookCallbackEventsByUserItemEventsItemInit {
  /**
   * Type of event data contained in event_data field, either "transactional_email_status" or
   * "transactional_spam_block".
   */
  eventName?: EventName;
  /**
   * Object with different event properties depending on "event_name". Below you can see all the
   * properties, "transactional_email_status"-related first and then "transactional_spam_block"-related.
   */
  eventData?: WebhookCallbackEventsByUserItemEventsItemEventData | WebhookCallbackEventsByUserItemEventsItemEventDataJSON;
}

/** WebhookCallbackEventsByUserItemEventsItem */
export declare class WebhookCallbackEventsByUserItemEventsItem {
  constructor(data?: WebhookCallbackEventsByUserItemEventsItemInit);
  /**
   * Type of event data contained in event_data field, either "transactional_email_status" or
   * "transactional_spam_block".
   */
  eventName?: EventName;
  /**
   * Object with different event properties depending on "event_name". Below you can see all the
   * properties, "transactional_email_status"-related first and then "transactional_spam_block"-related.
   */
  eventData?: WebhookCallbackEventsByUserItemEventsItemEventData;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): WebhookCallbackEventsByUserItemEventsItem;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): WebhookCallbackEventsByUserItemEventsItemJSON;
}

/** WebhookCallbackEventsByUserItemEventsItemEventData in the API format: the object sent and received as JSON. */
export interface WebhookCallbackEventsByUserItemEventsItemEventDataJSON {
  "job_id"?: string;
  "metadata"?: Record<string, string>;
  "email"?: string;
  "status"?: EmailStatus;
  "event_time"?: string;
  "url"?: string;
  "delivery_info"?: WebhookCallbackEventsByUserItemEventsItemEventDataDeliveryInfoJSON;
  "block_time"?: string;
  "block_type"?: BlockType;
  "domain"?: string;
  "SMTP_blocks_count"?: number;
  "domain_status"?: DomainStatus;
}

/** Fields of new WebhookCallbackEventsByUserItemEventsItemEventData(): a nested model may be a plain object in the API format. */
export interface WebhookCallbackEventsByUserItemEventsItemEventDataInit {
  /**
   * Job identifier returned earlier by [email/send](https://docs.unione.io/en/web-api-ref#email-send)
   * method. Property exists only if event_name="transactional_email_status".
   */
  jobId?: string;
  /**
   * Metadata passed in [email/send](https://docs.unione.io/en/web-api-ref#email-send) method in
   * recipients.metadata or global_metadata properties. This property exists only if
   * event_name="transactional_email_status".
   */
  metadata?: Record<string, string>;
  /** Recipient's email. This property exists only if event_name="transactional_email_status". */
  email?: string;
  /**
   * Email delivery status. This property exists only if event_name="transactional_email_status".
   * Possible values are:
   *
   * __accepted__ — the message has been accepted, but not sent yet.
   * __sent__ — the message has been sent, but not delivered yet.
   * __delivered__ — the message has been delivered. It can be changed to “opened”, “clicked”,
   * “unsubscribed”, “subscribed” or “spam”.
   * __opened__ — the message has been delivered and read. It can be changed to “clicked”,
   * “unsubscribed”, “subscribed” or “spam”.
   * __clicked__ — the message has been delivered, read, and at least one of the links in email has been
   * clicked. It can be changed to “unsubscribed”, “subscribed” or “spam”.
   * __unsubscribed__ — the message has been delivered to the recipient and read, but then the recipient
   * unsubscribed. It can be changed to “subscribed”.
   * __subscribed__ — the message has been delivered to the recipient and read, but then the recipient
   * unsubscribed and subscribed again. It can be changed to “unsubscribed”.
   * __soft_bounced__ — temporary delivery failure. UniOne will try to deliver the message during 48
   * hours. In case of success the status changes to “delivered”, in case of failure to deliver during 48
   * hours message status changes to “hard_bounced”.
   * __hard_bounced__ — failed to deliver the message, there will be no delivery attempts. It's a final
   * status. There are a lot of possible reasons, you can use SMTP response from
   * delivery_info.destination_response field or UniOne internal reason classification from
   * delivery_info.delivery_status field to analyze the reason.
   * __spam__ — the message has been delivered, but it was reported as spam by the recipient. UniOne can
   * receive and process the spam complaint from several domains, including msn.com, outlook.com,
   * hotmail.com, live.com, ukr.net, yahoo.com, aol.com using
   * [FBL](https://en.wikipedia.org/wiki/Feedback_loop_(email)).
   */
  status?: EmailStatus;
  /**
   * Event date & time in UTC time zone in "YYYY-MM-DD hh:mm:ss" format. This property exists only if
   * event_name="transactional_email_status".
   */
  eventTime?: string;
  /**
   * URL for "opened" and "clicked" statuses. This property exists only if
   * event_name="transactional_email_status".
   */
  url?: string;
  /**
   * Object with detailed delivery info.Event date & time in UTC time zone in "YYYY-MM-DD hh:mm:ss"
   * format. This property exists only if webhook has delivery_info proeprty set to 1 and
   * event_name="transactional_email_status".
   */
  deliveryInfo?: WebhookCallbackEventsByUserItemEventsItemEventDataDeliveryInfo | WebhookCallbackEventsByUserItemEventsItemEventDataDeliveryInfoJSON;
  /**
   * Spam block date & time in UTC time zone in "YYYY-MM-DD hh:mm:ss" format. This property exists only
   * if event_name="transactional_spam_block".
   */
  blockTime?: string;
  /**
   * Spam block type, either single or multiple sending SMTP. For single sending SMTP block in common
   * pool UniOne retries several other SMTPs. This property exists only if
   * event_name="transactional_spam_block".
   */
  blockType?: BlockType;
  /** Domain that blocked sending. This property exists only if event_name="transactional_spam_block". */
  domain?: string;
  /** Number of sending SMTPs blocked. This property exists only if event_name="transactional_spam_block". */
  sMTPBlocksCount?: number;
  /**
   * Whether it's a block or unblock event. This property exists only if
   * event_name="transactional_spam_block".
   */
  domainStatus?: DomainStatus;
}

/**
 * Object with different event properties depending on "event_name". Below you can see all the
 * properties, "transactional_email_status"-related first and then "transactional_spam_block"-related.
 */
export declare class WebhookCallbackEventsByUserItemEventsItemEventData {
  constructor(data?: WebhookCallbackEventsByUserItemEventsItemEventDataInit);
  /**
   * Job identifier returned earlier by [email/send](https://docs.unione.io/en/web-api-ref#email-send)
   * method. Property exists only if event_name="transactional_email_status".
   */
  jobId?: string;
  /**
   * Metadata passed in [email/send](https://docs.unione.io/en/web-api-ref#email-send) method in
   * recipients.metadata or global_metadata properties. This property exists only if
   * event_name="transactional_email_status".
   */
  metadata?: Record<string, string>;
  /** Recipient's email. This property exists only if event_name="transactional_email_status". */
  email?: string;
  /**
   * Email delivery status. This property exists only if event_name="transactional_email_status".
   * Possible values are:
   *
   * __accepted__ — the message has been accepted, but not sent yet.
   * __sent__ — the message has been sent, but not delivered yet.
   * __delivered__ — the message has been delivered. It can be changed to “opened”, “clicked”,
   * “unsubscribed”, “subscribed” or “spam”.
   * __opened__ — the message has been delivered and read. It can be changed to “clicked”,
   * “unsubscribed”, “subscribed” or “spam”.
   * __clicked__ — the message has been delivered, read, and at least one of the links in email has been
   * clicked. It can be changed to “unsubscribed”, “subscribed” or “spam”.
   * __unsubscribed__ — the message has been delivered to the recipient and read, but then the recipient
   * unsubscribed. It can be changed to “subscribed”.
   * __subscribed__ — the message has been delivered to the recipient and read, but then the recipient
   * unsubscribed and subscribed again. It can be changed to “unsubscribed”.
   * __soft_bounced__ — temporary delivery failure. UniOne will try to deliver the message during 48
   * hours. In case of success the status changes to “delivered”, in case of failure to deliver during 48
   * hours message status changes to “hard_bounced”.
   * __hard_bounced__ — failed to deliver the message, there will be no delivery attempts. It's a final
   * status. There are a lot of possible reasons, you can use SMTP response from
   * delivery_info.destination_response field or UniOne internal reason classification from
   * delivery_info.delivery_status field to analyze the reason.
   * __spam__ — the message has been delivered, but it was reported as spam by the recipient. UniOne can
   * receive and process the spam complaint from several domains, including msn.com, outlook.com,
   * hotmail.com, live.com, ukr.net, yahoo.com, aol.com using
   * [FBL](https://en.wikipedia.org/wiki/Feedback_loop_(email)).
   */
  status?: EmailStatus;
  /**
   * Event date & time in UTC time zone in "YYYY-MM-DD hh:mm:ss" format. This property exists only if
   * event_name="transactional_email_status".
   */
  eventTime?: string;
  /**
   * URL for "opened" and "clicked" statuses. This property exists only if
   * event_name="transactional_email_status".
   */
  url?: string;
  /**
   * Object with detailed delivery info.Event date & time in UTC time zone in "YYYY-MM-DD hh:mm:ss"
   * format. This property exists only if webhook has delivery_info proeprty set to 1 and
   * event_name="transactional_email_status".
   */
  deliveryInfo?: WebhookCallbackEventsByUserItemEventsItemEventDataDeliveryInfo;
  /**
   * Spam block date & time in UTC time zone in "YYYY-MM-DD hh:mm:ss" format. This property exists only
   * if event_name="transactional_spam_block".
   */
  blockTime?: string;
  /**
   * Spam block type, either single or multiple sending SMTP. For single sending SMTP block in common
   * pool UniOne retries several other SMTPs. This property exists only if
   * event_name="transactional_spam_block".
   */
  blockType?: BlockType;
  /** Domain that blocked sending. This property exists only if event_name="transactional_spam_block". */
  domain?: string;
  /** Number of sending SMTPs blocked. This property exists only if event_name="transactional_spam_block". */
  sMTPBlocksCount?: number;
  /**
   * Whether it's a block or unblock event. This property exists only if
   * event_name="transactional_spam_block".
   */
  domainStatus?: DomainStatus;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): WebhookCallbackEventsByUserItemEventsItemEventData;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): WebhookCallbackEventsByUserItemEventsItemEventDataJSON;
}

/** WebhookCallbackEventsByUserItemEventsItemEventDataDeliveryInfo in the API format: the object sent and received as JSON. */
export interface WebhookCallbackEventsByUserItemEventsItemEventDataDeliveryInfoJSON {
  "delivery_status"?: string;
  "destination_response"?: string;
  "user_agent"?: string;
  "device_type"?: DeviceType;
  "device_brand"?: string;
  "os_name"?: string;
  "browser_name"?: string;
  "email_client_name"?: string;
  "traffic_type"?: TrafficType;
  "ip"?: string;
  "country_code"?: string;
  "country"?: string;
  "city"?: string;
  "sender_ip"?: string;
}

/** Fields of new WebhookCallbackEventsByUserItemEventsItemEventDataDeliveryInfo(): a nested model may be a plain object in the API format. */
export interface WebhookCallbackEventsByUserItemEventsItemEventDataDeliveryInfoInit {
  /**
   * UniOne internal detailed delivery status. Some possible values are:
   *
   * __err_user_unknown__ -- email address doesn't exist;
   * __err_user_inactive__ -- email address isn't used anymore;
   * __err_will_retry__ -- email was temporary rejected, delivery will be retried later;
   * __err_mailbox_discarded__ -- email address was active earlier, but now it's deleted;
   * __err_mailbox_full__ -- mailbox is full;
   * __err_spam_rejected__ -- email was rejected as a spam;
   * __err_blacklisted__ -- email was rejected because sender IP or sender domain is found in a black
   * list;
   * __err_too_large__ -- email size is over limit, according to recipient's server;
   * __err_unsubscribed__ -- email was unsubscribed;
   * __err_unreachable__ -- numerous delivery failures lead to mark this email address as permanently
   * unavailable;
   * __err_skip_letter__ -- sending has been canceled because the email address is temporarily
   * unavailable;
   * __err_domain_inactive__ -- the domain does not accept mail or does not exist;
   * __err_destination_misconfigured__ -- the domain does not accept mail due to incorrect settings on
   * the recipient’s side, and the server’s response contains information about a cause that can be fixed
   * (for example, an inoperative blacklist is used, etc.);
   * __err_delivery_failed__ -- delivery failed due to other reasons;
   * __err_spam_skipped__ -- sending has been canceled because the campaign has been blocked as a spam;
   * __err_lost__ -- the message was not sent due to inconsistency of its parts or it has been lost
   * because of the failure on our side. The sender needs to re-send the letter on his own, since the
   * original has not been saved;
   *
   * We reserve the right to change or add internal delivery statuses as we need, so the following list
   * is provided as an example only, without any description: ok_sent, ok_delivered, ok_read,
   * ok_link_visited, ok_unsubscribed, ok_resubscribed, ok_spam_folder, ok_fbl, not_sent,
   * skip_dup_unreachable, skip_dup_temp_unreachable, skip_dup_mailbox_full, err_spam_removed,
   * err_resend, err_unknown, err_retry_letter, err_src_invalid, err_dest_invalid, err_not_available,
   * err_internal, err_no_dns, err_no_smtp, err_giveup.
   */
  deliveryStatus?: string;
  /** SMTP response. */
  destinationResponse?: string;
  /** User agent of recipient. Present only if detected for "clicked" and "opened" statuses. */
  userAgent?: string;
  /**
   * Recipient's device type, detected from the user agent. Present for "clicked" and "opened" statuses;
   * equals "unknown" if the device type couldn't be detected.
   */
  deviceType?: DeviceType;
  /**
   * Recipient's device brand, detected from the user agent. Present for "clicked" and "opened" statuses
   * if detected. For device_type "mobile" and "tablet" it's always present and equals "unknown" when the
   * brand couldn't be detected.
   */
  deviceBrand?: string;
  /**
   * Name of the operating system of the recipient's device, detected from the user agent. Present for
   * "clicked" and "opened" statuses; equals "unknown" if the OS couldn't be detected.
   */
  osName?: string;
  /**
   * Name of the browser the email was opened in, detected from the user agent. Present for "clicked" and
   * "opened" statuses only if a browser was detected, so it never comes together with email_client_name.
   */
  browserName?: string;
  /**
   * Name of the email client application the email was opened in, detected from the user agent. Present
   * for "clicked" and "opened" statuses only if an email client was detected, so it never comes together
   * with browser_name.
   */
  emailClientName?: string;
  /**
   * Traffic quality for "opened" and "clicked" statuses. "human" means a recognized browser or email
   * client without machine signs; "machine" means a bot, link scanner or security proxy; "protected"
   * means a mailbox/OS privacy proxy where a human action cannot be confirmed (Apple Mail Privacy
   * Protection / iCloud Private Relay, Gmail Image Proxy — Apple MPP is protected, not machine);
   * "unknown" means the user agent is missing, broken or not recognized.
   */
  trafficType?: TrafficType;
  /** Recipient's IP address. Present only if detected for "clicked" and "opened" statuses. */
  ip?: string;
  /**
   * ISO 3166-1 alpha-2 country code detected from recipient IP. Present for "clicked" and "opened"
   * statuses.
   */
  countryCode?: string;
  /** Country detected from recipient IP. Present for "clicked" and "opened" statuses. */
  country?: string;
  /** City detected from recipient IP. Present for "clicked" and "opened" statuses. */
  city?: string;
  /**
   * IP address of the SMTP server that sent the message. Present only for "delivered", "soft_bounced"
   * and "hard_bounced" statuses, if available.
   */
  senderIp?: string;
}

/**
 * Object with detailed delivery info.Event date & time in UTC time zone in "YYYY-MM-DD hh:mm:ss"
 * format. This property exists only if webhook has delivery_info proeprty set to 1 and
 * event_name="transactional_email_status".
 */
export declare class WebhookCallbackEventsByUserItemEventsItemEventDataDeliveryInfo {
  constructor(data?: WebhookCallbackEventsByUserItemEventsItemEventDataDeliveryInfoInit);
  /**
   * UniOne internal detailed delivery status. Some possible values are:
   *
   * __err_user_unknown__ -- email address doesn't exist;
   * __err_user_inactive__ -- email address isn't used anymore;
   * __err_will_retry__ -- email was temporary rejected, delivery will be retried later;
   * __err_mailbox_discarded__ -- email address was active earlier, but now it's deleted;
   * __err_mailbox_full__ -- mailbox is full;
   * __err_spam_rejected__ -- email was rejected as a spam;
   * __err_blacklisted__ -- email was rejected because sender IP or sender domain is found in a black
   * list;
   * __err_too_large__ -- email size is over limit, according to recipient's server;
   * __err_unsubscribed__ -- email was unsubscribed;
   * __err_unreachable__ -- numerous delivery failures lead to mark this email address as permanently
   * unavailable;
   * __err_skip_letter__ -- sending has been canceled because the email address is temporarily
   * unavailable;
   * __err_domain_inactive__ -- the domain does not accept mail or does not exist;
   * __err_destination_misconfigured__ -- the domain does not accept mail due to incorrect settings on
   * the recipient’s side, and the server’s response contains information about a cause that can be fixed
   * (for example, an inoperative blacklist is used, etc.);
   * __err_delivery_failed__ -- delivery failed due to other reasons;
   * __err_spam_skipped__ -- sending has been canceled because the campaign has been blocked as a spam;
   * __err_lost__ -- the message was not sent due to inconsistency of its parts or it has been lost
   * because of the failure on our side. The sender needs to re-send the letter on his own, since the
   * original has not been saved;
   *
   * We reserve the right to change or add internal delivery statuses as we need, so the following list
   * is provided as an example only, without any description: ok_sent, ok_delivered, ok_read,
   * ok_link_visited, ok_unsubscribed, ok_resubscribed, ok_spam_folder, ok_fbl, not_sent,
   * skip_dup_unreachable, skip_dup_temp_unreachable, skip_dup_mailbox_full, err_spam_removed,
   * err_resend, err_unknown, err_retry_letter, err_src_invalid, err_dest_invalid, err_not_available,
   * err_internal, err_no_dns, err_no_smtp, err_giveup.
   */
  deliveryStatus?: string;
  /** SMTP response. */
  destinationResponse?: string;
  /** User agent of recipient. Present only if detected for "clicked" and "opened" statuses. */
  userAgent?: string;
  /**
   * Recipient's device type, detected from the user agent. Present for "clicked" and "opened" statuses;
   * equals "unknown" if the device type couldn't be detected.
   */
  deviceType?: DeviceType;
  /**
   * Recipient's device brand, detected from the user agent. Present for "clicked" and "opened" statuses
   * if detected. For device_type "mobile" and "tablet" it's always present and equals "unknown" when the
   * brand couldn't be detected.
   */
  deviceBrand?: string;
  /**
   * Name of the operating system of the recipient's device, detected from the user agent. Present for
   * "clicked" and "opened" statuses; equals "unknown" if the OS couldn't be detected.
   */
  osName?: string;
  /**
   * Name of the browser the email was opened in, detected from the user agent. Present for "clicked" and
   * "opened" statuses only if a browser was detected, so it never comes together with email_client_name.
   */
  browserName?: string;
  /**
   * Name of the email client application the email was opened in, detected from the user agent. Present
   * for "clicked" and "opened" statuses only if an email client was detected, so it never comes together
   * with browser_name.
   */
  emailClientName?: string;
  /**
   * Traffic quality for "opened" and "clicked" statuses. "human" means a recognized browser or email
   * client without machine signs; "machine" means a bot, link scanner or security proxy; "protected"
   * means a mailbox/OS privacy proxy where a human action cannot be confirmed (Apple Mail Privacy
   * Protection / iCloud Private Relay, Gmail Image Proxy — Apple MPP is protected, not machine);
   * "unknown" means the user agent is missing, broken or not recognized.
   */
  trafficType?: TrafficType;
  /** Recipient's IP address. Present only if detected for "clicked" and "opened" statuses. */
  ip?: string;
  /**
   * ISO 3166-1 alpha-2 country code detected from recipient IP. Present for "clicked" and "opened"
   * statuses.
   */
  countryCode?: string;
  /** Country detected from recipient IP. Present for "clicked" and "opened" statuses. */
  country?: string;
  /** City detected from recipient IP. Present for "clicked" and "opened" statuses. */
  city?: string;
  /**
   * IP address of the SMTP server that sent the message. Present only for "delivered", "soft_bounced"
   * and "hard_bounced" statuses, if available.
   */
  senderIp?: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): WebhookCallbackEventsByUserItemEventsItemEventDataDeliveryInfo;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): WebhookCallbackEventsByUserItemEventsItemEventDataDeliveryInfoJSON;
}

/** WebhookGetRequest in the API format: the object sent and received as JSON. */
export interface WebhookGetRequestJSON {
  "url": string;
}

/** Fields of new WebhookGetRequest(): a nested model may be a plain object in the API format. */
export interface WebhookGetRequestInit {
  /** Webhook URL. */
  url: string;
}

/** WebhookGetRequest */
export declare class WebhookGetRequest {
  constructor(data: WebhookGetRequestInit);
  /** Webhook URL. */
  url: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): WebhookGetRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): WebhookGetRequestJSON;
}

/** WebhookGetResponse in the API format: the object sent and received as JSON. */
export interface WebhookGetResponseJSON {
  "status"?: string;
  "object"?: WebhookObjectJSON;
}

/** Fields of new WebhookGetResponse(): a nested model may be a plain object in the API format. */
export interface WebhookGetResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Object with all the webhook properties. */
  object?: WebhookObject | WebhookObjectJSON;
}

/** WebhookGetResponse */
export declare class WebhookGetResponse {
  constructor(data?: WebhookGetResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Object with all the webhook properties. */
  object?: WebhookObject;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): WebhookGetResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): WebhookGetResponseJSON;
}

/** WebhookListRequest in the API format: the object sent and received as JSON. */
export interface WebhookListRequestJSON {
  "limit"?: number;
  "offset"?: number;
}

/** Fields of new WebhookListRequest(): a nested model may be a plain object in the API format. */
export interface WebhookListRequestInit {
  /** Limits the number of webhooks returned. 50 is recommended. */
  limit?: number;
  /**
   * Index of the first webhook in the list, starting with 0.
   * Default: `0`.
   */
  offset?: number;
}

/** WebhookListRequest */
export declare class WebhookListRequest {
  constructor(data?: WebhookListRequestInit);
  /** Limits the number of webhooks returned. 50 is recommended. */
  limit?: number;
  /**
   * Index of the first webhook in the list, starting with 0.
   * Default: `0`.
   */
  offset?: number;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): WebhookListRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): WebhookListRequestJSON;
}

/** WebhookListResponse in the API format: the object sent and received as JSON. */
export interface WebhookListResponseJSON {
  "status"?: string;
  "objects"?: Array<WebhookObjectJSON>;
}

/** Fields of new WebhookListResponse(): a nested model may be a plain object in the API format. */
export interface WebhookListResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Array of webhooks objects. */
  objects?: Array<WebhookObject | WebhookObjectJSON>;
}

/** WebhookListResponse */
export declare class WebhookListResponse {
  constructor(data?: WebhookListResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Array of webhooks objects. */
  objects?: Array<WebhookObject>;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): WebhookListResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): WebhookListResponseJSON;
}

/** WebhookDeleteRequest in the API format: the object sent and received as JSON. */
export interface WebhookDeleteRequestJSON {
  "url": string;
}

/** Fields of new WebhookDeleteRequest(): a nested model may be a plain object in the API format. */
export interface WebhookDeleteRequestInit {
  /** Webhook URL. */
  url: string;
}

/** WebhookDeleteRequest */
export declare class WebhookDeleteRequest {
  constructor(data: WebhookDeleteRequestInit);
  /** Webhook URL. */
  url: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): WebhookDeleteRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): WebhookDeleteRequestJSON;
}
