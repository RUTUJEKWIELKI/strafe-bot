// File generated from our OpenAPI spec by Scalar. See README.md for details.

import { APIResource } from '../resource';
import { APIPromise } from '../api-promise';
import type { RequestOptions } from '../internal/request-options';
import { buildHeaders } from '../internal/headers';
import { path as __scalarPath } from '../internal/utils/path';
import type * as RoomsAPI from './spaces/rooms/rooms';
import type * as OverridesAPI from './spaces/rooms/overrides/overrides';
import type * as UsersAPI from './spaces/rooms/overrides/users';

export class Rooms extends APIResource {
  /**
   * List private messages and group PMs
   *
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<RoomListResponse>} Rooms
   *
   * @example
   * ```ts
   * const room = await client.rooms.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<RoomListResponse> {
    return this._client.get('/rooms', options);
  }

  /**
   * PMs are E2EE by default; bots cannot read them until the other party disables encryption.
   *
   * @param {RoomCreateParams} body - The request body to send.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<RoomsAPI.Room>} Created room
   *
   * @example
   * ```ts
   * const room = await client.rooms.create({
   *   recipient_id: '',
   * });
   * ```
   */
  create(body: RoomCreateParams, options?: RequestOptions): APIPromise<RoomsAPI.Room> {
    return this._client.post('/rooms', { body, ...options });
  }

  /**
   * Any room the account can see. Space rooms include space_id. All rooms include e2ee_enabled.
   *
   * @param {string} roomID - Snowflake room id
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<RoomsAPI.Room>} Room
   *
   * @example
   * ```ts
   * const room = await client.rooms.retrieve('roomId');
   * ```
   */
  retrieve(roomID: string, options?: RequestOptions): APIPromise<RoomsAPI.Room> {
    return this._client.get(__scalarPath`/rooms/${roomID}`, options);
  }

  /**
   * Rate limited to one broadcast per 5 seconds per room. Extra calls succeed silently.
   *
   * @param {string} roomID - Snowflake room id
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns Sent
   *
   * @example
   * ```ts
   * await client.rooms.sendTyping('roomId');
   * ```
   */
  sendTyping(roomID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.post(__scalarPath`/rooms/${roomID}/typing`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Mark room as read
   *
   * @param {string} roomID - Snowflake room id
   * @param {RoomAckParams} body - The request body to send.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns Acknowledged
   *
   * @example
   * ```ts
   * await client.rooms.ack('roomId', {
   *   message_id: '',
   * });
   * ```
   */
  ack(roomID: string, body: RoomAckParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post(__scalarPath`/rooms/${roomID}/ack`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type RoomListResponse = Array<RoomsAPI.Room>;

export type RoomCreateParams =
  | RoomCreateParams.Variant0
  | RoomCreateParams.Variant1
  | RoomCreateParams.Variant2;

export declare namespace RoomCreateParams {
  export interface Variant0 {
    recipient_id: string;
  }

  export interface Variant1 {
    /**
     * name#1234
     */
    recipient_handle: string;
  }

  export interface Variant2 {
    name: string;
    recipient_ids: Array<string>;
  }
}

export interface RoomAckParams {
  message_id: string;
}
export declare namespace Rooms {
  export {
    type RoomListResponse as RoomListResponse,
    type RoomCreateParams as RoomCreateParams,
    type RoomAckParams as RoomAckParams,
  };
}
