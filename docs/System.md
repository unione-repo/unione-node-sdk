# System

[Back to the list of sections](../README.md)

System operations.

`import { SystemApi } from "unione/api/system"`, `client.system`

| Method | Endpoint | Description |
|---|---|---|
| [`ping`](#ping) | `POST /system/ping.json` | Checks API key validity and returns user ID. |
| [`info`](#info) | `POST /system/info.json` | Gets user or project info by API key. |

## ping

`POST /system/ping.json` · [Documentation](https://docs.unione.io/en/web-api-ref#system-ping)

Checks API key validity and returns user ID.

### Request

The method has no parameters.

### Response: `SystemPingResponse`

| Field | Type | Description |
|---|---|---|
| `status` | `string` | "success" string (`success`) |
| `userId` | `number` | Unique user identifier. |

### Example

```javascript
import { UniOneClient } from "unione";

const client = new UniOneClient("YOUR_API_KEY");

const response = await client.system.ping();
console.log(response.userId);
```

## info

`POST /system/info.json` · [Documentation](https://docs.unione.io/en/web-api-ref#system-info)

Gets user or project info by API key.

### Request

The method has no parameters.

### Response: `SystemInfoResponse`

| Field | Type | Description |
|---|---|---|
| `status` | `string` | "success" string (`success`) |
| `userId` | `number` | Unique user identifier. |
| `email` | `string` | Email of the user. |
| `projectId` | `string` | Unqiue project identifier, ASCII string up to 36 characters long. Present only if the API key used for request is the project API key. |
| `projectName` | `string` | Project name, unique for user account. Present only if the API key used for request is the project API key. |
| `projectAccounting` | `ProjectAccountingObject` | Object with email counter properties. Present only if the API key used for request is the user API key. |
| `accounting` | `SystemInfoResponseAccounting` | Object with accounting period properties. Present only if the API key used for request is the user API key. |

### Example

```javascript
import { UniOneClient } from "unione";

const client = new UniOneClient("YOUR_API_KEY");

const response = await client.system.info();
console.log(response.userId);
```
