// File generated from our OpenAPI spec by Scalar. See README.md for details.

import { APIResource } from '../../resource';
import { APIPromise } from '../../api-promise';
import type { RequestOptions } from '../../internal/request-options';
import { buildHeaders } from '../../internal/headers';
import { path as __scalarPath } from '../../internal/utils/path';

export class Invites extends APIResource {
  /**
   * Requires Manage Space.
   *
   * @param {string} spaceID - Snowflake space id
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<InviteListResponse>} Invites
   *
   * @example
   * ```ts
   * const invite = await client.spaces.invites.list('spaceId');
   * ```
   */
  list(spaceID: string, options?: RequestOptions): APIPromise<InviteListResponse> {
    return this._client.get(__scalarPath`/spaces/${spaceID}/invites`, options);
  }

  /**
   * Requires Create Invite. max_age_seconds 0–2592000 (0 = never), max_uses 0–1000 (0 = unlimited).
   *
   * @param {string} spaceID - Snowflake space id
   * @param {InviteCreateParams} [body] - The request body to send.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<Invite>} Created invite
   *
   * @example
   * ```ts
   * const invite = await client.spaces.invites.create('spaceId');
   * ```
   */
  create(
    spaceID: string,
    body: InviteCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Invite> {
    return this._client.post(__scalarPath`/spaces/${spaceID}/invites`, { body, ...options });
  }

  /**
   * Requires Manage Space.
   *
   * @param {string} code
   * @param {InviteDeleteParams} params - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns Deleted
   *
   * @example
   * ```ts
   * await client.spaces.invites.delete('code', {
   *   spaceId: 'spaceId',
   * });
   * ```
   */
  delete(code: string, params: InviteDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { spaceId } = params;
    return this._client.delete(__scalarPath`/spaces/${spaceId}/invites/${code}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Public, no auth required.
   *
   * @param {string} code
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<InvitePreview>} Invite preview
   *
   * @example
   * ```ts
   * const invitePreview = await client.spaces.invites.retrieve('code');
   * ```
   */
  retrieve(code: string, options?: RequestOptions): APIPromise<InvitePreview> {
    return this._client.get(__scalarPath`/spaces/invites/${code}`, options);
  }

  /**
   * Join via invite
   *
   * @param {string} code
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns Joined
   *
   * @example
   * ```ts
   * await client.spaces.invites.join('code');
   * ```
   */
  join(code: string, options?: RequestOptions): APIPromise<void> {
    return this._client.post(__scalarPath`/spaces/invites/${code}/join`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface Invite {
  code?: string;
  space_id?: string;
  inviter_id?: string;
  max_uses?: number;
  current_uses?: number;
  /**
   * @format date-time
   */
  expires_at?: string | null;
  /**
   * @format date-time
   */
  created_at?: string;
}

export interface InvitePreview {
  space?: InvitePreview.Space;
  inviter_display_name?: string;
}

export namespace InvitePreview {
  export interface Space {
    id?: string;
    name?: string;
    icon?: string;
  }
}

export type InviteListResponse = Array<Invite>;

export interface InviteCreateParams {
  /**
   * @minimum 0
   * @maximum 2592000
   */
  max_age_seconds?: number;
  /**
   * @minimum 0
   * @maximum 1000
   */
  max_uses?: number;
}

export interface InviteDeleteParams {
  /**
   * Snowflake space id
   */
  spaceId: string;
}
export declare namespace Invites {
  export {
    type Invite as Invite,
    type InvitePreview as InvitePreview,
    type InviteListResponse as InviteListResponse,
    type InviteCreateParams as InviteCreateParams,
    type InviteDeleteParams as InviteDeleteParams,
  };
}
