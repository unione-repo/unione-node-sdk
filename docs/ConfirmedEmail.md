# ConfirmedEmail

[Back to the list of sections](../README.md)

Manage email addresses confirmed for sandbox-domain sending. These methods are available only with a main account API key.

`import { ConfirmedEmailApi } from "unione/api/confirmed-email"`, `client.confirmedEmail`

| Method | Endpoint | Description |
|---|---|---|
| [`create`](#create) | `POST /confirmed-email/create.json` | Adds an email address and sends a confirmation link. |
| [`list`](#list) | `POST /confirmed-email/list.json` | Lists confirmed and unconfirmed email addresses for the account. |
| [`delete`](#delete) | `POST /confirmed-email/delete.json` | Deletes an email address from the account's confirmed email list. |

## create

`POST /confirmed-email/create.json` · [Documentation](https://docs.unione.io/en/web-api-ref#confirmed-email-create)

Adds an email address and sends a confirmation link.

### Request: `ConfirmedEmailRequest`

| Field | Type | Required | Description |
|---|---|---|---|
| `email` | `string` | yes | Email address to add or delete. |

### Response: `ConfirmedEmailCreateResponse`

| Field | Type | Description |
|---|---|---|
| `status` | `string` | "success" string (`success`) |
| `confirmedEmail` | `ConfirmedEmail` |  |

### Example

```javascript
import { UniOneClient } from "unione";
import { ConfirmedEmailRequest } from "unione/api/confirmed-email";

const client = new UniOneClient("YOUR_API_KEY");

const response = await client.confirmedEmail.create(new ConfirmedEmailRequest({
  email: "dev@example.com",
}));
console.log(response.confirmedEmail);
```

## list

`POST /confirmed-email/list.json` · [Documentation](https://docs.unione.io/en/web-api-ref#confirmed-email-list)

Lists confirmed and unconfirmed email addresses for the account.

### Request

The method has no parameters.

### Response: `ConfirmedEmailListResponse`

| Field | Type | Description |
|---|---|---|
| `status` | `string` | "success" string (`success`) |
| `confirmedEmails` | `ConfirmedEmail[]` |  |

### Example

```javascript
import { UniOneClient } from "unione";

const client = new UniOneClient("YOUR_API_KEY");

const response = await client.confirmedEmail.list();
console.log(response.confirmedEmails);
```

## delete

`POST /confirmed-email/delete.json` · [Documentation](https://docs.unione.io/en/web-api-ref#confirmed-email-delete)

Deletes an email address from the account's confirmed email list.

### Request: `ConfirmedEmailRequest`

| Field | Type | Required | Description |
|---|---|---|---|
| `email` | `string` | yes | Email address to add or delete. |

### Response: `ConfirmedEmailDeleteResponse`

| Field | Type | Description |
|---|---|---|
| `status` | `string` | "success" string (`success`) |
| `message` | `string` |  |

### Example

```javascript
import { UniOneClient } from "unione";
import { ConfirmedEmailRequest } from "unione/api/confirmed-email";

const client = new UniOneClient("YOUR_API_KEY");

const response = await client.confirmedEmail.delete(new ConfirmedEmailRequest({
  email: "dev@example.com",
}));
console.log(response.message);
```
