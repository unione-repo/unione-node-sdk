/** Options of ApiError. */
export interface ApiErrorOptions {
  httpStatus?: number;
  errorCode?: number | null;
  responseBody?: Record<string, any> | null;
  cause?: unknown;
}

/** Error thrown when the API returns an error or the response can not be processed. */
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
}
