// Types of the models of the EmailValidation section.

/** EmailValidationSingleRequest in the API format: the object sent and received as JSON. */
export interface EmailValidationSingleRequestJSON {
  "email": string;
}

/** Fields of new EmailValidationSingleRequest(): a nested model may be a plain object in the API format. */
export interface EmailValidationSingleRequestInit {
  /** Email address to be checked. */
  email: string;
}

/** EmailValidationSingleRequest */
export declare class EmailValidationSingleRequest {
  constructor(data: EmailValidationSingleRequestInit);
  /** Email address to be checked. */
  email: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): EmailValidationSingleRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): EmailValidationSingleRequestJSON;
}

/** EmailValidationSingleResponse in the API format: the object sent and received as JSON. */
export interface EmailValidationSingleResponseJSON {
  "status"?: string;
  "email"?: string;
  "result"?: string;
  "cause"?: string;
  "validity"?: number;
  "local_part"?: string;
  "domain"?: string;
  "mx_found"?: boolean;
  "mx_record"?: string;
  "did_you_mean"?: string;
  "processed_at"?: string;
}

/** Fields of new EmailValidationSingleResponse(): a nested model may be a plain object in the API format. */
export interface EmailValidationSingleResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Email address to be checked. */
  email?: string;
  /**
   * Possible statuses:
   *
   * - "valid" - the address is valid,
   * - "invalid" - the address is invalid,
   * - "suspicious" - the address looks suspicious,
   * - "unknown" - could not perform validation, the domain’s mail server has not responded within the time limit.
   */
  result?: string;
  /**
   * Possible statuses:
   *
   * - "no_mx_record" - no MX record found for the target domain,
   * - "syntax_error" - the address syntax is invalid,
   * - "possible_typo" - the address is likely to have a typo,
   * - "mailbox_not_found" - the address does not exist,
   * - "global_suppression" - the address has been marked as unreachable due to multiple previous delivery errors,
   * - "disposable" - this is a disposable one-time email address which is usually valid for a few minutes only,
   * - "role" - the address is not likely to belong to an actual person, but rather to a certain business staff role,
   * - "abuse" - the address is known to be a source of a large number of complaints, sometimes issued automatically,
   * - "spamtrap" - this email is a spam trap, it is published openly but never used for actual emails. Sending messages to such addresses has a huge negative impact on reputation score,
   * - "smtp_connection_failed" - the domain’s SMTP server does not respond; the address may contain a typo.
   */
  cause?: string;
  /** Validity score, from 0 to 100 (0 – invalid, 100 – valid). */
  validity?: number;
  /** Local part (everything preceding the @ sign). */
  localPart?: string;
  /** Domain name part. */
  domain?: string;
  /** True if the address’ domain does have an MX record, false if does not. */
  mxFound?: boolean;
  /** Preferred MX record for the domain. */
  mxRecord?: string;
  /**
   * For addresses which are likely to have typing errors (cause=possible_typo), a suggested variant with
   * a fixed typo.
   */
  didYouMean?: string;
  /** Email check date and time, YYYY-MM-DD hh:mm:ss UTC. */
  processedAt?: string;
}

/** EmailValidationSingleResponse */
export declare class EmailValidationSingleResponse {
  constructor(data?: EmailValidationSingleResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Email address to be checked. */
  email?: string;
  /**
   * Possible statuses:
   *
   * - "valid" - the address is valid,
   * - "invalid" - the address is invalid,
   * - "suspicious" - the address looks suspicious,
   * - "unknown" - could not perform validation, the domain’s mail server has not responded within the time limit.
   */
  result?: string;
  /**
   * Possible statuses:
   *
   * - "no_mx_record" - no MX record found for the target domain,
   * - "syntax_error" - the address syntax is invalid,
   * - "possible_typo" - the address is likely to have a typo,
   * - "mailbox_not_found" - the address does not exist,
   * - "global_suppression" - the address has been marked as unreachable due to multiple previous delivery errors,
   * - "disposable" - this is a disposable one-time email address which is usually valid for a few minutes only,
   * - "role" - the address is not likely to belong to an actual person, but rather to a certain business staff role,
   * - "abuse" - the address is known to be a source of a large number of complaints, sometimes issued automatically,
   * - "spamtrap" - this email is a spam trap, it is published openly but never used for actual emails. Sending messages to such addresses has a huge negative impact on reputation score,
   * - "smtp_connection_failed" - the domain’s SMTP server does not respond; the address may contain a typo.
   */
  cause?: string;
  /** Validity score, from 0 to 100 (0 – invalid, 100 – valid). */
  validity?: number;
  /** Local part (everything preceding the @ sign). */
  localPart?: string;
  /** Domain name part. */
  domain?: string;
  /** True if the address’ domain does have an MX record, false if does not. */
  mxFound?: boolean;
  /** Preferred MX record for the domain. */
  mxRecord?: string;
  /**
   * For addresses which are likely to have typing errors (cause=possible_typo), a suggested variant with
   * a fixed typo.
   */
  didYouMean?: string;
  /** Email check date and time, YYYY-MM-DD hh:mm:ss UTC. */
  processedAt?: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): EmailValidationSingleResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): EmailValidationSingleResponseJSON;
}
