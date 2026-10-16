# Project

[Back to the list of sections](../README.md)

Projects allow you to group several independent domains, webhooks, templates, and unsubscription lists together. It's very useful if you have your own clients and manage their data from a single UniOne account. Each project receives its own API key, and all API calls with that API key only deal with the data of that project. This way, you can assign a separate project for each client and be sure that they won't conflict; e.g. unsubscribing from one project won't affect another.

Projects methods are disabled by default due to antispam measures. To enable them, [contact support](https://cp.unione.io/en/support).

Please note that sending domains are confirmed and used on per-project basis by default. But it's possible to allow projects to send emails from domains confirmed for main account - just [ask support](https://cp.unione.io/en/support) to enable it.

`import { ProjectApi } from "unione/api/project"`, `client.project`

| Method | Endpoint | Description |
|---|---|---|
| [`create`](#create) | `POST /project/create.json` | Creates a new project. |
| [`update`](#update) | `POST /project/update.json` | Updates a project. |
| [`list`](#list) | `POST /project/list.json` | Lists projects. |
| [`delete`](#delete) | `POST /project/delete.json` | Deletes a project. |

## create

`POST /project/create.json` · [Documentation](https://docs.unione.io/en/web-api-ref#project-create)

Creates a new project.

### Request: `ProjectCreateRequest`

| Field | Type | Required | Description |
|---|---|---|---|
| `project` | `ProjectObject` | yes | Object with project properties. |

### Response: `ProjectCreateResponse`

| Field | Type | Description |
|---|---|---|
| `status` | `string` | "success" string (`success`) |
| `projectId` | `string` | Unqiue project identifier, ASCII string up to 36 characters long. |
| `projectApiKey` | `string` | API key of the project. You can use it instead of the user API key parameter in all methods except project/* methods. |

### Example

```javascript
import { UniOneClient } from "unione";
import { ProjectCreateRequest, ProjectObject } from "unione/api/project";

const client = new UniOneClient("YOUR_API_KEY");

const response = await client.project.create(new ProjectCreateRequest({
  project: new ProjectObject({
    name: "Project 1A",
    country: "ES",
    backendDomainId: 1234,
    unsubscribePageId: 1,
  }),
}));
console.log(response.projectId);
```

## update

`POST /project/update.json` · [Documentation](https://docs.unione.io/en/web-api-ref#project-update)

Updates a project.

### Request: `ProjectUpdateRequest`

| Field | Type | Required | Description |
|---|---|---|---|
| `projectId` | `string` |  | Unique project identifier. You should identify project to update either with project_id or with project_api_key field. But we recommend usage of project_id as a more secure option. |
| `projectApiKey` | `string` |  | Optional project API key. You should identify project to update either with project_id or with project_api_key field. But we recommend usage of project_id as a more secure option. |
| `project` | `ProjectUpdateObject` | yes | Object with project properties. |

### Response: `ProjectUpdateResponse`

| Field | Type | Description |
|---|---|---|
| `status` | `string` | "success" string (`success`) |
| `projectApiKey` | `string` | API key of the project. Returned only if the project to update was identified by project_api_key. Not returned in case of updating by project_id. |

### Example

```javascript
import { UniOneClient } from "unione";
import { ProjectUpdateRequest, ProjectUpdateObject } from "unione/api/project";

const client = new UniOneClient("YOUR_API_KEY");

const response = await client.project.update(new ProjectUpdateRequest({
  projectId: "1234567890",
  projectApiKey: "your api_key",
  project: new ProjectUpdateObject({
    name: "Project 1A",
    country: "ES",
    backendDomainId: 1234,
    unsubscribePageId: 1,
  }),
}));
console.log(response.projectApiKey);
```

## list

`POST /project/list.json` · [Documentation](https://docs.unione.io/en/web-api-ref#project-list)

Lists projects.

### Request: `ProjectListRequest`

| Field | Type | Required | Description |
|---|---|---|---|
| `projectId` | `string` |  | Optional possibility to specify project_id to include only this project to list. |
| `projectApiKey` | `string` |  | Optional possibility to specify project_api_key to include only this project to list. |

### Response: `ProjectListResponse`

| Field | Type | Description |
|---|---|---|
| `status` | `string` | "success" string (`success`) |
| `projects` | `ProjectListObject[]` | Array of objects where each object represents one project. |

### Example

```javascript
import { UniOneClient } from "unione";
import { ProjectListRequest } from "unione/api/project";

const client = new UniOneClient("YOUR_API_KEY");

const response = await client.project.list(new ProjectListRequest({
  projectId: "1234567890",
  projectApiKey: "your api_key",
}));
console.log(response.projects);
```

## delete

`POST /project/delete.json` · [Documentation](https://docs.unione.io/en/web-api-ref#project-delete)

Deletes a project.

The project will be moved to the "trash bin" before being permanently deleted. You can restore the project by contacting support.

### Request: `ProjectDeleteRequest`

| Field | Type | Required | Description |
|---|---|---|---|
| `projectId` | `string` |  | Unique project identifier. You should identify project to delete either with project_id or with project_api_key field. We recommend usage of project_id as a more secure option. |
| `projectApiKey` | `string` |  | Optional project API key. You should identify project to delete either with project_id or with project_api_key field. We recommend usage of project_id as a more secure option. |

### Response: `SuccessResponse`

| Field | Type | Description |
|---|---|---|
| `status` | `string` | "success" string (`success`) |

### Example

```javascript
import { UniOneClient } from "unione";
import { ProjectDeleteRequest } from "unione/api/project";

const client = new UniOneClient("YOUR_API_KEY");

const response = await client.project.delete(new ProjectDeleteRequest({
  projectId: "1234567890",
  projectApiKey: "your api_key",
}));
console.log(response);
```
