// File generated from our OpenAPI spec by Scalar. See README.md for details.

import { APIResource } from '../../../../resource';
import { APIPromise } from '../../../../api-promise';
import type { RequestOptions } from '../../../../internal/request-options';
import { buildHeaders } from '../../../../internal/headers';
import { path as __scalarPath } from '../../../../internal/utils/path';
import * as UsersAPI from './users';
import {
  Users,
  type UserPermissionOverride,
  type UserListResponse,
  type UserListParams,
  type UserSetParams,
  type UserDeleteParams,
} from './users';

export class Overrides extends APIResource {
  users: UsersAPI.Users = new UsersAPI.Users(this._client);

  /**
   * Requires Manage Roles.
   *
   * @param {string} roomID - Snowflake room id
   * @param {OverrideListParams} params - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<OverrideListResponse>} Overrides
   *
   * @example
   * ```ts
   * const override = await client.spaces.rooms.overrides.list('roomId', {
   *   spaceId: 'spaceId',
   * });
   * ```
   */
  list(
    roomID: string,
    params: OverrideListParams,
    options?: RequestOptions,
  ): APIPromise<OverrideListResponse> {
    const { spaceId } = params;
    return this._client.get(__scalarPath`/spaces/${spaceId}/rooms/${roomID}/overrides`, options);
  }

  /**
   * Requires Manage Roles. Only room-scoped bits accepted.
   *
   * @param {string} roleID - Snowflake role id
   * @param {OverrideSetRoleParams} params - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns Override set
   *
   * @example
   * ```ts
   * await client.spaces.rooms.overrides.setRole('roleId', {
   *   spaceId: 'spaceId',
   *   roomId: 'roomId',
   *   allow: 0,
   *   deny: 0,
   * });
   * ```
   */
  setRole(roleID: string, params: OverrideSetRoleParams, options?: RequestOptions): APIPromise<void> {
    const { spaceId, roomId, ...body } = params;
    return this._client.put(__scalarPath`/spaces/${spaceId}/rooms/${roomId}/overrides/${roleID}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Delete role room override
   *
   * @param {string} roleID - Snowflake role id
   * @param {OverrideDeleteRoleParams} params - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns Deleted
   *
   * @example
   * ```ts
   * await client.spaces.rooms.overrides.deleteRole('roleId', {
   *   spaceId: 'spaceId',
   *   roomId: 'roomId',
   * });
   * ```
   */
  deleteRole(roleID: string, params: OverrideDeleteRoleParams, options?: RequestOptions): APIPromise<void> {
    const { spaceId, roomId } = params;
    return this._client.delete(__scalarPath`/spaces/${spaceId}/rooms/${roomId}/overrides/${roleID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface PermissionOverride {
  role_id?: string;
  allow?: number;
  deny?: number;
}

export interface OverrideListParams {
  /**
   * Snowflake space id
   */
  spaceId: string;
}

export type OverrideListResponse = Array<PermissionOverride>;

export interface OverrideSetRoleParams {
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

export interface OverrideDeleteRoleParams {
  /**
   * Snowflake space id
   */
  spaceId: string;
  /**
   * Snowflake room id
   */
  roomId: string;
}
Overrides.Users = Users;

export declare namespace Overrides {
  export {
    type PermissionOverride as PermissionOverride,
    type OverrideListResponse as OverrideListResponse,
    type OverrideListParams as OverrideListParams,
    type OverrideSetRoleParams as OverrideSetRoleParams,
    type OverrideDeleteRoleParams as OverrideDeleteRoleParams,
  };

  export {
    Users as Users,
    type UserPermissionOverride as UserPermissionOverride,
    type UserListResponse as UserListResponse,
    type UserListParams as UserListParams,
    type UserSetParams as UserSetParams,
    type UserDeleteParams as UserDeleteParams,
  };
}
