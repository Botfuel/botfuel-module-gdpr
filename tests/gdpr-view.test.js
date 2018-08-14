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

const { BotTextMessage, QuickrepliesMessage } = require('botfuel-dialog');

const GDPRView = require('../src/views/gdpr-view');

describe('GDPRView', () => {
  describe('renderEntities', () => {
    const view = new GDPRView({
      default: 'Do you agree?',
      consent1: 'Do you agree to consent1?',
      complete: 'completed!',
      quickreplies: ['yes!', 'no!'],
    });

    describe('when missing entities', () => {
      test('should ask for the first consent if there is no entity', () => {
        expect(view.render(
          {
            user: null,
          },
          {
            matchedEntities: {},
            missingEntities: new Map([['consent1', {}], ['consent2', {}]]),
          },
        )).toEqual([
          new BotTextMessage('Do you agree to consent1?'),
          new QuickrepliesMessage(['yes!', 'no!']),
        ]);
      });

      test('should ask for the second consent with the default message if the first consent has been answered', () => {
        expect(view.render(
          {
            user: null,
          },
          {
            matchedEntities: {
              consent1: {},
            },
            missingEntities: new Map([['consent2', {}]]),
          },
        )).toEqual([new BotTextMessage('Do you agree?'), new QuickrepliesMessage(['yes!', 'no!'])]);
      });
    });

    describe('when dialog is completed', () => {
      test('should display the complete message if all consents are answered', () => {
        expect(view.render(
          {
            user: null,
          },
          {
            matchedEntities: {
              consent1: {},
              consent2: {},
            },
            missingEntities: new Map(),
          },
        )).toEqual([new BotTextMessage('completed!')]);
      });
    });
  });
});
