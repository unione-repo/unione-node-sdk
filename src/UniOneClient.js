// UniOne API client.
import { ApiClient } from "./client/ApiClient.js";
import { Configuration, baseUrlFor } from "./client/Configuration.js";
import { EmailApi } from "./api/email/EmailApi.js";
import { EmailValidationApi } from "./api/email-validation/EmailValidationApi.js";
import { ConfirmedEmailApi } from "./api/confirmed-email/ConfirmedEmailApi.js";
import { TemplateApi } from "./api/template/TemplateApi.js";
import { WebhookApi } from "./api/webhook/WebhookApi.js";
import { SuppressionApi } from "./api/suppression/SuppressionApi.js";
import { DomainApi } from "./api/domain/DomainApi.js";
import { EventDumpApi } from "./api/event-dump/EventDumpApi.js";
import { TagApi } from "./api/tag/TagApi.js";
import { ProjectApi } from "./api/project/ProjectApi.js";
import { SystemApi } from "./api/system/SystemApi.js";
import { ObsoleteApi } from "./api/obsolete/ObsoleteApi.js";

/**
 * Entry point of the UniOne API: one property per section.
 *
 *     const client = new UniOneClient("YOUR_API_KEY");
 *     await client.email.send(...);
 */
export class UniOneClient {
  /**
   * @param {string} apiKey
   * @param {string|{host?: string, baseUrl?: string} & {timeout?: number, platform?: string, headers?: Record<string, string>, fetch?: import("./client/Configuration.js").FetchFunction}} [hostOrOptions] API host (Host.US1, "us1.unione.io") or a full base URL, or options
   * @param {{timeout?: number, platform?: string, headers?: Record<string, string>, fetch?: import("./client/Configuration.js").FetchFunction}} [options]
   */
  constructor(apiKey, hostOrOptions = {}, options = {}) {
    const settings = typeof hostOrOptions === "string" ? { ...options, host: hostOrOptions } : hostOrOptions;
    const { host, ...rest } = settings;
    this.apiClient = new ApiClient(new Configuration(apiKey, host ? { ...rest, baseUrl: baseUrlFor(host) } : rest));
    /** This group of methods is related with email sending. */
    this.email = new EmailApi(this.apiClient);
    /**
     * Email validation methods. As a result of the check, you’ll get detailed information on email
     * validity. It will help eliminate nonexistent emails, decrease the number of complaints, clean up the
     * subscribers list and eventually enhance your sender reputation score. For example, you may add
     * validation to a subscription form on your site to let users know they’ve just entered an invalid
     * address.
     */
    this.emailValidation = new EmailValidationApi(this.apiClient);
    /**
     * Manage email addresses confirmed for sandbox-domain sending. These methods are available only with a
     * main account API key.
     */
    this.confirmedEmail = new ConfirmedEmailApi(this.apiClient);
    /**
     * You have the option of storing a template on the UniOne side and then using it by id, which is
     * highly recommended for sending repetitive messages or high volume traffic. UniOne supports two
     * different [template engines](https://docs.unione.io/en/template-engines).
     */
    this.template = new TemplateApi(this.apiClient);
    /**
     * UniOne lets you recieve notifications about email status changes or spam blocks. You provide an URL
     * and every time a watched event occurs we will notify you by submitting a request with JSON data to
     * this URL.
     */
    this.webhook = new WebhookApi(this.apiClient);
    /**
     * Methods for managing suppression lists. An email can be added to suppression list because of
     * unsubscription, bounce or complain.
     */
    this.suppression = new SuppressionApi(this.apiClient);
    /**
     * You can use these methods to setup sender domains and check their statuses. They might be useful in
     * case you want to automate adding domains for your own clients.
     */
    this.domain = new DomainApi(this.apiClient);
    /**
     * These methods are used to obtain a list of events for a given period of time. The data is stored for
     * up to 45 days, depending on your tariff, i. e. you may fetch all event data starting from 00:00:00
     * 31 days ago and up to current time. For custom tarifs with big sending volumes event dumps are
     * available only for the last 7 days.
     */
    this.eventDump = new EventDumpApi(this.apiClient);
    /**
     * This family of methods is used to manage user-defined tags. Tags are used to categorize letters
     * based on your own criteria, e. g. to create a distinction between marketing and transactional
     * letters or group together all notifications for a particular order type. UniOne allows you to assign
     * tags to all outgoing emails, and the tags you’ve set may then be used to filter and analyze delivery
     * statistics.
     */
    this.tag = new TagApi(this.apiClient);
    /**
     * Projects allow you to group several independent domains, webhooks, templates, and unsubscription
     * lists together. It's very useful if you have your own clients and manage their data from a single
     * UniOne account. Each project receives its own API key, and all API calls with that API key only deal
     * with the data of that project. This way, you can assign a separate project for each client and be
     * sure that they won't conflict; e.g. unsubscribing from one project won't affect another.
     */
    this.project = new ProjectApi(this.apiClient);
    /** System operations. */
    this.system = new SystemApi(this.apiClient);
    /**
     * Obsolete methods dealing with unsubscribes. We recommend using the more flexible
     * [suppression](https://docs.unione.io/en/web-api-ref#suppression) methods instead. Note that you
     * can't resubscribe an unsubscribed recipient using WebAPI, but you can send him an email with
     * subscription link using email/subscribe method.
     */
    this.obsolete = new ObsoleteApi(this.apiClient);
  }
}
