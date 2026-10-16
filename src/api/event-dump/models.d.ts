// Types of the models of the EventDump section.
import type { EmailStatus } from "../../common/models.js";

/** EventDumpCreateRequest in the API format: the object sent and received as JSON. */
export interface EventDumpCreateRequestJSON {
  "start_time": string;
  "end_time"?: string;
  "limit"?: number;
  "all_projects"?: boolean;
  "filter"?: FilterObjectJSON;
  "dump_fields"?: Array<string>;
  "aggregate"?: string;
  "delimiter"?: string;
  "format"?: string;
}

/** Fields of new EventDumpCreateRequest(): a nested model may be a plain object in the API format. */
export interface EventDumpCreateRequestInit {
  /**
   * Date and time in YYYY-MM-DD hh:mm:ss format, specifying period start time. Data is stored for up to
   * 32 days, depending on your tariff.
   */
  startTime: string;
  /** Date and time in YYYY-MM-DD hh:mm:ss format, specifying period end time (non-inclusive). */
  endTime?: string;
  /**
   * Maximum number of events returned (default is 50). If this value is over 100 000, several files will
   * be created, each having 100 000 events maximum.
   */
  limit?: number;
  /**
   * For accounts with projects enabled, the value all_projects=true allows to fetch data for all
   * existing projects.
   * Default: `False`.
   */
  allProjects?: boolean;
  /** An object with the properties of the event dump filter. */
  filter?: FilterObject | FilterObjectJSON;
  /**
   * An array of strings containing the names of columns you need in your report, in your preferred
   * order. If the 'dump_fields' array is missing or empty, a default field list and order will be
   * applied. Allowed values, in their default order, are - 'project_id', 'event_time', 'job_id',
   * 'from_email', 'email', 'status', 'delivery_status', 'metadata', 'destination_response',
   * 'user_agent', 'url', 'ip', 'tags'. For maximum security, the 'subject' field is not included by
   * default, but you can add it by explicitly including in the 'dump_fields' array.
   */
  dumpFields?: Array<string>;
  /**
   * Allows you to obtain aggregated statistics for a given time period. The two allowed values are:
   *
   * - __day_status__ - fetch aggregated statistics (the filter value must be missing or empty, as filters are not allowed with this option);
   * - __an empty string__ - used by default, event_dump/create works as if the aggregate parameter is omitted.
   */
  aggregate?: string;
  /** Field delimiter, can be set to either  ',' or ';', defaults to  ','. */
  delimiter?: string;
  /**
   * File format, either “csv” (default) or “csv_gzip”.
   * Default: `csv`.
   */
  format?: string;
}

/** EventDumpCreateRequest */
export declare class EventDumpCreateRequest {
  constructor(data: EventDumpCreateRequestInit);
  /**
   * Date and time in YYYY-MM-DD hh:mm:ss format, specifying period start time. Data is stored for up to
   * 32 days, depending on your tariff.
   */
  startTime: string;
  /** Date and time in YYYY-MM-DD hh:mm:ss format, specifying period end time (non-inclusive). */
  endTime?: string;
  /**
   * Maximum number of events returned (default is 50). If this value is over 100 000, several files will
   * be created, each having 100 000 events maximum.
   */
  limit?: number;
  /**
   * For accounts with projects enabled, the value all_projects=true allows to fetch data for all
   * existing projects.
   * Default: `False`.
   */
  allProjects?: boolean;
  /** An object with the properties of the event dump filter. */
  filter?: FilterObject;
  /**
   * An array of strings containing the names of columns you need in your report, in your preferred
   * order. If the 'dump_fields' array is missing or empty, a default field list and order will be
   * applied. Allowed values, in their default order, are - 'project_id', 'event_time', 'job_id',
   * 'from_email', 'email', 'status', 'delivery_status', 'metadata', 'destination_response',
   * 'user_agent', 'url', 'ip', 'tags'. For maximum security, the 'subject' field is not included by
   * default, but you can add it by explicitly including in the 'dump_fields' array.
   */
  dumpFields?: Array<string>;
  /**
   * Allows you to obtain aggregated statistics for a given time period. The two allowed values are:
   *
   * - __day_status__ - fetch aggregated statistics (the filter value must be missing or empty, as filters are not allowed with this option);
   * - __an empty string__ - used by default, event_dump/create works as if the aggregate parameter is omitted.
   */
  aggregate?: string;
  /** Field delimiter, can be set to either  ',' or ';', defaults to  ','. */
  delimiter?: string;
  /**
   * File format, either “csv” (default) or “csv_gzip”.
   * Default: `csv`.
   */
  format?: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): EventDumpCreateRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): EventDumpCreateRequestJSON;
}

/** FilterObject in the API format: the object sent and received as JSON. */
export interface FilterObjectJSON {
  "job_id"?: string;
  "status"?: EmailStatus;
  "delivery_status"?: string;
  "email"?: string;
  "email_from"?: string;
  "domain"?: string;
  "campaign_id"?: string;
}

/** Fields of new FilterObject(): a nested model may be a plain object in the API format. */
export interface FilterObjectInit {
  /**
   * Job identifier returned earlier by [email/send](https://docs.unione.io/en/web-api-ref#email-send)
   * method.
   */
  jobId?: string;
  /**
   * Email status. Possible values are:
   *
   * __accepted__ — the message has been accepted, but not sent yet.
   * __sent__ — the message has been sent, but not delivered yet.
   * __delivered__ — the message has been delivered.
   * __opened__ — the message has been delivered and read.
   * __clicked__ — the message has been delivered, read, and at least one of the links in email has been
   * clicked.
   * __unsubscribed__ — the message has been delivered to the recipient and read, but then the recipient
   * unsubscribed.
   * __subscribed__ — the message has been delivered to the recipient and read, but then the recipient
   * unsubscribed and subscribed again.
   * __soft_bounced__ — temporary delivery failure. UniOne will try to deliver the message during 48
   * hours.
   * __hard_bounced__ — failed to deliver the message, there will be no delivery attempts.
   * __spam__ — the message has been delivered, but it was reported as spam by the recipient.
   */
  status?: EmailStatus;
  /**
   * UniOne internal detailed delivery status, you can pass several values at once, comma-separated. Some
   * possible values are:
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
  /** Recipient email address */
  email?: string;
  /** Sender email address */
  emailFrom?: string;
  /** Recipient domain */
  domain?: string;
  /**
   * Campaign identifier, unsigned decimal integer or UUID up to 128-bit, passed in metadata with name
   * "campaign_id" (name is configurable thru support).
   */
  campaignId?: string;
}

/** An object with the properties of the event dump filter. */
export declare class FilterObject {
  constructor(data?: FilterObjectInit);
  /**
   * Job identifier returned earlier by [email/send](https://docs.unione.io/en/web-api-ref#email-send)
   * method.
   */
  jobId?: string;
  /**
   * Email status. Possible values are:
   *
   * __accepted__ — the message has been accepted, but not sent yet.
   * __sent__ — the message has been sent, but not delivered yet.
   * __delivered__ — the message has been delivered.
   * __opened__ — the message has been delivered and read.
   * __clicked__ — the message has been delivered, read, and at least one of the links in email has been
   * clicked.
   * __unsubscribed__ — the message has been delivered to the recipient and read, but then the recipient
   * unsubscribed.
   * __subscribed__ — the message has been delivered to the recipient and read, but then the recipient
   * unsubscribed and subscribed again.
   * __soft_bounced__ — temporary delivery failure. UniOne will try to deliver the message during 48
   * hours.
   * __hard_bounced__ — failed to deliver the message, there will be no delivery attempts.
   * __spam__ — the message has been delivered, but it was reported as spam by the recipient.
   */
  status?: EmailStatus;
  /**
   * UniOne internal detailed delivery status, you can pass several values at once, comma-separated. Some
   * possible values are:
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
  /** Recipient email address */
  email?: string;
  /** Sender email address */
  emailFrom?: string;
  /** Recipient domain */
  domain?: string;
  /**
   * Campaign identifier, unsigned decimal integer or UUID up to 128-bit, passed in metadata with name
   * "campaign_id" (name is configurable thru support).
   */
  campaignId?: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): FilterObject;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): FilterObjectJSON;
}

/** EventDumpCreateResponse in the API format: the object sent and received as JSON. */
export interface EventDumpCreateResponseJSON {
  "status"?: string;
  "dump_id"?: string;
}

/** Fields of new EventDumpCreateResponse(): a nested model may be a plain object in the API format. */
export interface EventDumpCreateResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /**
   * Dump identifier, used to call the
   * [event-dump/get](https://docs.unione.io/en/web-api-ref#event-dump-get) method.
   */
  dumpId?: string;
}

/** EventDumpCreateResponse */
export declare class EventDumpCreateResponse {
  constructor(data?: EventDumpCreateResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /**
   * Dump identifier, used to call the
   * [event-dump/get](https://docs.unione.io/en/web-api-ref#event-dump-get) method.
   */
  dumpId?: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): EventDumpCreateResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): EventDumpCreateResponseJSON;
}

/** EventDumpGetRequest in the API format: the object sent and received as JSON. */
export interface EventDumpGetRequestJSON {
  "dump_id": string;
}

/** Fields of new EventDumpGetRequest(): a nested model may be a plain object in the API format. */
export interface EventDumpGetRequestInit {
  /**
   * Dump identifier received by the method
   * [event-dump/create](https://docs.unione.io/en/web-api-ref#event-dump-create).
   */
  dumpId: string;
}

/** EventDumpGetRequest */
export declare class EventDumpGetRequest {
  constructor(data: EventDumpGetRequestInit);
  /**
   * Dump identifier received by the method
   * [event-dump/create](https://docs.unione.io/en/web-api-ref#event-dump-create).
   */
  dumpId: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): EventDumpGetRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): EventDumpGetRequestJSON;
}

/** EventDumpGetResponse in the API format: the object sent and received as JSON. */
export interface EventDumpGetResponseJSON {
  "status"?: string;
  "event_dump"?: EventDumpObjectJSON;
}

/** Fields of new EventDumpGetResponse(): a nested model may be a plain object in the API format. */
export interface EventDumpGetResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** An object with the properties of the event dump. */
  eventDump?: EventDumpObject | EventDumpObjectJSON;
}

/** EventDumpGetResponse */
export declare class EventDumpGetResponse {
  constructor(data?: EventDumpGetResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** An object with the properties of the event dump. */
  eventDump?: EventDumpObject;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): EventDumpGetResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): EventDumpGetResponseJSON;
}

/** EventDumpObject in the API format: the object sent and received as JSON. */
export interface EventDumpObjectJSON {
  "dump_id"?: string;
  "dump_status"?: string;
  "files"?: Array<EventDumpFilesObjectJSON>;
}

/** Fields of new EventDumpObject(): a nested model may be a plain object in the API format. */
export interface EventDumpObjectInit {
  /**
   * Dump ID received by the method
   * [event-dump/create](https://docs.unione.io/en/web-api-ref#event-dump-create).
   */
  dumpId?: string;
  /**
   * Task status, possible values are:
   *
   * - __queued__ - the task is in the queue, processing is not started yet;
   * - __in_process__ - the request is being processed;
   * - __ready__ - the task is finished, dump file is ready for download;
   * - __failed__ -  processing failed due to an internal error.
   */
  dumpStatus?: string;
  /**
   * An array of objects, each representing a file, ready for download. You may start downloading
   * everything listed in “files” even if "dump_status" is still "in_process". If there are no events,
   * according to the specified parameters, an empty array will be returned.
   */
  files?: Array<EventDumpFilesObject | EventDumpFilesObjectJSON>;
}

/** An object with the properties of the event dump. */
export declare class EventDumpObject {
  constructor(data?: EventDumpObjectInit);
  /**
   * Dump ID received by the method
   * [event-dump/create](https://docs.unione.io/en/web-api-ref#event-dump-create).
   */
  dumpId?: string;
  /**
   * Task status, possible values are:
   *
   * - __queued__ - the task is in the queue, processing is not started yet;
   * - __in_process__ - the request is being processed;
   * - __ready__ - the task is finished, dump file is ready for download;
   * - __failed__ -  processing failed due to an internal error.
   */
  dumpStatus?: string;
  /**
   * An array of objects, each representing a file, ready for download. You may start downloading
   * everything listed in “files” even if "dump_status" is still "in_process". If there are no events,
   * according to the specified parameters, an empty array will be returned.
   */
  files?: Array<EventDumpFilesObject>;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): EventDumpObject;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): EventDumpObjectJSON;
}

/** EventDumpFilesObject in the API format: the object sent and received as JSON. */
export interface EventDumpFilesObjectJSON {
  "url"?: string;
  "size"?: number;
}

/** Fields of new EventDumpFilesObject(): a nested model may be a plain object in the API format. */
export interface EventDumpFilesObjectInit {
  /**
   * Use this unique URL to download the requested dump file (either .csv or .csv.gz, depending on your
   * request).
   */
  url?: string;
  /** File size. */
  size?: number;
}

/** An object with the properties of the event dump file. */
export declare class EventDumpFilesObject {
  constructor(data?: EventDumpFilesObjectInit);
  /**
   * Use this unique URL to download the requested dump file (either .csv or .csv.gz, depending on your
   * request).
   */
  url?: string;
  /** File size. */
  size?: number;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): EventDumpFilesObject;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): EventDumpFilesObjectJSON;
}

/** EventDumpListResponse in the API format: the object sent and received as JSON. */
export interface EventDumpListResponseJSON {
  "status"?: string;
  "event_dumps"?: Array<EventDumpObjectJSON>;
}

/** Fields of new EventDumpListResponse(): a nested model may be a plain object in the API format. */
export interface EventDumpListResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /**
   * An array of objects describing event dumps. Each object is similar to 'event_dump' object returned
   * by the [event-dump/get](https://docs.unione.io/en/web-api-ref#event-dump-get) method.
   */
  eventDumps?: Array<EventDumpObject | EventDumpObjectJSON>;
}

/** EventDumpListResponse */
export declare class EventDumpListResponse {
  constructor(data?: EventDumpListResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /**
   * An array of objects describing event dumps. Each object is similar to 'event_dump' object returned
   * by the [event-dump/get](https://docs.unione.io/en/web-api-ref#event-dump-get) method.
   */
  eventDumps?: Array<EventDumpObject>;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): EventDumpListResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): EventDumpListResponseJSON;
}

/** EventDumpDeleteRequest in the API format: the object sent and received as JSON. */
export interface EventDumpDeleteRequestJSON {
  "dump_id": string;
}

/** Fields of new EventDumpDeleteRequest(): a nested model may be a plain object in the API format. */
export interface EventDumpDeleteRequestInit {
  /**
   * Dump identifier, obtained via the
   * [event-dump/create](https://docs.unione.io/en/web-api-ref#event-dump-create) method.
   */
  dumpId: string;
}

/** EventDumpDeleteRequest */
export declare class EventDumpDeleteRequest {
  constructor(data: EventDumpDeleteRequestInit);
  /**
   * Dump identifier, obtained via the
   * [event-dump/create](https://docs.unione.io/en/web-api-ref#event-dump-create) method.
   */
  dumpId: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): EventDumpDeleteRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): EventDumpDeleteRequestJSON;
}
