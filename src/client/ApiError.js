/** Error thrown when the API returns an error or the response can not be processed. */
export class ApiError extends Error {
  /**
   * @param {string} message
   * @param {{httpStatus?: number, errorCode?: number|null, responseBody?: object|null, cause?: unknown}} [options]
   */
  constructor(message, { httpStatus = 0, errorCode = null, responseBody = null, cause } = {}) {
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
  }
}
