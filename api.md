# Strafe Bot TypeScript API

Complete reference of every operation, grouped by resource. See [the README](./README.md) for usage and configuration.

## Contents

- [`Users`](#users)
  - [`Users Me`](#users-me)
    - [Get current user](#get-current-user)
    - [Update current user profile](#update-current-user-profile)
    - [Upload current user avatar](#upload-current-user-avatar)
    - [Upload current user banner](#upload-current-user-banner)
    - [List current user's spaces](#list-current-users-spaces)
- [`Spaces`](#spaces)
  - [List spaces](#list-spaces)
  - [Get space](#get-space)
  - [Update space](#update-space)
  - [Get audit log](#get-audit-log)
  - [Leave space](#leave-space)
  - [`Spaces Rooms`](#spaces-rooms)
    - [List space rooms](#list-space-rooms)
    - [Create room in space](#create-room-in-space)
    - [Update space room](#update-space-room)
    - [Delete space room](#delete-space-room)
    - [`Spaces Rooms Overrides`](#spaces-rooms-overrides)
      - [List role room overrides](#list-role-room-overrides)
      - [Set role room override](#set-role-room-override)
      - [Delete role room override](#delete-role-room-override)
      - [`Spaces Rooms Overrides Users`](#spaces-rooms-overrides-users)
        - [List user room overrides](#list-user-room-overrides)
        - [Set user room override](#set-user-room-override)
        - [Delete user room override](#delete-user-room-override)
  - [`Spaces Members`](#spaces-members)
    - [List members](#list-members)
    - [Add member via spaces.join](#add-member-via-spacesjoin)
    - [Kick member](#kick-member)
    - [Set member roles](#set-member-roles)
  - [`Spaces Bans`](#spaces-bans)
    - [List bans](#list-bans)
    - [Ban member](#ban-member)
    - [Unban member](#unban-member)
  - [`Spaces Roles`](#spaces-roles)
    - [List roles](#list-roles)
    - [Create role](#create-role)
    - [Update role](#update-role)
    - [Delete role](#delete-role)
  - [`Spaces Invites`](#spaces-invites)
    - [List invites](#list-invites)
    - [Create invite](#create-invite)
    - [Delete invite](#delete-invite)
    - [Get invite preview](#get-invite-preview)
    - [Join via invite](#join-via-invite)
- [`Messages`](#messages)
  - [Search messages in space](#search-messages-in-space)
  - [List messages](#list-messages)
  - [Create message](#create-message)
  - [Get message](#get-message)
  - [Edit message](#edit-message)
  - [Delete message](#delete-message)
  - [Search messages in room](#search-messages-in-room)
  - [Add reaction](#add-reaction)
  - [Remove reaction](#remove-reaction)
  - [List reactors for emoji](#list-reactors-for-emoji)
  - [Upload attachment](#upload-attachment)
- [`Rooms`](#rooms)
  - [List private messages and group PMs](#list-private-messages-and-group-pms)
  - [Open PM or group PM](#open-pm-or-group-pm)
  - [Get room](#get-room)
  - [Send typing indicator](#send-typing-indicator)
  - [Mark room as read](#mark-room-as-read)
- [`OAuth2`](#oauth2)
  - [Exchange code or refresh token](#exchange-code-or-refresh-token)
  - [Revoke token](#revoke-token)
  - [Inspect current token](#inspect-current-token)

## Setup

```ts
import StrafeBot from '@strafebot/strafebot';

const client = new StrafeBot({
  environment: 'app_strafe_chat_instance',
});
```

## `Users`

### `Users Me`

Current user profile and spaces

#### Get current user

Returns the authenticated account. `email` is present for sessions/bots and for OAuth2 tokens with the `email` scope; otherwise empty string.

| Direction | Type |
| --- | --- |
| Response | [`User`](./src/resources/users/me.ts) |

```ts
const user = await client.users.me.list();
```

#### Update current user profile

| Direction | Type |
| --- | --- |
| Request | [`MeUpdateParams`](./src/resources/users/me.ts) |
| Response | [`User`](./src/resources/users/me.ts) |

```ts
const user = await client.users.me.update();
```

#### Upload current user avatar

| Direction | Type |
| --- | --- |
| Request | [`MeUploadCurrentAvatarParams`](./src/resources/users/me.ts) |

```ts
await client.users.me.uploadCurrentAvatar({
  file: new File(['file'], 'file'),
});
```

#### Upload current user banner

| Direction | Type |
| --- | --- |
| Request | [`MeUploadCurrentBannerParams`](./src/resources/users/me.ts) |

```ts
await client.users.me.uploadCurrentBanner({
  file: new File(['file'], 'file'),
});
```

#### List current user's spaces

Spaces the account is in, with owner flag and space-wide permissions mask.

| Direction | Type |
| --- | --- |
| Response | [`MeListCurrentSpacesResponse`](./src/resources/users/me.ts) |

```ts
const me = await client.users.me.listCurrentSpaces();
```

## `Spaces`

Spaces (servers), rooms, members, roles, bans, invites, audit log

### List spaces

Every space the account is in, each with roles. Same shape as READY.spaces.

| Direction | Type |
| --- | --- |
| Response | [`SpaceListResponse`](./src/resources/spaces/spaces.ts) |

```ts
const space = await client.spaces.list();
```

### Get space

| Direction | Type |
| --- | --- |
| Response | [`Space`](./src/resources/spaces/spaces.ts) |

```ts
const space = await client.spaces.retrieve('spaceId');
```

### Update space

Requires Manage Space permission.

| Direction | Type |
| --- | --- |
| Request | [`SpaceUpdateParams`](./src/resources/spaces/spaces.ts) |
| Response | [`Space`](./src/resources/spaces/spaces.ts) |

```ts
const space = await client.spaces.update('spaceId');
```

### Get audit log

Requires Manage Space. Bot installs are action_type `bot_add`.

| Direction | Type |
| --- | --- |
| Request | [`SpaceListAuditLogParams`](./src/resources/spaces/spaces.ts) |
| Response | [`SpaceListAuditLogResponse`](./src/resources/spaces/spaces.ts) |

```ts
const space = await client.spaces.listAuditLog('spaceId');
```

### Leave space

Owner cannot leave; they must transfer or delete the space.

```ts
await client.spaces.leave('spaceId');
```

### `Spaces Rooms`

Spaces (servers), rooms, members, roles, bans, invites, audit log

#### List space rooms

| Direction | Type |
| --- | --- |
| Response | [`RoomListResponse`](./src/resources/spaces/rooms/rooms.ts) |

```ts
const room = await client.spaces.rooms.list('spaceId');
```

#### Create room in space

Requires Manage Rooms. Type 3 = text, 4 = voice, 5 = section.

| Direction | Type |
| --- | --- |
| Request | [`RoomCreateParams`](./src/resources/spaces/rooms/rooms.ts) |
| Response | [`Room`](./src/resources/spaces/rooms/rooms.ts) |

```ts
const room = await client.spaces.rooms.create('spaceId', {
  name: '',
  type: 3,
});
```

#### Update space room

Requires Manage Rooms. Turning e2ee_enabled on is one-way for existing history.

| Direction | Type |
| --- | --- |
| Request | [`RoomUpdateParams`](./src/resources/spaces/rooms/rooms.ts) |
| Response | [`Room`](./src/resources/spaces/rooms/rooms.ts) |

```ts
const room = await client.spaces.rooms.update('roomId', {
  spaceId: 'spaceId',
});
```

#### Delete space room

Requires Manage Rooms.

| Direction | Type |
| --- | --- |
| Request | [`RoomDeleteParams`](./src/resources/spaces/rooms/rooms.ts) |

```ts
await client.spaces.rooms.delete('roomId', {
  spaceId: 'spaceId',
});
```

#### `Spaces Rooms Overrides`

Spaces (servers), rooms, members, roles, bans, invites, audit log

##### List role room overrides

Requires Manage Roles.

| Direction | Type |
| --- | --- |
| Request | [`OverrideListParams`](./src/resources/spaces/rooms/overrides/overrides.ts) |
| Response | [`OverrideListResponse`](./src/resources/spaces/rooms/overrides/overrides.ts) |

```ts
const override = await client.spaces.rooms.overrides.list('roomId', {
  spaceId: 'spaceId',
});
```

##### Set role room override

Requires Manage Roles. Only room-scoped bits accepted.

| Direction | Type |
| --- | --- |
| Request | [`OverrideSetRoleParams`](./src/resources/spaces/rooms/overrides/overrides.ts) |

```ts
await client.spaces.rooms.overrides.setRole('roleId', {
  spaceId: 'spaceId',
  roomId: 'roomId',
  allow: 0,
  deny: 0,
});
```

##### Delete role room override

| Direction | Type |
| --- | --- |
| Request | [`OverrideDeleteRoleParams`](./src/resources/spaces/rooms/overrides/overrides.ts) |

```ts
await client.spaces.rooms.overrides.deleteRole('roleId', {
  spaceId: 'spaceId',
  roomId: 'roomId',
});
```

##### `Spaces Rooms Overrides Users`

Spaces (servers), rooms, members, roles, bans, invites, audit log

###### List user room overrides

| Direction | Type |
| --- | --- |
| Request | [`UserListParams`](./src/resources/spaces/rooms/overrides/users.ts) |
| Response | [`UserListResponse`](./src/resources/spaces/rooms/overrides/users.ts) |

```ts
const user = await client.spaces.rooms.overrides.users.list('roomId', {
  spaceId: 'spaceId',
});
```

###### Set user room override

| Direction | Type |
| --- | --- |
| Request | [`UserSetParams`](./src/resources/spaces/rooms/overrides/users.ts) |

```ts
await client.spaces.rooms.overrides.users.set('userId', {
  spaceId: 'spaceId',
  roomId: 'roomId',
  allow: 0,
  deny: 0,
});
```

###### Delete user room override

| Direction | Type |
| --- | --- |
| Request | [`UserDeleteParams`](./src/resources/spaces/rooms/overrides/users.ts) |

```ts
await client.spaces.rooms.overrides.users.delete('userId', {
  spaceId: 'spaceId',
  roomId: 'roomId',
});
```

### `Spaces Members`

Spaces (servers), rooms, members, roles, bans, invites, audit log

#### List members

| Direction | Type |
| --- | --- |
| Response | [`MemberListResponse`](./src/resources/spaces/members.ts) |

```ts
const member = await client.spaces.members.list('spaceId');
```

#### Add member via spaces.join

Bot must have Create Invite. Body access_token must belong to the user and have spaces.join scope. 201 added, 204 already member.

| Direction | Type |
| --- | --- |
| Request | [`MemberCreateParams`](./src/resources/spaces/members.ts) |
| Response | [`MemberCreateResponse`](./src/resources/spaces/members.ts) |

```ts
const member = await client.spaces.members.create('userId', {
  spaceId: 'spaceId',
  access_token: '',
});
```

#### Kick member

Requires Kick Members. Kicked bot's managed role is removed.

| Direction | Type |
| --- | --- |
| Request | [`MemberKickParams`](./src/resources/spaces/members.ts) |

```ts
await client.spaces.members.kick('userId', {
  spaceId: 'spaceId',
});
```

#### Set member roles

Requires Manage Roles. Replaces roles (@everyone implied). Hierarchy applies. Managed bot role cannot be given or taken.

| Direction | Type |
| --- | --- |
| Request | [`MemberSetRolesParams`](./src/resources/spaces/members.ts) |

```ts
await client.spaces.members.setRoles('userId', {
  spaceId: 'spaceId',
  role_ids: [''],
});
```

### `Spaces Bans`

Spaces (servers), rooms, members, roles, bans, invites, audit log

#### List bans

Requires Ban Members.

| Direction | Type |
| --- | --- |
| Response | [`BanListResponse`](./src/resources/spaces/bans.ts) |

```ts
const ban = await client.spaces.bans.list('spaceId');
```

#### Ban member

Requires Ban Members. Removes the user from the space.

| Direction | Type |
| --- | --- |
| Request | [`BanMemberParams`](./src/resources/spaces/bans.ts) |

```ts
await client.spaces.bans.member('userId', {
  spaceId: 'spaceId',
});
```

#### Unban member

Requires Ban Members.

| Direction | Type |
| --- | --- |
| Request | [`BanUnbanMemberParams`](./src/resources/spaces/bans.ts) |

```ts
await client.spaces.bans.unbanMember('userId', {
  spaceId: 'spaceId',
});
```

### `Spaces Roles`

Spaces (servers), rooms, members, roles, bans, invites, audit log

#### List roles

| Direction | Type |
| --- | --- |
| Response | [`RoleListResponse`](./src/resources/spaces/roles.ts) |

```ts
const role = await client.spaces.roles.list('spaceId');
```

#### Create role

Requires Manage Roles. Cannot grant bits you do not hold.

| Direction | Type |
| --- | --- |
| Request | [`RoleCreateParams`](./src/resources/spaces/roles.ts) |
| Response | [`Role`](./src/resources/spaces/roles.ts) |

```ts
const role = await client.spaces.roles.create('spaceId', {
  name: '',
});
```

#### Update role

Requires Manage Roles. @everyone can only have permissions changed. Hierarchy applies.

| Direction | Type |
| --- | --- |
| Request | [`RoleUpdateParams`](./src/resources/spaces/roles.ts) |
| Response | [`Role`](./src/resources/spaces/roles.ts) |

```ts
const role = await client.spaces.roles.update('roleId', {
  spaceId: 'spaceId',
});
```

#### Delete role

Requires Manage Roles. Cannot delete @everyone or managed roles.

| Direction | Type |
| --- | --- |
| Request | [`RoleDeleteParams`](./src/resources/spaces/roles.ts) |

```ts
await client.spaces.roles.delete('roleId', {
  spaceId: 'spaceId',
});
```

### `Spaces Invites`

Spaces (servers), rooms, members, roles, bans, invites, audit log

#### List invites

Requires Manage Space.

| Direction | Type |
| --- | --- |
| Response | [`InviteListResponse`](./src/resources/spaces/invites.ts) |

```ts
const invite = await client.spaces.invites.list('spaceId');
```

#### Create invite

Requires Create Invite. max_age_seconds 0–2592000 (0 = never), max_uses 0–1000 (0 = unlimited).

| Direction | Type |
| --- | --- |
| Request | [`InviteCreateParams`](./src/resources/spaces/invites.ts) |
| Response | [`Invite`](./src/resources/spaces/invites.ts) |

```ts
const invite = await client.spaces.invites.create('spaceId');
```

#### Delete invite

Requires Manage Space.

| Direction | Type |
| --- | --- |
| Request | [`InviteDeleteParams`](./src/resources/spaces/invites.ts) |

```ts
await client.spaces.invites.delete('code', {
  spaceId: 'spaceId',
});
```

#### Get invite preview

Public, no auth required.

| Direction | Type |
| --- | --- |
| Response | [`InvitePreview`](./src/resources/spaces/invites.ts) |

```ts
const invitePreview = await client.spaces.invites.retrieve('code');
```

#### Join via invite

```ts
await client.spaces.invites.join('code');
```

## `Messages`

Messages, reactions, attachments, search

### Search messages in space

Searches every plain (non-E2EE) room the caller can read. E2EE rooms are not searchable server-side.

| Direction | Type |
| --- | --- |
| Request | [`MessageSearchParams`](./src/resources/messages.ts) |
| Response | [`MessageSearchResponse`](./src/resources/messages.ts) |

```ts
const message = await client.messages.search('spaceId');
```

### List messages

Newest first. Requires View Room and Read Message History. Default limit 50, max 100.

| Direction | Type |
| --- | --- |
| Request | [`MessageListParams`](./src/resources/messages.ts) |
| Response | [`MessageListResponse`](./src/resources/messages.ts) |

```ts
const message = await client.messages.list('roomId', {
  limit: 50,
});
```

### Create message

Requires View Room and Send Messages. In encrypted rooms bots cannot post (need ciphertext they cannot produce). Slowmode returns 429 with retry_after.

| Direction | Type |
| --- | --- |
| Request | [`MessageCreateParams`](./src/resources/messages.ts) |
| Response | [`Message`](./src/resources/messages.ts) |

```ts
const message = await client.messages.create('roomId', {});
```

### Get message

| Direction | Type |
| --- | --- |
| Request | [`MessageRetrieveParams`](./src/resources/messages.ts) |
| Response | [`Message`](./src/resources/messages.ts) |

```ts
const message = await client.messages.retrieve('messageId', {
  roomId: 'roomId',
});
```

### Edit message

Own messages only. Body is either plaintext or ciphertext.

| Direction | Type |
| --- | --- |
| Request | [`MessageEditParams`](./src/resources/messages.ts) |
| Response | [`Message`](./src/resources/messages.ts) |

```ts
const message = await client.messages.edit('messageId', {
  roomId: 'roomId',
  body: {
    plaintext: '',
  },
});
```

### Delete message

Own messages, or Manage Messages for others.

| Direction | Type |
| --- | --- |
| Request | [`MessageDeleteParams`](./src/resources/messages.ts) |

```ts
await client.messages.delete('messageId', {
  roomId: 'roomId',
});
```

### Search messages in room

Plain (non-E2EE) rooms only.

| Direction | Type |
| --- | --- |
| Request | [`MessageSearch2Params`](./src/resources/messages.ts) |
| Response | [`MessageSearch2Response`](./src/resources/messages.ts) |

```ts
const message = await client.messages.search2('roomId');
```

### Add reaction

Requires Add Reactions. emoji is URL-encoded unicode or `custom:<id>`. Idempotent.

| Direction | Type |
| --- | --- |
| Request | [`MessageCreateReactionParams`](./src/resources/messages.ts) |
| Response | [`MessageCreateReactionResponse`](./src/resources/messages.ts) |

```ts
const message = await client.messages.createReaction('emoji', {
  roomId: 'roomId',
  messageId: 'messageId',
});
```

### Remove reaction

| Direction | Type |
| --- | --- |
| Request | [`MessageDeleteReactionParams`](./src/resources/messages.ts) |

```ts
await client.messages.deleteReaction('emoji', {
  roomId: 'roomId',
  messageId: 'messageId',
});
```

### List reactors for emoji

| Direction | Type |
| --- | --- |
| Request | [`MessageListReactorsParams`](./src/resources/messages.ts) |
| Response | [`MessageListReactorsResponse`](./src/resources/messages.ts) |

```ts
const message = await client.messages.listReactors('emoji', {
  roomId: 'roomId',
  messageId: 'messageId',
});
```

### Upload attachment

Requires Send Messages. Reference returned id in message attachments. Must be used by a message from the same bot in the same room. Default size limit 25 MB.

| Direction | Type |
| --- | --- |
| Request | [`MessageUploadAttachmentParams`](./src/resources/messages.ts) |
| Response | [`Attachment`](./src/resources/messages.ts) |

```ts
const attachment = await client.messages.uploadAttachment('roomId', {
  file: new File(['file'], 'file'),
});
```

## `Rooms`

Private messages, group PMs, and space rooms

### List private messages and group PMs

| Direction | Type |
| --- | --- |
| Response | [`RoomListResponse`](./src/resources/rooms.ts) |

```ts
const room = await client.rooms.list();
```

### Open PM or group PM

PMs are E2EE by default; bots cannot read them until the other party disables encryption.

| Direction | Type |
| --- | --- |
| Request | [`RoomCreateParams`](./src/resources/rooms.ts) |

```ts
const room = await client.rooms.create({
  recipient_id: '',
});
```

### Get room

Any room the account can see. Space rooms include space_id. All rooms include e2ee_enabled.

```ts
const room = await client.rooms.retrieve('roomId');
```

### Send typing indicator

Rate limited to one broadcast per 5 seconds per room. Extra calls succeed silently.

```ts
await client.rooms.sendTyping('roomId');
```

### Mark room as read

| Direction | Type |
| --- | --- |
| Request | [`RoomAckParams`](./src/resources/rooms.ts) |

```ts
await client.rooms.ack('roomId', {
  message_id: '',
});
```

## `OAuth2`

Authorization code flow, tokens, scopes

### Exchange code or refresh token

Authorization code grant or refresh_token. Client authenticates via HTTP Basic (client_id:client_secret) or body fields. Body may be application/x-www-form-urlencoded or JSON. Access tokens live 7 days.

| Direction | Type |
| --- | --- |
| Request | [`OAuth2Oauth2TokenParams`](./src/resources/o-auth2.ts) |
| Response | [`OAuth2Token`](./src/resources/o-auth2.ts) |

```ts
const oAuth2Token = await client.oAuth2Resource.oauth2Token({
  grant_type: 'authorization_code',
});
```

### Revoke token

RFC 7009. Revokes access or refresh token; the pair dies. Unknown tokens still return 200.

| Direction | Type |
| --- | --- |
| Request | [`OAuth2Oauth2RevokeParams`](./src/resources/o-auth2.ts) |
| Response | [`OAuth2Oauth2RevokeResponse`](./src/resources/o-auth2.ts) |

```ts
const oAuth2 = await client.oAuth2Resource.oauth2Revoke({
  token: '',
});
```

### Inspect current token

| Direction | Type |
| --- | --- |
| Response | [`TokenInfo`](./src/resources/o-auth2.ts) |

```ts
const tokenInfo = await client.oAuth2Resource.oauth2Me();
```
