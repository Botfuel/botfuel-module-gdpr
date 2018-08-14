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

const GDPRView = require('./gdpr-view');

const DEFAULT_MESSAGE =
  'Under the EU General Data Protection Regulation, we need your approval for our use of personal information you may provide as we communicate. Do you agree?';
const COMPLETE_MESSAGE = 'Thank you !';
const QUICKREPLIES = ['Yes', 'No'];

class GDPRViewEN extends GDPRView {
  constructor() {
    super({
      default: DEFAULT_MESSAGE,
      complete: COMPLETE_MESSAGE,
      quickreplies: QUICKREPLIES,
    });
  }
}

module.exports = GDPRViewEN;
