// Types of the models of the Project section.
import type { EmailCounterMode } from "../../common/models.js";

/** ProjectCreateRequest in the API format: the object sent and received as JSON. */
export interface ProjectCreateRequestJSON {
  "project": ProjectObjectJSON;
}

/** Fields of new ProjectCreateRequest(): a nested model may be a plain object in the API format. */
export interface ProjectCreateRequestInit {
  /** Object with project properties. */
  project: ProjectObject | ProjectObjectJSON;
}

/** ProjectCreateRequest */
export declare class ProjectCreateRequest {
  constructor(data: ProjectCreateRequestInit);
  /** Object with project properties. */
  project: ProjectObject;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): ProjectCreateRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): ProjectCreateRequestJSON;
}

/** ProjectObject in the API format: the object sent and received as JSON. */
export interface ProjectObjectJSON {
  "name": string;
  "country"?: string;
  "send_enabled"?: boolean;
  "custom_unsubscribe_url_enabled"?: boolean;
  "backend_domain_id"?: number;
  "unsubscribe_page_id"?: number;
}

/** Fields of new ProjectObject(): a nested model may be a plain object in the API format. */
export interface ProjectObjectInit {
  /** Project name, unique for user account. */
  name: string;
  /**
   * ISO-3166 alpha-2 country code. If set, UniOne treats project personal data according to country
   * laws, e.g. GDPR for european countries.
   */
  country?: string;
  /**
   * Whether email sending is enabled for this project or not.
   * Default: `True`.
   */
  sendEnabled?: boolean;
  /**
   * If it's false then UniOne adds default unsubscribe footer to each email sent with API key of the
   * project. If it's true then appending default unsubscribe footer for this project is avoided and
   * sending with custom unsubscribe url or even without unsubscribe url is permitted for the project.
   * Please note that custom_unsubscribe_url_enabled=true is available only if removing unsubscribe link
   * is approved for the user account by support. More on this
   * [here](https://docs.unione.io/en/unsubscribe-link). When custom_unsubscribe_url_enabled is skipped
   * on creating a project, it's value is taken from user
   */
  customUnsubscribeUrlEnabled?: boolean;
  /**
   * A unique domain identifier which will determine the [tracking
   * domain](https://docs.unione.io/en/tracking-domains) or [dedicated IP](/dedicated-ip) pool to be used
   * by default. If the value is not specified, a default backend domain will be assigned for your
   * account or project instead.
   */
  backendDomainId?: number;
  /**
   * A unique identifier that defines the default unsubscribe page. If absent, the account/project will
   * be assigned the system default unsubscribe page.
   */
  unsubscribePageId?: number;
}

/** Object with project properties. */
export declare class ProjectObject {
  constructor(data: ProjectObjectInit);
  /** Project name, unique for user account. */
  name: string;
  /**
   * ISO-3166 alpha-2 country code. If set, UniOne treats project personal data according to country
   * laws, e.g. GDPR for european countries.
   */
  country?: string;
  /**
   * Whether email sending is enabled for this project or not.
   * Default: `True`.
   */
  sendEnabled?: boolean;
  /**
   * If it's false then UniOne adds default unsubscribe footer to each email sent with API key of the
   * project. If it's true then appending default unsubscribe footer for this project is avoided and
   * sending with custom unsubscribe url or even without unsubscribe url is permitted for the project.
   * Please note that custom_unsubscribe_url_enabled=true is available only if removing unsubscribe link
   * is approved for the user account by support. More on this
   * [here](https://docs.unione.io/en/unsubscribe-link). When custom_unsubscribe_url_enabled is skipped
   * on creating a project, it's value is taken from user
   */
  customUnsubscribeUrlEnabled?: boolean;
  /**
   * A unique domain identifier which will determine the [tracking
   * domain](https://docs.unione.io/en/tracking-domains) or [dedicated IP](/dedicated-ip) pool to be used
   * by default. If the value is not specified, a default backend domain will be assigned for your
   * account or project instead.
   */
  backendDomainId?: number;
  /**
   * A unique identifier that defines the default unsubscribe page. If absent, the account/project will
   * be assigned the system default unsubscribe page.
   */
  unsubscribePageId?: number;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): ProjectObject;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): ProjectObjectJSON;
}

/** ProjectCreateResponse in the API format: the object sent and received as JSON. */
export interface ProjectCreateResponseJSON {
  "status"?: string;
  "project_id"?: string;
  "project_api_key"?: string;
}

/** Fields of new ProjectCreateResponse(): a nested model may be a plain object in the API format. */
export interface ProjectCreateResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Unqiue project identifier, ASCII string up to 36 characters long. */
  projectId?: string;
  /**
   * API key of the project. You can use it instead of the user API key parameter in all methods except
   * project/* methods.
   */
  projectApiKey?: string;
}

/** ProjectCreateResponse */
export declare class ProjectCreateResponse {
  constructor(data?: ProjectCreateResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Unqiue project identifier, ASCII string up to 36 characters long. */
  projectId?: string;
  /**
   * API key of the project. You can use it instead of the user API key parameter in all methods except
   * project/* methods.
   */
  projectApiKey?: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): ProjectCreateResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): ProjectCreateResponseJSON;
}

/** ProjectUpdateRequest in the API format: the object sent and received as JSON. */
export interface ProjectUpdateRequestJSON {
  "project_id"?: string;
  "project_api_key"?: string;
  "project": ProjectUpdateObjectJSON;
}

/** Fields of new ProjectUpdateRequest(): a nested model may be a plain object in the API format. */
export interface ProjectUpdateRequestInit {
  /**
   * Unique project identifier. You should identify project to update either with project_id or with
   * project_api_key field. But we recommend usage of project_id as a more secure option.
   */
  projectId?: string;
  /**
   * Optional project API key. You should identify project to update either with project_id or with
   * project_api_key field. But we recommend usage of project_id as a more secure option.
   */
  projectApiKey?: string;
  /** Object with project properties. */
  project: ProjectUpdateObject | ProjectUpdateObjectJSON;
}

/** ProjectUpdateRequest */
export declare class ProjectUpdateRequest {
  constructor(data: ProjectUpdateRequestInit);
  /**
   * Unique project identifier. You should identify project to update either with project_id or with
   * project_api_key field. But we recommend usage of project_id as a more secure option.
   */
  projectId?: string;
  /**
   * Optional project API key. You should identify project to update either with project_id or with
   * project_api_key field. But we recommend usage of project_id as a more secure option.
   */
  projectApiKey?: string;
  /** Object with project properties. */
  project: ProjectUpdateObject;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): ProjectUpdateRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): ProjectUpdateRequestJSON;
}

/** ProjectUpdateObject in the API format: the object sent and received as JSON. */
export interface ProjectUpdateObjectJSON {
  "name": string;
  "country"?: string;
  "send_enabled"?: boolean;
  "custom_unsubscribe_url_enabled"?: boolean;
  "backend_domain_id"?: number;
  "unsubscribe_page_id"?: number;
  "email_counter"?: number;
  "email_counter_limit"?: number;
  "email_counter_mode"?: EmailCounterMode;
}

/** Fields of new ProjectUpdateObject(): a nested model may be a plain object in the API format. */
export interface ProjectUpdateObjectInit {
  /** Project name, unique for user account. */
  name: string;
  /**
   * ISO-3166 alpha-2 country code. If set, UniOne treats project personal data according to country
   * laws, e.g. GDPR for european countries.
   */
  country?: string;
  /**
   * Whether email sending is enabled for this project or not.
   * Default: `True`.
   */
  sendEnabled?: boolean;
  /**
   * If it's false then UniOne adds default unsubscribe footer to each email sent with API key of the
   * project. If it's true then appending default unsubscribe footer for this project is avoided and
   * sending with custom unsubscribe url or even without unsubscribe url is permitted for the project.
   * Please note that custom_unsubscribe_url_enabled=true is available only if removing unsubscribe link
   * is approved for the user account by support. More on this
   * [here](https://docs.unione.io/en/unsubscribe-link). When custom_unsubscribe_url_enabled is skipped
   * on creating a project, it's value is taken from user
   */
  customUnsubscribeUrlEnabled?: boolean;
  /**
   * A unique domain identifier which will determine the [tracking
   * domain](https://docs.unione.io/en/tracking-domains) or [dedicated IP](/dedicated-ip) pool to be used
   * by default. If the value is not specified, a default backend domain will be assigned for your
   * account or project instead.
   */
  backendDomainId?: number;
  /**
   * A unique identifier that defines the default unsubscribe page. If absent, the account/project will
   * be assigned the system default unsubscribe page.
   */
  unsubscribePageId?: number;
  /**
   * Project's email counter value. 0 value only is accepted (which means resetting the counter to zero),
   * or refreshes automatically depending on the counter mode set with the 'email_counter_mode'
   * parameter. If the request doesn't contain the field or contains null, the limit value doesn't
   * change.
   */
  emailCounter?: number;
  /**
   * Allows you to limit the number of emails sent by the project. The sending stops when the limit is
   * reached. Any non-negative 64-bit integer is acceptable. Setting to 0 means no limit. If the request
   * doesn't contain the field or contains null, the limit value doesn't change.
   * Default: `0`.
   */
  emailCounterLimit?: number;
  /**
   * Sets the email counter mode. It allows you to choose whether the counter should reset automatically,
   * or remain permanent. The following values are acceptable: 'default' - the counter resets to zero
   * automatically at the beginning of each accounting period, 'permanent' - the counter never resets
   * automatically. The reset can be done only manually by the user in the request with the passes 0
   * value in the email_counter field. If the request doesn't contain the field or contains a null value,
   * the limit value doesn't change.
   * Default: `default`.
   */
  emailCounterMode?: EmailCounterMode;
}

/** Object with project properties. */
export declare class ProjectUpdateObject {
  constructor(data: ProjectUpdateObjectInit);
  /** Project name, unique for user account. */
  name: string;
  /**
   * ISO-3166 alpha-2 country code. If set, UniOne treats project personal data according to country
   * laws, e.g. GDPR for european countries.
   */
  country?: string;
  /**
   * Whether email sending is enabled for this project or not.
   * Default: `True`.
   */
  sendEnabled?: boolean;
  /**
   * If it's false then UniOne adds default unsubscribe footer to each email sent with API key of the
   * project. If it's true then appending default unsubscribe footer for this project is avoided and
   * sending with custom unsubscribe url or even without unsubscribe url is permitted for the project.
   * Please note that custom_unsubscribe_url_enabled=true is available only if removing unsubscribe link
   * is approved for the user account by support. More on this
   * [here](https://docs.unione.io/en/unsubscribe-link). When custom_unsubscribe_url_enabled is skipped
   * on creating a project, it's value is taken from user
   */
  customUnsubscribeUrlEnabled?: boolean;
  /**
   * A unique domain identifier which will determine the [tracking
   * domain](https://docs.unione.io/en/tracking-domains) or [dedicated IP](/dedicated-ip) pool to be used
   * by default. If the value is not specified, a default backend domain will be assigned for your
   * account or project instead.
   */
  backendDomainId?: number;
  /**
   * A unique identifier that defines the default unsubscribe page. If absent, the account/project will
   * be assigned the system default unsubscribe page.
   */
  unsubscribePageId?: number;
  /**
   * Project's email counter value. 0 value only is accepted (which means resetting the counter to zero),
   * or refreshes automatically depending on the counter mode set with the 'email_counter_mode'
   * parameter. If the request doesn't contain the field or contains null, the limit value doesn't
   * change.
   */
  emailCounter?: number;
  /**
   * Allows you to limit the number of emails sent by the project. The sending stops when the limit is
   * reached. Any non-negative 64-bit integer is acceptable. Setting to 0 means no limit. If the request
   * doesn't contain the field or contains null, the limit value doesn't change.
   * Default: `0`.
   */
  emailCounterLimit?: number;
  /**
   * Sets the email counter mode. It allows you to choose whether the counter should reset automatically,
   * or remain permanent. The following values are acceptable: 'default' - the counter resets to zero
   * automatically at the beginning of each accounting period, 'permanent' - the counter never resets
   * automatically. The reset can be done only manually by the user in the request with the passes 0
   * value in the email_counter field. If the request doesn't contain the field or contains a null value,
   * the limit value doesn't change.
   * Default: `default`.
   */
  emailCounterMode?: EmailCounterMode;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): ProjectUpdateObject;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): ProjectUpdateObjectJSON;
}

/** ProjectUpdateResponse in the API format: the object sent and received as JSON. */
export interface ProjectUpdateResponseJSON {
  "status"?: string;
  "project_api_key"?: string;
}

/** Fields of new ProjectUpdateResponse(): a nested model may be a plain object in the API format. */
export interface ProjectUpdateResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /**
   * API key of the project. Returned only if the project to update was identified by project_api_key.
   * Not returned in case of updating by project_id.
   */
  projectApiKey?: string;
}

/** ProjectUpdateResponse */
export declare class ProjectUpdateResponse {
  constructor(data?: ProjectUpdateResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /**
   * API key of the project. Returned only if the project to update was identified by project_api_key.
   * Not returned in case of updating by project_id.
   */
  projectApiKey?: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): ProjectUpdateResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): ProjectUpdateResponseJSON;
}

/** ProjectListRequest in the API format: the object sent and received as JSON. */
export interface ProjectListRequestJSON {
  "project_id"?: string;
  "project_api_key"?: string;
}

/** Fields of new ProjectListRequest(): a nested model may be a plain object in the API format. */
export interface ProjectListRequestInit {
  /** Optional possibility to specify project_id to include only this project to list. */
  projectId?: string;
  /** Optional possibility to specify project_api_key to include only this project to list. */
  projectApiKey?: string;
}

/** ProjectListRequest */
export declare class ProjectListRequest {
  constructor(data?: ProjectListRequestInit);
  /** Optional possibility to specify project_id to include only this project to list. */
  projectId?: string;
  /** Optional possibility to specify project_api_key to include only this project to list. */
  projectApiKey?: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): ProjectListRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): ProjectListRequestJSON;
}

/** ProjectListResponse in the API format: the object sent and received as JSON. */
export interface ProjectListResponseJSON {
  "status"?: string;
  "projects"?: Array<ProjectListObjectJSON>;
}

/** Fields of new ProjectListResponse(): a nested model may be a plain object in the API format. */
export interface ProjectListResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Array of objects where each object represents one project. */
  projects?: Array<ProjectListObject | ProjectListObjectJSON>;
}

/** ProjectListResponse */
export declare class ProjectListResponse {
  constructor(data?: ProjectListResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Array of objects where each object represents one project. */
  projects?: Array<ProjectListObject>;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): ProjectListResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): ProjectListResponseJSON;
}

/** ProjectListObject in the API format: the object sent and received as JSON. */
export interface ProjectListObjectJSON {
  "id"?: string;
  "api_key"?: string;
  "name"?: string;
  "country"?: string;
  "reg_time"?: string;
  "send_enabled"?: boolean;
  "custom_unsubscribe_url_enabled"?: boolean;
  "backend_domain_id"?: number;
  "email_counter"?: number;
  "email_counter_limit"?: number;
  "email_counter_mode"?: EmailCounterMode;
  "unsubscribe_page_id"?: number;
}

/** Fields of new ProjectListObject(): a nested model may be a plain object in the API format. */
export interface ProjectListObjectInit {
  /** Unqiue project identifier, ASCII string up to 36 characters long. */
  id?: string;
  /**
   * API key of the project. You can use it instead of the user API key parameter in all methods except
   * project/* methods.
   */
  apiKey?: string;
  /** Project name, unique for user account. */
  name?: string;
  /**
   * ISO-3166 alpha-2 country code. If set, UniOne treats project personal data according to country
   * laws, e.g. GDPR for european countries.
   */
  country?: string;
  /** Date and time of project creation in UTC timezone in "YYYY-MM-DD hh:mm:ss" format. */
  regTime?: string;
  /**
   * Whether email sending is enabled for this project or not.
   * Default: `True`.
   */
  sendEnabled?: boolean;
  /**
   * If it's false then UniOne adds default unsubscribe footer to each email sent with API key of the
   * project. If it's true then appending default unsubscribe footer for this project is avoided and
   * sending with custom unsubscribe url or even without unsubscribe url is permitted for the project.
   * Please note that custom_unsubscribe_url_enabled=true is available only if removing unsubscribe link
   * is approved for the user account by support. More on this
   * [here](https://docs.unione.io/en/unsubscribe-link). When custom_unsubscribe_url_enabled is skipped
   * on creating a project, it's value is taken from user
   */
  customUnsubscribeUrlEnabled?: boolean;
  /**
   * A unique domain identifier which will determine the [tracking
   * domain](https://docs.unione.io/en/tracking-domains) or [dedicated IP](/dedicated-ip) pool to be used
   * by default. If the value is not specified, a default backend domain will be assigned for your
   * account or project instead.
   */
  backendDomainId?: number;
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
  /**
   * A unique identifier that defines the default unsubscribe page. If absent, the account/project will
   * be assigned the system default unsubscribe page.
   */
  unsubscribePageId?: number;
}

/** ProjectListObject */
export declare class ProjectListObject {
  constructor(data?: ProjectListObjectInit);
  /** Unqiue project identifier, ASCII string up to 36 characters long. */
  id?: string;
  /**
   * API key of the project. You can use it instead of the user API key parameter in all methods except
   * project/* methods.
   */
  apiKey?: string;
  /** Project name, unique for user account. */
  name?: string;
  /**
   * ISO-3166 alpha-2 country code. If set, UniOne treats project personal data according to country
   * laws, e.g. GDPR for european countries.
   */
  country?: string;
  /** Date and time of project creation in UTC timezone in "YYYY-MM-DD hh:mm:ss" format. */
  regTime?: string;
  /**
   * Whether email sending is enabled for this project or not.
   * Default: `True`.
   */
  sendEnabled?: boolean;
  /**
   * If it's false then UniOne adds default unsubscribe footer to each email sent with API key of the
   * project. If it's true then appending default unsubscribe footer for this project is avoided and
   * sending with custom unsubscribe url or even without unsubscribe url is permitted for the project.
   * Please note that custom_unsubscribe_url_enabled=true is available only if removing unsubscribe link
   * is approved for the user account by support. More on this
   * [here](https://docs.unione.io/en/unsubscribe-link). When custom_unsubscribe_url_enabled is skipped
   * on creating a project, it's value is taken from user
   */
  customUnsubscribeUrlEnabled?: boolean;
  /**
   * A unique domain identifier which will determine the [tracking
   * domain](https://docs.unione.io/en/tracking-domains) or [dedicated IP](/dedicated-ip) pool to be used
   * by default. If the value is not specified, a default backend domain will be assigned for your
   * account or project instead.
   */
  backendDomainId?: number;
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
  /**
   * A unique identifier that defines the default unsubscribe page. If absent, the account/project will
   * be assigned the system default unsubscribe page.
   */
  unsubscribePageId?: number;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): ProjectListObject;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): ProjectListObjectJSON;
}

/** ProjectDeleteRequest in the API format: the object sent and received as JSON. */
export interface ProjectDeleteRequestJSON {
  "project_id"?: string;
  "project_api_key"?: string;
}

/** Fields of new ProjectDeleteRequest(): a nested model may be a plain object in the API format. */
export interface ProjectDeleteRequestInit {
  /**
   * Unique project identifier. You should identify project to delete either with project_id or with
   * project_api_key field. We recommend usage of project_id as a more secure option.
   */
  projectId?: string;
  /**
   * Optional project API key. You should identify project to delete either with project_id or with
   * project_api_key field. We recommend usage of project_id as a more secure option.
   */
  projectApiKey?: string;
}

/** ProjectDeleteRequest */
export declare class ProjectDeleteRequest {
  constructor(data?: ProjectDeleteRequestInit);
  /**
   * Unique project identifier. You should identify project to delete either with project_id or with
   * project_api_key field. We recommend usage of project_id as a more secure option.
   */
  projectId?: string;
  /**
   * Optional project API key. You should identify project to delete either with project_id or with
   * project_api_key field. We recommend usage of project_id as a more secure option.
   */
  projectApiKey?: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): ProjectDeleteRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): ProjectDeleteRequestJSON;
}
