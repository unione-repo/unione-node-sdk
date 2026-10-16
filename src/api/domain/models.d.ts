// Types of the models of the Domain section.
import type { VerificationRecordStatus } from "../../common/models.js";

/** Only domains with "active" DKIM record are allowed as sender domains. */
export declare const DkimStatus: Readonly<{
  ACTIVE: "active";
  INACTIVE: "inactive";
}>;
/** Only domains with "active" DKIM record are allowed as sender domains. */
export type DkimStatus = "active" | "inactive";

/** DomainGetDnsRecordsRequest in the API format: the object sent and received as JSON. */
export interface DomainGetDnsRecordsRequestJSON {
  "domain": string;
}

/** Fields of new DomainGetDnsRecordsRequest(): a nested model may be a plain object in the API format. */
export interface DomainGetDnsRecordsRequestInit {
  /** Domain to get DNS records for. */
  domain: string;
}

/** DomainGetDnsRecordsRequest */
export declare class DomainGetDnsRecordsRequest {
  constructor(data: DomainGetDnsRecordsRequestInit);
  /** Domain to get DNS records for. */
  domain: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): DomainGetDnsRecordsRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): DomainGetDnsRecordsRequestJSON;
}

/** DomainGetDnsRecordsResponse in the API format: the object sent and received as JSON. */
export interface DomainGetDnsRecordsResponseJSON {
  "status"?: string;
  "domain"?: string;
  "verification-record"?: string;
  "dkim"?: string;
  "dmarc"?: string;
}

/** Fields of new DomainGetDnsRecordsResponse(): a nested model may be a plain object in the API format. */
export interface DomainGetDnsRecordsResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Domain to get DNS records for. */
  domain?: string;
  /** Record to be added "as is" to verify ownership of this domain. */
  verificationRecord?: string;
  /**
   * DKIM signature for the domain. This property contains only the key part, you should prepend it with
   * "v=DKIM1; k=rsa; p=" for the TXT record to be valid.
   */
  dkim?: string;
  /** Target of the CNAME record for the "_dmarc" host of the domain. */
  dmarc?: string;
}

/** DomainGetDnsRecordsResponse */
export declare class DomainGetDnsRecordsResponse {
  constructor(data?: DomainGetDnsRecordsResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Domain to get DNS records for. */
  domain?: string;
  /** Record to be added "as is" to verify ownership of this domain. */
  verificationRecord?: string;
  /**
   * DKIM signature for the domain. This property contains only the key part, you should prepend it with
   * "v=DKIM1; k=rsa; p=" for the TXT record to be valid.
   */
  dkim?: string;
  /** Target of the CNAME record for the "_dmarc" host of the domain. */
  dmarc?: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): DomainGetDnsRecordsResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): DomainGetDnsRecordsResponseJSON;
}

/** DomainValidateVerificationRecordRequest in the API format: the object sent and received as JSON. */
export interface DomainValidateVerificationRecordRequestJSON {
  "domain": string;
}

/** Fields of new DomainValidateVerificationRecordRequest(): a nested model may be a plain object in the API format. */
export interface DomainValidateVerificationRecordRequestInit {
  /** Domain to validate verification record for. */
  domain: string;
}

/** DomainValidateVerificationRecordRequest */
export declare class DomainValidateVerificationRecordRequest {
  constructor(data: DomainValidateVerificationRecordRequestInit);
  /** Domain to validate verification record for. */
  domain: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): DomainValidateVerificationRecordRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): DomainValidateVerificationRecordRequestJSON;
}

/** DomainValidateVerificationRecordResponse in the API format: the object sent and received as JSON. */
export interface DomainValidateVerificationRecordResponseJSON {
  "status"?: string;
  "message"?: string;
}

/** Fields of new DomainValidateVerificationRecordResponse(): a nested model may be a plain object in the API format. */
export interface DomainValidateVerificationRecordResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Debug message. */
  message?: string;
}

/** DomainValidateVerificationRecordResponse */
export declare class DomainValidateVerificationRecordResponse {
  constructor(data?: DomainValidateVerificationRecordResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Debug message. */
  message?: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): DomainValidateVerificationRecordResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): DomainValidateVerificationRecordResponseJSON;
}

/** DomainValidateDkimRequest in the API format: the object sent and received as JSON. */
export interface DomainValidateDkimRequestJSON {
  "domain": string;
}

/** Fields of new DomainValidateDkimRequest(): a nested model may be a plain object in the API format. */
export interface DomainValidateDkimRequestInit {
  /** Domain to validate DKIM record for. */
  domain: string;
}

/** DomainValidateDkimRequest */
export declare class DomainValidateDkimRequest {
  constructor(data: DomainValidateDkimRequestInit);
  /** Domain to validate DKIM record for. */
  domain: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): DomainValidateDkimRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): DomainValidateDkimRequestJSON;
}

/** DomainValidateDkimResponse in the API format: the object sent and received as JSON. */
export interface DomainValidateDkimResponseJSON {
  "status"?: string;
  "message"?: string;
}

/** Fields of new DomainValidateDkimResponse(): a nested model may be a plain object in the API format. */
export interface DomainValidateDkimResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Debug message. */
  message?: string;
}

/** DomainValidateDkimResponse */
export declare class DomainValidateDkimResponse {
  constructor(data?: DomainValidateDkimResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Debug message. */
  message?: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): DomainValidateDkimResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): DomainValidateDkimResponseJSON;
}

/** DomainListRequest in the API format: the object sent and received as JSON. */
export interface DomainListRequestJSON {
  "domain"?: string;
  "limit"?: number;
  "offset"?: number;
}

/** Fields of new DomainListRequest(): a nested model may be a plain object in the API format. */
export interface DomainListRequestInit {
  /** Optional domain name if you want to get the status of single domain only. */
  domain?: string;
  /**
   * Limits the number of domains returned. Default is 50.
   * Default: `50`.
   */
  limit?: number;
  /**
   * Index of the first domain in the list, starting with 0.
   * Default: `0`.
   */
  offset?: number;
}

/** DomainListRequest */
export declare class DomainListRequest {
  constructor(data?: DomainListRequestInit);
  /** Optional domain name if you want to get the status of single domain only. */
  domain?: string;
  /**
   * Limits the number of domains returned. Default is 50.
   * Default: `50`.
   */
  limit?: number;
  /**
   * Index of the first domain in the list, starting with 0.
   * Default: `0`.
   */
  offset?: number;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): DomainListRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): DomainListRequestJSON;
}

/** DomainListResponse in the API format: the object sent and received as JSON. */
export interface DomainListResponseJSON {
  "status"?: string;
  "domains"?: Array<DomainListResponseDomainsItemJSON>;
}

/** Fields of new DomainListResponse(): a nested model may be a plain object in the API format. */
export interface DomainListResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Array of objects describing domains. */
  domains?: Array<DomainListResponseDomainsItem | DomainListResponseDomainsItemJSON>;
}

/** DomainListResponse */
export declare class DomainListResponse {
  constructor(data?: DomainListResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Array of objects describing domains. */
  domains?: Array<DomainListResponseDomainsItem>;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): DomainListResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): DomainListResponseJSON;
}

/** DomainListResponseDomainsItem in the API format: the object sent and received as JSON. */
export interface DomainListResponseDomainsItemJSON {
  "domain"?: string;
  "verification-record"?: DomainListResponseDomainsItemVerificationRecordJSON;
  "dkim"?: DomainListResponseDomainsItemDkimJSON;
}

/** Fields of new DomainListResponseDomainsItem(): a nested model may be a plain object in the API format. */
export interface DomainListResponseDomainsItemInit {
  /** Domain name. */
  domain?: string;
  /** Object describing verification record value and status. */
  verificationRecord?: DomainListResponseDomainsItemVerificationRecord | DomainListResponseDomainsItemVerificationRecordJSON;
  /** Object describing DKIM record value and status. */
  dkim?: DomainListResponseDomainsItemDkim | DomainListResponseDomainsItemDkimJSON;
}

/** DomainListResponseDomainsItem */
export declare class DomainListResponseDomainsItem {
  constructor(data?: DomainListResponseDomainsItemInit);
  /** Domain name. */
  domain?: string;
  /** Object describing verification record value and status. */
  verificationRecord?: DomainListResponseDomainsItemVerificationRecord;
  /** Object describing DKIM record value and status. */
  dkim?: DomainListResponseDomainsItemDkim;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): DomainListResponseDomainsItem;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): DomainListResponseDomainsItemJSON;
}

/** DomainListResponseDomainsItemVerificationRecord in the API format: the object sent and received as JSON. */
export interface DomainListResponseDomainsItemVerificationRecordJSON {
  "value"?: string;
  "status"?: VerificationRecordStatus;
}

/** Fields of new DomainListResponseDomainsItemVerificationRecord(): a nested model may be a plain object in the API format. */
export interface DomainListResponseDomainsItemVerificationRecordInit {
  /** Record to be added "as is" to verify ownership of this domain. */
  value?: string;
  /** Only domains with "confirmed" verification record are allowed as sender domains. */
  status?: VerificationRecordStatus;
}

/** Object describing verification record value and status. */
export declare class DomainListResponseDomainsItemVerificationRecord {
  constructor(data?: DomainListResponseDomainsItemVerificationRecordInit);
  /** Record to be added "as is" to verify ownership of this domain. */
  value?: string;
  /** Only domains with "confirmed" verification record are allowed as sender domains. */
  status?: VerificationRecordStatus;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): DomainListResponseDomainsItemVerificationRecord;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): DomainListResponseDomainsItemVerificationRecordJSON;
}

/** DomainListResponseDomainsItemDkim in the API format: the object sent and received as JSON. */
export interface DomainListResponseDomainsItemDkimJSON {
  "key"?: string;
  "status"?: DkimStatus;
}

/** Fields of new DomainListResponseDomainsItemDkim(): a nested model may be a plain object in the API format. */
export interface DomainListResponseDomainsItemDkimInit {
  /**
   * DKIM signature for the domain. This property contains only the key part, you should prepend it with
   * "k=rsa, p=" part for the record to be valid (see
   * [domain/get-dns-records](https://docs.unione.io/en/web-api-ref#domain-get-dns-records)).
   */
  key?: string;
  /** Only domains with "active" DKIM record are allowed as sender domains. */
  status?: DkimStatus;
}

/** Object describing DKIM record value and status. */
export declare class DomainListResponseDomainsItemDkim {
  constructor(data?: DomainListResponseDomainsItemDkimInit);
  /**
   * DKIM signature for the domain. This property contains only the key part, you should prepend it with
   * "k=rsa, p=" part for the record to be valid (see
   * [domain/get-dns-records](https://docs.unione.io/en/web-api-ref#domain-get-dns-records)).
   */
  key?: string;
  /** Only domains with "active" DKIM record are allowed as sender domains. */
  status?: DkimStatus;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): DomainListResponseDomainsItemDkim;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): DomainListResponseDomainsItemDkimJSON;
}

/** DomainGetSandboxDomainResponse in the API format: the object sent and received as JSON. */
export interface DomainGetSandboxDomainResponseJSON {
  "status"?: string;
  "domain"?: string;
}

/** Fields of new DomainGetSandboxDomainResponse(): a nested model may be a plain object in the API format. */
export interface DomainGetSandboxDomainResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Sandbox domain name. */
  domain?: string;
}

/** DomainGetSandboxDomainResponse */
export declare class DomainGetSandboxDomainResponse {
  constructor(data?: DomainGetSandboxDomainResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Sandbox domain name. */
  domain?: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): DomainGetSandboxDomainResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): DomainGetSandboxDomainResponseJSON;
}

/** DomainDeleteRequest in the API format: the object sent and received as JSON. */
export interface DomainDeleteRequestJSON {
  "domain": string;
}

/** Fields of new DomainDeleteRequest(): a nested model may be a plain object in the API format. */
export interface DomainDeleteRequestInit {
  /** Domain name to delete. */
  domain: string;
}

/** DomainDeleteRequest */
export declare class DomainDeleteRequest {
  constructor(data: DomainDeleteRequestInit);
  /** Domain name to delete. */
  domain: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): DomainDeleteRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): DomainDeleteRequestJSON;
}

/** DomainDeleteResponse in the API format: the object sent and received as JSON. */
export interface DomainDeleteResponseJSON {
  "status"?: string;
  "message"?: string;
}

/** Fields of new DomainDeleteResponse(): a nested model may be a plain object in the API format. */
export interface DomainDeleteResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Domain deleted */
  message?: string;
}

/** DomainDeleteResponse */
export declare class DomainDeleteResponse {
  constructor(data?: DomainDeleteResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** Domain deleted */
  message?: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): DomainDeleteResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): DomainDeleteResponseJSON;
}
