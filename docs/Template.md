# Template

[Back to the list of sections](../README.md)

You have the option of storing a template on the UniOne side and then using it by id, which is highly recommended for sending repetitive messages or high volume traffic. UniOne supports two different [template engines](https://docs.unione.io/en/template-engines).

`import { TemplateApi } from "unione/api/template"`, `client.template`

| Method | Endpoint | Description |
|---|---|---|
| [`set`](#set) | `POST /template/set.json` | Creates or updates an email template. |
| [`get`](#get) | `POST /template/get.json` | Gets template properties by it's id. |
| [`list`](#list) | `POST /template/list.json` | Returns the list of all or some templates of the account. |
| [`delete`](#delete) | `POST /template/delete.json` | Deletes a template by id. |

## set

`POST /template/set.json` · [Documentation](https://docs.unione.io/en/web-api-ref#template-set)

Creates or updates an email template.

Restrictions:
* The maximum request size is 10 MB.
* The number of templates is limited to 10000.

### Request: `TemplateSetRequest`

| Field | Type | Required | Description |
|---|---|---|---|
| `template` | `TemplateObject` | yes | Object with all the template properties. |

### Response: `TemplateSetResponse`

| Field | Type | Description |
|---|---|---|
| `status` | `string` | "success" string (`success`) |
| `template` | `TemplateObject` | Object with all the template properties. |

### Example

```javascript
import { UniOneClient } from "unione";
import { TemplateSetRequest, TemplateObject, EditorType } from "unione/api/template";
import { TemplateEngine } from "unione/common";

const client = new UniOneClient("YOUR_API_KEY");

const response = await client.template.set(new TemplateSetRequest({
  template: new TemplateObject({
    name: "name",
    editorType: EditorType.HTML,
    templateEngine: TemplateEngine.VELOCITY,
    subject: "UniOne test email ",
    fromEmail: "user@example.com",
    fromName: "John Smith",
    replyTo: "email@example.com",
    replyToName: "John Smith",
  }),
}));
console.log(response.template);
```

## get

`POST /template/get.json` · [Documentation](https://docs.unione.io/en/web-api-ref#template-get)

Gets template properties by it's id.

### Request: `TemplateGetRequest`

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | yes | Template id. |

### Response: `TemplateGetResponse`

| Field | Type | Description |
|---|---|---|
| `status` | `string` | "success" string (`success`) |
| `template` | `TemplateObject` | Object with all the template properties. |

### Example

```javascript
import { UniOneClient } from "unione";
import { TemplateGetRequest } from "unione/api/template";

const client = new UniOneClient("YOUR_API_KEY");

const response = await client.template.get(new TemplateGetRequest({
  id: "00000000-0000-0000-0000-000000000000",
}));
console.log(response.template);
```

## list

`POST /template/list.json` · [Documentation](https://docs.unione.io/en/web-api-ref#template-list)

Returns the list of all or some templates of the account.

You can iterate thru large list using "offset" and "limit" parameters. When less than "limit" templates are returned then the end of list is reached.

### Request: `TemplateListRequest`

| Field | Type | Required | Description |
|---|---|---|---|
| `limit` | `number` |  | Limits the number of templates returned, default is 50. |
| `offset` | `number` |  | Index of the first template in the list, starting with 0. |

### Response: `TemplateListResponse`

| Field | Type | Description |
|---|---|---|
| `status` | `string` | "success" string (`success`) |
| `templates` | `TemplateListObject[]` | Array of template objects. |

### Example

```javascript
import { UniOneClient } from "unione";
import { TemplateListRequest } from "unione/api/template";

const client = new UniOneClient("YOUR_API_KEY");

const response = await client.template.list(new TemplateListRequest());
console.log(response.templates);
```

## delete

`POST /template/delete.json` · [Documentation](https://docs.unione.io/en/web-api-ref#template-delete)

Deletes a template by id.

### Request: `TemplateDeleteRequest`

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | yes | Template id. |

### Response: `SuccessResponse`

| Field | Type | Description |
|---|---|---|
| `status` | `string` | "success" string (`success`) |

### Example

```javascript
import { UniOneClient } from "unione";
import { TemplateDeleteRequest } from "unione/api/template";

const client = new UniOneClient("YOUR_API_KEY");

const response = await client.template.delete(new TemplateDeleteRequest({
  id: "00000000-0000-0000-0000-000000000000",
}));
console.log(response);
```
