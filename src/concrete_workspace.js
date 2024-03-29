/* TODO: Change toolbox XML ID if necessary. Can export toolbox XML from Workspace Factory. */

'use strict';
//var Blockly = require('blockly');
import * as Blockly from 'blockly';
import FieldDate from "@blockly/field-date";
import BlocklyStorage from './storage.js';
import { WorkspaceSearch } from '@blockly/plugin-workspace-search';
import { Block } from 'blockly';

var Concrete = {}; // create a namespace

Concrete.concrete_workspace = null;

function visit_block(json_block, oldValue, newValue)
{
  // make the change on this level
  if (json_block.type == oldValue)
  {
    json_block.type = newValue
  }
  // depth first walking the tree of blocks
  if (json_block.next)
  {
    visit_block(json_block.next.block, oldValue, newValue)
  }
  if (json_block.inputs)
  {
    for (const [key, value] of Object.entries(json_block.inputs)) {
      visit_block(value.block, oldValue, newValue);

    }
  }
}

function update_extra_state(json_block, oldValue, newValue)
{
  for (var i=0; i<json_block.extraState.dropdowns.length;i++)
  {
    if (json_block.extraState.dropdowns[i].field == oldValue)
    {
      json_block.extraState.dropdowns[i].field = newValue
    }
  }
}

function fix_event_field(event, block_type, oldValue, newValue)
{
  var workspace = Blockly.Workspace.getById(event.workspaceId);
  if (event.element=="field" && workspace.getBlockById(event.blockId).type == block_type)
  {
    if (event.name == oldValue)
    {
      event.name = newValue
    }
  }
}

function visit_field(json_block, block_type, oldValue, newValue)
{
  // make the change on this level
  if (json_block.type == block_type)
  {
    json_block.fields[newValue] = json_block.fields[oldValue]
    update_extra_state(json_block, oldValue, newValue)
  }
  // walk the rest of the tree
  if (json_block.next)
  {
    visit_field(json_block.next.block, block_type, oldValue, newValue)
  }
  if (json_block.inputs)
  {
    for (const [key, value] of Object.entries(json_block.inputs)) {
      visit_field(value.block, block_type, oldValue, newValue);
    }
  }
}
function fix_event_input(event, block_type, oldValue, newValue)
{
  var workspace = Blockly.Workspace.getById(event.workspaceId);
  var newParent = workspace.getBlockById(event.newParentId)
  var oldParent = workspace.getBlockById(event.oldParentId)
  if (oldParent?.type == block_type || newParent?.type == block_type)
  {
    if (event.newInputName == oldValue)
    {
      event.newInputName = newValue
    }
    if (event.oldInputName == oldValue)
    {
      event.oldInputName = newValue
    }
  }
}

function visit_input(json_block, block_type, oldValue, newValue)
{
  // make the change on this level
  if (json_block.type == block_type)
  {
    if (json_block.inputs && json_block.inputs[oldValue]) // only if this input is connected
    {
      json_block.inputs[newValue] = json_block.inputs[oldValue]
      delete json_block.inputs[oldValue];
    }
    
  }
  // walk the rest of the tree
  if (json_block.next)
  {
    visit_input(json_block.next.block, block_type, oldValue, newValue)
  }
  if (json_block.inputs)
  {
    for (const [key, value] of Object.entries(json_block.inputs)) {
      visit_input(value.block, block_type, oldValue, newValue);
    }
  }
}


// update the concrete editor among the factory change on field names, block_types, 
Concrete.reload = function(event)
{
    var json_text = Blockly.serialization.workspaces.save(Concrete.concrete_workspace);
    var undo_stack = Concrete.concrete_workspace.getUndoStack();
    var redo_stack = Concrete.concrete_workspace.getRedoStack();

    /* rename the fields */
    if (event.element=="field")
    {
      var workspace = Blockly.Workspace.getById(event.workspaceId);
      var field_block = workspace.getBlockById(event.blockId);
      if (field_block.type=="factory_base")
      {
        for (var i=0; i< json_text.blocks.blocks.length; i++)
        {
          visit_block(json_text.blocks.blocks[i], event.oldValue, event.newValue);
        }

        for (var i=0; i< undo_stack.length; i++)
        {
          fix_event_type(undo_stack[i], event.oldValue, event.newValue);
        }
        for (var i=0; i< redo_stack.length; i++)
        {
          fix_event_type(redo_stack[i], event.oldValue, event.newValue);
        }

      }
      else if (field_block.type =="input_statement") 
      {
        var factory_block = field_block.getSurroundParent()
        var block_type = factory_block.getFieldValue("NAME");
        for (var i=0; i< json_text.blocks.blocks.length; i++)
        {
          visit_input(json_text.blocks.blocks[i], block_type, event.oldValue, event.newValue)
        }
        for (var i=0; i< undo_stack.length; i++)
        {
          fix_event_input(undo_stack[i], block_type, event.oldValue, event.newValue);
        }
        for (var i=0; i< redo_stack.length; i++)
        {
          fix_event_input(redo_stack[i], block_type, event.oldValue, event.newValue);
        }
      }
      else { // field
        if (event.name=="HUE" || event.name =="TYPE" || event.name == "TEXT")
        {
          // ignore only the representation changes, no serialization of the block
        }
        else
        {
          var factory_block = field_block.getSurroundParent().getSurroundParent();
          var block_type = factory_block.getFieldValue("NAME");
          for (var i=0; i< json_text.blocks.blocks.length; i++)
          {
            visit_field(json_text.blocks.blocks[i], block_type, event.oldValue, event.newValue)
          }
          for (var i=0; i< undo_stack.length; i++)
          {
            fix_event_field(undo_stack[i], block_type, event.oldValue, event.newValue);
          }
          for (var i=0; i< redo_stack.length; i++)
          {
            fix_event_field(redo_stack[i], block_type, event.oldValue, event.newValue);
          }
        }
      }
    }
    
    Blockly.Events.disable();
    Concrete.concrete_workspace.clear()  // generates delete events otherwise
    Blockly.Events.enable();
    Blockly.serialization.workspaces.load(json_text, Concrete.concrete_workspace)

}

function fix_event_type(stack_event, old_type, new_type)
{
  if (stack_event.type == "create" )
  {
    if (stack_event.json.type == old_type)
    {
      stack_event.json.type = new_type
    }
  }
  if (stack_event.type == "delete") 
  {
    if (stack_event.oldJson.type == old_type)
    {
      stack_event.oldJson.type = new_type
    }
    
  }
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
  if (event.type == "click" && event.blockId )
  {
    var block = Concrete.concrete_workspace.getBlockById(event.blockId)
    Concrete.select_block_type(block)
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
      console.log(error);
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

