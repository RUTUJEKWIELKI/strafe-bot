// File generated from our OpenAPI spec by Scalar. See README.md for details.

import type { StrafeBot } from './client';

export abstract class APIResource {
  protected _client: StrafeBot;

  constructor(client: StrafeBot) {
    this._client = client;
  }
}
