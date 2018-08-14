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
  'De acuerdo con el Reglamento General de Protección de Datos de la UE, necesitamos su aprobación para el uso que hagamos de la información personal que nos facilite al comunicarnos con usted. ¿Estás de acuerdo?';
const COMPLETE_MESSAGE = 'Gracias!';
const QUICKREPLIES = ['Sí', 'No'];

class GDPRViewES extends GDPRView {
  constructor() {
    super({
      default: DEFAULT_MESSAGE,
      complete: COMPLETE_MESSAGE,
      quickreplies: QUICKREPLIES,
    });
  }
}

module.exports = GDPRViewES;
