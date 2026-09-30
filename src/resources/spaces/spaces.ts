// File generated from our OpenAPI spec by Scalar. See README.md for details.

import { APIResource } from '../../resource';
import { APIPromise } from '../../api-promise';
import type { RequestOptions } from '../../internal/request-options';
import { buildHeaders } from '../../internal/headers';
import { path as __scalarPath } from '../../internal/utils/path';
import type * as RolesAPI from './roles';
import type * as MeAPI from '../users/me';
import * as RoomsAPI from './rooms/rooms';
import {
  Rooms,
  type Room,
  type RoomListResponse,
  type RoomCreateParams,
  type RoomUpdateParams,
  type RoomDeleteParams,
} from './rooms/rooms';
import * as MembersAPI from './members';
import {
  Members,
  type SpaceMember,
  type MemberListResponse,
  type MemberCreateResponse,
  type MemberCreateParams,
  type MemberKickParams,
  type MemberSetRolesParams,
} from './members';
import * as BansAPI from './bans';
import {
  Bans,
  type SpaceBan,
  type BanListResponse,
  type BanMemberParams,
  type BanUnbanMemberParams,
} from './bans';
import * as RolesAPI2 from './roles';
import {
  Roles,
  type Role,
  type RoleListResponse,
  type RoleCreateParams,
  type RoleUpdateParams,
  type RoleDeleteParams,
} from './roles';
import * as InvitesAPI from './invites';
import {
  Invites,
  type Invite,
  type InvitePreview,
  type InviteListResponse,
  type InviteCreateParams,
  type InviteDeleteParams,
} from './invites';

export class Spaces extends APIResource {
  rooms: RoomsAPI.Rooms = new RoomsAPI.Rooms(this._client);
  members: MembersAPI.Members = new MembersAPI.Members(this._client);
  bans: BansAPI.Bans = new BansAPI.Bans(this._client);
  roles: RolesAPI2.Roles = new RolesAPI2.Roles(this._client);
  invites: InvitesAPI.Invites = new InvitesAPI.Invites(this._client);

  /**
   * Every space the account is in, each with roles. Same shape as READY.spaces.
   *
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<SpaceListResponse>} Spaces
   *
   * @example
   * ```ts
   * const space = await client.spaces.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<SpaceListResponse> {
    return this._client.get('/spaces', options);
  }

  /**
   * Get space
   *
   * @param {string} spaceID - Snowflake space id
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<Space>} Space
   *
   * @example
   * ```ts
   * const space = await client.spaces.retrieve('spaceId');
   * ```
   */
  retrieve(spaceID: string, options?: RequestOptions): APIPromise<Space> {
    return this._client.get(__scalarPath`/spaces/${spaceID}`, options);
  }

  /**
   * Requires Manage Space permission.
   *
   * @param {string} spaceID - Snowflake space id
   * @param {SpaceUpdateParams} [body] - The request body to send.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<Space>} Updated space
   *
   * @example
   * ```ts
   * const space = await client.spaces.update('spaceId');
   * ```
   */
  update(
    spaceID: string,
    body: SpaceUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Space> {
    return this._client.patch(__scalarPath`/spaces/${spaceID}`, { body, ...options });
  }

  /**
   * Requires Manage Space. Bot installs are action_type `bot_add`.
   *
   * @param {string} spaceID - Snowflake space id
   * @param {SpaceListAuditLogParams} [query] - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<SpaceListAuditLogResponse>} Audit log
   *
   * @example
   * ```ts
   * const space = await client.spaces.listAuditLog('spaceId');
   * ```
   */
  listAuditLog(
    spaceID: string,
    query: SpaceListAuditLogParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SpaceListAuditLogResponse> {
    return this._client.get(__scalarPath`/spaces/${spaceID}/audit-log`, { query, ...options });
  }

  /**
   * Owner cannot leave; they must transfer or delete the space.
   *
   * @param {string} spaceID - Snowflake space id
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns Left
   *
   * @example
   * ```ts
   * await client.spaces.leave('spaceId');
   * ```
   */
  leave(spaceID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.post(__scalarPath`/spaces/${spaceID}/leave`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface Space {
  id: string;
  name: string;
  owner_id: string;
  name_acronym?: string;
  description?: string;
  icon?: string;
  banner?: string;
  everyone_role_id?: string;
  system_room_id?: string;
  system_room_flags?: number;
  default_message_notifications?: number;
  afk_room_id?: string | null;
  afk_timeout?: number;
  widget_enabled?: boolean;
  features?: Array<string>;
  roles?: Array<RolesAPI.Role>;
  /**
   * @format date-time
   */
  created_at?: string;
  /**
   * @format date-time
   */
  updated_at?: string;
}

export interface AuditLogEntry {
  id?: string;
  action_type?: string;
  user_id?: string;
  target_id?: string;
  changes?: Record<string, unknown>;
  reason?: string;
  /**
   * @format date-time
   */
  created_at?: string;
}

export type SpaceListResponse = Array<Space>;

export interface SpaceUpdateParams {
  name?: string;
  description?: string;
  /**
   * Empty string clears
   */
  system_room_id?: string;
  system_room_flags?: number;
  /**
   * 0 = all messages, 1 = only mentions
   */
  default_message_notifications?: number;
  afk_room_id?: string | null;
  afk_timeout?: 60 | 300 | 900 | 1800 | 3600;
  widget_enabled?: boolean;
  widget_room_id?: string | null;
}

export interface SpaceListAuditLogParams {
  /**
   * @maximum 100
   */
  limit?: number;
  /**
   * Entry id for pagination
   */
  before?: string;
  action?: string;
}

export interface SpaceListAuditLogResponse {
  entries?: Array<AuditLogEntry>;
  users?: Record<string, MeAPI.User>;
}
Spaces.Rooms = Rooms;
Spaces.Members = Members;
Spaces.Bans = Bans;
Spaces.Roles = Roles;
Spaces.Invites = Invites;

export declare namespace Spaces {
  export {
    type Space as Space,
    type AuditLogEntry as AuditLogEntry,
    type SpaceListResponse as SpaceListResponse,
    type SpaceListAuditLogResponse as SpaceListAuditLogResponse,
    type SpaceUpdateParams as SpaceUpdateParams,
    type SpaceListAuditLogParams as SpaceListAuditLogParams,
  };

  export {
    Rooms as Rooms,
    type Room as Room,
    type RoomListResponse as RoomListResponse,
    type RoomCreateParams as RoomCreateParams,
    type RoomUpdateParams as RoomUpdateParams,
    type RoomDeleteParams as RoomDeleteParams,
  };

  export {
    Members as Members,
    type SpaceMember as SpaceMember,
    type MemberListResponse as MemberListResponse,
    type MemberCreateResponse as MemberCreateResponse,
    type MemberCreateParams as MemberCreateParams,
    type MemberKickParams as MemberKickParams,
    type MemberSetRolesParams as MemberSetRolesParams,
  };

  export {
    Bans as Bans,
    type SpaceBan as SpaceBan,
    type BanListResponse as BanListResponse,
    type BanMemberParams as BanMemberParams,
    type BanUnbanMemberParams as BanUnbanMemberParams,
  };

  export {
    Roles as Roles,
    type Role as Role,
    type RoleListResponse as RoleListResponse,
    type RoleCreateParams as RoleCreateParams,
    type RoleUpdateParams as RoleUpdateParams,
    type RoleDeleteParams as RoleDeleteParams,
  };

  export {
    Invites as Invites,
    type Invite as Invite,
    type InvitePreview as InvitePreview,
    type InviteListResponse as InviteListResponse,
    type InviteCreateParams as InviteCreateParams,
    type InviteDeleteParams as InviteDeleteParams,
  };
}
