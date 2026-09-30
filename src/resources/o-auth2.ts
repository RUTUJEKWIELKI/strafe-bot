// File generated from our OpenAPI spec by Scalar. See README.md for details.

import { APIResource } from '../resource';
import { APIPromise } from '../api-promise';
import type { RequestOptions } from '../internal/request-options';
import { buildHeaders } from '../internal/headers';

export class OAuth2 extends APIResource {
  /**
   * Authorization code grant or refresh_token. Client authenticates via HTTP Basic (client_id:client_secret) or body fields. Body may be application/x-www-form-urlencoded or JSON. Access tokens live 7 days.
   *
   * @param {OAuth2Oauth2TokenParams} body - The request body to send.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<OAuth2Token>} Token pair
   *
   * @example
   * ```ts
   * const oAuth2Token = await client.oAuth2Resource.oauth2Token({
   *   grant_type: 'authorization_code',
   * });
   * ```
   */
  oauth2Token(body: OAuth2Oauth2TokenParams, options?: RequestOptions): APIPromise<OAuth2Token> {
    return this._client.post('/oauth2/token', {
      body,
      ...options,
      headers: buildHeaders([{ 'Content-Type': 'application/x-www-form-urlencoded' }, options?.headers]),
    });
  }

  /**
   * RFC 7009. Revokes access or refresh token; the pair dies. Unknown tokens still return 200.
   *
   * @param {OAuth2Oauth2RevokeParams} body - The request body to send.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<OAuth2Oauth2RevokeResponse>} Revoked (or unknown token)
   *
   * @example
   * ```ts
   * const oAuth2 = await client.oAuth2Resource.oauth2Revoke({
   *   token: '',
   * });
   * ```
   */
  oauth2Revoke(
    body: OAuth2Oauth2RevokeParams,
    options?: RequestOptions,
  ): APIPromise<OAuth2Oauth2RevokeResponse> {
    return this._client.post('/oauth2/token/revoke', {
      body,
      ...options,
      headers: buildHeaders([{ 'Content-Type': 'application/x-www-form-urlencoded' }, options?.headers]),
    });
  }

  /**
   * Inspect current token
   *
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<TokenInfo>} Token info
   *
   * @example
   * ```ts
   * const tokenInfo = await client.oAuth2Resource.oauth2Me();
   * ```
   */
  oauth2Me(options?: RequestOptions): APIPromise<TokenInfo> {
    return this._client.get('/oauth2/@me', options);
  }
}

export interface OAuth2Token {
  access_token: string;
  token_type: 'Bearer';
  /**
   * Seconds (typically 604800 = 7 days)
   */
  expires_in: number;
  refresh_token?: string;
  /**
   * Space-separated scopes
   */
  scope?: string;
}

export interface TokenInfo {
  application?: TokenInfo.Application;
  scopes?: Array<string>;
  /**
   * @format date-time
   */
  expires?: string;
  /**
   * Present when token has identify or email
   */
  user?: TokenInfo.User;
}

export namespace TokenInfo {
  export interface Application {
    id?: string;
    name?: string;
    description?: string;
    icon?: string;
    has_bot?: boolean;
    bot_public?: boolean;
  }

  export interface User {
    id?: string;
    username?: string;
    discriminator?: number;
    display_name?: string;
    avatar?: string;
    public_flags?: number;
  }
}

export interface OAuth2Oauth2TokenParams {
  grant_type: 'authorization_code' | 'refresh_token';
  /**
   * Required for authorization_code
   */
  code?: string;
  /**
   * Must match the one used in the authorize request
   */
  redirect_uri?: string;
  /**
   * Required for refresh_token
   */
  refresh_token?: string;
  client_id?: string;
  client_secret?: string;
}

export interface OAuth2Oauth2RevokeParams {
  token: string;
  client_id?: string;
  client_secret?: string;
}

export type OAuth2Oauth2RevokeResponse = Record<string, unknown>;
export declare namespace OAuth2 {
  export {
    type OAuth2Token as OAuth2Token,
    type TokenInfo as TokenInfo,
    type OAuth2Oauth2RevokeResponse as OAuth2Oauth2RevokeResponse,
    type OAuth2Oauth2TokenParams as OAuth2Oauth2TokenParams,
    type OAuth2Oauth2RevokeParams as OAuth2Oauth2RevokeParams,
  };
}
