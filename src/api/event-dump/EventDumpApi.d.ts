// EventDumpApi: API methods of the EventDump section.
import type { ApiClient } from "../../client/ApiClient.js";
import type { SuccessResponse } from "../../common/models.js";
import type { EventDumpCreateRequest, EventDumpCreateRequestJSON, EventDumpCreateResponse, EventDumpDeleteRequest, EventDumpDeleteRequestJSON, EventDumpGetRequest, EventDumpGetRequestJSON, EventDumpGetResponse, EventDumpListResponse } from "./models.js";

/**
 * These methods are used to obtain a list of events for a given period of time. The data is stored for
 * up to 45 days, depending on your tariff, i. e. you may fetch all event data starting from 00:00:00
 * 31 days ago and up to current time. For custom tarifs with big sending volumes event dumps are
 * available only for the last 7 days.
 */
export declare class EventDumpApi {
  constructor(client: ApiClient);
  client: ApiClient;

  /**
   * This asynchronous method initiates the preparation of data dump in CSV format. The number of dump
   * files created or stored is limited to 10; to order more files, you have to delete one of the
   * previous ones or wait until they will be deleted automatically. A newly created dump file is kept
   * for 8 hours. If the request period is more than a day or there are too many events then several
   * files will be generated and each file will contain no more than 100,000 events. File contains
   * columns with the following information - 'event_time', 'job_id', 'from_email', 'email', 'status',
   * 'delivery_status', 'metadata', 'destination_response', 'user_agent', 'url', 'ip', 'tags' and
   * 'project_id' (for accounts with projects enabled). You can change the fields and include 'subject'
   * field using 'dump_fileds' parameter.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#event-dump-create
   * @throws {ApiError}
   */
  create(request: EventDumpCreateRequest | EventDumpCreateRequestJSON): Promise<EventDumpCreateResponse>;

  /**
   * Returns dump properties for a given identifier
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#event-dump-get
   * @throws {ApiError}
   */
  get(request: EventDumpGetRequest | EventDumpGetRequestJSON): Promise<EventDumpGetResponse>;

  /**
   * This method does not require any parameters; returns the full list of existing dumps.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#event-dump-list
   * @throws {ApiError}
   */
  list(): Promise<EventDumpListResponse>;

  /**
   * Removes dump from queue or storage.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#event-dump-delete
   * @throws {ApiError}
   */
  delete(request: EventDumpDeleteRequest | EventDumpDeleteRequestJSON): Promise<SuccessResponse>;
}
