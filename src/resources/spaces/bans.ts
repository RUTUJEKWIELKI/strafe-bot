// File generated from our OpenAPI spec by Scalar. See README.md for details.

import { APIResource } from '../../resource';
import { APIPromise } from '../../api-promise';
import type { RequestOptions } from '../../internal/request-options';
import { buildHeaders } from '../../internal/headers';
import { path as __scalarPath } from '../../internal/utils/path';

export class Bans extends APIResource {
  /**
   * Requires Ban Members.
   *
   * @param {string} spaceID - Snowflake space id
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<BanListResponse>} Bans with user profiles
   *
   * @example
   * ```ts
   * const ban = await client.spaces.bans.list('spaceId');
   * ```
   */
  list(spaceID: string, options?: RequestOptions): APIPromise<BanListResponse> {
    return this._client.get(__scalarPath`/spaces/${spaceID}/bans`, options);
  }

  /**
   * Requires Ban Members. Removes the user from the space.
   *
   * @param {string} userID - Snowflake user id
   * @param {BanMemberParams} params - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns Banned
   *
   * @example
   * ```ts
   * await client.spaces.bans.member('userId', {
   *   spaceId: 'spaceId',
   * });
   * ```
   */
  member(userID: string, params: BanMemberParams, options?: RequestOptions): APIPromise<void> {
    const { spaceId, ...body } = params;
    return this._client.post(__scalarPath`/spaces/${spaceId}/bans/${userID}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Requires Ban Members.
   *
   * @param {string} userID - Snowflake user id
   * @param {BanUnbanMemberParams} params - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns Unbanned
   *
   * @example
   * ```ts
   * await client.spaces.bans.unbanMember('userId', {
   *   spaceId: 'spaceId',
   * });
   * ```
   */
  unbanMember(userID: string, params: BanUnbanMemberParams, options?: RequestOptions): APIPromise<void> {
    const { spaceId } = params;
    return this._client.delete(__scalarPath`/spaces/${spaceId}/bans/${userID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface SpaceBan {
  user_id?: string;
  reason?: string;
  banned_by?: string;
  /**
   * @format date-time
   */
  created_at?: string;
}

export type BanListResponse = Array<SpaceBan>;

export interface BanMemberParams {
  /**
   * Path param: Snowflake space id
   */
  spaceId: string;
  /**
   * Body param
   */
  reason?: string;
}

export interface BanUnbanMemberParams {
  /**
   * Snowflake space id
   */
  spaceId: string;
}
export declare namespace Bans {
  export {
    type SpaceBan as SpaceBan,
    type BanListResponse as BanListResponse,
    type BanMemberParams as BanMemberParams,
    type BanUnbanMemberParams as BanUnbanMemberParams,
  };
}
