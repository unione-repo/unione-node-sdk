// ProjectApi: API methods of the Project section.
import { SuccessResponse } from "../../common/models.js";
import { ProjectCreateRequest, ProjectCreateResponse, ProjectDeleteRequest, ProjectListRequest, ProjectListResponse, ProjectUpdateRequest, ProjectUpdateResponse } from "./models.js";

/**
 * Projects allow you to group several independent domains, webhooks, templates, and unsubscription
 * lists together. It's very useful if you have your own clients and manage their data from a single
 * UniOne account. Each project receives its own API key, and all API calls with that API key only deal
 * with the data of that project. This way, you can assign a separate project for each client and be
 * sure that they won't conflict; e.g. unsubscribing from one project won't affect another.
 *
 * Projects methods are disabled by default due to antispam measures. To enable them, [contact
 * support](https://cp.unione.io/en/support).
 *
 * Please note that sending domains are confirmed and used on per-project basis by default. But it's
 * possible to allow projects to send emails from domains confirmed for main account - just [ask
 * support](https://cp.unione.io/en/support) to enable it.
 */
export class ProjectApi {
  /** @param {import("../../client/ApiClient.js").ApiClient} client */
  constructor(client) {
    this.client = client;
  }

  /**
   * Creates a new project.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#project-create
   * @param {ProjectCreateRequest|Record<string, any>} request Request model or plain object in the API format.
   * @returns {Promise<ProjectCreateResponse>}
   * @throws {ApiError}
   */
  async create(request) {
    return ProjectCreateResponse.fromJSON(await this.client.call("/project/create.json", request));
  }

  /**
   * Updates a project.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#project-update
   * @param {ProjectUpdateRequest|Record<string, any>} request Request model or plain object in the API format.
   * @returns {Promise<ProjectUpdateResponse>}
   * @throws {ApiError}
   */
  async update(request) {
    return ProjectUpdateResponse.fromJSON(await this.client.call("/project/update.json", request));
  }

  /**
   * Lists projects.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#project-list
   * @param {ProjectListRequest|Record<string, any>} request Request model or plain object in the API format.
   * @returns {Promise<ProjectListResponse>}
   * @throws {ApiError}
   */
  async list(request) {
    return ProjectListResponse.fromJSON(await this.client.call("/project/list.json", request));
  }

  /**
   * Deletes a project.
   *
   * The project will be moved to the "trash bin" before being permanently deleted. You can restore the
   * project by contacting support.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#project-delete
   * @param {ProjectDeleteRequest|Record<string, any>} request Request model or plain object in the API format.
   * @returns {Promise<SuccessResponse>}
   * @throws {ApiError}
   */
  async delete(request) {
    return SuccessResponse.fromJSON(await this.client.call("/project/delete.json", request));
  }
}
