// File generated from our OpenAPI spec by Scalar. See README.md for details.

import { APIResource } from '../../resource';
import { APIPromise } from '../../api-promise';
import type { RequestOptions } from '../../internal/request-options';
import * as MeAPI from './me';
import {
  Me,
  type User,
  type UserSpace,
  type Presence,
  type MeListCurrentSpacesResponse,
  type MeUpdateParams,
  type MeUploadCurrentAvatarParams,
  type MeUploadCurrentBannerParams,
} from './me';

export class Users extends APIResource {
  me: MeAPI.Me = new MeAPI.Me(this._client);
}

Users.Me = Me;

export declare namespace Users {
  export {
    Me as Me,
    type User as User,
    type UserSpace as UserSpace,
    type Presence as Presence,
    type MeListCurrentSpacesResponse as MeListCurrentSpacesResponse,
    type MeUpdateParams as MeUpdateParams,
    type MeUploadCurrentAvatarParams as MeUploadCurrentAvatarParams,
    type MeUploadCurrentBannerParams as MeUploadCurrentBannerParams,
  };
}
