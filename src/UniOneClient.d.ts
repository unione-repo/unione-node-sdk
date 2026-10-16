// UniOne API client.
import type { ApiClient } from "./client/ApiClient.js";
import type { ConfigurationOptions } from "./client/Configuration.js";
import type { EmailApi } from "./api/email/EmailApi.js";
import type { EmailValidationApi } from "./api/email-validation/EmailValidationApi.js";
import type { ConfirmedEmailApi } from "./api/confirmed-email/ConfirmedEmailApi.js";
import type { TemplateApi } from "./api/template/TemplateApi.js";
import type { WebhookApi } from "./api/webhook/WebhookApi.js";
import type { SuppressionApi } from "./api/suppression/SuppressionApi.js";
import type { DomainApi } from "./api/domain/DomainApi.js";
import type { EventDumpApi } from "./api/event-dump/EventDumpApi.js";
import type { TagApi } from "./api/tag/TagApi.js";
import type { ProjectApi } from "./api/project/ProjectApi.js";
import type { SystemApi } from "./api/system/SystemApi.js";
import type { ObsoleteApi } from "./api/obsolete/ObsoleteApi.js";

/** Options of new UniOneClient(). */
export interface UniOneClientOptions extends ConfigurationOptions {
  /** API host (Host.US1, "us1.unione.io") or a full base URL. */
  host?: string;
}

/** Entry point of the UniOne API: one property per section. */
export declare class UniOneClient {
  /**
   * @param apiKey User or project API key.
   * @param hostOrOptions API host or a full base URL, or options.
   * @param options Options when the second argument is a host.
   */
  constructor(apiKey: string, hostOrOptions?: string | UniOneClientOptions, options?: ConfigurationOptions);
  apiClient: ApiClient;
  /** This group of methods is related with email sending. */
  email: EmailApi;
  /**
   * Email validation methods. As a result of the check, you’ll get detailed information on email
   * validity. It will help eliminate nonexistent emails, decrease the number of complaints, clean up the
   * subscribers list and eventually enhance your sender reputation score. For example, you may add
   * validation to a subscription form on your site to let users know they’ve just entered an invalid
   * address.
   */
  emailValidation: EmailValidationApi;
  /**
   * Manage email addresses confirmed for sandbox-domain sending. These methods are available only with a
   * main account API key.
   */
  confirmedEmail: ConfirmedEmailApi;
  /**
   * You have the option of storing a template on the UniOne side and then using it by id, which is
   * highly recommended for sending repetitive messages or high volume traffic. UniOne supports two
   * different [template engines](https://docs.unione.io/en/template-engines).
   */
  template: TemplateApi;
  /**
   * UniOne lets you recieve notifications about email status changes or spam blocks. You provide an URL
   * and every time a watched event occurs we will notify you by submitting a request with JSON data to
   * this URL.
   */
  webhook: WebhookApi;
  /**
   * Methods for managing suppression lists. An email can be added to suppression list because of
   * unsubscription, bounce or complain.
   */
  suppression: SuppressionApi;
  /**
   * You can use these methods to setup sender domains and check their statuses. They might be useful in
   * case you want to automate adding domains for your own clients.
   */
  domain: DomainApi;
  /**
   * These methods are used to obtain a list of events for a given period of time. The data is stored for
   * up to 45 days, depending on your tariff, i. e. you may fetch all event data starting from 00:00:00
   * 31 days ago and up to current time. For custom tarifs with big sending volumes event dumps are
   * available only for the last 7 days.
   */
  eventDump: EventDumpApi;
  /**
   * This family of methods is used to manage user-defined tags. Tags are used to categorize letters
   * based on your own criteria, e. g. to create a distinction between marketing and transactional
   * letters or group together all notifications for a particular order type. UniOne allows you to assign
   * tags to all outgoing emails, and the tags you’ve set may then be used to filter and analyze delivery
   * statistics.
   */
  tag: TagApi;
  /**
   * Projects allow you to group several independent domains, webhooks, templates, and unsubscription
   * lists together. It's very useful if you have your own clients and manage their data from a single
   * UniOne account. Each project receives its own API key, and all API calls with that API key only deal
   * with the data of that project. This way, you can assign a separate project for each client and be
   * sure that they won't conflict; e.g. unsubscribing from one project won't affect another.
   */
  project: ProjectApi;
  /** System operations. */
  system: SystemApi;
  /**
   * Obsolete methods dealing with unsubscribes. We recommend using the more flexible
   * [suppression](https://docs.unione.io/en/web-api-ref#suppression) methods instead. Note that you
   * can't resubscribe an unsubscribed recipient using WebAPI, but you can send him an email with
   * subscription link using email/subscribe method.
   */
  obsolete: ObsoleteApi;
}
