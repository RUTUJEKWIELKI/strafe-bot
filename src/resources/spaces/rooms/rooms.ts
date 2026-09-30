// File generated from our OpenAPI spec by Scalar. See README.md for details.

import { APIResource } from '../../../resource';
import { APIPromise } from '../../../api-promise';
import type { RequestOptions } from '../../../internal/request-options';
import { buildHeaders } from '../../../internal/headers';
import { path as __scalarPath } from '../../../internal/utils/path';
import type * as OverridesAPI from './overrides/overrides';
import type * as UsersAPI from './overrides/users';
import * as OverridesAPI2 from './overrides/overrides';
import {
  Overrides,
  type PermissionOverride,
  type OverrideListResponse,
  type OverrideListParams,
  type OverrideSetRoleParams,
  type OverrideDeleteRoleParams,
} from './overrides/overrides';

export class Rooms extends APIResource {
  overrides: OverridesAPI2.Overrides = new OverridesAPI2.Overrides(this._client);

  /**
   * List space rooms
   *
   * @param {string} spaceID - Snowflake space id
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<RoomListResponse>} Rooms with overrides and read state
   *
   * @example
   * ```ts
   * const room = await client.spaces.rooms.list('spaceId');
   * ```
   */
  list(spaceID: string, options?: RequestOptions): APIPromise<RoomListResponse> {
    return this._client.get(__scalarPath`/spaces/${spaceID}/rooms`, options);
  }

  /**
   * Requires Manage Rooms. Type 3 = text, 4 = voice, 5 = section.
   *
   * @param {string} spaceID - Snowflake space id
   * @param {RoomCreateParams} body - The request body to send.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<Room>} Created room
   *
   * @example
   * ```ts
   * const room = await client.spaces.rooms.create('spaceId', {
   *   name: '',
   *   type: 3,
   * });
   * ```
   */
  create(spaceID: string, body: RoomCreateParams, options?: RequestOptions): APIPromise<Room> {
    return this._client.post(__scalarPath`/spaces/${spaceID}/rooms`, { body, ...options });
  }

  /**
   * Requires Manage Rooms. Turning e2ee_enabled on is one-way for existing history.
   *
   * @param {string} roomID - Snowflake room id
   * @param {RoomUpdateParams} params - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<Room>} Updated room
   *
   * @example
   * ```ts
   * const room = await client.spaces.rooms.update('roomId', {
   *   spaceId: 'spaceId',
   * });
   * ```
   */
  update(roomID: string, params: RoomUpdateParams, options?: RequestOptions): APIPromise<Room> {
    const { spaceId, ...body } = params;
    return this._client.patch(__scalarPath`/spaces/${spaceId}/rooms/${roomID}`, { body, ...options });
  }

  /**
   * Requires Manage Rooms.
   *
   * @param {string} roomID - Snowflake room id
   * @param {RoomDeleteParams} params - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns Deleted
   *
   * @example
   * ```ts
   * await client.spaces.rooms.delete('roomId', {
   *   spaceId: 'spaceId',
   * });
   * ```
   */
  delete(roomID: string, params: RoomDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { spaceId } = params;
    return this._client.delete(__scalarPath`/spaces/${spaceId}/rooms/${roomID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface Room {
  id: string;
  /**
   * 1 = PM, 2 = group PM, 3 = text, 4 = voice, 5 = section
   */
  type: number;
  /**
   * @format date-time
   */
  created_at: string;
  recipients?: Array<string>;
  space_id?: string;
  parent_id?: string;
  name?: string;
  topic?: string;
  position?: number;
  creator_id?: string;
  /**
   * When true, bots cannot read/write plaintext
   */
  e2ee_enabled?: boolean;
  slowmode_seconds?: number;
  last_message_id?: string;
  last_read_message_id?: string;
  mention_count?: number;
  permission_overrides?: Array<OverridesAPI.PermissionOverride>;
  user_overrides?: Array<UsersAPI.UserPermissionOverride>;
  /**
   * @format date-time
   */
  updated_at?: string;
}

export type RoomListResponse = Array<Room>;

export interface RoomCreateParams {
  name: string;
  type: 3 | 4 | 5;
  parent_id?: string;
  e2ee_enabled?: boolean;
  user_limit?: number;
  bitrate?: number;
}

export interface RoomUpdateParams {
  /**
   * Path param: Snowflake space id
   */
  spaceId: string;
  /**
   * Body param
   */
  name?: string;
  /**
   * Body param
   */
  topic?: string;
  /**
   * Body param
   */
  slowmode_seconds?: number;
  /**
   * Body param
   */
  e2ee_enabled?: boolean;
  /**
   * Body param
   */
  user_limit?: number;
  /**
   * Body param
   */
  bitrate?: number;
  /**
   * Body param
   */
  position?: number;
}

export interface RoomDeleteParams {
  /**
   * Snowflake space id
   */
  spaceId: string;
}
Rooms.Overrides = Overrides;

export declare namespace Rooms {
  export {
    type Room as Room,
    type RoomListResponse as RoomListResponse,
    type RoomCreateParams as RoomCreateParams,
    type RoomUpdateParams as RoomUpdateParams,
    type RoomDeleteParams as RoomDeleteParams,
  };

  export {
    Overrides as Overrides,
    type PermissionOverride as PermissionOverride,
    type OverrideListResponse as OverrideListResponse,
    type OverrideListParams as OverrideListParams,
    type OverrideSetRoleParams as OverrideSetRoleParams,
    type OverrideDeleteRoleParams as OverrideDeleteRoleParams,
  };
}
