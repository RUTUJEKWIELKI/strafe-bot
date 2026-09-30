// File generated from our OpenAPI spec by Scalar. See README.md for details.

import { APIResource } from '../../resource';
import { APIPromise } from '../../api-promise';
import type { RequestOptions } from '../../internal/request-options';
import { buildHeaders } from '../../internal/headers';
import { path as __scalarPath } from '../../internal/utils/path';
import type * as MeAPI from '../users/me';

export class Members extends APIResource {
  /**
   * List members
   *
   * @param {string} spaceID - Snowflake space id
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<MemberListResponse>} Members
   *
   * @example
   * ```ts
   * const member = await client.spaces.members.list('spaceId');
   * ```
   */
  list(spaceID: string, options?: RequestOptions): APIPromise<MemberListResponse> {
    return this._client.get(__scalarPath`/spaces/${spaceID}/members`, options);
  }

  /**
   * Bot must have Create Invite. Body access_token must belong to the user and have spaces.join scope. 201 added, 204 already member.
   *
   * @param {string} userID - Snowflake user id
   * @param {MemberCreateParams} params - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<MemberCreateResponse>} Added
   *
   * @example
   * ```ts
   * const member = await client.spaces.members.create('userId', {
   *   spaceId: 'spaceId',
   *   access_token: '',
   * });
   * ```
   */
  create(
    userID: string,
    params: MemberCreateParams,
    options?: RequestOptions,
  ): APIPromise<MemberCreateResponse> {
    const { spaceId, ...body } = params;
    return this._client.put(__scalarPath`/spaces/${spaceId}/members/${userID}`, { body, ...options });
  }

  /**
   * Requires Kick Members. Kicked bot's managed role is removed.
   *
   * @param {string} userID - Snowflake user id
   * @param {MemberKickParams} params - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns Kicked
   *
   * @example
   * ```ts
   * await client.spaces.members.kick('userId', {
   *   spaceId: 'spaceId',
   * });
   * ```
   */
  kick(userID: string, params: MemberKickParams, options?: RequestOptions): APIPromise<void> {
    const { spaceId } = params;
    return this._client.delete(__scalarPath`/spaces/${spaceId}/members/${userID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Requires Manage Roles. Replaces roles (@everyone implied). Hierarchy applies. Managed bot role cannot be given or taken.
   *
   * @param {string} userID - Snowflake user id
   * @param {MemberSetRolesParams} params - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns Roles updated
   *
   * @example
   * ```ts
   * await client.spaces.members.setRoles('userId', {
   *   spaceId: 'spaceId',
   *   role_ids: [''],
   * });
   * ```
   */
  setRoles(userID: string, params: MemberSetRolesParams, options?: RequestOptions): APIPromise<void> {
    const { spaceId, ...body } = params;
    return this._client.put(__scalarPath`/spaces/${spaceId}/members/${userID}/roles`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface SpaceMember {
  id?: string;
  username?: string;
  discriminator?: number;
  display_name?: string;
  avatar?: string;
  public_flags?: number;
  bot?: boolean;
  role_ids?: Array<string>;
  /**
   * @format date-time
   */
  joined_at?: string;
  presence?: MeAPI.Presence;
}

export type MemberListResponse = Array<SpaceMember>;

export interface MemberCreateParams {
  /**
   * Path param: Snowflake space id
   */
  spaceId: string;
  /**
   * Body param
   */
  access_token: string;
}

export interface MemberCreateResponse {
  space_id?: string;
  user_id?: string;
}

export interface MemberKickParams {
  /**
   * Snowflake space id
   */
  spaceId: string;
}

export interface MemberSetRolesParams {
  /**
   * Path param: Snowflake space id
   */
  spaceId: string;
  /**
   * Body param
   */
  role_ids: Array<string>;
}
export declare namespace Members {
  export {
    type SpaceMember as SpaceMember,
    type MemberListResponse as MemberListResponse,
    type MemberCreateResponse as MemberCreateResponse,
    type MemberCreateParams as MemberCreateParams,
    type MemberKickParams as MemberKickParams,
    type MemberSetRolesParams as MemberSetRolesParams,
  };
}
