// Models of the Domain section.
import { compact, toModel, toPlain } from "../../client/ApiClient.js";

/** Only domains with "active" DKIM record are allowed as sender domains. */
export const DkimStatus = Object.freeze({
  ACTIVE: "active",
  INACTIVE: "inactive",
});

/** DomainGetDnsRecordsRequest */
export class DomainGetDnsRecordsRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} data.domain Domain to get DNS records for.
   */
  constructor({ domain } = {}) {
    /**
     * Domain to get DNS records for.
     * @type {string|undefined}
     */
    this.domain = domain;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {DomainGetDnsRecordsRequest}
   */
  static fromJSON(data) {
    return new DomainGetDnsRecordsRequest({
      domain: data["domain"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "domain": this.domain,
    });
  }
}

/** DomainGetDnsRecordsResponse */
export class DomainGetDnsRecordsResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {string} [data.domain] Domain to get DNS records for.
   * @param {string} [data.verificationRecord] Record to be added "as is" to verify ownership of this domain.
   * @param {string} [data.dkim] DKIM signature for the domain. This property contains only the key part, you should prepend it with "v=DKIM1; k=rsa; p=" for the TXT record to be valid.
   * @param {string} [data.dmarc] Target of the CNAME record for the "_dmarc" host of the domain.
   */
  constructor({ status, domain, verificationRecord, dkim, dmarc } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * Domain to get DNS records for.
     * @type {string|undefined}
     */
    this.domain = domain;
    /**
     * Record to be added "as is" to verify ownership of this domain.
     * @type {string|undefined}
     */
    this.verificationRecord = verificationRecord;
    /**
     * DKIM signature for the domain. This property contains only the key part, you should prepend it with
     * "v=DKIM1; k=rsa; p=" for the TXT record to be valid.
     * @type {string|undefined}
     */
    this.dkim = dkim;
    /**
     * Target of the CNAME record for the "_dmarc" host of the domain.
     * @type {string|undefined}
     */
    this.dmarc = dmarc;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {DomainGetDnsRecordsResponse}
   */
  static fromJSON(data) {
    return new DomainGetDnsRecordsResponse({
      status: data["status"],
      domain: data["domain"],
      verificationRecord: data["verification-record"],
      dkim: data["dkim"],
      dmarc: data["dmarc"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "domain": this.domain,
      "verification-record": this.verificationRecord,
      "dkim": this.dkim,
      "dmarc": this.dmarc,
    });
  }
}

/** DomainValidateVerificationRecordRequest */
export class DomainValidateVerificationRecordRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} data.domain Domain to validate verification record for.
   */
  constructor({ domain } = {}) {
    /**
     * Domain to validate verification record for.
     * @type {string|undefined}
     */
    this.domain = domain;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {DomainValidateVerificationRecordRequest}
   */
  static fromJSON(data) {
    return new DomainValidateVerificationRecordRequest({
      domain: data["domain"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "domain": this.domain,
    });
  }
}

/** DomainValidateVerificationRecordResponse */
export class DomainValidateVerificationRecordResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {string} [data.message] Debug message.
   */
  constructor({ status, message } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * Debug message.
     * @type {string|undefined}
     */
    this.message = message;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {DomainValidateVerificationRecordResponse}
   */
  static fromJSON(data) {
    return new DomainValidateVerificationRecordResponse({
      status: data["status"],
      message: data["message"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "message": this.message,
    });
  }
}

/** DomainValidateDkimRequest */
export class DomainValidateDkimRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} data.domain Domain to validate DKIM record for.
   */
  constructor({ domain } = {}) {
    /**
     * Domain to validate DKIM record for.
     * @type {string|undefined}
     */
    this.domain = domain;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {DomainValidateDkimRequest}
   */
  static fromJSON(data) {
    return new DomainValidateDkimRequest({
      domain: data["domain"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "domain": this.domain,
    });
  }
}

/** DomainValidateDkimResponse */
export class DomainValidateDkimResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {string} [data.message] Debug message.
   */
  constructor({ status, message } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * Debug message.
     * @type {string|undefined}
     */
    this.message = message;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {DomainValidateDkimResponse}
   */
  static fromJSON(data) {
    return new DomainValidateDkimResponse({
      status: data["status"],
      message: data["message"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "message": this.message,
    });
  }
}

/** DomainListRequest */
export class DomainListRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.domain] Optional domain name if you want to get the status of single domain only.
   * @param {number} [data.limit] Limits the number of domains returned. Default is 50.
   * @param {number} [data.offset] Index of the first domain in the list, starting with 0.
   */
  constructor({ domain, limit, offset } = {}) {
    /**
     * Optional domain name if you want to get the status of single domain only.
     * @type {string|undefined}
     */
    this.domain = domain;
    /**
     * Limits the number of domains returned. Default is 50.
     * Default: `50`.
     * @type {number|undefined}
     */
    this.limit = limit;
    /**
     * Index of the first domain in the list, starting with 0.
     * Default: `0`.
     * @type {number|undefined}
     */
    this.offset = offset;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {DomainListRequest}
   */
  static fromJSON(data) {
    return new DomainListRequest({
      domain: data["domain"],
      limit: data["limit"],
      offset: data["offset"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "domain": this.domain,
      "limit": this.limit,
      "offset": this.offset,
    });
  }
}

/** DomainListResponse */
export class DomainListResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {DomainListResponseDomainsItem[]} [data.domains] Array of objects describing domains.
   */
  constructor({ status, domains } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * Array of objects describing domains.
     * @type {DomainListResponseDomainsItem[]|undefined}
     */
    this.domains = domains == null ? domains : domains.map((item0) => toModel(item0, DomainListResponseDomainsItem));
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {DomainListResponse}
   */
  static fromJSON(data) {
    return new DomainListResponse({
      status: data["status"],
      domains: data["domains"] == null ? undefined : data["domains"].map((item0) => toModel(item0, DomainListResponseDomainsItem)),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "domains": this.domains == null ? undefined : this.domains.map((item0) => toPlain(item0)),
    });
  }
}

/** DomainListResponseDomainsItem */
export class DomainListResponseDomainsItem {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.domain] Domain name.
   * @param {DomainListResponseDomainsItemVerificationRecord} [data.verificationRecord] Object describing verification record value and status.
   * @param {DomainListResponseDomainsItemDkim} [data.dkim] Object describing DKIM record value and status.
   */
  constructor({ domain, verificationRecord, dkim } = {}) {
    /**
     * Domain name.
     * @type {string|undefined}
     */
    this.domain = domain;
    /**
     * Object describing verification record value and status.
     * @type {DomainListResponseDomainsItemVerificationRecord|undefined}
     */
    this.verificationRecord = verificationRecord == null ? verificationRecord : toModel(verificationRecord, DomainListResponseDomainsItemVerificationRecord);
    /**
     * Object describing DKIM record value and status.
     * @type {DomainListResponseDomainsItemDkim|undefined}
     */
    this.dkim = dkim == null ? dkim : toModel(dkim, DomainListResponseDomainsItemDkim);
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {DomainListResponseDomainsItem}
   */
  static fromJSON(data) {
    return new DomainListResponseDomainsItem({
      domain: data["domain"],
      verificationRecord: data["verification-record"] == null ? undefined : toModel(data["verification-record"], DomainListResponseDomainsItemVerificationRecord),
      dkim: data["dkim"] == null ? undefined : toModel(data["dkim"], DomainListResponseDomainsItemDkim),
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "domain": this.domain,
      "verification-record": this.verificationRecord == null ? undefined : toPlain(this.verificationRecord),
      "dkim": this.dkim == null ? undefined : toPlain(this.dkim),
    });
  }
}

/** Object describing verification record value and status. */
export class DomainListResponseDomainsItemVerificationRecord {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.value] Record to be added "as is" to verify ownership of this domain.
   * @param {"confirmed"|"unconfirmed"} [data.status] Only domains with "confirmed" verification record are allowed as sender domains.
   */
  constructor({ value, status } = {}) {
    /**
     * Record to be added "as is" to verify ownership of this domain.
     * @type {string|undefined}
     */
    this.value = value;
    /**
     * Only domains with "confirmed" verification record are allowed as sender domains.
     * @type {"confirmed"|"unconfirmed"|undefined}
     */
    this.status = status;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {DomainListResponseDomainsItemVerificationRecord}
   */
  static fromJSON(data) {
    return new DomainListResponseDomainsItemVerificationRecord({
      value: data["value"],
      status: data["status"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "value": this.value,
      "status": this.status,
    });
  }
}

/** Object describing DKIM record value and status. */
export class DomainListResponseDomainsItemDkim {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.key] DKIM signature for the domain. This property contains only the key part, you should prepend it with "k=rsa, p=" part for the record to be valid (see [domain/get-dns-records](https://docs.unione.io/en/web-api-ref#domain-get-dns-records)).
   * @param {"active"|"inactive"} [data.status] Only domains with "active" DKIM record are allowed as sender domains.
   */
  constructor({ key, status } = {}) {
    /**
     * DKIM signature for the domain. This property contains only the key part, you should prepend it with
     * "k=rsa, p=" part for the record to be valid (see
     * [domain/get-dns-records](https://docs.unione.io/en/web-api-ref#domain-get-dns-records)).
     * @type {string|undefined}
     */
    this.key = key;
    /**
     * Only domains with "active" DKIM record are allowed as sender domains.
     * @type {"active"|"inactive"|undefined}
     */
    this.status = status;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {DomainListResponseDomainsItemDkim}
   */
  static fromJSON(data) {
    return new DomainListResponseDomainsItemDkim({
      key: data["key"],
      status: data["status"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "key": this.key,
      "status": this.status,
    });
  }
}

/** DomainGetSandboxDomainResponse */
export class DomainGetSandboxDomainResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {string} [data.domain] Sandbox domain name.
   */
  constructor({ status, domain } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * Sandbox domain name.
     * @type {string|undefined}
     */
    this.domain = domain;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {DomainGetSandboxDomainResponse}
   */
  static fromJSON(data) {
    return new DomainGetSandboxDomainResponse({
      status: data["status"],
      domain: data["domain"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "domain": this.domain,
    });
  }
}

/** DomainDeleteRequest */
export class DomainDeleteRequest {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} data.domain Domain name to delete.
   */
  constructor({ domain } = {}) {
    /**
     * Domain name to delete.
     * @type {string|undefined}
     */
    this.domain = domain;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {DomainDeleteRequest}
   */
  static fromJSON(data) {
    return new DomainDeleteRequest({
      domain: data["domain"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "domain": this.domain,
    });
  }
}

/** DomainDeleteResponse */
export class DomainDeleteResponse {
  /**
   * @param {object} [data] Fields; a nested model may be a plain object in the API format.
   * @param {string} [data.status] "success" string
   * @param {string} [data.message] Domain deleted
   */
  constructor({ status, message } = {}) {
    /**
     * "success" string
     * Allowed values: `success`.
     * @type {string|undefined}
     */
    this.status = status;
    /**
     * Domain deleted
     * @type {string|undefined}
     */
    this.message = message;
  }

  /**
   * Builds the object from decoded JSON.
   * @param {Record<string, any>} data
   * @returns {DomainDeleteResponse}
   */
  static fromJSON(data) {
    return new DomainDeleteResponse({
      status: data["status"],
      message: data["message"],
    });
  }

  /**
   * JSON-ready object in the API format, empty fields are omitted.
   * @returns {Record<string, any>}
   */
  toJSON() {
    return compact({
      "status": this.status,
      "message": this.message,
    });
  }
}
