// Types of the models of the Tag section.

/** TagListResponse in the API format: the object sent and received as JSON. */
export interface TagListResponseJSON {
  "status"?: string;
  "tags"?: Array<TagsResponseObjectJSON>;
}

/** Fields of new TagListResponse(): a nested model may be a plain object in the API format. */
export interface TagListResponseInit {
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** An array of objects containing data for user-defined tags. */
  tags?: Array<TagsResponseObject | TagsResponseObjectJSON>;
}

/** TagListResponse */
export declare class TagListResponse {
  constructor(data?: TagListResponseInit);
  /**
   * "success" string
   * Allowed values: `success`.
   */
  status?: string;
  /** An array of objects containing data for user-defined tags. */
  tags?: Array<TagsResponseObject>;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): TagListResponse;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): TagListResponseJSON;
}

/** TagsResponseObject in the API format: the object sent and received as JSON. */
export interface TagsResponseObjectJSON {
  "tag_id"?: number;
  "tag"?: string;
}

/** Fields of new TagsResponseObject(): a nested model may be a plain object in the API format. */
export interface TagsResponseObjectInit {
  /** Unique tag id. */
  tagId?: number;
  /** Tag name. */
  tag?: string;
}

/** An object with the properties of the user tags. */
export declare class TagsResponseObject {
  constructor(data?: TagsResponseObjectInit);
  /** Unique tag id. */
  tagId?: number;
  /** Tag name. */
  tag?: string;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): TagsResponseObject;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): TagsResponseObjectJSON;
}

/** TagDeleteRequest in the API format: the object sent and received as JSON. */
export interface TagDeleteRequestJSON {
  "tag_id": number;
}

/** Fields of new TagDeleteRequest(): a nested model may be a plain object in the API format. */
export interface TagDeleteRequestInit {
  /** Unique tag id. */
  tagId: number;
}

/** TagDeleteRequest */
export declare class TagDeleteRequest {
  constructor(data: TagDeleteRequestInit);
  /** Unique tag id. */
  tagId: number;
  /** Builds the object from decoded JSON. */
  static fromJSON(data: Record<string, any>): TagDeleteRequest;
  /** JSON-ready object in the API format, empty fields are omitted. */
  toJSON(): TagDeleteRequestJSON;
}
