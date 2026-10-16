// Models of the EventDump section.
import { compact, toModel, toPlain } from "../../client/ApiClient.js";

/** EventDumpCreateRequest */
export class EventDumpCreateRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} data.startTime Date and time in YYYY-MM-DD hh:mm:ss format, specifying period start time. Data is stored for up to 32 days, depending on your tariff.
   * @param {string} [data.endTime] Date and time in YYYY-MM-DD hh:mm:ss format, specifying period end time (non-inclusive).
   * @param {number} [data.limit] Maximum number of events returned (default is 50). If this value is over 100 000, several files will be created, each having 100 000 events maximum.
   * @param {boolean} [data.allProjects] For accounts with projects enabled, the value all_projects=true allows to fetch data for all existing projects.
   * @param {FilterObject} [data.filter] An object with the properties of the event dump filter.
   * @param {string[]} [data.dumpFields] An array of strings containing the names of columns you need in your report, in your preferred order. If the 'dump_fields' array is missing or empty, a default field list and order will be applied. Allowed values, in their default order, are - 'project_id', 'event_time', 'job_id', 'from_email', 'email', 'status', 'delivery_status', 'metadata', 'destination_response', 'user_agent', 'url', 'ip', 'tags'. For maximum security, the 'subject' field is not included by default, but you can add it by explicitly including in the 'dump_fields' array.
   * @param {string} [data.aggregate] Allows you to obtain aggregated statistics for a given time period. The two allowed values are:  - __day_status__ - fetch aggregated statistics (the filter value must be missing or empty, as filters are not allowed with this option); - __an empty string__ - used by default, event_dump/create works as if the aggregate parameter is omitted.
   * @param {string} [data.delimiter] Field delimiter, can be set to either  ',' or ';', defaults to  ','.
   * @param {string} [data.format] File format, either “csv” (default) or “csv_gzip”.
   */
  constructor({ startTime, endTime, limit, allProjects, filter, dumpFields, aggregate, delimiter, format } = {}) {
    /**
     * Date and time in YYYY-MM-DD hh:mm:ss format, specifying period start time. Data is stored for up to
     * 32 days, depending on your tariff.
     * @type {string|undefined}
     */
    this.startTime = startTime;
    /**
     * Date and time in YYYY-MM-DD hh:mm:ss format, specifying period end time (non-inclusive).
     * @type {string|undefined}
     */
    this.endTime = endTime;
    /**
     * Maximum number of events returned (default is 50). If this value is over 100 000, several files will
     * be created, each having 100 000 events maximum.
     * @type {number|undefined}
     */
    this.limit = limit;
    /**
     * For accounts with projects enabled, the value all_projects=true allows to fetch data for all
     * existing projects.
     * Default: `False`.
     * @type {boolean|undefined}
     */
    this.allProjects = allProjects;
    /**
     * An object with the properties of the event dump filter.
     * @type {FilterObject|undefined}
     */
    this.filter = filter == null ? filter : toModel(filter, FilterObject);
    /**
     * An array of strings containing the names of columns you need in your report, in your preferred
     * order. If the 'dump_fields' array is missing or empty, a default field list and order will be
     * applied. Allowed values, in their default order, are - 'project_id', 'event_time', 'job_id',
     * 'from_email', 'email', 'status', 'delivery_status', 'metadata', 'destination_response',
     * 'user_agent', 'url', 'ip', 'tags'. For maximum security, the 'subject' field is not included by
     * default, but you can add it by explicitly including in the 'dump_fields' array.
     * @type {string[]|undefined}
     */
    this.dumpFields = dumpFields;
    /**
     * Allows you to obtain aggregated statistics for a given time period. The two allowed values are:
     *
     * - __day_status__ - fetch aggregated statistics (the filter value must be missing or empty, as filters are not allowed with this option);
     * - __an empty string__ - used by default, event_dump/create works as if the aggregate parameter is omitted.
     * @type {string|undefined}
     */
    this.aggregate = aggregate;
    /**
     * Field delimiter, can be set to either  ',' or ';', defaults to  ','.
     * @type {string|undefined}
     */
    this.delimiter = delimiter;
    /**
     * File format, either “csv” (default) or “csv_gzip”.
     * Default: `csv`.
     * @type {string|undefined}
     */
    this.format = format;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {EventDumpCreateRequest}
   */
  static fromJSON(data) {
    return new EventDumpCreateRequest({
      startTime: data["start_time"],
      endTime: data["end_time"],
      limit: data["limit"],
      allProjects: data["all_projects"],
      filter: data["filter"] == null ? undefined : toModel(data["filter"], FilterObject),
      dumpFields: data["dump_fields"],
      aggregate: data["aggregate"],
      delimiter: data["delimiter"],
      format: data["format"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "start_time": this.startTime,
      "end_time": this.endTime,
      "limit": this.limit,
      "all_projects": this.allProjects,
      "filter": this.filter == null ? undefined : toPlain(this.filter),
      "dump_fields": this.dumpFields,
      "aggregate": this.aggregate,
      "delimiter": this.delimiter,
      "format": this.format,
    });
  }
}

/** An object with the properties of the event dump filter. */
export class FilterObject {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.jobId] Job identifier returned earlier by [email/send](https://docs.unione.io/en/web-api-ref#email-send) method.
   * @param {"sent"|"delivered"|"opened"|"clicked"|"unsubscribed"|"subscribed"|"soft_bounced"|"hard_bounced"|"spam"} [data.status] Email status. Possible values are:  __accepted__ — the message has been accepted, but not sent yet. __sent__ — the message has been sent, but not delivered yet. __delivered__ — the message has been delivered. __opened__ — the message has been delivered and read. __clicked__ — the message has been delivered, read, and at least one of the links in email has been clicked. __unsubscribed__ — the message has been delivered to the recipient and read, but then the recipient unsubscribed. __subscribed__ — the message has been delivered to the recipient and read, but then the recipient unsubscribed and subscribed again. __soft_bounced__ — temporary delivery failure. UniOne will try to deliver the message during 48 hours. __hard_bounced__ — failed to deliver the message, there will be no delivery attempts. __spam__ — the message has been delivered, but it was reported as spam by the recipient.
   * @param {string} [data.deliveryStatus] UniOne internal detailed delivery status, you can pass several values at once, comma-separated. Some possible values are:  __err_user_unknown__ -- email address doesn't exist; __err_user_inactive__ -- email address isn't used anymore; __err_will_retry__ -- email was temporary rejected, delivery will be retried later; __err_mailbox_discarded__ -- email address was active earlier, but now it's deleted; __err_mailbox_full__ -- mailbox is full; __err_spam_rejected__ -- email was rejected as a spam; __err_blacklisted__ -- email was rejected because sender IP or sender domain is found in a black list; __err_too_large__ -- email size is over limit, according to recipient's server; __err_unsubscribed__ -- email was unsubscribed; __err_unreachable__ -- numerous delivery failures lead to mark this email address as permanently unavailable; __err_skip_letter__ -- sending has been canceled because the email address is temporarily unavailable; __err_domain_inactive__ -- the domain does not accept mail or does not exist; __err_destination_misconfigured__ -- the domain does not accept mail due to incorrect settings on the recipient’s side, and the server’s response contains information about a cause that can be fixed (for example, an inoperative blacklist is used, etc.); __err_delivery_failed__ -- delivery failed due to other reasons; __err_spam_skipped__ -- sending has been canceled because the campaign has been blocked as a spam; __err_lost__ -- the message was not sent due to inconsistency of its parts or it has been lost because of the failure on our side. The sender needs to re-send the letter on his own, since the original has not been saved;  We reserve the right to change or add internal delivery statuses as we need, so the following list is provided as an example only, without any description: ok_sent, ok_delivered, ok_read, ok_link_visited, ok_unsubscribed, ok_resubscribed, ok_spam_folder, ok_fbl, not_sent, skip_dup_unreachable, skip_dup_temp_unreachable, skip_dup_mailbox_full, err_spam_removed, err_resend, err_unknown, err_retry_letter, err_src_invalid, err_dest_invalid, err_not_available, err_internal, err_no_dns, err_no_smtp, err_giveup.
   * @param {string} [data.email] Recipient email address
   * @param {string} [data.emailFrom] Sender email address
   * @param {string} [data.domain] Recipient domain
   * @param {string} [data.campaignId] Campaign identifier, unsigned decimal integer or UUID up to 128-bit, passed in metadata with name "campaign_id" (name is configurable thru support).
   */
  constructor({ jobId, status, deliveryStatus, email, emailFrom, domain, campaignId } = {}) {
    /**
     * Job identifier returned earlier by [email/send](https://docs.unione.io/en/web-api-ref#email-send)
     * method.
     * @type {string|undefined}
     */
    this.jobId = jobId;
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
     * @type {"sent"|"delivered"|"opened"|"clicked"|"unsubscribed"|"subscribed"|"soft_bounced"|"hard_bounced"|"spam"|undefined}
     */
    this.status = status;
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
     * @type {string|undefined}
     */
    this.deliveryStatus = deliveryStatus;
    /**
     * Recipient email address
     * @type {string|undefined}
     */
    this.email = email;
    /**
     * Sender email address
     * @type {string|undefined}
     */
    this.emailFrom = emailFrom;
    /**
     * Recipient domain
     * @type {string|undefined}
     */
    this.domain = domain;
    /**
     * Campaign identifier, unsigned decimal integer or UUID up to 128-bit, passed in metadata with name
     * "campaign_id" (name is configurable thru support).
     * @type {string|undefined}
     */
    this.campaignId = campaignId;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {FilterObject}
   */
  static fromJSON(data) {
    return new FilterObject({
      jobId: data["job_id"],
      status: data["status"],
      deliveryStatus: data["delivery_status"],
      email: data["email"],
      emailFrom: data["email_from"],
      domain: data["domain"],
      campaignId: data["campaign_id"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "job_id": this.jobId,
      "status": this.status,
      "delivery_status": this.deliveryStatus,
      "email": this.email,
      "email_from": this.emailFrom,
      "domain": this.domain,
      "campaign_id": this.campaignId,
    });
  }
}

/** EventDumpCreateResponse */
export class EventDumpCreateResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {string} [data.dumpId] Dump identifier, used to call the [event-dump/get](https://docs.unione.io/en/web-api-ref#event-dump-get) method.
   */
  constructor({ status, dumpId } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * Dump identifier, used to call the
     * [event-dump/get](https://docs.unione.io/en/web-api-ref#event-dump-get) method.
     * @type {string|undefined}
     */
    this.dumpId = dumpId;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {EventDumpCreateResponse}
   */
  static fromJSON(data) {
    return new EventDumpCreateResponse({
      status: data["status"],
      dumpId: data["dump_id"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "dump_id": this.dumpId,
    });
  }
}

/** EventDumpGetRequest */
export class EventDumpGetRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} data.dumpId Dump identifier received by the method [event-dump/create](https://docs.unione.io/en/web-api-ref#event-dump-create).
   */
  constructor({ dumpId } = {}) {
    /**
     * Dump identifier received by the method
     * [event-dump/create](https://docs.unione.io/en/web-api-ref#event-dump-create).
     * @type {string|undefined}
     */
    this.dumpId = dumpId;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {EventDumpGetRequest}
   */
  static fromJSON(data) {
    return new EventDumpGetRequest({
      dumpId: data["dump_id"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "dump_id": this.dumpId,
    });
  }
}

/** EventDumpGetResponse */
export class EventDumpGetResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {EventDumpObject} [data.eventDump] An object with the properties of the event dump.
   */
  constructor({ status, eventDump } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * An object with the properties of the event dump.
     * @type {EventDumpObject|undefined}
     */
    this.eventDump = eventDump == null ? eventDump : toModel(eventDump, EventDumpObject);
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {EventDumpGetResponse}
   */
  static fromJSON(data) {
    return new EventDumpGetResponse({
      status: data["status"],
      eventDump: data["event_dump"] == null ? undefined : toModel(data["event_dump"], EventDumpObject),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "event_dump": this.eventDump == null ? undefined : toPlain(this.eventDump),
    });
  }
}

/** An object with the properties of the event dump. */
export class EventDumpObject {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.dumpId] Dump ID received by the method [event-dump/create](https://docs.unione.io/en/web-api-ref#event-dump-create).
   * @param {string} [data.dumpStatus] Task status, possible values are:  - __queued__ - the task is in the queue, processing is not started yet; - __in_process__ - the request is being processed; - __ready__ - the task is finished, dump file is ready for download; - __failed__ -  processing failed due to an internal error.
   * @param {EventDumpFilesObject[]} [data.files] An array of objects, each representing a file, ready for download. You may start downloading everything listed in “files” even if "dump_status" is still "in_process". If there are no events, according to the specified parameters, an empty array will be returned.
   */
  constructor({ dumpId, dumpStatus, files } = {}) {
    /**
     * Dump ID received by the method
     * [event-dump/create](https://docs.unione.io/en/web-api-ref#event-dump-create).
     * @type {string|undefined}
     */
    this.dumpId = dumpId;
    /**
     * Task status, possible values are:
     *
     * - __queued__ - the task is in the queue, processing is not started yet;
     * - __in_process__ - the request is being processed;
     * - __ready__ - the task is finished, dump file is ready for download;
     * - __failed__ -  processing failed due to an internal error.
     * @type {string|undefined}
     */
    this.dumpStatus = dumpStatus;
    /**
     * An array of objects, each representing a file, ready for download. You may start downloading
     * everything listed in “files” even if "dump_status" is still "in_process". If there are no events,
     * according to the specified parameters, an empty array will be returned.
     * @type {EventDumpFilesObject[]|undefined}
     */
    this.files = files == null ? files : files.map((item0) => toModel(item0, EventDumpFilesObject));
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {EventDumpObject}
   */
  static fromJSON(data) {
    return new EventDumpObject({
      dumpId: data["dump_id"],
      dumpStatus: data["dump_status"],
      files: data["files"] == null ? undefined : data["files"].map((item0) => toModel(item0, EventDumpFilesObject)),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "dump_id": this.dumpId,
      "dump_status": this.dumpStatus,
      "files": this.files == null ? undefined : this.files.map((item0) => toPlain(item0)),
    });
  }
}

/** An object with the properties of the event dump file. */
export class EventDumpFilesObject {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.url] Use this unique URL to download the requested dump file (either .csv or .csv.gz, depending on your request).
   * @param {number} [data.size] File size.
   */
  constructor({ url, size } = {}) {
    /**
     * Use this unique URL to download the requested dump file (either .csv or .csv.gz, depending on your
     * request).
     * @type {string|undefined}
     */
    this.url = url;
    /**
     * File size.
     * @type {number|undefined}
     */
    this.size = size;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {EventDumpFilesObject}
   */
  static fromJSON(data) {
    return new EventDumpFilesObject({
      url: data["url"],
      size: data["size"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "url": this.url,
      "size": this.size,
    });
  }
}

/** EventDumpListResponse */
export class EventDumpListResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {EventDumpObject[]} [data.eventDumps] An array of objects describing event dumps. Each object is similar to 'event_dump' object returned by the [event-dump/get](https://docs.unione.io/en/web-api-ref#event-dump-get) method.
   */
  constructor({ status, eventDumps } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * An array of objects describing event dumps. Each object is similar to 'event_dump' object returned
     * by the [event-dump/get](https://docs.unione.io/en/web-api-ref#event-dump-get) method.
     * @type {EventDumpObject[]|undefined}
     */
    this.eventDumps = eventDumps == null ? eventDumps : eventDumps.map((item0) => toModel(item0, EventDumpObject));
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {EventDumpListResponse}
   */
  static fromJSON(data) {
    return new EventDumpListResponse({
      status: data["status"],
      eventDumps: data["event_dumps"] == null ? undefined : data["event_dumps"].map((item0) => toModel(item0, EventDumpObject)),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "event_dumps": this.eventDumps == null ? undefined : this.eventDumps.map((item0) => toPlain(item0)),
    });
  }
}

/** EventDumpDeleteRequest */
export class EventDumpDeleteRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} data.dumpId Dump identifier, obtained via the [event-dump/create](https://docs.unione.io/en/web-api-ref#event-dump-create) method.
   */
  constructor({ dumpId } = {}) {
    /**
     * Dump identifier, obtained via the
     * [event-dump/create](https://docs.unione.io/en/web-api-ref#event-dump-create) method.
     * @type {string|undefined}
     */
    this.dumpId = dumpId;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {EventDumpDeleteRequest}
   */
  static fromJSON(data) {
    return new EventDumpDeleteRequest({
      dumpId: data["dump_id"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "dump_id": this.dumpId,
    });
  }
}
