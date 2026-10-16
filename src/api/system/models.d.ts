// Types of the models of the System section.
import type { EmailCounterMode } from "../../common/models.js";

/** SystemPingResponse in the API format: the object sent and received as JSON. */
export interface SystemPingResponseJSON {
  "status"?: string;
  "user_id"?: number;
}

/** Fields of new SystemPingResponse(): a nested model may be a plain object in the API format. */
export interface SystemPingResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Unique user identifier. */
  userId?: number;
}

/** SystemPingResponse */
export declare class SystemPingResponse {
  constructor(data?: SystemPingResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Unique user identifier. */
  userId?: number;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): SystemPingResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): SystemPingResponseJSON;
}

/** SystemInfoResponse in the API format: the object sent and received as JSON. */
export interface SystemInfoResponseJSON {
  "status"?: string;
  "user_id"?: number;
  "email"?: string;
  "project_id"?: string;
  "project_name"?: string;
  "project_accounting"?: ProjectAccountingObjectJSON;
  "accounting"?: SystemInfoResponseAccountingJSON;
}

/** Fields of new SystemInfoResponse(): a nested model may be a plain object in the API format. */
export interface SystemInfoResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Unique user identifier. */
  userId?: number;
  /** Email of the user. */
  email?: string;
  /**
   * Unqiue project identifier, ASCII string up to 36 characters long. Present only if the API key used
   * for request is the project API key.
   */
  projectId?: string;
  /**
   * Project name, unique for user account. Present only if the API key used for request is the project
   * API key.
   */
  projectName?: string;
  /**
   * Object with email counter properties. Present only if the API key used for request is the user API
   * key.
   */
  projectAccounting?: ProjectAccountingObject | ProjectAccountingObjectJSON;
  /**
   * Object with accounting period properties. Present only if the API key used for request is the user
   * API key.
   */
  accounting?: SystemInfoResponseAccounting | SystemInfoResponseAccountingJSON;
}

/** SystemInfoResponse */
export declare class SystemInfoResponse {
  constructor(data?: SystemInfoResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Unique user identifier. */
  userId?: number;
  /** Email of the user. */
  email?: string;
  /**
   * Unqiue project identifier, ASCII string up to 36 characters long. Present only if the API key used
   * for request is the project API key.
   */
  projectId?: string;
  /**
   * Project name, unique for user account. Present only if the API key used for request is the project
   * API key.
   */
  projectName?: string;
  /**
   * Object with email counter properties. Present only if the API key used for request is the user API
   * key.
   */
  projectAccounting?: ProjectAccountingObject;
  /**
   * Object with accounting period properties. Present only if the API key used for request is the user
   * API key.
   */
  accounting?: SystemInfoResponseAccounting;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): SystemInfoResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): SystemInfoResponseJSON;
}

/** ProjectAccountingObject in the API format: the object sent and received as JSON. */
export interface ProjectAccountingObjectJSON {
  "email_counter"?: number;
  "email_counter_limit"?: number;
  "email_counter_mode"?: EmailCounterMode;
}

/** Fields of new ProjectAccountingObject(): a nested model may be a plain object in the API format. */
export interface ProjectAccountingObjectInit {
  /** Project's email counter value. It increases on every email sent. */
  emailCounter?: number;
  /**
   * Allows you to limit the number of emails sent by the project. The sending stops when the limit is
   * reached. Any non-negative 64-bit integer is acceptable. 0 means no limit.
   */
  emailCounterLimit?: number;
  /**
   * 'default' - the counter resets to zero automatically at the beginning of each accounting period.
   * 'permanent' - the counter never resets automatically.
   * Default: `default`.
   */
  emailCounterMode?: EmailCounterMode;
}

/**
 * Object with email counter properties. Present only if the API key used for request is the user API
 * key.
 */
export declare class ProjectAccountingObject {
  constructor(data?: ProjectAccountingObjectInit);
  /** Project's email counter value. It increases on every email sent. */
  emailCounter?: number;
  /**
   * Allows you to limit the number of emails sent by the project. The sending stops when the limit is
   * reached. Any non-negative 64-bit integer is acceptable. 0 means no limit.
   */
  emailCounterLimit?: number;
  /**
   * 'default' - the counter resets to zero automatically at the beginning of each accounting period.
   * 'permanent' - the counter never resets automatically.
   * Default: `default`.
   */
  emailCounterMode?: EmailCounterMode;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): ProjectAccountingObject;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): ProjectAccountingObjectJSON;
}

/** SystemInfoResponseAccounting in the API format: the object sent and received as JSON. */
export interface SystemInfoResponseAccountingJSON {
  "period_start"?: string;
  "period_end"?: string;
  "emails_included"?: number;
  "emails_sent"?: number;
}

/** Fields of new SystemInfoResponseAccounting(): a nested model may be a plain object in the API format. */
export interface SystemInfoResponseAccountingInit {
  /** Date and time of accounting period start in UTC in "YYYY-MM-DD hh:mm:ss" format. */
  periodStart?: string;
  /** Date and time of accounting period end in UTC in "YYYY-MM-DD hh:mm:ss" format. */
  periodEnd?: string;
  /** Number of emails included into accounting period. */
  emailsIncluded?: number;
  /**
   * Number of emails sent during accounting period. Can be bigger than emails_included in case of
   * overage.
   */
  emailsSent?: number;
}

/**
 * Object with accounting period properties. Present only if the API key used for request is the user
 * API key.
 */
export declare class SystemInfoResponseAccounting {
  constructor(data?: SystemInfoResponseAccountingInit);
  /** Date and time of accounting period start in UTC in "YYYY-MM-DD hh:mm:ss" format. */
  periodStart?: string;
  /** Date and time of accounting period end in UTC in "YYYY-MM-DD hh:mm:ss" format. */
  periodEnd?: string;
  /** Number of emails included into accounting period. */
  emailsIncluded?: number;
  /**
   * Number of emails sent during accounting period. Can be bigger than emails_included in case of
   * overage.
   */
  emailsSent?: number;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): SystemInfoResponseAccounting;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): SystemInfoResponseAccountingJSON;
}
