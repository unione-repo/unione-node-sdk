# Tag

[Back to the list of sections](../README.md)

This family of methods is used to manage user-defined tags. Tags are used to categorize letters based on your own criteria, e. g. to create a distinction between marketing and transactional letters or group together all notifications for a particular order type. UniOne allows you to assign tags to all outgoing emails, and the tags you’ve set may then be used to filter and analyze delivery statistics.

`import { TagApi } from "unione/api/tag"`, `client.tag`

| Method | Endpoint | Description |
|---|---|---|
| [`list`](#list) | `POST /tag/list.json` | This method returns the full list of user-defined tags. Does not receive any parameters. |
| [`delete`](#delete) | `POST /tag/delete.json` | Removes tag. |

## list

`POST /tag/list.json` · [Documentation](https://docs.unione.io/en/web-api-ref#tag-list)

This method returns the full list of user-defined tags. Does not receive any parameters.

### Request

The method has no parameters.

### Response: `TagListResponse`

| Field | Type | Description |
|---|---|---|
| `status` | `string` | "success" string (`success`) |
| `tags` | `TagsResponseObject[]` | An array of objects containing data for user-defined tags. |

### Example

```javascript
import { UniOneClient } from "unione";

const client = new UniOneClient("YOUR_API_KEY");

const response = await client.tag.list();
console.log(response.tags);
```

## delete

`POST /tag/delete.json` · [Documentation](https://docs.unione.io/en/web-api-ref#tag-delete)

Removes tag.

### Request: `TagDeleteRequest`

| Field | Type | Required | Description |
|---|---|---|---|
| `tagId` | `number` | yes | Unique tag id. |

### Response: `SuccessResponse`

| Field | Type | Description |
|---|---|---|
| `status` | `string` | "success" string (`success`) |

### Example

```javascript
import { UniOneClient } from "unione";
import { TagDeleteRequest } from "unione/api/tag";

const client = new UniOneClient("YOUR_API_KEY");

const response = await client.tag.delete(new TagDeleteRequest({
  tagId: 54,
}));
console.log(response);
```
