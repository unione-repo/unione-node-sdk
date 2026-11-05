/** What failed: ApiError.kind. */
export const ErrorKind = Object.freeze({
  /** The API returned an error (errorCode, hint). */
  API: "api",
  /** The request could not be sent or the response could not be received. */
  NETWORK: "network",
  /** The request timed out. */
  TIMEOUT: "timeout",
  /** The response is not the JSON of the API (a proxy page, a broken body). */
  INVALID_RESPONSE: "invalid_response",
  /** Found before sending (an empty API key, a required field missing): no request was sent. */
  INVALID_REQUEST: "invalid_request",
});

/**
 * Error thrown when the API returns an error, the request fails or is invalid, or the response can not be processed.
 * The message names the API method and, for an API error, the code, the HTTP status and how to fix it:
 * "email/send: Unknown recipient (API error 204, HTTP 400). Fix: ... See ...#api-errors".
 */
export class ApiError extends Error {
  /**
   * @param {string} message
   * @param {{httpStatus?: number, errorCode?: number|null, responseBody?: object|null, cause?: unknown,
   *   method?: string, hint?: string|null, kind?: string, apiMessage?: string|null}} [options]
   */
  constructor(message, { httpStatus = 0, errorCode = null, responseBody = null, cause, method = "", hint = null,
    kind = ErrorKind.API, apiMessage = null } = {}) {
    super(message);
    if (cause !== undefined) {
      /** The error that caused this one (set here: the "cause" option of Error needs Node.js 16.9). */
      Object.defineProperty(this, "cause", { value: cause, writable: true, configurable: true });
    }
    this.name = "ApiError";
    /** HTTP status of the response, 0 when the request was not sent. */
    this.httpStatus = httpStatus;
    /** API error code (the "code" field of the error response). */
    this.errorCode = errorCode;
    /** Decoded error response. */
    this.responseBody = responseBody;
    /** API method of the request, e.g. "email/send"; empty when unknown. */
    this.method = method;
    /** How to fix the API error (the errors table of the docs), null when unknown. */
    this.hint = hint;
    /** What failed: one of ErrorKind. */
    this.kind = kind;
    /** The API's own error message (the "message" field of the error response, in full), null without one. */
    this.apiMessage = apiMessage;
  }

  /** A repeat of the request may succeed: a network error, a timeout, HTTP 429 or 5xx. */
  get retryable() {
    if (this.kind === ErrorKind.NETWORK || this.kind === ErrorKind.TIMEOUT) {
      return true;
    }
    if (this.kind === ErrorKind.API || this.kind === ErrorKind.INVALID_RESPONSE) {
      return this.httpStatus === 429 || this.httpStatus >= 500;
    }
    return false;
  }
}
