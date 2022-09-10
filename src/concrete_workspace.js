/* TODO: Change toolbox XML ID if necessary. Can export toolbox XML from Workspace Factory. */

'use strict';
//var Blockly = require('blockly');
import * as Blockly from 'blockly';

import BlocklyStorage from './storage.js';
import { WorkspaceSearch } from '@blockly/plugin-workspace-search';

var Concrete = {}; // create a namespace

Concrete.concrete_workspace = null;

Concrete.reload = function()
{
    console.log('reload')
    var json_text = Blockly.serialization.workspaces.save(Concrete.concrete_workspace);
    Concrete.concrete_workspace.clear()
    Blockly.serialization.workspaces.load(json_text, Concrete.concrete_workspace)
}

Concrete.myConcreteCodeGeneration = function (event) {
  var language = document.getElementById('language').value
  var code = ''
 
  try {
	 eval('Blockly = blockly__WEBPACK_IMPORTED_MODULE_0__; code = Blockly.'+language+'.workspaceToCode(Concrete.concrete_workspace);')
  } catch (e) {
	//console.warn("Error while creating " + language + " code", e);
	code = "Error while creating " +language + " code:" + e
  }     
  document.getElementById('concrete_code').value = code;
}

Concrete.myDropDownUpdate = function() {
  // find all dropdowns 
  var blocks = Concrete.concrete_workspace.getAllBlocks(); 
  
  for (var k = 0; k < blocks.length; k++) {
	   var block = blocks[k];

	   for (var i = 0, input; (input = block.inputList[i]); i++) {
		   for (var j = 0, field; (field = input.fieldRow[j]); j++) {
			   if (field.getOptions) // is dropdown
			   {
				  // during name update of a block  
				  // stay to have the same value (block id)
				  // but need to rerender the text
				  // get and setValue are needed (probably some side effect)
				  var value = field.getValue();
				  var field_options = field.getOptions();
				  field.setValue(value)     
				  field.forceRerender()
			   }
		   }
	   }
        
  }
}


function getWorkspaceByName(name)
{
    var workspaces = Blockly.Workspace.getAll();
	for (var i=0; i< workspaces.length;i++) {
	  var workspace = workspaces[i]

	  if (workspace.name == name)
	  {
		return workspace
	  }
	}
}

Concrete.mySelection = function(event) {
	if (event.type == "selected" )
	{
		if(event.newElementId) {
			var workspace = Blockly.Workspace.getById(event.workspaceId)
			var block = workspace.getBlockById(event.newElementId)
			Concrete.select_block_type(block.type)
		}
	}
}

Concrete.select_block_type = function(block_type)
{
	var search_workspace = getWorkspaceByName('Factory')
	search_workspace.workspaceSearch.searchAndHighlight(block_type, false)
	search_workspace.workspaceSearch.inputElement_.value = block_type

	search_workspace = getWorkspaceByName('Code')
	search_workspace.workspaceSearch.searchAndHighlight(block_type, false)
	search_workspace.workspaceSearch.inputElement_.value = block_type

	search_workspace = getWorkspaceByName('Toolbox')
	search_workspace.workspaceSearch.searchAndHighlight(block_type, false)
	search_workspace.workspaceSearch.inputElement_.value = block_type

}




Concrete.myJSONGeneration = function (event) {
	var json_text = Blockly.serialization.workspaces.save(Concrete.concrete_workspace);
	document.getElementById('concrete_json').value = JSON.stringify(json_text, undefined, 2);
  }
  

Concrete.init_concrete = function(toolbox)
{
	if (!toolbox)
	{
		toolbox = {"kind": "flyoutToolbox", "contents": []}
	}
	var options = { 
		toolbox : toolbox, 
		collapse : true, 
		comments : true, 
		disable : false, 
		maxBlocks : Infinity, 
		trashcan : false, 
		horizontalLayout : false, 
		toolboxPosition : 'start', 
		zoom: {
			controls: true,
		  },
		css : true, 
		media : 'https://blockly-demo.appspot.com/static/media/', 
		rtl : false, 
		scrollbars : true, 
		sounds : true, 
		oneBasedIndex : true
	};
    if (!this.concrete_workspace)
    {
		/* Inject your workspace */ 
		this.concrete_workspace = Blockly.inject("blocklyConcreteDiv", options);
		this.concrete_workspace.name="Concrete"

		/* Load Workspace Blocks from XML to workspace. Remove all code below if no blocks to load */

		// restore sometimes fails on delete blocks, continue without restore
		try
		{	
			BlocklyStorage.restoreBlocks(this.concrete_workspace, 'concrete');
		} catch (error) {
			console.error(error);
		}

		BlocklyStorage.backupOnUnload(this.concrete_workspace, 'concrete');

		this.concrete_workspace.workspaceSearch = new WorkspaceSearch(this.concrete_workspace);

		this.concrete_workspace.workspaceSearch.init();
		this.concrete_workspace.workspaceSearch.open();
	  

		this.concrete_workspace.addChangeListener(Concrete.myConcreteCodeGeneration);
		this.concrete_workspace.addChangeListener(Concrete.myDropDownUpdate);
		this.concrete_workspace.addChangeListener(Concrete.myJSONGeneration);
		this.concrete_workspace.addChangeListener(Concrete.mySelection);
    }
}
export default Concrete;

