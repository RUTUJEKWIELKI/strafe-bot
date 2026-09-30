// File generated from our OpenAPI spec by Scalar. See README.md for details.

import { APIResource } from '../../resource';
import { APIPromise } from '../../api-promise';
import type { RequestOptions } from '../../internal/request-options';
import { buildHeaders } from '../../internal/headers';
import { multipartFormRequestOptions } from '../../internal/uploads';
import type { Uploadable } from '../../core/uploads';

export class Me extends APIResource {
  /**
   * Returns the authenticated account. `email` is present for sessions/bots and for OAuth2 tokens with the `email` scope; otherwise empty string.
   *
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<User>} Current user
   *
   * @example
   * ```ts
   * const user = await client.users.me.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<User> {
    return this._client.get('/users/@me', options);
  }

  /**
   * Update current user profile
   *
   * @param {MeUpdateParams} [body] - The request body to send.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<User>} Updated user
   *
   * @example
   * ```ts
   * const user = await client.users.me.update();
   * ```
   */
  update(body: MeUpdateParams | null | undefined = {}, options?: RequestOptions): APIPromise<User> {
    return this._client.patch('/users/@me', { body, ...options });
  }

  /**
   * Upload current user avatar
   *
   * @param {MeUploadCurrentAvatarParams} body - The request body to send.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns Avatar updated
   *
   * @example
   * ```ts
   * await client.users.me.uploadCurrentAvatar({
   *   file: new File(['file'], 'file'),
   * });
   * ```
   */
  uploadCurrentAvatar(body: MeUploadCurrentAvatarParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post(
      '/users/@me/avatar',
      multipartFormRequestOptions(
        { body, ...options, headers: buildHeaders([{ Accept: '*/*' }, options?.headers]) },
        this._client,
      ),
    );
  }

  /**
   * Upload current user banner
   *
   * @param {MeUploadCurrentBannerParams} body - The request body to send.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns Banner updated
   *
   * @example
   * ```ts
   * await client.users.me.uploadCurrentBanner({
   *   file: new File(['file'], 'file'),
   * });
   * ```
   */
  uploadCurrentBanner(body: MeUploadCurrentBannerParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post(
      '/users/@me/banner',
      multipartFormRequestOptions(
        { body, ...options, headers: buildHeaders([{ Accept: '*/*' }, options?.headers]) },
        this._client,
      ),
    );
  }

  /**
   * Spaces the account is in, with owner flag and space-wide permissions mask.
   *
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<MeListCurrentSpacesResponse>} List of spaces
   *
   * @example
   * ```ts
   * const me = await client.users.me.listCurrentSpaces();
   * ```
   */
  listCurrentSpaces(options?: RequestOptions): APIPromise<MeListCurrentSpacesResponse> {
    return this._client.get('/users/@me/spaces', options);
  }
}

export interface User {
  id: string;
  username: string;
  discriminator: number;
  display_name: string;
  bot: boolean;
  email?: string;
  bio?: string;
  about_me?: string;
  avatar?: string;
  banner?: string;
  accent_color?: string;
  public_flags?: number;
  presence?: Presence;
}

export interface UserSpace {
  id?: string;
  name?: string;
  name_acronym?: string;
  icon?: string;
  banner?: string;
  owner?: boolean;
  /**
   * Space-wide permission bitmask
   */
  permissions?: number;
}

export interface Presence {
  status?: 'online' | 'idle' | 'dnd' | 'invisible' | 'offline';
  custom_status?: string;
}

export interface MeUpdateParams {
  display_name?: string;
  bio?: string;
  about_me?: string;
  /**
   * Hex color
   */
  accent_color?: string;
  presence?: Presence;
}

export interface MeUploadCurrentAvatarParams {
  /**
   * @format binary
   */
  file: Uploadable;
}

export interface MeUploadCurrentBannerParams {
  /**
   * @format binary
   */
  file: Uploadable;
}

export type MeListCurrentSpacesResponse = Array<UserSpace>;
export declare namespace Me {
  export {
    type User as User,
    type UserSpace as UserSpace,
    type Presence as Presence,
    type MeListCurrentSpacesResponse as MeListCurrentSpacesResponse,
    type MeUpdateParams as MeUpdateParams,
    type MeUploadCurrentAvatarParams as MeUploadCurrentAvatarParams,
    type MeUploadCurrentBannerParams as MeUploadCurrentBannerParams,
  };
}
