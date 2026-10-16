// Types of the models of the ConfirmedEmail section.
import type { VerificationRecordStatus } from "../../common/models.js";

/** ConfirmedEmailRequest in the API format: the object sent and received as JSON. */
export interface ConfirmedEmailRequestJSON {
  "email": string;
}

/** Fields of new ConfirmedEmailRequest(): a nested model may be a plain object in the API format. */
export interface ConfirmedEmailRequestInit {
  /** Email address to add or delete. */
  email: string;
}

/** ConfirmedEmailRequest */
export declare class ConfirmedEmailRequest {
  constructor(data: ConfirmedEmailRequestInit);
  /** Email address to add or delete. */
  email: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): ConfirmedEmailRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): ConfirmedEmailRequestJSON;
}

/** ConfirmedEmailCreateResponse in the API format: the object sent and received as JSON. */
export interface ConfirmedEmailCreateResponseJSON {
  "status"?: string;
  "confirmed_email"?: ConfirmedEmailJSON;
}

/** Fields of new ConfirmedEmailCreateResponse(): a nested model may be a plain object in the API format. */
export interface ConfirmedEmailCreateResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  confirmedEmail?: ConfirmedEmail | ConfirmedEmailJSON;
}

/** ConfirmedEmailCreateResponse */
export declare class ConfirmedEmailCreateResponse {
  constructor(data?: ConfirmedEmailCreateResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  confirmedEmail?: ConfirmedEmail;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): ConfirmedEmailCreateResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): ConfirmedEmailCreateResponseJSON;
}

/** ConfirmedEmail in the API format: the object sent and received as JSON. */
export interface ConfirmedEmailJSON {
  "email"?: string;
  "status"?: VerificationRecordStatus;
}

/** Fields of new ConfirmedEmail(): a nested model may be a plain object in the API format. */
export interface ConfirmedEmailInit {
  email?: string;
  /** Confirmation status of the email address. */
  status?: VerificationRecordStatus;
}

/** ConfirmedEmail */
export declare class ConfirmedEmail {
  constructor(data?: ConfirmedEmailInit);
  email?: string;
  /** Confirmation status of the email address. */
  status?: VerificationRecordStatus;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): ConfirmedEmail;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): ConfirmedEmailJSON;
}

/** ConfirmedEmailListResponse in the API format: the object sent and received as JSON. */
export interface ConfirmedEmailListResponseJSON {
  "status"?: string;
  "confirmed_emails"?: Array<ConfirmedEmailJSON>;
}

/** Fields of new ConfirmedEmailListResponse(): a nested model may be a plain object in the API format. */
export interface ConfirmedEmailListResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  confirmedEmails?: Array<ConfirmedEmail | ConfirmedEmailJSON>;
}

/** ConfirmedEmailListResponse */
export declare class ConfirmedEmailListResponse {
  constructor(data?: ConfirmedEmailListResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  confirmedEmails?: Array<ConfirmedEmail>;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): ConfirmedEmailListResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): ConfirmedEmailListResponseJSON;
}

/** ConfirmedEmailDeleteResponse in the API format: the object sent and received as JSON. */
export interface ConfirmedEmailDeleteResponseJSON {
  "status"?: string;
  "message"?: string;
}

/** Fields of new ConfirmedEmailDeleteResponse(): a nested model may be a plain object in the API format. */
export interface ConfirmedEmailDeleteResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  message?: string;
}

/** ConfirmedEmailDeleteResponse */
export declare class ConfirmedEmailDeleteResponse {
  constructor(data?: ConfirmedEmailDeleteResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  message?: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): ConfirmedEmailDeleteResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): ConfirmedEmailDeleteResponseJSON;
}
