// Models of the Project section.
import { compact, toModel, toPlain } from "../../client/ApiClient.js";

/** ProjectCreateRequest */
export class ProjectCreateRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {ProjectObject} data.project Object with project properties.
   */
  constructor({ project } = {}) {
    /**
     * Object with project properties.
     * @type {ProjectObject|undefined}
     */
    this.project = project == null ? project : toModel(project, ProjectObject);
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {ProjectCreateRequest}
   */
  static fromJSON(data) {
    return new ProjectCreateRequest({
      project: data["project"] == null ? undefined : toModel(data["project"], ProjectObject),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "project": this.project == null ? undefined : toPlain(this.project),
    });
  }
}

/** Object with project properties. */
export class ProjectObject {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} data.name Project name, unique for user account.
   * @param {string} [data.country] ISO-3166 alpha-2 country code. If set, UniOne treats project personal data according to country laws, e.g. GDPR for european countries.
   * @param {boolean} [data.sendEnabled] Whether email sending is enabled for this project or not.
   * @param {boolean} [data.customUnsubscribeUrlEnabled] If it's false then UniOne adds default unsubscribe footer to each email sent with API key of the project. If it's true then appending default unsubscribe footer for this project is avoided and sending with custom unsubscribe url or even without unsubscribe url is permitted for the project. Please note that custom_unsubscribe_url_enabled=true is available only if removing unsubscribe link is approved for the user account by support. More on this [here](https://docs.unione.io/en/unsubscribe-link). When custom_unsubscribe_url_enabled is skipped on creating a project, it's value is taken from user
   * @param {number} [data.backendDomainId] A unique domain identifier which will determine the [tracking domain](https://docs.unione.io/en/tracking-domains) or [dedicated IP](/dedicated-ip) pool to be used by default. If the value is not specified, a default backend domain will be assigned for your account or project instead.
   * @param {number} [data.unsubscribePageId] A unique identifier that defines the default unsubscribe page. If absent, the account/project will be assigned the system default unsubscribe page.
   */
  constructor({ name, country, sendEnabled, customUnsubscribeUrlEnabled, backendDomainId, unsubscribePageId } = {}) {
    /**
     * Project name, unique for user account.
     * @type {string|undefined}
     */
    this.name = name;
    /**
     * ISO-3166 alpha-2 country code. If set, UniOne treats project personal data according to country
     * laws, e.g. GDPR for european countries.
     * @type {string|undefined}
     */
    this.country = country;
    /**
     * Whether email sending is enabled for this project or not.
     * Default: `True`.
     * @type {boolean|undefined}
     */
    this.sendEnabled = sendEnabled;
    /**
     * If it's false then UniOne adds default unsubscribe footer to each email sent with API key of the
     * project. If it's true then appending default unsubscribe footer for this project is avoided and
     * sending with custom unsubscribe url or even without unsubscribe url is permitted for the project.
     * Please note that custom_unsubscribe_url_enabled=true is available only if removing unsubscribe link
     * is approved for the user account by support. More on this
     * [here](https://docs.unione.io/en/unsubscribe-link). When custom_unsubscribe_url_enabled is skipped
     * on creating a project, it's value is taken from user
     * @type {boolean|undefined}
     */
    this.customUnsubscribeUrlEnabled = customUnsubscribeUrlEnabled;
    /**
     * A unique domain identifier which will determine the [tracking
     * domain](https://docs.unione.io/en/tracking-domains) or [dedicated IP](/dedicated-ip) pool to be used
     * by default. If the value is not specified, a default backend domain will be assigned for your
     * account or project instead.
     * @type {number|undefined}
     */
    this.backendDomainId = backendDomainId;
    /**
     * A unique identifier that defines the default unsubscribe page. If absent, the account/project will
     * be assigned the system default unsubscribe page.
     * @type {number|undefined}
     */
    this.unsubscribePageId = unsubscribePageId;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {ProjectObject}
   */
  static fromJSON(data) {
    return new ProjectObject({
      name: data["name"],
      country: data["country"],
      sendEnabled: data["send_enabled"],
      customUnsubscribeUrlEnabled: data["custom_unsubscribe_url_enabled"],
      backendDomainId: data["backend_domain_id"],
      unsubscribePageId: data["unsubscribe_page_id"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "name": this.name,
      "country": this.country,
      "send_enabled": this.sendEnabled,
      "custom_unsubscribe_url_enabled": this.customUnsubscribeUrlEnabled,
      "backend_domain_id": this.backendDomainId,
      "unsubscribe_page_id": this.unsubscribePageId,
    });
  }
}

/** ProjectCreateResponse */
export class ProjectCreateResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {string} [data.projectId] Unqiue project identifier, ASCII string up to 36 characters long.
   * @param {string} [data.projectApiKey] API key of the project. You can use it instead of the user API key parameter in all methods except project/* methods.
   */
  constructor({ status, projectId, projectApiKey } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * Unqiue project identifier, ASCII string up to 36 characters long.
     * @type {string|undefined}
     */
    this.projectId = projectId;
    /**
     * API key of the project. You can use it instead of the user API key parameter in all methods except
     * project/* methods.
     * @type {string|undefined}
     */
    this.projectApiKey = projectApiKey;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {ProjectCreateResponse}
   */
  static fromJSON(data) {
    return new ProjectCreateResponse({
      status: data["status"],
      projectId: data["project_id"],
      projectApiKey: data["project_api_key"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "project_id": this.projectId,
      "project_api_key": this.projectApiKey,
    });
  }
}

/** ProjectUpdateRequest */
export class ProjectUpdateRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.projectId] Unique project identifier. You should identify project to update either with project_id or with project_api_key field. But we recommend usage of project_id as a more secure option.
   * @param {string} [data.projectApiKey] Optional project API key. You should identify project to update either with project_id or with project_api_key field. But we recommend usage of project_id as a more secure option.
   * @param {ProjectUpdateObject} data.project Object with project properties.
   */
  constructor({ projectId, projectApiKey, project } = {}) {
    /**
     * Unique project identifier. You should identify project to update either with project_id or with
     * project_api_key field. But we recommend usage of project_id as a more secure option.
     * @type {string|undefined}
     */
    this.projectId = projectId;
    /**
     * Optional project API key. You should identify project to update either with project_id or with
     * project_api_key field. But we recommend usage of project_id as a more secure option.
     * @type {string|undefined}
     */
    this.projectApiKey = projectApiKey;
    /**
     * Object with project properties.
     * @type {ProjectUpdateObject|undefined}
     */
    this.project = project == null ? project : toModel(project, ProjectUpdateObject);
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {ProjectUpdateRequest}
   */
  static fromJSON(data) {
    return new ProjectUpdateRequest({
      projectId: data["project_id"],
      projectApiKey: data["project_api_key"],
      project: data["project"] == null ? undefined : toModel(data["project"], ProjectUpdateObject),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "project_id": this.projectId,
      "project_api_key": this.projectApiKey,
      "project": this.project == null ? undefined : toPlain(this.project),
    });
  }
}

/** Object with project properties. */
export class ProjectUpdateObject {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} data.name Project name, unique for user account.
   * @param {string} [data.country] ISO-3166 alpha-2 country code. If set, UniOne treats project personal data according to country laws, e.g. GDPR for european countries.
   * @param {boolean} [data.sendEnabled] Whether email sending is enabled for this project or not.
   * @param {boolean} [data.customUnsubscribeUrlEnabled] If it's false then UniOne adds default unsubscribe footer to each email sent with API key of the project. If it's true then appending default unsubscribe footer for this project is avoided and sending with custom unsubscribe url or even without unsubscribe url is permitted for the project. Please note that custom_unsubscribe_url_enabled=true is available only if removing unsubscribe link is approved for the user account by support. More on this [here](https://docs.unione.io/en/unsubscribe-link). When custom_unsubscribe_url_enabled is skipped on creating a project, it's value is taken from user
   * @param {number} [data.backendDomainId] A unique domain identifier which will determine the [tracking domain](https://docs.unione.io/en/tracking-domains) or [dedicated IP](/dedicated-ip) pool to be used by default. If the value is not specified, a default backend domain will be assigned for your account or project instead.
   * @param {number} [data.unsubscribePageId] A unique identifier that defines the default unsubscribe page. If absent, the account/project will be assigned the system default unsubscribe page.
   * @param {number} [data.emailCounter] Project's email counter value. 0 value only is accepted (which means resetting the counter to zero), or refreshes automatically depending on the counter mode set with the 'email_counter_mode' parameter. If the request doesn't contain the field or contains null, the limit value doesn't change.
   * @param {number} [data.emailCounterLimit] Allows you to limit the number of emails sent by the project. The sending stops when the limit is reached. Any non-negative 64-bit integer is acceptable. Setting to 0 means no limit. If the request doesn't contain the field or contains null, the limit value doesn't change.
   * @param {"default"|"permanent"} [data.emailCounterMode] Sets the email counter mode. It allows you to choose whether the counter should reset automatically, or remain permanent. The following values are acceptable: 'default' - the counter resets to zero automatically at the beginning of each accounting period, 'permanent' - the counter never resets automatically. The reset can be done only manually by the user in the request with the passes 0 value in the email_counter field. If the request doesn't contain the field or contains a null value, the limit value doesn't change.
   */
  constructor({ name, country, sendEnabled, customUnsubscribeUrlEnabled, backendDomainId, unsubscribePageId, emailCounter, emailCounterLimit, emailCounterMode } = {}) {
    /**
     * Project name, unique for user account.
     * @type {string|undefined}
     */
    this.name = name;
    /**
     * ISO-3166 alpha-2 country code. If set, UniOne treats project personal data according to country
     * laws, e.g. GDPR for european countries.
     * @type {string|undefined}
     */
    this.country = country;
    /**
     * Whether email sending is enabled for this project or not.
     * Default: `True`.
     * @type {boolean|undefined}
     */
    this.sendEnabled = sendEnabled;
    /**
     * If it's false then UniOne adds default unsubscribe footer to each email sent with API key of the
     * project. If it's true then appending default unsubscribe footer for this project is avoided and
     * sending with custom unsubscribe url or even without unsubscribe url is permitted for the project.
     * Please note that custom_unsubscribe_url_enabled=true is available only if removing unsubscribe link
     * is approved for the user account by support. More on this
     * [here](https://docs.unione.io/en/unsubscribe-link). When custom_unsubscribe_url_enabled is skipped
     * on creating a project, it's value is taken from user
     * @type {boolean|undefined}
     */
    this.customUnsubscribeUrlEnabled = customUnsubscribeUrlEnabled;
    /**
     * A unique domain identifier which will determine the [tracking
     * domain](https://docs.unione.io/en/tracking-domains) or [dedicated IP](/dedicated-ip) pool to be used
     * by default. If the value is not specified, a default backend domain will be assigned for your
     * account or project instead.
     * @type {number|undefined}
     */
    this.backendDomainId = backendDomainId;
    /**
     * A unique identifier that defines the default unsubscribe page. If absent, the account/project will
     * be assigned the system default unsubscribe page.
     * @type {number|undefined}
     */
    this.unsubscribePageId = unsubscribePageId;
    /**
     * Project's email counter value. 0 value only is accepted (which means resetting the counter to zero),
     * or refreshes automatically depending on the counter mode set with the 'email_counter_mode'
     * parameter. If the request doesn't contain the field or contains null, the limit value doesn't
     * change.
     * @type {number|undefined}
     */
    this.emailCounter = emailCounter;
    /**
     * Allows you to limit the number of emails sent by the project. The sending stops when the limit is
     * reached. Any non-negative 64-bit integer is acceptable. Setting to 0 means no limit. If the request
     * doesn't contain the field or contains null, the limit value doesn't change.
     * Default: `0`.
     * @type {number|undefined}
     */
    this.emailCounterLimit = emailCounterLimit;
    /**
     * Sets the email counter mode. It allows you to choose whether the counter should reset automatically,
     * or remain permanent. The following values are acceptable: 'default' - the counter resets to zero
     * automatically at the beginning of each accounting period, 'permanent' - the counter never resets
     * automatically. The reset can be done only manually by the user in the request with the passes 0
     * value in the email_counter field. If the request doesn't contain the field or contains a null value,
     * the limit value doesn't change.
     * Default: `default`.
     * @type {"default"|"permanent"|undefined}
     */
    this.emailCounterMode = emailCounterMode;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {ProjectUpdateObject}
   */
  static fromJSON(data) {
    return new ProjectUpdateObject({
      name: data["name"],
      country: data["country"],
      sendEnabled: data["send_enabled"],
      customUnsubscribeUrlEnabled: data["custom_unsubscribe_url_enabled"],
      backendDomainId: data["backend_domain_id"],
      unsubscribePageId: data["unsubscribe_page_id"],
      emailCounter: data["email_counter"],
      emailCounterLimit: data["email_counter_limit"],
      emailCounterMode: data["email_counter_mode"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "name": this.name,
      "country": this.country,
      "send_enabled": this.sendEnabled,
      "custom_unsubscribe_url_enabled": this.customUnsubscribeUrlEnabled,
      "backend_domain_id": this.backendDomainId,
      "unsubscribe_page_id": this.unsubscribePageId,
      "email_counter": this.emailCounter,
      "email_counter_limit": this.emailCounterLimit,
      "email_counter_mode": this.emailCounterMode,
    });
  }
}

/** ProjectUpdateResponse */
export class ProjectUpdateResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {string} [data.projectApiKey] API key of the project. Returned only if the project to update was identified by project_api_key. Not returned in case of updating by project_id.
   */
  constructor({ status, projectApiKey } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * API key of the project. Returned only if the project to update was identified by project_api_key.
     * Not returned in case of updating by project_id.
     * @type {string|undefined}
     */
    this.projectApiKey = projectApiKey;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {ProjectUpdateResponse}
   */
  static fromJSON(data) {
    return new ProjectUpdateResponse({
      status: data["status"],
      projectApiKey: data["project_api_key"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "project_api_key": this.projectApiKey,
    });
  }
}

/** ProjectListRequest */
export class ProjectListRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.projectId] Optional possibility to specify project_id to include only this project to list.
   * @param {string} [data.projectApiKey] Optional possibility to specify project_api_key to include only this project to list.
   */
  constructor({ projectId, projectApiKey } = {}) {
    /**
     * Optional possibility to specify project_id to include only this project to list.
     * @type {string|undefined}
     */
    this.projectId = projectId;
    /**
     * Optional possibility to specify project_api_key to include only this project to list.
     * @type {string|undefined}
     */
    this.projectApiKey = projectApiKey;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {ProjectListRequest}
   */
  static fromJSON(data) {
    return new ProjectListRequest({
      projectId: data["project_id"],
      projectApiKey: data["project_api_key"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "project_id": this.projectId,
      "project_api_key": this.projectApiKey,
    });
  }
}

/** ProjectListResponse */
export class ProjectListResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {ProjectListObject[]} [data.projects] Array of objects where each object represents one project.
   */
  constructor({ status, projects } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * Array of objects where each object represents one project.
     * @type {ProjectListObject[]|undefined}
     */
    this.projects = projects == null ? projects : projects.map((item0) => toModel(item0, ProjectListObject));
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {ProjectListResponse}
   */
  static fromJSON(data) {
    return new ProjectListResponse({
      status: data["status"],
      projects: data["projects"] == null ? undefined : data["projects"].map((item0) => toModel(item0, ProjectListObject)),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "projects": this.projects == null ? undefined : this.projects.map((item0) => toPlain(item0)),
    });
  }
}

/** ProjectListObject */
export class ProjectListObject {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.id] Unqiue project identifier, ASCII string up to 36 characters long.
   * @param {string} [data.apiKey] API key of the project. You can use it instead of the user API key parameter in all methods except project/* methods.
   * @param {string} [data.name] Project name, unique for user account.
   * @param {string} [data.country] ISO-3166 alpha-2 country code. If set, UniOne treats project personal data according to country laws, e.g. GDPR for european countries.
   * @param {string} [data.regTime] Date and time of project creation in UTC timezone in "YYYY-MM-DD hh:mm:ss" format.
   * @param {boolean} [data.sendEnabled] Whether email sending is enabled for this project or not.
   * @param {boolean} [data.customUnsubscribeUrlEnabled] If it's false then UniOne adds default unsubscribe footer to each email sent with API key of the project. If it's true then appending default unsubscribe footer for this project is avoided and sending with custom unsubscribe url or even without unsubscribe url is permitted for the project. Please note that custom_unsubscribe_url_enabled=true is available only if removing unsubscribe link is approved for the user account by support. More on this [here](https://docs.unione.io/en/unsubscribe-link). When custom_unsubscribe_url_enabled is skipped on creating a project, it's value is taken from user
   * @param {number} [data.backendDomainId] A unique domain identifier which will determine the [tracking domain](https://docs.unione.io/en/tracking-domains) or [dedicated IP](/dedicated-ip) pool to be used by default. If the value is not specified, a default backend domain will be assigned for your account or project instead.
   * @param {number} [data.emailCounter] Project's email counter value. It increases on every email sent.
   * @param {number} [data.emailCounterLimit] Allows you to limit the number of emails sent by the project. The sending stops when the limit is reached. Any non-negative 64-bit integer is acceptable. 0 means no limit.
   * @param {"default"|"permanent"} [data.emailCounterMode] 'default' - the counter resets to zero automatically at the beginning of each accounting period. 'permanent' - the counter never resets automatically.
   * @param {number} [data.unsubscribePageId] A unique identifier that defines the default unsubscribe page. If absent, the account/project will be assigned the system default unsubscribe page.
   */
  constructor({ id, apiKey, name, country, regTime, sendEnabled, customUnsubscribeUrlEnabled, backendDomainId, emailCounter, emailCounterLimit, emailCounterMode, unsubscribePageId } = {}) {
    /**
     * Unqiue project identifier, ASCII string up to 36 characters long.
     * @type {string|undefined}
     */
    this.id = id;
    /**
     * API key of the project. You can use it instead of the user API key parameter in all methods except
     * project/* methods.
     * @type {string|undefined}
     */
    this.apiKey = apiKey;
    /**
     * Project name, unique for user account.
     * @type {string|undefined}
     */
    this.name = name;
    /**
     * ISO-3166 alpha-2 country code. If set, UniOne treats project personal data according to country
     * laws, e.g. GDPR for european countries.
     * @type {string|undefined}
     */
    this.country = country;
    /**
     * Date and time of project creation in UTC timezone in "YYYY-MM-DD hh:mm:ss" format.
     * @type {string|undefined}
     */
    this.regTime = regTime;
    /**
     * Whether email sending is enabled for this project or not.
     * Default: `True`.
     * @type {boolean|undefined}
     */
    this.sendEnabled = sendEnabled;
    /**
     * If it's false then UniOne adds default unsubscribe footer to each email sent with API key of the
     * project. If it's true then appending default unsubscribe footer for this project is avoided and
     * sending with custom unsubscribe url or even without unsubscribe url is permitted for the project.
     * Please note that custom_unsubscribe_url_enabled=true is available only if removing unsubscribe link
     * is approved for the user account by support. More on this
     * [here](https://docs.unione.io/en/unsubscribe-link). When custom_unsubscribe_url_enabled is skipped
     * on creating a project, it's value is taken from user
     * @type {boolean|undefined}
     */
    this.customUnsubscribeUrlEnabled = customUnsubscribeUrlEnabled;
    /**
     * A unique domain identifier which will determine the [tracking
     * domain](https://docs.unione.io/en/tracking-domains) or [dedicated IP](/dedicated-ip) pool to be used
     * by default. If the value is not specified, a default backend domain will be assigned for your
     * account or project instead.
     * @type {number|undefined}
     */
    this.backendDomainId = backendDomainId;
    /**
     * Project's email counter value. It increases on every email sent.
     * @type {number|undefined}
     */
    this.emailCounter = emailCounter;
    /**
     * Allows you to limit the number of emails sent by the project. The sending stops when the limit is
     * reached. Any non-negative 64-bit integer is acceptable. 0 means no limit.
     * @type {number|undefined}
     */
    this.emailCounterLimit = emailCounterLimit;
    /**
     * 'default' - the counter resets to zero automatically at the beginning of each accounting period.
     * 'permanent' - the counter never resets automatically.
     * Default: `default`.
     * @type {"default"|"permanent"|undefined}
     */
    this.emailCounterMode = emailCounterMode;
    /**
     * A unique identifier that defines the default unsubscribe page. If absent, the account/project will
     * be assigned the system default unsubscribe page.
     * @type {number|undefined}
     */
    this.unsubscribePageId = unsubscribePageId;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {ProjectListObject}
   */
  static fromJSON(data) {
    return new ProjectListObject({
      id: data["id"],
      apiKey: data["api_key"],
      name: data["name"],
      country: data["country"],
      regTime: data["reg_time"],
      sendEnabled: data["send_enabled"],
      customUnsubscribeUrlEnabled: data["custom_unsubscribe_url_enabled"],
      backendDomainId: data["backend_domain_id"],
      emailCounter: data["email_counter"],
      emailCounterLimit: data["email_counter_limit"],
      emailCounterMode: data["email_counter_mode"],
      unsubscribePageId: data["unsubscribe_page_id"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "id": this.id,
      "api_key": this.apiKey,
      "name": this.name,
      "country": this.country,
      "reg_time": this.regTime,
      "send_enabled": this.sendEnabled,
      "custom_unsubscribe_url_enabled": this.customUnsubscribeUrlEnabled,
      "backend_domain_id": this.backendDomainId,
      "email_counter": this.emailCounter,
      "email_counter_limit": this.emailCounterLimit,
      "email_counter_mode": this.emailCounterMode,
      "unsubscribe_page_id": this.unsubscribePageId,
    });
  }
}

/** ProjectDeleteRequest */
export class ProjectDeleteRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.projectId] Unique project identifier. You should identify project to delete either with project_id or with project_api_key field. We recommend usage of project_id as a more secure option.
   * @param {string} [data.projectApiKey] Optional project API key. You should identify project to delete either with project_id or with project_api_key field. We recommend usage of project_id as a more secure option.
   */
  constructor({ projectId, projectApiKey } = {}) {
    /**
     * Unique project identifier. You should identify project to delete either with project_id or with
     * project_api_key field. We recommend usage of project_id as a more secure option.
     * @type {string|undefined}
     */
    this.projectId = projectId;
    /**
     * Optional project API key. You should identify project to delete either with project_id or with
     * project_api_key field. We recommend usage of project_id as a more secure option.
     * @type {string|undefined}
     */
    this.projectApiKey = projectApiKey;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {ProjectDeleteRequest}
   */
  static fromJSON(data) {
    return new ProjectDeleteRequest({
      projectId: data["project_id"],
      projectApiKey: data["project_api_key"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "project_id": this.projectId,
      "project_api_key": this.projectApiKey,
    });
  }
}
