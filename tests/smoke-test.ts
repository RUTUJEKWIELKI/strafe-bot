// File generated from our OpenAPI spec by Scalar. See README.md for details.

// Smoke test: calls every generated operation once to confirm the SDK can reach each endpoint.
// Run it from this repo with `bun tests/smoke-test.ts`. Each case below calls one SDK method
// exactly the way the SDK exposes it (positional params, request body, pagination, streaming).
//
// Two environment variables tune a run:
//   - SCALAR_SMOKE_FILTER: comma-separated needles; only operations whose name or path contains
//     one of them run, so you can smoke-test a subset without editing this file.
//   - SCALAR_SMOKE_REPORT: a file path; when set, the run writes a JSON report there instead of
//     printing a table. The generator uses this to collect per-operation results.
import { writeFileSync } from 'node:fs';

// The package exports the client class. The client reads auth and the base URL from the
// environment, so it needs no constructor options to point at a server.
import StrafeBot from '@strafe/strafebot';

// One shared client runs every case.
const client = new StrafeBot({ maxRetries: 2, timeout: 10_000 });

// The result of running one case, collected for the JSON report or the printed table.
type SmokeResult = {
  operation: string;
  method: string;
  path: string;
  label?: string;
  status: 'passed' | 'failed';
  durationMs: number;
  error?: string;
};

// One or two entries per generated operation: the first passes only the arguments the method
// requires, the second also fills every optional parameter and body property. `label` says which
// is which, and is absent when the operation has no optional argument and so has only one case.
// `run` performs the real SDK call; the other fields are metadata used for filtering and
// reporting. This list is generated, so it stays in sync with the SDK surface.
const cases: {
  operation: string;
  method: string;
  path: string;
  label?: string;
  run: () => Promise<unknown>;
}[] = [
  {
    operation: 'list',
    method: 'GET',
    path: '/users/@me',
    run: async () => {
      const user = await client.users.me.list();
    },
  },

  {
    operation: 'update',
    method: 'PATCH',
    path: '/users/@me',
    label: 'required params',
    run: async () => {
      const user = await client.users.me.update();
    },
  },

  {
    operation: 'update',
    method: 'PATCH',
    path: '/users/@me',
    label: 'all params',
    run: async () => {
      const user = await client.users.me.update({
        display_name: '',
        bio: '',
        about_me: '',
        accent_color: '',
        presence: {},
      });
    },
  },

  {
    operation: 'uploadCurrentAvatar',
    method: 'POST',
    path: '/users/@me/avatar',
    run: async () => {
      await client.users.me.uploadCurrentAvatar({
        file: new File(['file'], 'file'),
      });
    },
  },

  {
    operation: 'uploadCurrentBanner',
    method: 'POST',
    path: '/users/@me/banner',
    run: async () => {
      await client.users.me.uploadCurrentBanner({
        file: new File(['file'], 'file'),
      });
    },
  },

  {
    operation: 'listCurrentSpaces',
    method: 'GET',
    path: '/users/@me/spaces',
    run: async () => {
      const me = await client.users.me.listCurrentSpaces();
    },
  },

  {
    operation: 'list',
    method: 'GET',
    path: '/spaces',
    run: async () => {
      const space = await client.spaces.list();
    },
  },

  {
    operation: 'retrieve',
    method: 'GET',
    path: '/spaces/{spaceId}',
    run: async () => {
      const space = await client.spaces.retrieve('spaceId');
    },
  },

  {
    operation: 'update',
    method: 'PATCH',
    path: '/spaces/{spaceId}',
    label: 'required params',
    run: async () => {
      const space = await client.spaces.update('spaceId');
    },
  },

  {
    operation: 'update',
    method: 'PATCH',
    path: '/spaces/{spaceId}',
    label: 'all params',
    run: async () => {
      const space = await client.spaces.update('spaceId', {
        name: '',
        description: '',
        system_room_id: '',
        system_room_flags: 0,
        default_message_notifications: 0,
        afk_room_id: '',
        afk_timeout: 60,
        widget_enabled: false,
        widget_room_id: '',
      });
    },
  },

  {
    operation: 'listAuditLog',
    method: 'GET',
    path: '/spaces/{spaceId}/audit-log',
    label: 'required params',
    run: async () => {
      const space = await client.spaces.listAuditLog('spaceId');
    },
  },

  {
    operation: 'listAuditLog',
    method: 'GET',
    path: '/spaces/{spaceId}/audit-log',
    label: 'all params',
    run: async () => {
      const space = await client.spaces.listAuditLog('spaceId', {
        limit: 1,
        before: 'before',
        action: 'action',
      });
    },
  },

  {
    operation: 'leave',
    method: 'POST',
    path: '/spaces/{spaceId}/leave',
    run: async () => {
      await client.spaces.leave('spaceId');
    },
  },

  {
    operation: 'list',
    method: 'GET',
    path: '/spaces/{spaceId}/rooms',
    run: async () => {
      const room = await client.spaces.rooms.list('spaceId');
    },
  },

  {
    operation: 'create',
    method: 'POST',
    path: '/spaces/{spaceId}/rooms',
    label: 'required params',
    run: async () => {
      const room = await client.spaces.rooms.create('spaceId', {
        name: '',
        type: 3,
      });
    },
  },

  {
    operation: 'create',
    method: 'POST',
    path: '/spaces/{spaceId}/rooms',
    label: 'all params',
    run: async () => {
      const room = await client.spaces.rooms.create('spaceId', {
        name: '',
        type: 3,
        parent_id: '',
        e2ee_enabled: false,
        user_limit: 0,
        bitrate: 0,
      });
    },
  },

  {
    operation: 'update',
    method: 'PATCH',
    path: '/spaces/{spaceId}/rooms/{roomId}',
    label: 'required params',
    run: async () => {
      const room = await client.spaces.rooms.update('roomId', {
        spaceId: 'spaceId',
      });
    },
  },

  {
    operation: 'update',
    method: 'PATCH',
    path: '/spaces/{spaceId}/rooms/{roomId}',
    label: 'all params',
    run: async () => {
      const room = await client.spaces.rooms.update('roomId', {
        spaceId: 'spaceId',
        name: '',
        topic: '',
        slowmode_seconds: 0,
        e2ee_enabled: false,
        user_limit: 0,
        bitrate: 0,
        position: 0,
      });
    },
  },

  {
    operation: 'delete',
    method: 'DELETE',
    path: '/spaces/{spaceId}/rooms/{roomId}',
    run: async () => {
      await client.spaces.rooms.delete('roomId', {
        spaceId: 'spaceId',
      });
    },
  },

  {
    operation: 'list',
    method: 'GET',
    path: '/spaces/{spaceId}/rooms/{roomId}/overrides',
    run: async () => {
      const override = await client.spaces.rooms.overrides.list('roomId', {
        spaceId: 'spaceId',
      });
    },
  },

  {
    operation: 'setRole',
    method: 'PUT',
    path: '/spaces/{spaceId}/rooms/{roomId}/overrides/{roleId}',
    run: async () => {
      await client.spaces.rooms.overrides.setRole('roleId', {
        spaceId: 'spaceId',
        roomId: 'roomId',
        allow: 0,
        deny: 0,
      });
    },
  },

  {
    operation: 'deleteRole',
    method: 'DELETE',
    path: '/spaces/{spaceId}/rooms/{roomId}/overrides/{roleId}',
    run: async () => {
      await client.spaces.rooms.overrides.deleteRole('roleId', {
        spaceId: 'spaceId',
        roomId: 'roomId',
      });
    },
  },

  {
    operation: 'list',
    method: 'GET',
    path: '/spaces/{spaceId}/rooms/{roomId}/overrides/users',
    run: async () => {
      const user = await client.spaces.rooms.overrides.users.list('roomId', {
        spaceId: 'spaceId',
      });
    },
  },

  {
    operation: 'set',
    method: 'PUT',
    path: '/spaces/{spaceId}/rooms/{roomId}/overrides/users/{userId}',
    run: async () => {
      await client.spaces.rooms.overrides.users.set('userId', {
        spaceId: 'spaceId',
        roomId: 'roomId',
        allow: 0,
        deny: 0,
      });
    },
  },

  {
    operation: 'delete',
    method: 'DELETE',
    path: '/spaces/{spaceId}/rooms/{roomId}/overrides/users/{userId}',
    run: async () => {
      await client.spaces.rooms.overrides.users.delete('userId', {
        spaceId: 'spaceId',
        roomId: 'roomId',
      });
    },
  },

  {
    operation: 'list',
    method: 'GET',
    path: '/spaces/{spaceId}/members',
    run: async () => {
      const member = await client.spaces.members.list('spaceId');
    },
  },

  {
    operation: 'create',
    method: 'PUT',
    path: '/spaces/{spaceId}/members/{userId}',
    run: async () => {
      const member = await client.spaces.members.create('userId', {
        spaceId: 'spaceId',
        access_token: '',
      });
    },
  },

  {
    operation: 'kick',
    method: 'DELETE',
    path: '/spaces/{spaceId}/members/{userId}',
    run: async () => {
      await client.spaces.members.kick('userId', {
        spaceId: 'spaceId',
      });
    },
  },

  {
    operation: 'setRoles',
    method: 'PUT',
    path: '/spaces/{spaceId}/members/{userId}/roles',
    run: async () => {
      await client.spaces.members.setRoles('userId', {
        spaceId: 'spaceId',
        role_ids: [''],
      });
    },
  },

  {
    operation: 'list',
    method: 'GET',
    path: '/spaces/{spaceId}/bans',
    run: async () => {
      const ban = await client.spaces.bans.list('spaceId');
    },
  },

  {
    operation: 'member',
    method: 'POST',
    path: '/spaces/{spaceId}/bans/{userId}',
    label: 'required params',
    run: async () => {
      await client.spaces.bans.member('userId', {
        spaceId: 'spaceId',
      });
    },
  },

  {
    operation: 'member',
    method: 'POST',
    path: '/spaces/{spaceId}/bans/{userId}',
    label: 'all params',
    run: async () => {
      await client.spaces.bans.member('userId', {
        spaceId: 'spaceId',
        reason: '',
      });
    },
  },

  {
    operation: 'unbanMember',
    method: 'DELETE',
    path: '/spaces/{spaceId}/bans/{userId}',
    run: async () => {
      await client.spaces.bans.unbanMember('userId', {
        spaceId: 'spaceId',
      });
    },
  },

  {
    operation: 'list',
    method: 'GET',
    path: '/spaces/{spaceId}/roles',
    run: async () => {
      const role = await client.spaces.roles.list('spaceId');
    },
  },

  {
    operation: 'create',
    method: 'POST',
    path: '/spaces/{spaceId}/roles',
    label: 'required params',
    run: async () => {
      const role = await client.spaces.roles.create('spaceId', {
        name: '',
      });
    },
  },

  {
    operation: 'create',
    method: 'POST',
    path: '/spaces/{spaceId}/roles',
    label: 'all params',
    run: async () => {
      const role = await client.spaces.roles.create('spaceId', {
        name: '',
        permissions: 0,
        color: 0,
        hoist: false,
        mentionable: false,
      });
    },
  },

  {
    operation: 'update',
    method: 'PATCH',
    path: '/spaces/{spaceId}/roles/{roleId}',
    label: 'required params',
    run: async () => {
      const role = await client.spaces.roles.update('roleId', {
        spaceId: 'spaceId',
      });
    },
  },

  {
    operation: 'update',
    method: 'PATCH',
    path: '/spaces/{spaceId}/roles/{roleId}',
    label: 'all params',
    run: async () => {
      const role = await client.spaces.roles.update('roleId', {
        spaceId: 'spaceId',
        name: '',
        permissions: 0,
        color: 0,
        hoist: false,
        mentionable: false,
        position: 0,
      });
    },
  },

  {
    operation: 'delete',
    method: 'DELETE',
    path: '/spaces/{spaceId}/roles/{roleId}',
    run: async () => {
      await client.spaces.roles.delete('roleId', {
        spaceId: 'spaceId',
      });
    },
  },

  {
    operation: 'list',
    method: 'GET',
    path: '/spaces/{spaceId}/invites',
    run: async () => {
      const invite = await client.spaces.invites.list('spaceId');
    },
  },

  {
    operation: 'create',
    method: 'POST',
    path: '/spaces/{spaceId}/invites',
    label: 'required params',
    run: async () => {
      const invite = await client.spaces.invites.create('spaceId');
    },
  },

  {
    operation: 'create',
    method: 'POST',
    path: '/spaces/{spaceId}/invites',
    label: 'all params',
    run: async () => {
      const invite = await client.spaces.invites.create('spaceId', {
        max_age_seconds: 0,
        max_uses: 0,
      });
    },
  },

  {
    operation: 'delete',
    method: 'DELETE',
    path: '/spaces/{spaceId}/invites/{code}',
    run: async () => {
      await client.spaces.invites.delete('code', {
        spaceId: 'spaceId',
      });
    },
  },

  {
    operation: 'retrieve',
    method: 'GET',
    path: '/spaces/invites/{code}',
    run: async () => {
      const invitePreview = await client.spaces.invites.retrieve('code');
    },
  },

  {
    operation: 'join',
    method: 'POST',
    path: '/spaces/invites/{code}/join',
    run: async () => {
      await client.spaces.invites.join('code');
    },
  },

  {
    operation: 'search',
    method: 'GET',
    path: '/spaces/{spaceId}/messages/search',
    label: 'required params',
    run: async () => {
      const message = await client.messages.search('spaceId');
    },
  },

  {
    operation: 'search',
    method: 'GET',
    path: '/spaces/{spaceId}/messages/search',
    label: 'all params',
    run: async () => {
      const message = await client.messages.search('spaceId', {
        q: 'q',
        has: 'link',
        limit: 1,
        before: 'before',
      });
    },
  },

  {
    operation: 'list',
    method: 'GET',
    path: '/rooms/{roomId}/messages',
    label: 'required params',
    run: async () => {
      const message = await client.messages.list('roomId', {
        limit: 50,
      });
    },
  },

  {
    operation: 'list',
    method: 'GET',
    path: '/rooms/{roomId}/messages',
    label: 'all params',
    run: async () => {
      const message = await client.messages.list('roomId', {
        limit: 50,
        before: 'before',
      });
    },
  },

  {
    operation: 'create',
    method: 'POST',
    path: '/rooms/{roomId}/messages',
    label: 'required params',
    run: async () => {
      const message = await client.messages.create('roomId', {});
    },
  },

  {
    operation: 'create',
    method: 'POST',
    path: '/rooms/{roomId}/messages',
    label: 'all params',
    run: async () => {
      const message = await client.messages.create('roomId', {
        plaintext: '',
        ciphertext: '',
        reply_to_id: '',
        mentions: [''],
        mention_roles: [''],
        mention_everyone: false,
        attachments: [''],
      });
    },
  },

  {
    operation: 'retrieve',
    method: 'GET',
    path: '/rooms/{roomId}/messages/{messageId}',
    run: async () => {
      const message = await client.messages.retrieve('messageId', {
        roomId: 'roomId',
      });
    },
  },

  {
    operation: 'edit',
    method: 'PATCH',
    path: '/rooms/{roomId}/messages/{messageId}',
    run: async () => {
      const message = await client.messages.edit('messageId', {
        roomId: 'roomId',
        body: {
          plaintext: '',
        },
      });
    },
  },

  {
    operation: 'delete',
    method: 'DELETE',
    path: '/rooms/{roomId}/messages/{messageId}',
    run: async () => {
      await client.messages.delete('messageId', {
        roomId: 'roomId',
      });
    },
  },

  {
    operation: 'search2',
    method: 'GET',
    path: '/rooms/{roomId}/messages/search',
    label: 'required params',
    run: async () => {
      const message = await client.messages.search2('roomId');
    },
  },

  {
    operation: 'search2',
    method: 'GET',
    path: '/rooms/{roomId}/messages/search',
    label: 'all params',
    run: async () => {
      const message = await client.messages.search2('roomId', {
        q: 'q',
        has: 'link',
        from: 'from',
        mentions: 'mentions',
        limit: 1,
        before: 'before',
      });
    },
  },

  {
    operation: 'createReaction',
    method: 'PUT',
    path: '/rooms/{roomId}/messages/{messageId}/reactions/{emoji}',
    run: async () => {
      const message = await client.messages.createReaction('emoji', {
        roomId: 'roomId',
        messageId: 'messageId',
      });
    },
  },

  {
    operation: 'deleteReaction',
    method: 'DELETE',
    path: '/rooms/{roomId}/messages/{messageId}/reactions/{emoji}',
    run: async () => {
      await client.messages.deleteReaction('emoji', {
        roomId: 'roomId',
        messageId: 'messageId',
      });
    },
  },

  {
    operation: 'listReactors',
    method: 'GET',
    path: '/rooms/{roomId}/messages/{messageId}/reactions/{emoji}',
    run: async () => {
      const message = await client.messages.listReactors('emoji', {
        roomId: 'roomId',
        messageId: 'messageId',
      });
    },
  },

  {
    operation: 'uploadAttachment',
    method: 'POST',
    path: '/rooms/{roomId}/attachments',
    label: 'required params',
    run: async () => {
      const attachment = await client.messages.uploadAttachment('roomId', {
        file: new File(['file'], 'file'),
      });
    },
  },

  {
    operation: 'uploadAttachment',
    method: 'POST',
    path: '/rooms/{roomId}/attachments',
    label: 'all params',
    run: async () => {
      const attachment = await client.messages.uploadAttachment('roomId', {
        file: new File(['file'], 'file'),
        width: 0,
        height: 0,
      });
    },
  },

  {
    operation: 'list',
    method: 'GET',
    path: '/rooms',
    run: async () => {
      const room = await client.rooms.list();
    },
  },

  {
    operation: 'create',
    method: 'POST',
    path: '/rooms',
    run: async () => {
      const room = await client.rooms.create({
        recipient_id: '',
      });
    },
  },

  {
    operation: 'retrieve',
    method: 'GET',
    path: '/rooms/{roomId}',
    run: async () => {
      const room = await client.rooms.retrieve('roomId');
    },
  },

  {
    operation: 'sendTyping',
    method: 'POST',
    path: '/rooms/{roomId}/typing',
    run: async () => {
      await client.rooms.sendTyping('roomId');
    },
  },

  {
    operation: 'ack',
    method: 'POST',
    path: '/rooms/{roomId}/ack',
    run: async () => {
      await client.rooms.ack('roomId', {
        message_id: '',
      });
    },
  },

  {
    operation: 'oauth2Token',
    method: 'POST',
    path: '/oauth2/token',
    label: 'required params',
    run: async () => {
      const oAuth2Token = await client.oAuth2Resource.oauth2Token({
        grant_type: 'authorization_code',
      });
    },
  },

  {
    operation: 'oauth2Token',
    method: 'POST',
    path: '/oauth2/token',
    label: 'all params',
    run: async () => {
      const oAuth2Token = await client.oAuth2Resource.oauth2Token({
        grant_type: 'authorization_code',
        code: '',
        redirect_uri: '',
        refresh_token: '',
        client_id: '',
        client_secret: '',
      });
    },
  },

  {
    operation: 'oauth2Revoke',
    method: 'POST',
    path: '/oauth2/token/revoke',
    label: 'required params',
    run: async () => {
      const oAuth2 = await client.oAuth2Resource.oauth2Revoke({
        token: '',
      });
    },
  },

  {
    operation: 'oauth2Revoke',
    method: 'POST',
    path: '/oauth2/token/revoke',
    label: 'all params',
    run: async () => {
      const oAuth2 = await client.oAuth2Resource.oauth2Revoke({
        token: '',
        client_id: '',
        client_secret: '',
      });
    },
  },

  {
    operation: 'oauth2Me',
    method: 'GET',
    path: '/oauth2/@me',
    run: async () => {
      const tokenInfo = await client.oAuth2Resource.oauth2Me();
    },
  },
];

/**
 * How many cases run at once, capped at the number of cases there are.
 *
 * SCALAR_SMOKE_CONCURRENCY overrides the default; anything unparseable falls back to it.
 */
const smokeConcurrency = (caseCount: number): number => {
  const override = Number.parseInt(process.env['SCALAR_SMOKE_CONCURRENCY'] ?? '', 10);
  const limit = Number.isInteger(override) && override > 0 ? override : 32;
  return Math.min(limit, caseCount);
};

const main = async (): Promise<void> => {
  // SCALAR_SMOKE_FILTER (comma-separated) keeps only cases whose operation name or path matches
  // one of the needles, so a caller can smoke-test a subset. With no filter, every case runs.
  const filter = process.env['SCALAR_SMOKE_FILTER'];
  const needles = filter
    ? filter
        .split(',')
        .map((needle) => needle.trim())
        .filter(Boolean)
    : [];
  const selected =
    needles.length > 0
      ? cases.filter((testCase) =>
          needles.some((needle) => testCase.operation.includes(needle) || testCase.path.includes(needle)),
        )
      : cases;

  // Run the selected cases under a bounded worker pool rather than all at once. A large SDK has
  // hundreds of operations, and firing every request together exceeds what the client's transport
  // keeps connections for while the runner is already busy with other targets. Each worker pulls
  // the next index off a shared cursor and writes into a pre-sized array, so results stay in case
  // order however the workers interleave. The per-case body catches everything and never rejects,
  // so one failing operation still cannot block the others.
  const results: SmokeResult[] = new Array<SmokeResult>(selected.length);
  let cursor = 0;
  const runNext = async (): Promise<void> => {
    for (let index = cursor++; index < selected.length; index = cursor++) {
      const testCase = selected[index];
      if (!testCase) continue;
      const startedAt = Date.now();
      // `label` distinguishes the required-params run from the all-params run of the same
      // operation; it is omitted entirely when the operation contributed only one case.
      const identity = {
        operation: testCase.operation,
        method: testCase.method,
        path: testCase.path,
        ...(testCase.label ? { label: testCase.label } : {}),
      };
      try {
        await testCase.run();
        results[index] = { ...identity, status: 'passed', durationMs: Date.now() - startedAt };
      } catch (error) {
        // Prefer the stack so a failure points at the failing SDK call; fall back to the message.
        const message = error instanceof Error ? (error.stack ?? error.message) : String(error);
        results[index] = {
          ...identity,
          status: 'failed',
          durationMs: Date.now() - startedAt,
          error: message,
        };
      }
    }
  };
  await Promise.all(Array.from({ length: smokeConcurrency(selected.length) }, runNext));
  const failed = results.filter((result) => result.status === 'failed');

  // With SCALAR_SMOKE_REPORT set, write a machine-readable report; otherwise print a table.
  const reportPath = process.env['SCALAR_SMOKE_REPORT'];
  if (reportPath) {
    writeFileSync(reportPath, JSON.stringify({ total: results.length, failed: failed.length, results }));
  } else {
    for (const result of results) {
      const suffix = result.label ? ` [${result.label}]` : '';
      if (result.status === 'passed')
        console.log(
          `\u2714 ${result.operation}${suffix} (${result.method} ${result.path}) ${result.durationMs}ms`,
        );
      else
        console.error(
          `\u2718 ${result.operation}${suffix} (${result.method} ${result.path})\n${result.error ?? ''}`,
        );
    }
    if (results.length === 0) {
      console.error('No code samples ran (empty SDK or a SCALAR_SMOKE_FILTER that matched nothing).');
    } else {
      console.log(`\n${results.length - failed.length}/${results.length} samples passed`);
    }
  }

  // An empty run (no operations, or a filter that matched nothing) is a failure, not a vacuous pass.
  if (failed.length > 0 || results.length === 0) process.exitCode = 1;
};

void main();
