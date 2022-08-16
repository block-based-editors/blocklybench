'use strict';
//var Blockly = require('blockly');
import * as Blockly from 'blockly';

import { WorkspaceSearch } from '@blockly/plugin-workspace-search';
import { ZoomToFitControl } from '@blockly/zoom-to-fit' 

import BlocklyStorage from './storage.js';

import Concrete from './concrete_workspace.js'

var Toolbox = {}; // create a namespace

Toolbox.toolbox_workspace = null;

Toolbox.get_code = function()
{
	// should only render the top blocks
    var code =''
    var blocks = Toolbox.toolbox_workspace.getTopBlocks().filter(block => block.type == 'toolbox_blocks' || block.type == 'toolbox_categories');;
    for (var i=0; i< blocks.length; i++)
    {   
        // the block should have childern
        if (blocks[i].getDescendants().length>1)
        {
            code += Blockly.YAML.blockToCode(blocks[i]);
        }
	}
	return code;

}
Toolbox.myToolboxGeneration = function (event) {

   var toolbox = null;
   var code = null;
   if (Concrete.concrete_workspace) 
   {
   	try {
     	code = Toolbox.get_code();
	} catch (e) {
		console.warn("Error while creating toolbox", e);
		code = "null; // Error while creating Toolbox json:" + e
		return
	}
	if (code=="")    
	{
		code = '{"kind": "flyoutToolbox", "contents": []};' // empty toolbox
	}
    code = 'toolbox = ' + code
    document.getElementById('toolbox_javascript').value = code
    
    try {
        eval(code)
    } catch(e) {
     	console.warn("Error while evaluation code", e);
     	return
    }
	
	if (code)
	{

     // workspace has to be reset to switch between categories or block toolbox
     // so just reset on every change...

     var toolbox_json = Blockly.utils.toolbox.convertToolboxDefToJson(toolbox)
     if (Blockly.utils.toolbox.hasCategories(toolbox_json)) {
     	if (!Concrete.concrete_workspace.toolbox_) // current workspace does not have categories
     	{
			 BlocklyStorage.backupBlocks_(Concrete.concrete_workspace, 'concrete');
			 Concrete.concrete_workspace.dispose()
			 Concrete.concrete_workspace = null
			 Concrete.init_concrete(toolbox);
     	}
     } else {
        if (!Concrete.concrete_workspace.flyout_) {
			 BlocklyStorage.backupBlocks_(Concrete.concrete_workspace, 'concrete');
			 Concrete.concrete_workspace.dispose()
			 Concrete.concrete_workspace = null
			 Concrete.init_concrete(toolbox);

        }
     
     }
	}
     Concrete.concrete_workspace.updateToolbox(toolbox)

   }
}

Toolbox.init_toolbox = function() {

	var toolbox_zoomToFit = null;
	var toolbox = toolbox = {
		"kind": "categoryToolbox",
		 "contents": [
		  {
		  "kind":"category",
		  "name":"Basic",
		  "colour":"#666",
		  "expanded":"false",
		   "contents": [
			{
			 "kind": "block",
			 "type": "toolbox_blocks"
			},
			{
			 "kind": "block",
			 "type": "toolbox_block"
			},
			{
			 "kind": "block",
			 "type": "toolbox_categories"
			},
			{
			 "kind": "block",
			 "type": "toolbox_category"
			},
		   ]
		  },
		  {
		  "kind":"category",
		  "name":"Special",
		  "colour":"#ccc",
		  "expanded":"false",
		   "contents": [
			{
			 "kind": "block",
			 "type": "toolbox_block_json"
			},
			{
			 "kind": "block",
			 "type": "toolbox_block_json_field"
			},
			{
				"kind": "block",
				"type": "toolbox_block_json_input"
			},
			{
			 "kind": "block",
			 "type": "toolbox_seperator"
			},
			{
				"kind": "block",
				"type": "toolbox_label"
		    },
		    {
			 "kind": "block",
			 "type": "toolbox_variable_category"
			},
		   ]
		  },
		 ]
		};
	var options = { 
		toolbox : toolbox,
		zoom: {
			controls: true,
		  },
		collapse : false, 
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

    if (!this.toolbox_workspace) {

		/* Inject your workspace */ 
		this.toolbox_workspace = Blockly.inject("blocklyToolboxDiv", options);
		this.toolbox_workspace.name = "Toolbox"


		BlocklyStorage.restoreBlocks(this.toolbox_workspace,'toolbox');
		BlocklyStorage.backupOnUnload(this.toolbox_workspace,'toolbox');


        this.toolbox_workspace.workspaceSearch = new WorkspaceSearch(this.toolbox_workspace);

        this.toolbox_workspace.workspaceSearch.init();
        this.toolbox_workspace.workspaceSearch.open();
        
		this.toolbox_workspace.addChangeListener(Toolbox.myToolboxGeneration);
		toolbox_zoomToFit = new ZoomToFitControl(this.toolbox_workspace);
		toolbox_zoomToFit.init();
  		//space_zoom_to_fit(toolbox_zoomToFit)
		
    }
	
}

export default Toolbox
