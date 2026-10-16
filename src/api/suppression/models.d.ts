// Types of the models of the Suppression section.

/** SuppressionSetRequest in the API format: the object sent and received as JSON. */
export interface SuppressionSetRequestJSON {
  "email": string;
  "cause": string;
  "created"?: string;
}

/** Fields of new SuppressionSetRequest(): a nested model may be a plain object in the API format. */
export interface SuppressionSetRequestInit {
  /** Email to add in suppression list. */
  email: string;
  /**
   * Cause of email being suppressed. One of:
   *
   * - __unsubscribed__ - email is unsubscribed;
   * - __temporary_unavailable__ - the email address is unavailable. This means that over the next three days sending to this address will return an error. Email may be temporarily unavailable due to several reasons, e.g.:
   *
   * - a previous email has been rejected by the recipient's server for spam;
   * - the recipient's mailbox is full or is not used;
   * - recipient's domain does not accept mail;
   * - sending server was rejected due to blacklisting;
   *
   * - __permanent_unavailable__ - the email address is permanently unavailable due to multiple hard bounces;
   * - __complained__ -  the recipient reported spam in the previous emails;
   */
  cause: string;
  /** When suppression was created, in UTC timezone in "YYYY-MM-DD hh:mm:ss" format. */
  created?: string;
}

/** SuppressionSetRequest */
export declare class SuppressionSetRequest {
  constructor(data: SuppressionSetRequestInit);
  /** Email to add in suppression list. */
  email: string;
  /**
   * Cause of email being suppressed. One of:
   *
   * - __unsubscribed__ - email is unsubscribed;
   * - __temporary_unavailable__ - the email address is unavailable. This means that over the next three days sending to this address will return an error. Email may be temporarily unavailable due to several reasons, e.g.:
   *
   * - a previous email has been rejected by the recipient's server for spam;
   * - the recipient's mailbox is full or is not used;
   * - recipient's domain does not accept mail;
   * - sending server was rejected due to blacklisting;
   *
   * - __permanent_unavailable__ - the email address is permanently unavailable due to multiple hard bounces;
   * - __complained__ -  the recipient reported spam in the previous emails;
   */
  cause: string;
  /** When suppression was created, in UTC timezone in "YYYY-MM-DD hh:mm:ss" format. */
  created?: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): SuppressionSetRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): SuppressionSetRequestJSON;
}

/** SuppressionGetRequest in the API format: the object sent and received as JSON. */
export interface SuppressionGetRequestJSON {
  "email": string;
  "all_projects"?: boolean;
}

/** Fields of new SuppressionGetRequest(): a nested model may be a plain object in the API format. */
export interface SuppressionGetRequestInit {
  /** Email to get suppression details for. */
  email: string;
  /**
   * If a user has projects functionality enabled, he/she can pass all_projects=true to search in all
   * projects' data.
   * Default: `False`.
   */
  allProjects?: boolean;
}

/** SuppressionGetRequest */
export declare class SuppressionGetRequest {
  constructor(data: SuppressionGetRequestInit);
  /** Email to get suppression details for. */
  email: string;
  /**
   * If a user has projects functionality enabled, he/she can pass all_projects=true to search in all
   * projects' data.
   * Default: `False`.
   */
  allProjects?: boolean;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): SuppressionGetRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): SuppressionGetRequestJSON;
}

/** SuppressionGetResponse in the API format: the object sent and received as JSON. */
export interface SuppressionGetResponseJSON {
  "status"?: string;
  "email"?: string;
  "suppressions"?: Array<SuppressionGetObjectJSON>;
}

/** Fields of new SuppressionGetResponse(): a nested model may be a plain object in the API format. */
export interface SuppressionGetResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** The email for which suppression details were requested. */
  email?: string;
  /** Array of suppression objects. */
  suppressions?: Array<SuppressionGetObject | SuppressionGetObjectJSON>;
}

/** SuppressionGetResponse */
export declare class SuppressionGetResponse {
  constructor(data?: SuppressionGetResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** The email for which suppression details were requested. */
  email?: string;
  /** Array of suppression objects. */
  suppressions?: Array<SuppressionGetObject>;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): SuppressionGetResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): SuppressionGetResponseJSON;
}

/** SuppressionGetObject in the API format: the object sent and received as JSON. */
export interface SuppressionGetObjectJSON {
  "project_id"?: string;
  "cause"?: string;
  "source"?: string;
  "is_deletable"?: boolean;
  "created"?: string;
}

/** Fields of new SuppressionGetObject(): a nested model may be a plain object in the API format. */
export interface SuppressionGetObjectInit {
  /** Unqiue project identifier, ASCII string up to 36 characters long. */
  projectId?: string;
  /**
   * Cause of email being suppressed. One of:
   *
   * - __unsubscribed__ - email is unsubscribed;
   * - __temporary_unavailable__ - the email address is unavailable. This means that over the next three days sending to this address will return an error. Email may be temporarily unavailable due to several reasons, e.g.:
   *
   * - a previous email has been rejected by the recipient's server for spam;
   * - the recipient's mailbox is full or is not used;
   * - recipient's domain does not accept mail;
   * - sending server was rejected due to blacklisting;
   *
   * - __permanent_unavailable__ - the email address is permanently unavailable due to multiple hard bounces;
   * - __complained__ -  the recipient reported spam in the previous emails;
   * - __blocked__ -  sending to the email is prohibited by administration of UniOne.
   * We may add some new causes in the future.
   */
  cause?: string;
  /**
   * Source of email being suppressed. One of:
   *
   * - __user__ - suppressed by user with    [suppression/set](https://docs.unione.io/en/web-api-ref#suppression-set);
   * - __system__ - sending to the email is prohibited by system, for example due to multiple hard bounces;
   * - __subscriber__ - the recipient reported spam or unsubscribed in the previous emails.
   */
  source?: string;
  /** Is it possible to delete this suppression by calling suppression/delete method. */
  isDeletable?: boolean;
  /** When suppression was created, in UTC timezone in "YYYY-MM-DD hh:mm:ss" format. */
  created?: string;
}

/** Object with suppression details. */
export declare class SuppressionGetObject {
  constructor(data?: SuppressionGetObjectInit);
  /** Unqiue project identifier, ASCII string up to 36 characters long. */
  projectId?: string;
  /**
   * Cause of email being suppressed. One of:
   *
   * - __unsubscribed__ - email is unsubscribed;
   * - __temporary_unavailable__ - the email address is unavailable. This means that over the next three days sending to this address will return an error. Email may be temporarily unavailable due to several reasons, e.g.:
   *
   * - a previous email has been rejected by the recipient's server for spam;
   * - the recipient's mailbox is full or is not used;
   * - recipient's domain does not accept mail;
   * - sending server was rejected due to blacklisting;
   *
   * - __permanent_unavailable__ - the email address is permanently unavailable due to multiple hard bounces;
   * - __complained__ -  the recipient reported spam in the previous emails;
   * - __blocked__ -  sending to the email is prohibited by administration of UniOne.
   * We may add some new causes in the future.
   */
  cause?: string;
  /**
   * Source of email being suppressed. One of:
   *
   * - __user__ - suppressed by user with    [suppression/set](https://docs.unione.io/en/web-api-ref#suppression-set);
   * - __system__ - sending to the email is prohibited by system, for example due to multiple hard bounces;
   * - __subscriber__ - the recipient reported spam or unsubscribed in the previous emails.
   */
  source?: string;
  /** Is it possible to delete this suppression by calling suppression/delete method. */
  isDeletable?: boolean;
  /** When suppression was created, in UTC timezone in "YYYY-MM-DD hh:mm:ss" format. */
  created?: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): SuppressionGetObject;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): SuppressionGetObjectJSON;
}

/** SuppressionListRequest in the API format: the object sent and received as JSON. */
export interface SuppressionListRequestJSON {
  "cause"?: string;
  "source"?: string;
  "start_time"?: string;
  "cursor"?: string;
  "limit"?: number;
}

/** Fields of new SuppressionListRequest(): a nested model may be a plain object in the API format. */
export interface SuppressionListRequestInit {
  /**
   * Cause of email being suppressed. One of:
   *
   * - __unsubscribed__ - email is unsubscribed;
   * - __temporary_unavailable__ - the email address is unavailable. This means that over the next three days sending to this address will return an error. Email may be temporarily unavailable due to several reasons, e.g.:
   *
   * - a previous email has been rejected by the recipient's server for spam;
   * - the recipient's mailbox is full or is not used;
   * - recipient's domain does not accept mail;
   * - sending server was rejected due to blacklisting;
   *
   * - __permanent_unavailable__ - the email address is permanently unavailable due to multiple hard bounces;
   * - __complained__ -  the recipient reported spam in the previous emails;
   * - __blocked__ -  sending to the email is prohibited by administration of UniOne.
   * We may add some new causes in the future.
   */
  cause?: string;
  /**
   * Source of email being suppressed. One of:
   *
   * - __user__ - suppressed by user with    [suppression/set](https://docs.unione.io/en/web-api-ref#suppression-set);
   * - __system__ - sending to the email is prohibited by system, for example due to multiple hard bounces;
   * - __subscriber__ - the recipient reported spam or unsubscribed in the previous emails.
   */
  source?: string;
  /**
   * Date in the format YYYY-MM-DD hh:mm:ss to get suppression list from the "start_time" to the present
   * day. Ignored if "cursor" is not empty.
   */
  startTime?: string;
  /**
   * The parameter indicates from which position the selection is to be started. Must be empty or omitted
   * for the first data chunk. In order to get subsequent chunks, you must set the "cursor" parameter in
   * your request, using the value received in response to the previous request.
   */
  cursor?: string;
  /** Limits the number of records to be returned at one time, default is 50. */
  limit?: number;
}

/** SuppressionListRequest */
export declare class SuppressionListRequest {
  constructor(data?: SuppressionListRequestInit);
  /**
   * Cause of email being suppressed. One of:
   *
   * - __unsubscribed__ - email is unsubscribed;
   * - __temporary_unavailable__ - the email address is unavailable. This means that over the next three days sending to this address will return an error. Email may be temporarily unavailable due to several reasons, e.g.:
   *
   * - a previous email has been rejected by the recipient's server for spam;
   * - the recipient's mailbox is full or is not used;
   * - recipient's domain does not accept mail;
   * - sending server was rejected due to blacklisting;
   *
   * - __permanent_unavailable__ - the email address is permanently unavailable due to multiple hard bounces;
   * - __complained__ -  the recipient reported spam in the previous emails;
   * - __blocked__ -  sending to the email is prohibited by administration of UniOne.
   * We may add some new causes in the future.
   */
  cause?: string;
  /**
   * Source of email being suppressed. One of:
   *
   * - __user__ - suppressed by user with    [suppression/set](https://docs.unione.io/en/web-api-ref#suppression-set);
   * - __system__ - sending to the email is prohibited by system, for example due to multiple hard bounces;
   * - __subscriber__ - the recipient reported spam or unsubscribed in the previous emails.
   */
  source?: string;
  /**
   * Date in the format YYYY-MM-DD hh:mm:ss to get suppression list from the "start_time" to the present
   * day. Ignored if "cursor" is not empty.
   */
  startTime?: string;
  /**
   * The parameter indicates from which position the selection is to be started. Must be empty or omitted
   * for the first data chunk. In order to get subsequent chunks, you must set the "cursor" parameter in
   * your request, using the value received in response to the previous request.
   */
  cursor?: string;
  /** Limits the number of records to be returned at one time, default is 50. */
  limit?: number;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): SuppressionListRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): SuppressionListRequestJSON;
}

/** SuppressionListResponse in the API format: the object sent and received as JSON. */
export interface SuppressionListResponseJSON {
  "status"?: string;
  "suppressions"?: Array<SuppressionListObjectJSON>;
  "cursor"?: string;
}

/** Fields of new SuppressionListResponse(): a nested model may be a plain object in the API format. */
export interface SuppressionListResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Array of suppression objects. */
  suppressions?: Array<SuppressionListObject | SuppressionListObjectJSON>;
  /**
   * The parameter indicates from which position the selection is to be started. Must be empty or omitted
   * for the first data chunk. In order to get subsequent chunks, you must set the "cursor" parameter in
   * your request, using the value received in response to the previous request.
   */
  cursor?: string;
}

/** SuppressionListResponse */
export declare class SuppressionListResponse {
  constructor(data?: SuppressionListResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Array of suppression objects. */
  suppressions?: Array<SuppressionListObject>;
  /**
   * The parameter indicates from which position the selection is to be started. Must be empty or omitted
   * for the first data chunk. In order to get subsequent chunks, you must set the "cursor" parameter in
   * your request, using the value received in response to the previous request.
   */
  cursor?: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): SuppressionListResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): SuppressionListResponseJSON;
}

/** SuppressionListObject in the API format: the object sent and received as JSON. */
export interface SuppressionListObjectJSON {
  "email"?: string;
  "cause"?: string;
  "source"?: string;
  "is_deletable"?: boolean;
  "created"?: string;
}

/** Fields of new SuppressionListObject(): a nested model may be a plain object in the API format. */
export interface SuppressionListObjectInit {
  /** Email to get suppression details for. */
  email?: string;
  /**
   * Cause of email being suppressed. One of:
   *
   * - __unsubscribed__ - email is unsubscribed;
   * - __temporary_unavailable__ - the email address is unavailable. This means that over the next three days sending to this address will return an error. Email may be temporarily unavailable due to several reasons, e.g.:
   *
   * - a previous email has been rejected by the recipient's server for spam;
   * - the recipient's mailbox is full or is not used;
   * - recipient's domain does not accept mail;
   * - sending server was rejected due to blacklisting;
   *
   * - __permanent_unavailable__ - the email address is permanently unavailable due to multiple hard bounces;
   * - __complained__ -  the recipient reported spam in the previous emails;
   * - __blocked__ -  sending to the email is prohibited by administration of UniOne.
   * We may add some new causes in the future.
   */
  cause?: string;
  /**
   * Source of email being suppressed. One of:
   *
   * - __user__ - suppressed by user with    [suppression/set](https://docs.unione.io/en/web-api-ref#suppression-set);
   * - __system__ - sending to the email is prohibited by system, for example due to multiple hard bounces;
   * - __subscriber__ - the recipient reported spam or unsubscribed in the previous emails.
   */
  source?: string;
  /** Is it possible to delete this suppression by calling suppression/delete method. */
  isDeletable?: boolean;
  /** When suppression was created, in UTC timezone in "YYYY-MM-DD hh:mm:ss" format. */
  created?: string;
}

/** Object with suppression details. */
export declare class SuppressionListObject {
  constructor(data?: SuppressionListObjectInit);
  /** Email to get suppression details for. */
  email?: string;
  /**
   * Cause of email being suppressed. One of:
   *
   * - __unsubscribed__ - email is unsubscribed;
   * - __temporary_unavailable__ - the email address is unavailable. This means that over the next three days sending to this address will return an error. Email may be temporarily unavailable due to several reasons, e.g.:
   *
   * - a previous email has been rejected by the recipient's server for spam;
   * - the recipient's mailbox is full or is not used;
   * - recipient's domain does not accept mail;
   * - sending server was rejected due to blacklisting;
   *
   * - __permanent_unavailable__ - the email address is permanently unavailable due to multiple hard bounces;
   * - __complained__ -  the recipient reported spam in the previous emails;
   * - __blocked__ -  sending to the email is prohibited by administration of UniOne.
   * We may add some new causes in the future.
   */
  cause?: string;
  /**
   * Source of email being suppressed. One of:
   *
   * - __user__ - suppressed by user with    [suppression/set](https://docs.unione.io/en/web-api-ref#suppression-set);
   * - __system__ - sending to the email is prohibited by system, for example due to multiple hard bounces;
   * - __subscriber__ - the recipient reported spam or unsubscribed in the previous emails.
   */
  source?: string;
  /** Is it possible to delete this suppression by calling suppression/delete method. */
  isDeletable?: boolean;
  /** When suppression was created, in UTC timezone in "YYYY-MM-DD hh:mm:ss" format. */
  created?: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): SuppressionListObject;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): SuppressionListObjectJSON;
}

/** SuppressionDeleteRequest in the API format: the object sent and received as JSON. */
export interface SuppressionDeleteRequestJSON {
  "email": string;
}

/** Fields of new SuppressionDeleteRequest(): a nested model may be a plain object in the API format. */
export interface SuppressionDeleteRequestInit {
  /** An email to delete from suppression list. */
  email: string;
}

/** SuppressionDeleteRequest */
export declare class SuppressionDeleteRequest {
  constructor(data: SuppressionDeleteRequestInit);
  /** An email to delete from suppression list. */
  email: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): SuppressionDeleteRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): SuppressionDeleteRequestJSON;
}
