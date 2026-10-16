// Types of the models of the Obsolete section.

/**
 * Unsubscription process details:
 *
 * - "unsubscribed" if email has just been unsubscribed,
 * - "was inactive" if it was inactive due some reason,
 * - "was unsubscribed" if it already was unsubscribed before the call,
 * - "added and unsubscribed" if it's a new email without status history and it was added and then unsubscribed immediately.
 */
export declare const ObsoleteUnsubscribedSetMessage: Readonly<{
  UNSUBSCRIBED: "unsubscribed";
  WAS_INACTIVE: "was inactive";
  WAS_UNSUBSCRIBED: "was unsubscribed";
  ADDED_AND_UNSUBSCRIBED: "added and unsubscribed";
}>;
/**
 * Unsubscription process details:
 *
 * - "unsubscribed" if email has just been unsubscribed,
 * - "was inactive" if it was inactive due some reason,
 * - "was unsubscribed" if it already was unsubscribed before the call,
 * - "added and unsubscribed" if it's a new email without status history and it was added and then unsubscribed immediately.
 */
export type ObsoleteUnsubscribedSetMessage = "unsubscribed" | "was inactive" | "was unsubscribed" | "added and unsubscribed";

/** ObsoleteUnsubscribedSetRequest in the API format: the object sent and received as JSON. */
export interface ObsoleteUnsubscribedSetRequestJSON {
  "address": string;
}

/** Fields of new ObsoleteUnsubscribedSetRequest(): a nested model may be a plain object in the API format. */
export interface ObsoleteUnsubscribedSetRequestInit {
  /** Email to be unsubscribed. */
  address: string;
}

/** ObsoleteUnsubscribedSetRequest */
export declare class ObsoleteUnsubscribedSetRequest {
  constructor(data: ObsoleteUnsubscribedSetRequestInit);
  /** Email to be unsubscribed. */
  address: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): ObsoleteUnsubscribedSetRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): ObsoleteUnsubscribedSetRequestJSON;
}

/** ObsoleteUnsubscribedSetResponse in the API format: the object sent and received as JSON. */
export interface ObsoleteUnsubscribedSetResponseJSON {
  "status"?: string;
  "address"?: string;
  "message"?: ObsoleteUnsubscribedSetMessage;
}

/** Fields of new ObsoleteUnsubscribedSetResponse(): a nested model may be a plain object in the API format. */
export interface ObsoleteUnsubscribedSetResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** The unsubscribed email. */
  address?: string;
  /**
   * Unsubscription process details:
   *
   * - "unsubscribed" if email has just been unsubscribed,
   * - "was inactive" if it was inactive due some reason,
   * - "was unsubscribed" if it already was unsubscribed before the call,
   * - "added and unsubscribed" if it's a new email without status history and it was added and then unsubscribed immediately.
   */
  message?: ObsoleteUnsubscribedSetMessage;
}

/** ObsoleteUnsubscribedSetResponse */
export declare class ObsoleteUnsubscribedSetResponse {
  constructor(data?: ObsoleteUnsubscribedSetResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** The unsubscribed email. */
  address?: string;
  /**
   * Unsubscription process details:
   *
   * - "unsubscribed" if email has just been unsubscribed,
   * - "was inactive" if it was inactive due some reason,
   * - "was unsubscribed" if it already was unsubscribed before the call,
   * - "added and unsubscribed" if it's a new email without status history and it was added and then unsubscribed immediately.
   */
  message?: ObsoleteUnsubscribedSetMessage;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): ObsoleteUnsubscribedSetResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): ObsoleteUnsubscribedSetResponseJSON;
}

/** ObsoleteUnsubscribedCheckRequest in the API format: the object sent and received as JSON. */
export interface ObsoleteUnsubscribedCheckRequestJSON {
  "address": string;
}

/** Fields of new ObsoleteUnsubscribedCheckRequest(): a nested model may be a plain object in the API format. */
export interface ObsoleteUnsubscribedCheckRequestInit {
  /** Email to check. */
  address: string;
}

/** ObsoleteUnsubscribedCheckRequest */
export declare class ObsoleteUnsubscribedCheckRequest {
  constructor(data: ObsoleteUnsubscribedCheckRequestInit);
  /** Email to check. */
  address: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): ObsoleteUnsubscribedCheckRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): ObsoleteUnsubscribedCheckRequestJSON;
}

/** ObsoleteUnsubscribedCheckResponse in the API format: the object sent and received as JSON. */
export interface ObsoleteUnsubscribedCheckResponseJSON {
  "status"?: string;
  "address"?: string;
  "is_unsubscribed"?: boolean;
}

/** Fields of new ObsoleteUnsubscribedCheckResponse(): a nested model may be a plain object in the API format. */
export interface ObsoleteUnsubscribedCheckResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Email that was checked. */
  address?: string;
  /** true if unsubscribed, false if not. */
  isUnsubscribed?: boolean;
}

/** ObsoleteUnsubscribedCheckResponse */
export declare class ObsoleteUnsubscribedCheckResponse {
  constructor(data?: ObsoleteUnsubscribedCheckResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Email that was checked. */
  address?: string;
  /** true if unsubscribed, false if not. */
  isUnsubscribed?: boolean;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): ObsoleteUnsubscribedCheckResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): ObsoleteUnsubscribedCheckResponseJSON;
}

/** ObsoleteUnsubscribedListRequest in the API format: the object sent and received as JSON. */
export interface ObsoleteUnsubscribedListRequestJSON {
  "date_from"?: string;
}

/** Fields of new ObsoleteUnsubscribedListRequest(): a nested model may be a plain object in the API format. */
export interface ObsoleteUnsubscribedListRequestInit {
  /**
   * Date in the format YYYY-MM-DD to get all unsubscribed emails from the "date_from" to the present
   * day. If the parameter is not specified, the default period is today (from 00:00 UTC).
   */
  dateFrom?: string;
}

/** ObsoleteUnsubscribedListRequest */
export declare class ObsoleteUnsubscribedListRequest {
  constructor(data?: ObsoleteUnsubscribedListRequestInit);
  /**
   * Date in the format YYYY-MM-DD to get all unsubscribed emails from the "date_from" to the present
   * day. If the parameter is not specified, the default period is today (from 00:00 UTC).
   */
  dateFrom?: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): ObsoleteUnsubscribedListRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): ObsoleteUnsubscribedListRequestJSON;
}

/** ObsoleteUnsubscribedListResponse in the API format: the object sent and received as JSON. */
export interface ObsoleteUnsubscribedListResponseJSON {
  "status"?: string;
  "unsubscribed"?: Array<ObsoleteUnsubscribedListResponseUnsubscribedItemJSON>;
}

/** Fields of new ObsoleteUnsubscribedListResponse(): a nested model may be a plain object in the API format. */
export interface ObsoleteUnsubscribedListResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Array of object describing unsubscribed emails. */
  unsubscribed?: Array<ObsoleteUnsubscribedListResponseUnsubscribedItem | ObsoleteUnsubscribedListResponseUnsubscribedItemJSON>;
}

/** ObsoleteUnsubscribedListResponse */
export declare class ObsoleteUnsubscribedListResponse {
  constructor(data?: ObsoleteUnsubscribedListResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Array of object describing unsubscribed emails. */
  unsubscribed?: Array<ObsoleteUnsubscribedListResponseUnsubscribedItem>;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): ObsoleteUnsubscribedListResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): ObsoleteUnsubscribedListResponseJSON;
}

/** ObsoleteUnsubscribedListResponseUnsubscribedItem in the API format: the object sent and received as JSON. */
export interface ObsoleteUnsubscribedListResponseUnsubscribedItemJSON {
  "address"?: string;
  "unsubscribed_on"?: string;
}

/** Fields of new ObsoleteUnsubscribedListResponseUnsubscribedItem(): a nested model may be a plain object in the API format. */
export interface ObsoleteUnsubscribedListResponseUnsubscribedItemInit {
  /** Unsubscribed email. */
  address?: string;
  /** Date and time when a recipient unsubscribed, in UTC timezone and "YYYY-MM-DD hh:mm:ss" format. */
  unsubscribedOn?: string;
}

/** ObsoleteUnsubscribedListResponseUnsubscribedItem */
export declare class ObsoleteUnsubscribedListResponseUnsubscribedItem {
  constructor(data?: ObsoleteUnsubscribedListResponseUnsubscribedItemInit);
  /** Unsubscribed email. */
  address?: string;
  /** Date and time when a recipient unsubscribed, in UTC timezone and "YYYY-MM-DD hh:mm:ss" format. */
  unsubscribedOn?: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): ObsoleteUnsubscribedListResponseUnsubscribedItem;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): ObsoleteUnsubscribedListResponseUnsubscribedItemJSON;
}
