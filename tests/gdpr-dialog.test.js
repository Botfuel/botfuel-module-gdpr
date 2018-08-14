/**
 * Copyright (c) 2017 - present, Botfuel (https://www.botfuel.io).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { Bot } = require('botfuel-dialog');
const path = require('path');
const sinon = require('sinon');

const GDPRDialog = require('../src/dialogs/gdpr-dialog');

const CONFIG = {
  adapter: {
    name: 'test',
  },
  componentRoots: [path.resolve(__dirname, '../../src')],
};
const TEST_USER = '1';

describe('GDPRDialog', () => {
  const bot = new Bot(CONFIG);
  const search = new GDPRDialog(bot, {
    namespace: 'testdialog',
    entities: {
      consent: {
        dim: 'system:boolean',
      },
    },
  });
  const now = new Date();

  beforeAll(() => {
    this.sandbox = sinon.createSandbox();
    this.clock = sinon.useFakeTimers(now.getTime());
  });

  test('should save consent answer into brain', async () => {
    const candidates = [
      {
        dim: 'system:boolean',
        values: [{ value: true, type: 'system:boolean' }],
      },
    ];

    await bot.brain.addUserIfNecessary(TEST_USER);
    await search.execute({ user: TEST_USER, message: 'hello' }, {});
    await search.execute({ user: TEST_USER, message: 'yes' }, { messageEntities: candidates });

    const consent = await bot.brain.userGet(TEST_USER, 'consent');
    expect(consent).toEqual({
      date: now,
      consentText:
        'Under the EU General Data Protection Regulation, we need your approval for our use of personal information you may provide as we communicate. Do you agree?',
      value: { type: 'system:boolean', value: true },
    });
  });

  afterAll(() => {
    this.sandbox.restore();
    this.clock.restore();
  });
});
