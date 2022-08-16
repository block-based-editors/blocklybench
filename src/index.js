/**
 * @license
 * 
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Example of including Blockly with using Webpack with 
 *               defaults: (English lang & JavaScript generator).
 * @author samelh@google.com (Sam El-Husseini)
 */

//import '../node_modules/blockly';
//import "https://unpkg.com/blockly/blockly.min.js"

//import "https://unpkg.com/blockly/python_compressed.js"
//import "https://unpkg.com/blockly/javascript_compressed.js"
import { get, set } from 'idb-keyval'
import * as Blockly from 'blockly';

import "./storage.js"
import "./code_generator.js"
import "./code_blocks.js"
import "./toolbox_blocks.js"
import "./toolbox_generator.js"
import "./factory_blocks.js"

import "./block_factory_workspace.js"



import "./factory_utils.js"
import "./toolbox_workspace.js"

import "./code_workspace.js"

