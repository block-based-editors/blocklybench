/* TODO: Change toolbox XML ID if necessary. Can export toolbox XML from Workspace Factory. */

'use strict';
//var Blockly = require('blockly');
import * as Blockly from 'blockly';
import FieldDate from "@blockly/field-date";
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
  var code = 'No code generation yet. Add code generation blocks.'
  if (language)
  {
  try {
    eval('Blockly = blockly__WEBPACK_IMPORTED_MODULE_0__; code = Blockly.'+language+'.workspaceToCode(Concrete.concrete_workspace);')
  } catch (e) {
    //console.warn("Error while creating " + language + " code", e);
    code = "Error while creating " +language + " code:" + e
  }
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
      Concrete.select_block_type(block)
    }
  }
  if (event.type == 'click' && !event.blockId)
  {
    clear_selection();
  }

}

function highlight_blocks_of_type(search_workspace, block_type, field_name, block_type_to_search)
// highlight all blocks 
// for example highlight_blocks_of_type(search_workspace, "factory_base", "NAME", block_type);
  
{
  var factory_base_blocks = search_workspace.getBlocksByType(block_type)
  var blocks_to_highlight = [];
  for (var i=0;i<factory_base_blocks.length;i++)
  {
    var block = factory_base_blocks[i]
    if (block.getFieldValue(field_name) == block_type_to_search)
    {
      blocks_to_highlight.push(block)
    }
  }
  search_workspace.workspaceSearch.unhighlightSearchGroup_(search_workspace.getAllBlocks());
  search_workspace.workspaceSearch.highlightSearchGroup_(blocks_to_highlight);
  // highlight only works if the search group is applied first
  search_workspace.workspaceSearch.highlightCurrentSelection_(blocks_to_highlight[0]);
  search_workspace.workspaceSearch.scrollToVisible_(blocks_to_highlight[0]);
  return blocks_to_highlight[0]
}

Concrete.select_block_type = function(block)
{
  var search_workspace = getWorkspaceByName('Factory')
  
  var factory_block = highlight_blocks_of_type(search_workspace, "factory_base", "NAME", block.type);
  
  search_workspace = getWorkspaceByName('Code')
  
  highlight_blocks_of_type(search_workspace, "generate_code", "TYPE", factory_block.id);
  
  search_workspace = getWorkspaceByName('Toolbox')
  search_workspace.workspaceSearch.searchAndHighlight(block.type, false)
  search_workspace.workspaceSearch.inputElement_.value = block.type

}

function clear_selection()
{
  var search_workspace = getWorkspaceByName('Factory')
  search_workspace.workspaceSearch.unhighlightSearchGroup_(search_workspace.getAllBlocks());
  
  search_workspace = getWorkspaceByName('Code')
  search_workspace.workspaceSearch.unhighlightSearchGroup_(search_workspace.getAllBlocks());
  
  search_workspace = getWorkspaceByName('Toolbox')
  search_workspace.workspaceSearch.unhighlightSearchGroup_(search_workspace.getAllBlocks());
  
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

