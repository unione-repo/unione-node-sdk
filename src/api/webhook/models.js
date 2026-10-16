// Models of the Webhook section.
import { compact, toModel, toPlain } from "../../client/ApiClient.js";

/**
 * Webhook status, "active" by default. "disabled" means that webhook has been disabled by the user,
 * "stopped" means that webhook has been stopped by the system after 24h of failed calls (with minimum
 * of 10 distinct events).
 */
export const WebhookStatus = Object.freeze({
  ACTIVE: "active",
  DISABLED: "disabled",
  STOPPED: "stopped",
});

/** Notification format. "json_post"(default) or "json_post_gzip". */
export const WebhookEventFormat = Object.freeze({
  JSON_POST: "json_post",
  JSON_POST_GZIP: "json_post_gzip",
});

/**
 * Type of event data contained in event_data field, either "transactional_email_status" or
 * "transactional_spam_block".
 */
export const EventName = Object.freeze({
  TRANSACTIONAL_EMAIL_STATUS: "transactional_email_status",
  TRANSACTIONAL_SPAM_BLOCK: "transactional_spam_block",
});

/**
 * Recipient's device type, detected from the user agent. Present for "clicked" and "opened" statuses;
 * equals "unknown" if the device type couldn't be detected.
 */
export const DeviceType = Object.freeze({
  DESKTOP: "desktop",
  MOBILE: "mobile",
  TABLET: "tablet",
  OTHER: "other",
  UNKNOWN: "unknown",
});

/**
 * Traffic quality for "opened" and "clicked" statuses. "human" means a recognized browser or email
 * client without machine signs; "machine" means a bot, link scanner or security proxy; "protected"
 * means a mailbox/OS privacy proxy where a human action cannot be confirmed (Apple Mail Privacy
 * Protection / iCloud Private Relay, Gmail Image Proxy — Apple MPP is protected, not machine);
 * "unknown" means the user agent is missing, broken or not recognized.
 */
export const TrafficType = Object.freeze({
  HUMAN: "human",
  MACHINE: "machine",
  PROTECTED: "protected",
  UNKNOWN: "unknown",
});

/**
 * Spam block type, either single or multiple sending SMTP. For single sending SMTP block in common
 * pool UniOne retries several other SMTPs. This property exists only if
 * event_name="transactional_spam_block".
 */
export const BlockType = Object.freeze({
  ONE_SMTP: "one_smtp",
  ALL_SMTP: "all_smtp",
});

/**
 * Whether it's a block or unblock event. This property exists only if
 * event_name="transactional_spam_block".
 */
export const DomainStatus = Object.freeze({
  BLOCKED: "blocked",
  UNBLOCKED: "unblocked",
});

/** WebhookSetRequest */
export class WebhookSetRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} data.url URL that will receive the notification when an event occurs. The URL should be unique for a user or a project. Only ASCII characters are supported for now in URL, please convert to [Punycode](https://en.wikipedia.org/wiki/Punycode) if you need to use non-ASCII characters.
   * @param {"active"|"disabled"|"stopped"} [data.status] Webhook status, "active" by default. "disabled" means that webhook has been disabled by the user, "stopped" means that webhook has been stopped by the system after 24h of failed calls (with minimum of 10 distinct events).
   * @param {"json_post"|"json_post_gzip"} [data.eventFormat] Notification format. "json_post"(default) or "json_post_gzip".
   * @param {number} [data.deliveryInfo] Shall detailed delivery info be returned(1) or not(0). When it's 1, the information about SMTP response and internal delivery status is returned for "hard_bounced" and "soft_bounced" email statuses; the user agent, recipient IP address, detected geo fields, device info detected from the user agent (device type and brand, OS name, browser or email client name) and traffic_type (human, machine, protected or unknown) are returned for "opened" and "clicked" statuses; URL is returned for "clicked" status. For "delivered", "soft_bounced" and "hard_bounced" statuses UniOne may also return sender_ip, the IP address of the SMTP server that sent the message, if available.
   * @param {number} [data.singleEvent] 0=several event notifications can be reported in single webhook call, 1=only single event can be reported in one call (not recommended).
   * @param {number} [data.maxParallel] Maximum quantity of permitted parallel queries to your server. The more your server can handle - the better.
   * @param {WebhookEventsObject} [data.events] Object containing events to notify of.
   */
  constructor({ url, status, eventFormat, deliveryInfo, singleEvent, maxParallel, events } = {}) {
    /**
     * URL that will receive the notification when an event occurs. The URL should be unique for a user or
     * a project. Only ASCII characters are supported for now in URL, please convert to
     * [Punycode](https://en.wikipedia.org/wiki/Punycode) if you need to use non-ASCII characters.
     * @type {string|undefined}
     */
    this.url = url;
    /**
     * Webhook status, "active" by default. "disabled" means that webhook has been disabled by the user,
     * "stopped" means that webhook has been stopped by the system after 24h of failed calls (with minimum
     * of 10 distinct events).
     * Default: `active`.
     * @type {"active"|"disabled"|"stopped"|undefined}
     */
    this.status = status;
    /**
     * Notification format. "json_post"(default) or "json_post_gzip".
     * Default: `json_post`.
     * @type {"json_post"|"json_post_gzip"|undefined}
     */
    this.eventFormat = eventFormat;
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
     * @type {number|undefined}
     */
    this.deliveryInfo = deliveryInfo;
    /**
     * 0=several event notifications can be reported in single webhook call, 1=only single event can be
     * reported in one call (not recommended).
     * Allowed values: `0`, `1`.
     * Default: `0`.
     * @type {number|undefined}
     */
    this.singleEvent = singleEvent;
    /**
     * Maximum quantity of permitted parallel queries to your server. The more your server can handle - the
     * better.
     * Default: `10`.
     * @type {number|undefined}
     */
    this.maxParallel = maxParallel;
    /**
     * Object containing events to notify of.
     * @type {WebhookEventsObject|undefined}
     */
    this.events = events == null ? events : toModel(events, WebhookEventsObject);
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {WebhookSetRequest}
   */
  static fromJSON(data) {
    return new WebhookSetRequest({
      url: data["url"],
      status: data["status"],
      eventFormat: data["event_format"],
      deliveryInfo: data["delivery_info"],
      singleEvent: data["single_event"],
      maxParallel: data["max_parallel"],
      events: data["events"] == null ? undefined : toModel(data["events"], WebhookEventsObject),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "url": this.url,
      "status": this.status,
      "event_format": this.eventFormat,
      "delivery_info": this.deliveryInfo,
      "single_event": this.singleEvent,
      "max_parallel": this.maxParallel,
      "events": this.events == null ? undefined : toPlain(this.events),
    });
  }
}

/** Object containing events to notify of. */
export class WebhookEventsObject {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string[]} [data.spamBlock] If present then spam block events will be reported. Should contain single array element with "*" string.
   * @param {("sent"|"delivered"|"opened"|"clicked"|"unsubscribed"|"subscribed"|"soft_bounced"|"hard_bounced"|"spam")[]} [data.emailStatus] If present then email status change events will be reported. Contains names of statuses to notify of.
   */
  constructor({ spamBlock, emailStatus } = {}) {
    /**
     * If present then spam block events will be reported. Should contain single array element with "*"
     * string.
     * @type {string[]|undefined}
     */
    this.spamBlock = spamBlock;
    /**
     * If present then email status change events will be reported. Contains names of statuses to notify
     * of.
     * @type {("sent"|"delivered"|"opened"|"clicked"|"unsubscribed"|"subscribed"|"soft_bounced"|"hard_bounced"|"spam")[]|undefined}
     */
    this.emailStatus = emailStatus;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {WebhookEventsObject}
   */
  static fromJSON(data) {
    return new WebhookEventsObject({
      spamBlock: data["spam_block"],
      emailStatus: data["email_status"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "spam_block": this.spamBlock,
      "email_status": this.emailStatus,
    });
  }
}

/** WebhookSetResponse */
export class WebhookSetResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {WebhookObject} [data.object] Object with all the webhook properties.
   */
  constructor({ status, object } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * Object with all the webhook properties.
     * @type {WebhookObject|undefined}
     */
    this.object = object == null ? object : toModel(object, WebhookObject);
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {WebhookSetResponse}
   */
  static fromJSON(data) {
    return new WebhookSetResponse({
      status: data["status"],
      object: data["object"] == null ? undefined : toModel(data["object"], WebhookObject),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "object": this.object == null ? undefined : toPlain(this.object),
    });
  }
}

/** Object with all the webhook properties. */
export class WebhookObject {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {number} [data.id] Webhook unique identifier.
   * @param {string} [data.url] Webhook URL.
   * @param {"active"|"disabled"|"stopped"} [data.status] Webhook status, "active" by default. "disabled" means that webhook has been disabled by the user, "stopped" means that webhook has been stopped by the system after 24h of failed calls (with minimum of 10 distinct events).
   * @param {"json_post"|"json_post_gzip"} [data.eventFormat] Notification format. "json_post"(default) or "json_post_gzip".
   * @param {number} [data.deliveryInfo] Shall detailed delivery info be returned(1) or not(0). When it's 1, the information about SMTP response and internal delivery status is returned for "hard_bounced" and "soft_bounced" email statuses; the user agent, recipient IP address, detected geo fields, device info detected from the user agent (device type and brand, OS name, browser or email client name) and traffic_type (human, machine, protected or unknown) are returned for "opened" and "clicked" statuses; URL is returned for "clicked" status. For "delivered", "soft_bounced" and "hard_bounced" statuses UniOne may also return sender_ip, the IP address of the SMTP server that sent the message, if available.
   * @param {number} [data.singleEvent] 0=several event notifications can be reported in single webhook call, 1=only single event can be reported in one call (not recommended).
   * @param {number} [data.maxParallel] Maximum quantity of permitted parallel queries to your server. The more your server can handle - the better.
   * @param {string} [data.updatedAt] Webhook properties last update date and time in UTC timezone in "YYYY-MM-DD hh:mm:ss" format.
   * @param {WebhookEventsObject} [data.events] Object containing events to notify of.
   */
  constructor({ id, url, status, eventFormat, deliveryInfo, singleEvent, maxParallel, updatedAt, events } = {}) {
    /**
     * Webhook unique identifier.
     * @type {number|undefined}
     */
    this.id = id;
    /**
     * Webhook URL.
     * @type {string|undefined}
     */
    this.url = url;
    /**
     * Webhook status, "active" by default. "disabled" means that webhook has been disabled by the user,
     * "stopped" means that webhook has been stopped by the system after 24h of failed calls (with minimum
     * of 10 distinct events).
     * Default: `active`.
     * @type {"active"|"disabled"|"stopped"|undefined}
     */
    this.status = status;
    /**
     * Notification format. "json_post"(default) or "json_post_gzip".
     * Default: `json_post`.
     * @type {"json_post"|"json_post_gzip"|undefined}
     */
    this.eventFormat = eventFormat;
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
     * @type {number|undefined}
     */
    this.deliveryInfo = deliveryInfo;
    /**
     * 0=several event notifications can be reported in single webhook call, 1=only single event can be
     * reported in one call (not recommended).
     * Allowed values: `0`, `1`.
     * Default: `0`.
     * @type {number|undefined}
     */
    this.singleEvent = singleEvent;
    /**
     * Maximum quantity of permitted parallel queries to your server. The more your server can handle - the
     * better.
     * Default: `10`.
     * @type {number|undefined}
     */
    this.maxParallel = maxParallel;
    /**
     * Webhook properties last update date and time in UTC timezone in "YYYY-MM-DD hh:mm:ss" format.
     * @type {string|undefined}
     */
    this.updatedAt = updatedAt;
    /**
     * Object containing events to notify of.
     * @type {WebhookEventsObject|undefined}
     */
    this.events = events == null ? events : toModel(events, WebhookEventsObject);
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {WebhookObject}
   */
  static fromJSON(data) {
    return new WebhookObject({
      id: data["id"],
      url: data["url"],
      status: data["status"],
      eventFormat: data["event_format"],
      deliveryInfo: data["delivery_info"],
      singleEvent: data["single_event"],
      maxParallel: data["max_parallel"],
      updatedAt: data["updated_at"],
      events: data["events"] == null ? undefined : toModel(data["events"], WebhookEventsObject),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "id": this.id,
      "url": this.url,
      "status": this.status,
      "event_format": this.eventFormat,
      "delivery_info": this.deliveryInfo,
      "single_event": this.singleEvent,
      "max_parallel": this.maxParallel,
      "updated_at": this.updatedAt,
      "events": this.events == null ? undefined : toPlain(this.events),
    });
  }
}

/** Webhook callback format description. */
export class WebhookCallback {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.auth] MD5-hash of the message body, in which the value "auth" is replaced by api key of the user/project; with this field the recipient of the notification can both authenticate and verify the notification integrity
   * @param {WebhookCallbackEventsByUserItem[]} [data.eventsByUser] Array with only one element, containing events of a user/project.
   */
  constructor({ auth, eventsByUser } = {}) {
    /**
     * MD5-hash of the message body, in which the value "auth" is replaced by api key of the user/project;
     * with this field the recipient of the notification can both authenticate and verify the notification
     * integrity
     * @type {string|undefined}
     */
    this.auth = auth;
    /**
     * Array with only one element, containing events of a user/project.
     * @type {WebhookCallbackEventsByUserItem[]|undefined}
     */
    this.eventsByUser = eventsByUser == null ? eventsByUser : eventsByUser.map((item0) => toModel(item0, WebhookCallbackEventsByUserItem));
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {WebhookCallback}
   */
  static fromJSON(data) {
    return new WebhookCallback({
      auth: data["auth"],
      eventsByUser: data["events_by_user"] == null ? undefined : data["events_by_user"].map((item0) => toModel(item0, WebhookCallbackEventsByUserItem)),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "auth": this.auth,
      "events_by_user": this.eventsByUser == null ? undefined : this.eventsByUser.map((item0) => toPlain(item0)),
    });
  }
}

/** WebhookCallbackEventsByUserItem */
export class WebhookCallbackEventsByUserItem {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {number} [data.userId] Unique user identifier.
   * @param {string} [data.projectId] Project identifier, present only if webhook was registered for the project using project API key.
   * @param {string} [data.projectName] Project name, present only if webhook was registered for the project using project API key.
   * @param {WebhookCallbackEventsByUserItemEventsItem[]} [data.events] Array of events reported by webhook.
   */
  constructor({ userId, projectId, projectName, events } = {}) {
    /**
     * Unique user identifier.
     * @type {number|undefined}
     */
    this.userId = userId;
    /**
     * Project identifier, present only if webhook was registered for the project using project API key.
     * @type {string|undefined}
     */
    this.projectId = projectId;
    /**
     * Project name, present only if webhook was registered for the project using project API key.
     * @type {string|undefined}
     */
    this.projectName = projectName;
    /**
     * Array of events reported by webhook.
     * @type {WebhookCallbackEventsByUserItemEventsItem[]|undefined}
     */
    this.events = events == null ? events : events.map((item0) => toModel(item0, WebhookCallbackEventsByUserItemEventsItem));
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {WebhookCallbackEventsByUserItem}
   */
  static fromJSON(data) {
    return new WebhookCallbackEventsByUserItem({
      userId: data["user_id"],
      projectId: data["project_id"],
      projectName: data["project_name"],
      events: data["events"] == null ? undefined : data["events"].map((item0) => toModel(item0, WebhookCallbackEventsByUserItemEventsItem)),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "user_id": this.userId,
      "project_id": this.projectId,
      "project_name": this.projectName,
      "events": this.events == null ? undefined : this.events.map((item0) => toPlain(item0)),
    });
  }
}

/** WebhookCallbackEventsByUserItemEventsItem */
export class WebhookCallbackEventsByUserItemEventsItem {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {"transactional_email_status"|"transactional_spam_block"} [data.eventName] Type of event data contained in event_data field, either "transactional_email_status" or "transactional_spam_block".
   * @param {WebhookCallbackEventsByUserItemEventsItemEventData} [data.eventData] Object with different event properties depending on "event_name". Below you can see all the properties, "transactional_email_status"-related first and then "transactional_spam_block"-related.
   */
  constructor({ eventName, eventData } = {}) {
    /**
     * Type of event data contained in event_data field, either "transactional_email_status" or
     * "transactional_spam_block".
     * @type {"transactional_email_status"|"transactional_spam_block"|undefined}
     */
    this.eventName = eventName;
    /**
     * Object with different event properties depending on "event_name". Below you can see all the
     * properties, "transactional_email_status"-related first and then "transactional_spam_block"-related.
     * @type {WebhookCallbackEventsByUserItemEventsItemEventData|undefined}
     */
    this.eventData = eventData == null ? eventData : toModel(eventData, WebhookCallbackEventsByUserItemEventsItemEventData);
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {WebhookCallbackEventsByUserItemEventsItem}
   */
  static fromJSON(data) {
    return new WebhookCallbackEventsByUserItemEventsItem({
      eventName: data["event_name"],
      eventData: data["event_data"] == null ? undefined : toModel(data["event_data"], WebhookCallbackEventsByUserItemEventsItemEventData),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "event_name": this.eventName,
      "event_data": this.eventData == null ? undefined : toPlain(this.eventData),
    });
  }
}

/**
 * Object with different event properties depending on "event_name". Below you can see all the
 * properties, "transactional_email_status"-related first and then "transactional_spam_block"-related.
 */
export class WebhookCallbackEventsByUserItemEventsItemEventData {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.jobId] Job identifier returned earlier by [email/send](https://docs.unione.io/en/web-api-ref#email-send) method. Property exists only if event_name="transactional_email_status".
   * @param {Record<string, string>} [data.metadata] Metadata passed in [email/send](https://docs.unione.io/en/web-api-ref#email-send) method in recipients.metadata or global_metadata properties. This property exists only if event_name="transactional_email_status".
   * @param {string} [data.email] Recipient's email. This property exists only if event_name="transactional_email_status".
   * @param {"sent"|"delivered"|"opened"|"clicked"|"unsubscribed"|"subscribed"|"soft_bounced"|"hard_bounced"|"spam"} [data.status] Email delivery status. This property exists only if event_name="transactional_email_status". Possible values are:  __accepted__ — the message has been accepted, but not sent yet. __sent__ — the message has been sent, but not delivered yet. __delivered__ — the message has been delivered. It can be changed to “opened”, “clicked”, “unsubscribed”, “subscribed” or “spam”. __opened__ — the message has been delivered and read. It can be changed to “clicked”, “unsubscribed”, “subscribed” or “spam”. __clicked__ — the message has been delivered, read, and at least one of the links in email has been clicked. It can be changed to “unsubscribed”, “subscribed” or “spam”. __unsubscribed__ — the message has been delivered to the recipient and read, but then the recipient unsubscribed. It can be changed to “subscribed”. __subscribed__ — the message has been delivered to the recipient and read, but then the recipient unsubscribed and subscribed again. It can be changed to “unsubscribed”. __soft_bounced__ — temporary delivery failure. UniOne will try to deliver the message during 48 hours. In case of success the status changes to “delivered”, in case of failure to deliver during 48 hours message status changes to “hard_bounced”. __hard_bounced__ — failed to deliver the message, there will be no delivery attempts. It's a final status. There are a lot of possible reasons, you can use SMTP response from delivery_info.destination_response field or UniOne internal reason classification from delivery_info.delivery_status field to analyze the reason. __spam__ — the message has been delivered, but it was reported as spam by the recipient. UniOne can receive and process the spam complaint from several domains, including msn.com, outlook.com, hotmail.com, live.com, ukr.net, yahoo.com, aol.com using [FBL](https://en.wikipedia.org/wiki/Feedback_loop_(email)).
   * @param {string} [data.eventTime] Event date & time in UTC time zone in "YYYY-MM-DD hh:mm:ss" format. This property exists only if event_name="transactional_email_status".
   * @param {string} [data.url] URL for "opened" and "clicked" statuses. This property exists only if event_name="transactional_email_status".
   * @param {WebhookCallbackEventsByUserItemEventsItemEventDataDeliveryInfo} [data.deliveryInfo] Object with detailed delivery info.Event date & time in UTC time zone in "YYYY-MM-DD hh:mm:ss" format. This property exists only if webhook has delivery_info proeprty set to 1 and event_name="transactional_email_status".
   * @param {string} [data.blockTime] Spam block date & time in UTC time zone in "YYYY-MM-DD hh:mm:ss" format. This property exists only if event_name="transactional_spam_block".
   * @param {"one_smtp"|"all_smtp"} [data.blockType] Spam block type, either single or multiple sending SMTP. For single sending SMTP block in common pool UniOne retries several other SMTPs. This property exists only if event_name="transactional_spam_block".
   * @param {string} [data.domain] Domain that blocked sending. This property exists only if event_name="transactional_spam_block".
   * @param {number} [data.sMTPBlocksCount] Number of sending SMTPs blocked. This property exists only if event_name="transactional_spam_block".
   * @param {"blocked"|"unblocked"} [data.domainStatus] Whether it's a block or unblock event. This property exists only if event_name="transactional_spam_block".
   */
  constructor({ jobId, metadata, email, status, eventTime, url, deliveryInfo, blockTime, blockType, domain, sMTPBlocksCount, domainStatus } = {}) {
    /**
     * Job identifier returned earlier by [email/send](https://docs.unione.io/en/web-api-ref#email-send)
     * method. Property exists only if event_name="transactional_email_status".
     * @type {string|undefined}
     */
    this.jobId = jobId;
    /**
     * Metadata passed in [email/send](https://docs.unione.io/en/web-api-ref#email-send) method in
     * recipients.metadata or global_metadata properties. This property exists only if
     * event_name="transactional_email_status".
     * @type {Record<string, string>|undefined}
     */
    this.metadata = metadata;
    /**
     * Recipient's email. This property exists only if event_name="transactional_email_status".
     * @type {string|undefined}
     */
    this.email = email;
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
     * @type {"sent"|"delivered"|"opened"|"clicked"|"unsubscribed"|"subscribed"|"soft_bounced"|"hard_bounced"|"spam"|undefined}
     */
    this.status = status;
    /**
     * Event date & time in UTC time zone in "YYYY-MM-DD hh:mm:ss" format. This property exists only if
     * event_name="transactional_email_status".
     * @type {string|undefined}
     */
    this.eventTime = eventTime;
    /**
     * URL for "opened" and "clicked" statuses. This property exists only if
     * event_name="transactional_email_status".
     * @type {string|undefined}
     */
    this.url = url;
    /**
     * Object with detailed delivery info.Event date & time in UTC time zone in "YYYY-MM-DD hh:mm:ss"
     * format. This property exists only if webhook has delivery_info proeprty set to 1 and
     * event_name="transactional_email_status".
     * @type {WebhookCallbackEventsByUserItemEventsItemEventDataDeliveryInfo|undefined}
     */
    this.deliveryInfo = deliveryInfo == null ? deliveryInfo : toModel(deliveryInfo, WebhookCallbackEventsByUserItemEventsItemEventDataDeliveryInfo);
    /**
     * Spam block date & time in UTC time zone in "YYYY-MM-DD hh:mm:ss" format. This property exists only
     * if event_name="transactional_spam_block".
     * @type {string|undefined}
     */
    this.blockTime = blockTime;
    /**
     * Spam block type, either single or multiple sending SMTP. For single sending SMTP block in common
     * pool UniOne retries several other SMTPs. This property exists only if
     * event_name="transactional_spam_block".
     * @type {"one_smtp"|"all_smtp"|undefined}
     */
    this.blockType = blockType;
    /**
     * Domain that blocked sending. This property exists only if event_name="transactional_spam_block".
     * @type {string|undefined}
     */
    this.domain = domain;
    /**
     * Number of sending SMTPs blocked. This property exists only if event_name="transactional_spam_block".
     * @type {number|undefined}
     */
    this.sMTPBlocksCount = sMTPBlocksCount;
    /**
     * Whether it's a block or unblock event. This property exists only if
     * event_name="transactional_spam_block".
     * @type {"blocked"|"unblocked"|undefined}
     */
    this.domainStatus = domainStatus;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {WebhookCallbackEventsByUserItemEventsItemEventData}
   */
  static fromJSON(data) {
    return new WebhookCallbackEventsByUserItemEventsItemEventData({
      jobId: data["job_id"],
      metadata: data["metadata"],
      email: data["email"],
      status: data["status"],
      eventTime: data["event_time"],
      url: data["url"],
      deliveryInfo: data["delivery_info"] == null ? undefined : toModel(data["delivery_info"], WebhookCallbackEventsByUserItemEventsItemEventDataDeliveryInfo),
      blockTime: data["block_time"],
      blockType: data["block_type"],
      domain: data["domain"],
      sMTPBlocksCount: data["SMTP_blocks_count"],
      domainStatus: data["domain_status"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "job_id": this.jobId,
      "metadata": this.metadata,
      "email": this.email,
      "status": this.status,
      "event_time": this.eventTime,
      "url": this.url,
      "delivery_info": this.deliveryInfo == null ? undefined : toPlain(this.deliveryInfo),
      "block_time": this.blockTime,
      "block_type": this.blockType,
      "domain": this.domain,
      "SMTP_blocks_count": this.sMTPBlocksCount,
      "domain_status": this.domainStatus,
    });
  }
}

/**
 * Object with detailed delivery info.Event date & time in UTC time zone in "YYYY-MM-DD hh:mm:ss"
 * format. This property exists only if webhook has delivery_info proeprty set to 1 and
 * event_name="transactional_email_status".
 */
export class WebhookCallbackEventsByUserItemEventsItemEventDataDeliveryInfo {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.deliveryStatus] UniOne internal detailed delivery status. Some possible values are:  __err_user_unknown__ -- email address doesn't exist; __err_user_inactive__ -- email address isn't used anymore; __err_will_retry__ -- email was temporary rejected, delivery will be retried later; __err_mailbox_discarded__ -- email address was active earlier, but now it's deleted; __err_mailbox_full__ -- mailbox is full; __err_spam_rejected__ -- email was rejected as a spam; __err_blacklisted__ -- email was rejected because sender IP or sender domain is found in a black list; __err_too_large__ -- email size is over limit, according to recipient's server; __err_unsubscribed__ -- email was unsubscribed; __err_unreachable__ -- numerous delivery failures lead to mark this email address as permanently unavailable; __err_skip_letter__ -- sending has been canceled because the email address is temporarily unavailable; __err_domain_inactive__ -- the domain does not accept mail or does not exist; __err_destination_misconfigured__ -- the domain does not accept mail due to incorrect settings on the recipient’s side, and the server’s response contains information about a cause that can be fixed (for example, an inoperative blacklist is used, etc.); __err_delivery_failed__ -- delivery failed due to other reasons; __err_spam_skipped__ -- sending has been canceled because the campaign has been blocked as a spam; __err_lost__ -- the message was not sent due to inconsistency of its parts or it has been lost because of the failure on our side. The sender needs to re-send the letter on his own, since the original has not been saved;  We reserve the right to change or add internal delivery statuses as we need, so the following list is provided as an example only, without any description: ok_sent, ok_delivered, ok_read, ok_link_visited, ok_unsubscribed, ok_resubscribed, ok_spam_folder, ok_fbl, not_sent, skip_dup_unreachable, skip_dup_temp_unreachable, skip_dup_mailbox_full, err_spam_removed, err_resend, err_unknown, err_retry_letter, err_src_invalid, err_dest_invalid, err_not_available, err_internal, err_no_dns, err_no_smtp, err_giveup.
   * @param {string} [data.destinationResponse] SMTP response.
   * @param {string} [data.userAgent] User agent of recipient. Present only if detected for "clicked" and "opened" statuses.
   * @param {"desktop"|"mobile"|"tablet"|"other"|"unknown"} [data.deviceType] Recipient's device type, detected from the user agent. Present for "clicked" and "opened" statuses; equals "unknown" if the device type couldn't be detected.
   * @param {string} [data.deviceBrand] Recipient's device brand, detected from the user agent. Present for "clicked" and "opened" statuses if detected. For device_type "mobile" and "tablet" it's always present and equals "unknown" when the brand couldn't be detected.
   * @param {string} [data.osName] Name of the operating system of the recipient's device, detected from the user agent. Present for "clicked" and "opened" statuses; equals "unknown" if the OS couldn't be detected.
   * @param {string} [data.browserName] Name of the browser the email was opened in, detected from the user agent. Present for "clicked" and "opened" statuses only if a browser was detected, so it never comes together with email_client_name.
   * @param {string} [data.emailClientName] Name of the email client application the email was opened in, detected from the user agent. Present for "clicked" and "opened" statuses only if an email client was detected, so it never comes together with browser_name.
   * @param {"human"|"machine"|"protected"|"unknown"} [data.trafficType] Traffic quality for "opened" and "clicked" statuses. "human" means a recognized browser or email client without machine signs; "machine" means a bot, link scanner or security proxy; "protected" means a mailbox/OS privacy proxy where a human action cannot be confirmed (Apple Mail Privacy Protection / iCloud Private Relay, Gmail Image Proxy — Apple MPP is protected, not machine); "unknown" means the user agent is missing, broken or not recognized.
   * @param {string} [data.ip] Recipient's IP address. Present only if detected for "clicked" and "opened" statuses.
   * @param {string} [data.countryCode] ISO 3166-1 alpha-2 country code detected from recipient IP. Present for "clicked" and "opened" statuses.
   * @param {string} [data.country] Country detected from recipient IP. Present for "clicked" and "opened" statuses.
   * @param {string} [data.city] City detected from recipient IP. Present for "clicked" and "opened" statuses.
   * @param {string} [data.senderIp] IP address of the SMTP server that sent the message. Present only for "delivered", "soft_bounced" and "hard_bounced" statuses, if available.
   */
  constructor({ deliveryStatus, destinationResponse, userAgent, deviceType, deviceBrand, osName, browserName, emailClientName, trafficType, ip, countryCode, country, city, senderIp } = {}) {
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
     * @type {string|undefined}
     */
    this.deliveryStatus = deliveryStatus;
    /**
     * SMTP response.
     * @type {string|undefined}
     */
    this.destinationResponse = destinationResponse;
    /**
     * User agent of recipient. Present only if detected for "clicked" and "opened" statuses.
     * @type {string|undefined}
     */
    this.userAgent = userAgent;
    /**
     * Recipient's device type, detected from the user agent. Present for "clicked" and "opened" statuses;
     * equals "unknown" if the device type couldn't be detected.
     * @type {"desktop"|"mobile"|"tablet"|"other"|"unknown"|undefined}
     */
    this.deviceType = deviceType;
    /**
     * Recipient's device brand, detected from the user agent. Present for "clicked" and "opened" statuses
     * if detected. For device_type "mobile" and "tablet" it's always present and equals "unknown" when the
     * brand couldn't be detected.
     * @type {string|undefined}
     */
    this.deviceBrand = deviceBrand;
    /**
     * Name of the operating system of the recipient's device, detected from the user agent. Present for
     * "clicked" and "opened" statuses; equals "unknown" if the OS couldn't be detected.
     * @type {string|undefined}
     */
    this.osName = osName;
    /**
     * Name of the browser the email was opened in, detected from the user agent. Present for "clicked" and
     * "opened" statuses only if a browser was detected, so it never comes together with email_client_name.
     * @type {string|undefined}
     */
    this.browserName = browserName;
    /**
     * Name of the email client application the email was opened in, detected from the user agent. Present
     * for "clicked" and "opened" statuses only if an email client was detected, so it never comes together
     * with browser_name.
     * @type {string|undefined}
     */
    this.emailClientName = emailClientName;
    /**
     * Traffic quality for "opened" and "clicked" statuses. "human" means a recognized browser or email
     * client without machine signs; "machine" means a bot, link scanner or security proxy; "protected"
     * means a mailbox/OS privacy proxy where a human action cannot be confirmed (Apple Mail Privacy
     * Protection / iCloud Private Relay, Gmail Image Proxy — Apple MPP is protected, not machine);
     * "unknown" means the user agent is missing, broken or not recognized.
     * @type {"human"|"machine"|"protected"|"unknown"|undefined}
     */
    this.trafficType = trafficType;
    /**
     * Recipient's IP address. Present only if detected for "clicked" and "opened" statuses.
     * @type {string|undefined}
     */
    this.ip = ip;
    /**
     * ISO 3166-1 alpha-2 country code detected from recipient IP. Present for "clicked" and "opened"
     * statuses.
     * @type {string|undefined}
     */
    this.countryCode = countryCode;
    /**
     * Country detected from recipient IP. Present for "clicked" and "opened" statuses.
     * @type {string|undefined}
     */
    this.country = country;
    /**
     * City detected from recipient IP. Present for "clicked" and "opened" statuses.
     * @type {string|undefined}
     */
    this.city = city;
    /**
     * IP address of the SMTP server that sent the message. Present only for "delivered", "soft_bounced"
     * and "hard_bounced" statuses, if available.
     * @type {string|undefined}
     */
    this.senderIp = senderIp;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {WebhookCallbackEventsByUserItemEventsItemEventDataDeliveryInfo}
   */
  static fromJSON(data) {
    return new WebhookCallbackEventsByUserItemEventsItemEventDataDeliveryInfo({
      deliveryStatus: data["delivery_status"],
      destinationResponse: data["destination_response"],
      userAgent: data["user_agent"],
      deviceType: data["device_type"],
      deviceBrand: data["device_brand"],
      osName: data["os_name"],
      browserName: data["browser_name"],
      emailClientName: data["email_client_name"],
      trafficType: data["traffic_type"],
      ip: data["ip"],
      countryCode: data["country_code"],
      country: data["country"],
      city: data["city"],
      senderIp: data["sender_ip"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "delivery_status": this.deliveryStatus,
      "destination_response": this.destinationResponse,
      "user_agent": this.userAgent,
      "device_type": this.deviceType,
      "device_brand": this.deviceBrand,
      "os_name": this.osName,
      "browser_name": this.browserName,
      "email_client_name": this.emailClientName,
      "traffic_type": this.trafficType,
      "ip": this.ip,
      "country_code": this.countryCode,
      "country": this.country,
      "city": this.city,
      "sender_ip": this.senderIp,
    });
  }
}

/** WebhookGetRequest */
export class WebhookGetRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} data.url Webhook URL.
   */
  constructor({ url } = {}) {
    /**
     * Webhook URL.
     * @type {string|undefined}
     */
    this.url = url;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {WebhookGetRequest}
   */
  static fromJSON(data) {
    return new WebhookGetRequest({
      url: data["url"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "url": this.url,
    });
  }
}

/** WebhookGetResponse */
export class WebhookGetResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {WebhookObject} [data.object] Object with all the webhook properties.
   */
  constructor({ status, object } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * Object with all the webhook properties.
     * @type {WebhookObject|undefined}
     */
    this.object = object == null ? object : toModel(object, WebhookObject);
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {WebhookGetResponse}
   */
  static fromJSON(data) {
    return new WebhookGetResponse({
      status: data["status"],
      object: data["object"] == null ? undefined : toModel(data["object"], WebhookObject),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "object": this.object == null ? undefined : toPlain(this.object),
    });
  }
}

/** WebhookListRequest */
export class WebhookListRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {number} [data.limit] Limits the number of webhooks returned. 50 is recommended.
   * @param {number} [data.offset] Index of the first webhook in the list, starting with 0.
   */
  constructor({ limit, offset } = {}) {
    /**
     * Limits the number of webhooks returned. 50 is recommended.
     * @type {number|undefined}
     */
    this.limit = limit;
    /**
     * Index of the first webhook in the list, starting with 0.
     * Default: `0`.
     * @type {number|undefined}
     */
    this.offset = offset;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {WebhookListRequest}
   */
  static fromJSON(data) {
    return new WebhookListRequest({
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

/** WebhookListResponse */
export class WebhookListResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {WebhookObject[]} [data.objects] Array of webhooks objects.
   */
  constructor({ status, objects } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * Array of webhooks objects.
     * @type {WebhookObject[]|undefined}
     */
    this.objects = objects == null ? objects : objects.map((item0) => toModel(item0, WebhookObject));
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {WebhookListResponse}
   */
  static fromJSON(data) {
    return new WebhookListResponse({
      status: data["status"],
      objects: data["objects"] == null ? undefined : data["objects"].map((item0) => toModel(item0, WebhookObject)),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "objects": this.objects == null ? undefined : this.objects.map((item0) => toPlain(item0)),
    });
  }
}

/** WebhookDeleteRequest */
export class WebhookDeleteRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} data.url Webhook URL.
   */
  constructor({ url } = {}) {
    /**
     * Webhook URL.
     * @type {string|undefined}
     */
    this.url = url;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {WebhookDeleteRequest}
   */
  static fromJSON(data) {
    return new WebhookDeleteRequest({
      url: data["url"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "url": this.url,
    });
  }
}
