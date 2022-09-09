'use strict';

//var Blockly = require('blockly');
import * as Blockly from 'blockly';
/* webpackIgnore: true */ 

import BlocklyStorage from './storage.js';
import { WorkspaceSearch } from '@blockly/plugin-workspace-search';
import { ZoomToFitControl } from '@blockly/zoom-to-fit' 
import Concrete from './concrete_workspace.js'

var CodeGen = {}; // create a namespace

CodeGen.code_workspace = null;

CodeGen.get_code = function()
{
	return Blockly.Code.workspaceToCode(CodeGen.code_workspace);
}

function add_options(selection, languages)
{
	for (let language of languages)
	{
	   var opt = document.createElement('option');
       opt.value = language;
       opt.innerHTML = language;
       selection.appendChild(opt);
	}

}
CodeGen.select_language = function(selection, language)

{
	var opts = selection.options;
	for (var opt, j = 0; opt = opts[j]; j++) {
	  if (opt.value == language) {
		selection.selectedIndex = j;
		break;
	  }
	}
}

CodeGen.updateLanguageDropdown = function(event) {
	var blocks = CodeGen.code_workspace.getTopBlocks()
	var languages = new Set()
	for (var i=0;i<blocks.length; i++)
	{
        languages.add(blocks[i].getFieldValue('LANGUAGE'))
	}
	
	var selection = document.getElementById('language');

	var index = -1
	if (selection.options)
	{
		index = selection.options.selectedIndex
	}
	var selected_language = null;
	if (index>=0)
	{
		selected_language = selection.options[index].label

	}
	selection.options.length = 0
	add_options(selection, languages)
    CodeGen.select_language(selection, selected_language)   
    
	return languages
}

CodeGen.myCodeGeneration = function(event) {
  
  var code = CodeGen.get_code()
  document.getElementById('generator_code').value = code;
  code = 'Blockly = blockly__WEBPACK_IMPORTED_MODULE_0__;\n' + code;
  // eval the just generated code 
  eval(code)
  Concrete.myConcreteCodeGeneration()
 
}


CodeGen.init_code = function() {

    // clear for now just copy existing blocks
	//var toolbox = document.getElementById("code_toolbox");

    var toolbox = {
"kind": "categoryToolbox",
 "contents": [
  {
  "kind":"category",
  "name":"Basic",
  "colour":"#090",
  "expanded":"false",
   "contents": [
    {
     "kind": "block",
     "type": "generate_code"
    },
    {
     "kind": "block",
     "type": "generate_token"
    },
    {
     "kind": "block",
     "type": "generate_field_value2"
    },
    {
      "kind": "block",
      "type": "generate_parent_field_value"
    },
    {
     "kind": "block",
     "type": "generate_field_text"
    },
    {
     "kind": "block",
     "type": "generate_statements2"
    },
    {
      "kind": "block",
      "type": "generate_statements3"
    },
    {
     "kind": "block",
     "type": "generate_values2"
    },
    {
     "kind": "block",
     "type": "generate_comment"
    },
    {
     "kind": "block",
     "type": "generate_javascript"
    },
   ]
  },
  {
  "kind":"category",
  "name":"Extra",
  "colour":"#399",
  "expanded":"false",
   "contents": [
    {
     "kind": "block",
     "type": "generate_block_type"
    },
    {
      "kind": "block",
      "type": "generate_token_if_next_block"
    },
    {
     "kind": "block",
     "type": "generate_list_length"
    },
    {
     "kind": "block",
     "type": "generate_list_index"
    },
    {
      "kind": "block",
      "type": "generate_indent"
     },
     {
      "kind": "block",
      "type": "generate_code_variable"
     },
 
   ]
  },
 ]
}



	var options = { 
		toolbox : toolbox, 
		collapse : false, 
		zoom: {
          controls: true,
        },
		comments : true, 
		disable : false, 
		maxBlocks : Infinity, 
		trashcan : false, 
		horizontalLayout : false, 
		toolboxPosition : 'start', 
		css : true, 
		media : 'https://blockly-demo.appspot.com/static/media/', 
		rtl : false, 
		scrollbars : true, 
		sounds : true, 
		oneBasedIndex : true
	};

    if (!this.code_workspace) {

		/* Inject your workspace */ 
		this.code_workspace = Blockly.inject("blocklyGeneratorDiv", options);
		this.code_workspace.name = "Code"


		BlocklyStorage.restoreBlocks(this.code_workspace,'code');
		BlocklyStorage.backupOnUnload(this.code_workspace,'code');

		this.code_workspace.addChangeListener(CodeGen.myCodeGeneration);
		this.code_workspace.addChangeListener(CodeGen.updateLanguageDropdown)

		this.code_workspace.workspaceSearch = new WorkspaceSearch(this.code_workspace);

        this.code_workspace.workspaceSearch.init();
        this.code_workspace.workspaceSearch.open();

        const code_zoomToFit = new ZoomToFitControl(this.code_workspace);
        code_zoomToFit.init();
    }
}

export default CodeGen;