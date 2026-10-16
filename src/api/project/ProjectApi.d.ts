// ProjectApi: API methods of the Project section.
import type { ApiClient } from "../../client/ApiClient.js";
import type { SuccessResponse } from "../../common/models.js";
import type { ProjectCreateRequest, ProjectCreateRequestJSON, ProjectCreateResponse, ProjectDeleteRequest, ProjectDeleteRequestJSON, ProjectListRequest, ProjectListRequestJSON, ProjectListResponse, ProjectUpdateRequest, ProjectUpdateRequestJSON, ProjectUpdateResponse } from "./models.js";

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
export declare class ProjectApi {
  constructor(client: ApiClient);
  client: ApiClient;

  /**
   * Creates a new project.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#project-create
   * @throws {ApiError}
   */
  create(request: ProjectCreateRequest | ProjectCreateRequestJSON): Promise<ProjectCreateResponse>;

  /**
   * Updates a project.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#project-update
   * @throws {ApiError}
   */
  update(request: ProjectUpdateRequest | ProjectUpdateRequestJSON): Promise<ProjectUpdateResponse>;

  /**
   * Lists projects.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#project-list
   * @throws {ApiError}
   */
  list(request?: ProjectListRequest | ProjectListRequestJSON): Promise<ProjectListResponse>;

  /**
   * Deletes a project.
   *
   * The project will be moved to the "trash bin" before being permanently deleted. You can restore the
   * project by contacting support.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#project-delete
   * @throws {ApiError}
   */
  delete(request?: ProjectDeleteRequest | ProjectDeleteRequestJSON): Promise<SuccessResponse>;
}
