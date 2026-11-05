/** What failed: ApiError.kind. */
export declare const ErrorKind: Readonly<{
  /** The API returned an error (errorCode, hint). */
  API: "api";
  /** The request could not be sent or the response could not be received. */
  NETWORK: "network";
  /** The request timed out. */
  TIMEOUT: "timeout";
  /** The response is not the JSON of the API (a proxy page, a broken body). */
  INVALID_RESPONSE: "invalid_response";
  /** Found before sending (an empty API key, a required field missing): no request was sent. */
  INVALID_REQUEST: "invalid_request";
}>;
export type ErrorKind = (typeof ErrorKind)[keyof typeof ErrorKind];

/** Options of ApiError. */
export interface ApiErrorOptions {
  httpStatus?: number;
  errorCode?: number | null;
  responseBody?: Record<string, any> | null;
  cause?: unknown;
  method?: string;
  hint?: string | null;
  kind?: ErrorKind;
  apiMessage?: string | null;
}

/**
 * Error thrown when the API returns an error, the request fails or is invalid, or the response can not be processed.
 * The message names the API method and, for an API error, the code, the HTTP status and how to fix it:
 * "email/send: Unknown recipient (API error 204, HTTP 400). Fix: ... See ...#api-errors".
 */
export declare class ApiError extends Error {
  constructor(message: string, options?: ApiErrorOptions);
  /** HTTP status of the response, 0 when the request was not sent. */
  httpStatus: number;
  /** API error code (the "code" field of the error response). */
  errorCode: number | null;
  /** Decoded error response. */
  responseBody: Record<string, any> | null;
  /** The error that caused this one (network error, invalid JSON, ...). */
  cause?: unknown;
  /** API method of the request, e.g. "email/send"; empty when unknown. */
  method: string;
  /** How to fix the API error (the errors table of the docs), null when unknown. */
  hint: string | null;
  /** What failed. */
  kind: ErrorKind;
  /** The API's own error message (the "message" field of the error response, in full), null without one. */
  apiMessage: string | null;
  /** A repeat of the request may succeed: a network error, a timeout, HTTP 429 or 5xx. */
  readonly retryable: boolean;
}
