// File generated from our OpenAPI spec by Scalar. See README.md for details.

import { APIResource } from '../../../../resource';
import { APIPromise } from '../../../../api-promise';
import type { RequestOptions } from '../../../../internal/request-options';
import { buildHeaders } from '../../../../internal/headers';
import { path as __scalarPath } from '../../../../internal/utils/path';

export class Users extends APIResource {
  /**
   * List user room overrides
   *
   * @param {string} roomID - Snowflake room id
   * @param {UserListParams} params - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<UserListResponse>} User overrides
   *
   * @example
   * ```ts
   * const user = await client.spaces.rooms.overrides.users.list('roomId', {
   *   spaceId: 'spaceId',
   * });
   * ```
   */
  list(roomID: string, params: UserListParams, options?: RequestOptions): APIPromise<UserListResponse> {
    const { spaceId } = params;
    return this._client.get(__scalarPath`/spaces/${spaceId}/rooms/${roomID}/overrides/users`, options);
  }

  /**
   * Set user room override
   *
   * @param {string} userID - Snowflake user id
   * @param {UserSetParams} params - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns Override set
   *
   * @example
   * ```ts
   * await client.spaces.rooms.overrides.users.set('userId', {
   *   spaceId: 'spaceId',
   *   roomId: 'roomId',
   *   allow: 0,
   *   deny: 0,
   * });
   * ```
   */
  set(userID: string, params: UserSetParams, options?: RequestOptions): APIPromise<void> {
    const { spaceId, roomId, ...body } = params;
    return this._client.put(__scalarPath`/spaces/${spaceId}/rooms/${roomId}/overrides/users/${userID}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Delete user room override
   *
   * @param {string} userID - Snowflake user id
   * @param {UserDeleteParams} params - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns Deleted
   *
   * @example
   * ```ts
   * await client.spaces.rooms.overrides.users.delete('userId', {
   *   spaceId: 'spaceId',
   *   roomId: 'roomId',
   * });
   * ```
   */
  delete(userID: string, params: UserDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { spaceId, roomId } = params;
    return this._client.delete(__scalarPath`/spaces/${spaceId}/rooms/${roomId}/overrides/users/${userID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface UserPermissionOverride {
  user_id?: string;
  allow?: number;
  deny?: number;
}

export interface UserListParams {
  /**
   * Snowflake space id
   */
  spaceId: string;
}

export type UserListResponse = Array<UserPermissionOverride>;

export interface UserSetParams {
  /**
   * Path param: Snowflake space id
   */
  spaceId: string;
  /**
   * Path param: Snowflake room id
   */
  roomId: string;
  /**
   * Body param
   */
  allow: number;
  /**
   * Body param
   */
  deny: number;
}

export interface UserDeleteParams {
  /**
   * Snowflake space id
   */
  spaceId: string;
  /**
   * Snowflake room id
   */
  roomId: string;
}
export declare namespace Users {
  export {
    type UserPermissionOverride as UserPermissionOverride,
    type UserListResponse as UserListResponse,
    type UserListParams as UserListParams,
    type UserSetParams as UserSetParams,
    type UserDeleteParams as UserDeleteParams,
  };
}
