// File generated from our OpenAPI spec by Scalar. See README.md for details.

import { APIResource } from '../../resource';
import { APIPromise } from '../../api-promise';
import type { RequestOptions } from '../../internal/request-options';
import { buildHeaders } from '../../internal/headers';
import { path as __scalarPath } from '../../internal/utils/path';

export class Roles extends APIResource {
  /**
   * List roles
   *
   * @param {string} spaceID - Snowflake space id
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<RoleListResponse>} Roles
   *
   * @example
   * ```ts
   * const role = await client.spaces.roles.list('spaceId');
   * ```
   */
  list(spaceID: string, options?: RequestOptions): APIPromise<RoleListResponse> {
    return this._client.get(__scalarPath`/spaces/${spaceID}/roles`, options);
  }

  /**
   * Requires Manage Roles. Cannot grant bits you do not hold.
   *
   * @param {string} spaceID - Snowflake space id
   * @param {RoleCreateParams} body - The request body to send.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<Role>} Created role
   *
   * @example
   * ```ts
   * const role = await client.spaces.roles.create('spaceId', {
   *   name: '',
   * });
   * ```
   */
  create(spaceID: string, body: RoleCreateParams, options?: RequestOptions): APIPromise<Role> {
    return this._client.post(__scalarPath`/spaces/${spaceID}/roles`, { body, ...options });
  }

  /**
   * Requires Manage Roles. @everyone can only have permissions changed. Hierarchy applies.
   *
   * @param {string} roleID - Snowflake role id
   * @param {RoleUpdateParams} params - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<Role>} Updated role
   *
   * @example
   * ```ts
   * const role = await client.spaces.roles.update('roleId', {
   *   spaceId: 'spaceId',
   * });
   * ```
   */
  update(roleID: string, params: RoleUpdateParams, options?: RequestOptions): APIPromise<Role> {
    const { spaceId, ...body } = params;
    return this._client.patch(__scalarPath`/spaces/${spaceId}/roles/${roleID}`, { body, ...options });
  }

  /**
   * Requires Manage Roles. Cannot delete @everyone or managed roles.
   *
   * @param {string} roleID - Snowflake role id
   * @param {RoleDeleteParams} params - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns Deleted
   *
   * @example
   * ```ts
   * await client.spaces.roles.delete('roleId', {
   *   spaceId: 'spaceId',
   * });
   * ```
   */
  delete(roleID: string, params: RoleDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { spaceId } = params;
    return this._client.delete(__scalarPath`/spaces/${spaceId}/roles/${roleID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface Role {
  id: string;
  name: string;
  permissions: number;
  position: number;
  color?: number;
  hoist?: boolean;
  mentionable?: boolean;
  /**
   * Present on managed roles created by bot install
   */
  bot_id?: string;
  /**
   * @format date-time
   */
  created_at?: string;
  /**
   * @format date-time
   */
  updated_at?: string;
}

export type RoleListResponse = Array<Role>;

export interface RoleCreateParams {
  name: string;
  permissions?: number;
  color?: number;
  hoist?: boolean;
  mentionable?: boolean;
}

export interface RoleUpdateParams {
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
  permissions?: number;
  /**
   * Body param
   */
  color?: number;
  /**
   * Body param
   */
  hoist?: boolean;
  /**
   * Body param
   */
  mentionable?: boolean;
  /**
   * Body param
   */
  position?: number;
}

export interface RoleDeleteParams {
  /**
   * Snowflake space id
   */
  spaceId: string;
}
export declare namespace Roles {
  export {
    type Role as Role,
    type RoleListResponse as RoleListResponse,
    type RoleCreateParams as RoleCreateParams,
    type RoleUpdateParams as RoleUpdateParams,
    type RoleDeleteParams as RoleDeleteParams,
  };
}
