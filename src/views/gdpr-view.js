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

const { PromptView, BotTextMessage, QuickrepliesMessage } = require('botfuel-dialog');

class GDPRView extends PromptView {
  constructor({
    defaultMessage, completeMessage, quickreplies, ...messages
  }) {
    super();

    this.messages = {
      complete: completeMessage,
      default: defaultMessage,
      quickreplies,
      ...messages,
    };
  }

  getMessage(key) {
    return (this.messages && this.messages[key]) || this.messages.default;
  }

  render(userMessage, { missingEntities }) {
    const hasMissingEntities = missingEntities.size > 0;

    if (hasMissingEntities) {
      return [
        new BotTextMessage(this.getMessage(missingEntities.keys().next().value)),
        new QuickrepliesMessage(this.messages.quickreplies),
      ];
    }

    return [new BotTextMessage(this.getMessage('complete'))];
  }
}

module.exports = GDPRView;
