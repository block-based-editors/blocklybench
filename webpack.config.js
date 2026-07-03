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
 * @fileoverview Webpack configuration file.
 * @author samelh@google.com (Sam El-Husseini)
 */

const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    target: 'web',
    mode: 'development',
    entry: {
        index: './src/index.js',
    },
    output: {
    publicPath: '',
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
  plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CopyPlugin({patterns: [
            {
                from: path.resolve(__dirname, 'public'),
                to: path.resolve(__dirname, 'build')
            }
            ,
            // Copy over media resources from the Blockly package
            {
                from: path.resolve(__dirname, './node_modules/blockly/media'),
                to: path.resolve(__dirname, 'build/media')
            }
        ]})
    ],
    devServer: {
        port: 3000
    },
    // Custom generators (Blockly.YAML, Blockly.<language>) are attached to
    // the Blockly namespace object at runtime; webpack cannot know these
    // exports and would emit a warning for every access.
    ignoreWarnings: [/was not found in 'blockly'/],
    // Blockly is one big library; code splitting is not practical here.
    performance: { hints: false }
};
