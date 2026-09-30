// File generated from our OpenAPI spec by Scalar. See README.md for details.

import { APIResource } from '../resource';
import { APIPromise } from '../api-promise';
import type { RequestOptions } from '../internal/request-options';
import { buildHeaders } from '../internal/headers';
import { multipartFormRequestOptions } from '../internal/uploads';
import { path as __scalarPath } from '../internal/utils/path';
import type { Uploadable } from '../core/uploads';

export class Messages extends APIResource {
  /**
   * Searches every plain (non-E2EE) room the caller can read. E2EE rooms are not searchable server-side.
   *
   * @param {string} spaceID - Snowflake space id
   * @param {MessageSearchParams} [query] - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<MessageSearchResponse>} Search results
   *
   * @example
   * ```ts
   * const message = await client.messages.search('spaceId');
   * ```
   */
  search(
    spaceID: string,
    query: MessageSearchParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MessageSearchResponse> {
    return this._client.get(__scalarPath`/spaces/${spaceID}/messages/search`, { query, ...options });
  }

  /**
   * Newest first. Requires View Room and Read Message History. Default limit 50, max 100.
   *
   * @param {string} roomID - Snowflake room id
   * @param {MessageListParams} [query] - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<MessageListResponse>} Messages
   *
   * @example
   * ```ts
   * const message = await client.messages.list('roomId', {
   *   limit: 50,
   * });
   * ```
   */
  list(
    roomID: string,
    query: MessageListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MessageListResponse> {
    return this._client.get(__scalarPath`/rooms/${roomID}/messages`, { query, ...options });
  }

  /**
   * Requires View Room and Send Messages. In encrypted rooms bots cannot post (need ciphertext they cannot produce). Slowmode returns 429 with retry_after.
   *
   * @param {string} roomID - Snowflake room id
   * @param {MessageCreateParams} body - The request body to send.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<Message>} Created message
   *
   * @example
   * ```ts
   * const message = await client.messages.create('roomId', {});
   * ```
   */
  create(roomID: string, body: MessageCreateParams, options?: RequestOptions): APIPromise<Message> {
    return this._client.post(__scalarPath`/rooms/${roomID}/messages`, { body, ...options });
  }

  /**
   * Get message
   *
   * @param {string} messageID - Snowflake message id
   * @param {MessageRetrieveParams} params - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<Message>} Message
   *
   * @example
   * ```ts
   * const message = await client.messages.retrieve('messageId', {
   *   roomId: 'roomId',
   * });
   * ```
   */
  retrieve(messageID: string, params: MessageRetrieveParams, options?: RequestOptions): APIPromise<Message> {
    const { roomId } = params;
    return this._client.get(__scalarPath`/rooms/${roomId}/messages/${messageID}`, options);
  }

  /**
   * Own messages only. Body is either plaintext or ciphertext.
   *
   * @param {string} messageID - Snowflake message id
   * @param {MessageEditParams} params - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<Message>} Edited message
   *
   * @example
   * ```ts
   * const message = await client.messages.edit('messageId', {
   *   roomId: 'roomId',
   *   body: {
   *     plaintext: '',
   *   },
   * });
   * ```
   */
  edit(messageID: string, params: MessageEditParams, options?: RequestOptions): APIPromise<Message> {
    const { roomId, body } = params;
    return this._client.patch(__scalarPath`/rooms/${roomId}/messages/${messageID}`, { body, ...options });
  }

  /**
   * Own messages, or Manage Messages for others.
   *
   * @param {string} messageID - Snowflake message id
   * @param {MessageDeleteParams} params - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns Deleted
   *
   * @example
   * ```ts
   * await client.messages.delete('messageId', {
   *   roomId: 'roomId',
   * });
   * ```
   */
  delete(messageID: string, params: MessageDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { roomId } = params;
    return this._client.delete(__scalarPath`/rooms/${roomId}/messages/${messageID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Plain (non-E2EE) rooms only.
   *
   * @param {string} roomID - Snowflake room id
   * @param {MessageSearch2Params} [query] - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<MessageSearch2Response>} Search results
   *
   * @example
   * ```ts
   * const message = await client.messages.search2('roomId');
   * ```
   */
  search2(
    roomID: string,
    query: MessageSearch2Params | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MessageSearch2Response> {
    return this._client.get(__scalarPath`/rooms/${roomID}/messages/search`, { query, ...options });
  }

  /**
   * Requires Add Reactions. emoji is URL-encoded unicode or `custom:<id>`. Idempotent.
   *
   * @param {string} emoji - URL-encoded unicode emoji or custom:<id>
   * @param {MessageCreateReactionParams} params - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<MessageCreateReactionResponse>} Reactions after add
   *
   * @example
   * ```ts
   * const message = await client.messages.createReaction('emoji', {
   *   roomId: 'roomId',
   *   messageId: 'messageId',
   * });
   * ```
   */
  createReaction(
    emoji: string,
    params: MessageCreateReactionParams,
    options?: RequestOptions,
  ): APIPromise<MessageCreateReactionResponse> {
    const { roomId, messageId } = params;
    return this._client.put(__scalarPath`/rooms/${roomId}/messages/${messageId}/reactions/${emoji}`, options);
  }

  /**
   * Remove reaction
   *
   * @param {string} emoji
   * @param {MessageDeleteReactionParams} params - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns Removed
   *
   * @example
   * ```ts
   * await client.messages.deleteReaction('emoji', {
   *   roomId: 'roomId',
   *   messageId: 'messageId',
   * });
   * ```
   */
  deleteReaction(
    emoji: string,
    params: MessageDeleteReactionParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    const { roomId, messageId } = params;
    return this._client.delete(__scalarPath`/rooms/${roomId}/messages/${messageId}/reactions/${emoji}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * List reactors for emoji
   *
   * @param {string} emoji
   * @param {MessageListReactorsParams} params - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<MessageListReactorsResponse>} Reactors
   *
   * @example
   * ```ts
   * const message = await client.messages.listReactors('emoji', {
   *   roomId: 'roomId',
   *   messageId: 'messageId',
   * });
   * ```
   */
  listReactors(
    emoji: string,
    params: MessageListReactorsParams,
    options?: RequestOptions,
  ): APIPromise<MessageListReactorsResponse> {
    const { roomId, messageId } = params;
    return this._client.get(__scalarPath`/rooms/${roomId}/messages/${messageId}/reactions/${emoji}`, options);
  }

  /**
   * Requires Send Messages. Reference returned id in message attachments. Must be used by a message from the same bot in the same room. Default size limit 25 MB.
   *
   * @param {string} roomID - Snowflake room id
   * @param {MessageUploadAttachmentParams} body - The request body to send.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<Attachment>} Attachment record
   *
   * @example
   * ```ts
   * const attachment = await client.messages.uploadAttachment('roomId', {
   *   file: new File(['file'], 'file'),
   * });
   * ```
   */
  uploadAttachment(
    roomID: string,
    body: MessageUploadAttachmentParams,
    options?: RequestOptions,
  ): APIPromise<Attachment> {
    return this._client.post(
      __scalarPath`/rooms/${roomID}/attachments`,
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }
}

export interface Message {
  id: string;
  room_id: string;
  /**
   * "0" for system notices
   */
  sender_id: string;
  /**
   * @format date-time
   */
  created_at: string;
  sender_device_id?: string;
  /**
   * Present in non-E2EE rooms
   */
  plaintext?: string;
  /**
   * Present in E2EE rooms
   */
  ciphertext?: string;
  reply_to_id?: string;
  mentions?: Array<string>;
  mention_roles?: Array<string>;
  mention_everyone?: boolean;
  attachments?: Array<Attachment>;
  reactions?: Array<MessageReaction>;
  /**
   * e.g. space_member_join, space_member_leave
   */
  system_type?: string;
  system_payload?: Record<string, unknown>;
  /**
   * @format date-time
   */
  deleted_at?: string;
  /**
   * @format date-time
   */
  updated_at?: string;
}

export interface MessageReaction {
  emoji?: string;
  count?: number;
  me?: boolean;
}

export interface Reactor {
  id?: string;
  username?: string;
  discriminator?: number;
  display_name?: string;
  avatar?: string;
}

export interface Attachment {
  id?: string;
  filename?: string;
  url?: string;
  content_type?: string;
  size?: number;
  width?: number;
  height?: number;
}

export interface MessageSearchParams {
  q?: string;
  has?: 'link' | 'file' | 'image' | 'video' | 'audio';
  limit?: number;
  before?: string;
}

export interface MessageSearchResponse {
  messages?: Array<Message>;
  searchable?: boolean;
}

export interface MessageListParams {
  /**
   * @default 50
   * @maximum 100
   */
  limit?: number;
  /**
   * Message id for pagination (older)
   */
  before?: string;
}

export type MessageListResponse = Array<Message>;

export interface MessageCreateParams {
  /**
   * Required unless attachments are sent. Markdown supported.
   */
  plaintext?: string;
  /**
   * Required in E2EE rooms (bots cannot produce this)
   */
  ciphertext?: string;
  reply_to_id?: string;
  /**
   * Additional user ids to notify; <@id> in text also detected
   */
  mentions?: Array<string>;
  mention_roles?: Array<string>;
  /**
   * Requires Mention @everyone permission
   */
  mention_everyone?: boolean;
  /**
   * Attachment ids from upload endpoint
   */
  attachments?: Array<string>;
}

export interface MessageRetrieveParams {
  /**
   * Snowflake room id
   */
  roomId: string;
}

export interface MessageEditParams {
  /**
   * Path param: Snowflake room id
   */
  roomId: string;
  /**
   * Body param
   */
  body: MessageEditParams.Plaintext | MessageEditParams.Ciphertext;
}

export namespace MessageEditParams {
  export interface Plaintext {
    plaintext: string;
  }

  export interface Ciphertext {
    ciphertext: string;
  }
}

export interface MessageDeleteParams {
  /**
   * Snowflake room id
   */
  roomId: string;
}

export interface MessageSearch2Params {
  q?: string;
  has?: 'link' | 'file' | 'image' | 'video' | 'audio';
  from?: string;
  mentions?: string;
  limit?: number;
  before?: string;
}

export interface MessageSearch2Response {
  messages?: Array<Message>;
  searchable?: boolean;
}

export interface MessageCreateReactionParams {
  /**
   * Snowflake room id
   */
  roomId: string;
  /**
   * Snowflake message id
   */
  messageId: string;
}

export interface MessageCreateReactionResponse {
  reactions?: Array<MessageReaction>;
}

export interface MessageDeleteReactionParams {
  /**
   * Snowflake room id
   */
  roomId: string;
  /**
   * Snowflake message id
   */
  messageId: string;
}

export interface MessageListReactorsParams {
  /**
   * Snowflake room id
   */
  roomId: string;
  /**
   * Snowflake message id
   */
  messageId: string;
}

export type MessageListReactorsResponse = Array<Reactor>;

export interface MessageUploadAttachmentParams {
  /**
   * @format binary
   */
  file: Uploadable;
  width?: number;
  height?: number;
}
export declare namespace Messages {
  export {
    type Message as Message,
    type MessageReaction as MessageReaction,
    type Reactor as Reactor,
    type Attachment as Attachment,
    type MessageSearchResponse as MessageSearchResponse,
    type MessageListResponse as MessageListResponse,
    type MessageSearch2Response as MessageSearch2Response,
    type MessageCreateReactionResponse as MessageCreateReactionResponse,
    type MessageListReactorsResponse as MessageListReactorsResponse,
    type MessageSearchParams as MessageSearchParams,
    type MessageListParams as MessageListParams,
    type MessageCreateParams as MessageCreateParams,
    type MessageRetrieveParams as MessageRetrieveParams,
    type MessageEditParams as MessageEditParams,
    type MessageDeleteParams as MessageDeleteParams,
    type MessageSearch2Params as MessageSearch2Params,
    type MessageCreateReactionParams as MessageCreateReactionParams,
    type MessageDeleteReactionParams as MessageDeleteReactionParams,
    type MessageListReactorsParams as MessageListReactorsParams,
    type MessageUploadAttachmentParams as MessageUploadAttachmentParams,
  };
}
