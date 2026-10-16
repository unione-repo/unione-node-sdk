// EventDumpApi: API methods of the EventDump section.
import { SuccessResponse } from "../../common/models.js";
import { EventDumpCreateRequest, EventDumpCreateResponse, EventDumpDeleteRequest, EventDumpGetRequest, EventDumpGetResponse, EventDumpListResponse } from "./models.js";

/**
 * These methods are used to obtain a list of events for a given period of time. The data is stored for
 * up to 45 days, depending on your tariff, i. e. you may fetch all event data starting from 00:00:00
 * 31 days ago and up to current time. For custom tarifs with big sending volumes event dumps are
 * available only for the last 7 days.
 */
export class EventDumpApi {
  /** @param {import("../../client/ApiClient.js").ApiClient} client */
  constructor(client) {
    this.client = client;
  }

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
   * @param {EventDumpCreateRequest|Record<string, any>} request Request model or plain object in the API format.
   * @returns {Promise<EventDumpCreateResponse>}
   * @throws {ApiError}
   */
  async create(request) {
    return EventDumpCreateResponse.fromJSON(await this.client.call("/event-dump/create.json", request));
  }

  /**
   * Returns dump properties for a given identifier
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#event-dump-get
   * @param {EventDumpGetRequest|Record<string, any>} request Request model or plain object in the API format.
   * @returns {Promise<EventDumpGetResponse>}
   * @throws {ApiError}
   */
  async get(request) {
    return EventDumpGetResponse.fromJSON(await this.client.call("/event-dump/get.json", request));
  }

  /**
   * This method does not require any parameters; returns the full list of existing dumps.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#event-dump-list
   * @returns {Promise<EventDumpListResponse>}
   * @throws {ApiError}
   */
  async list() {
    return EventDumpListResponse.fromJSON(await this.client.call("/event-dump/list.json"));
  }

  /**
   * Removes dump from queue or storage.
   *
   * Documentation: https://docs.unione.io/en/web-api-ref#event-dump-delete
   * @param {EventDumpDeleteRequest|Record<string, any>} request Request model or plain object in the API format.
   * @returns {Promise<SuccessResponse>}
   * @throws {ApiError}
   */
  async delete(request) {
    return SuccessResponse.fromJSON(await this.client.call("/event-dump/delete.json", request));
  }
}
