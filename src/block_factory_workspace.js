//var Blockly = require('blockly');
import * as Blockly from 'blockly';
//import 'blockly/blocks';



import { WorkspaceSearch } from '@blockly/plugin-workspace-search';
// TODO extend to the generated code windows with something like: https://github.com/AlienKevin/SmartTextarea/
import { ZoomToFitControl } from '@blockly/zoom-to-fit' 

import JSZip from 'jszip';
import {saveAs} from 'file-saver';
import BlocklyStorage from './storage.js';
import CodeGen from './code_workspace.js';
import Toolbox from './toolbox_workspace.js';
import FactoryUtils from './factory_utils.js';
import Concrete from './concrete_workspace.js';
import Editor from './editor_generator.js';
import JsonToBlocklyXML from './json_to_factory_blockly_xml.js';
import { get, set } from 'idb-keyval';
import DownloadScreen from "./screenshot.js";


/* TODO: Change toolbox XML ID if necessary. Can export toolbox XML from Workspace Factory. */
var toolbox = document.getElementById("blockfactory_toolbox");

var options = { 
	toolbox : toolbox, 
	zoom: {
      controls: true,
    },
	collapse : true, 
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

/* Inject your workspace */ 
var factory_workspace = Blockly.inject("blocklyFactoryDiv", options);
factory_workspace.name = "Factory"

var factory_zoomToFit = null;


function get_code()
{
	//  var code = Blockly.Code.workspaceToCode(factory_workspace);
  var code = "";
  var blocks = factory_workspace.getAllBlocks();
  
  for (var i=0;i<blocks.length;i++)
  {
  	var block = blocks[i];
  	
  	if (block.type=="factory_base")
  	{
      var blockType = block.getFieldValue('NAME')
      code += FactoryUtils.getBlockDefinition(blockType, block, "JavaScript", factory_workspace) 
  	  code += '\n\n'	
  	} 
  	
  }
  return code;
}

var some_thing_changed = false;

function logEvents(event)
{
  some_thing_changed = true;
  //console.log(event)
}

function saveBlocks()
{
  if (some_thing_changed)
  {
    some_thing_changed = false;
    errorHandler.report(get_mergable_json(factory_workspace));
    errorHandler.report(get_mergable_json(Toolbox.toolbox_workspace));
    errorHandler.report(get_mergable_json(CodeGen.code_workspace));
    errorHandler.report(get_mergable_json(Concrete.concrete_workspace));
    
  }
}


function myFactoryGeneration(event) {
  var code = get_code()
  document.getElementById('factory_code').value = code;
  code = "Blockly = blockly__WEBPACK_IMPORTED_MODULE_0__;\n" + code;
  
  try {
	eval(code)
  } catch (e) {
	// TODO: Display error in the UI
	console.error("Error while evaluating JavaScript formatted block definition", e);
	return;
  }
}



/**
 * Get the blocks connected to input
 * @param {string} input_name The name of the input.
 * @return {!Array.<!Blockly.Block>} Array of blocks.
 */
function get_statements(block, input_name)
{
   var first_input_block = block.getInputTargetBlock(input_name)
   var input_blocks = []

   var child = first_input_block;

   for(; child; ){
   	input_blocks.push(child)
   	child = child.getNextBlock();
   }
   return input_blocks
}

// returns a list of input blocks
function create_new_inputs(concrete_block, previous_connection)
{
   var factory_block = find_factory_block(concrete_block.type)
   var input_blocks = get_statements(factory_block, 'INPUTS')

   var return_inputs = []

   for(var i=0, input_block; input_block=input_blocks[i];i++) {
       if(input_block.type=='input_statement') {
           var children = get_statements(concrete_block, input_block.getFieldValue('INPUTNAME'))                     	 
           for (var j=0, child; child=children[j]; j++) {
           	  return_inputs = return_inputs.concat(create_new_inputs(child, previous_connection))
           }
       }
       else {
       	 // copy the input block
         var data = input_block.toCopyData();
         var new_input = Blockly.serialization.blocks.append(data.saveInfo, factory_workspace);

         // copy the field values
         copy_field_values(concrete_block, new_input)
         
         // and connect 
         previous_connection.connect(new_input.previousConnection)
         previous_connection = new_input.nextConnection;
   
       	 return_inputs.push(new_input)
       }
   }
   return return_inputs;

   // walk all inputs and fields of a concrete_block
 
   // replace the corresponding input_statement of the factory_block 
   	
}

function registerReplaceStaticText() {
  const displayOption = {
    displayText: function(scope) {
      return "Replace with static text"
    },
    preconditionFn: function (scope) {
      if (scope.block.type == 'field_input')
      {
        return 'enabled';
      } 
      return 'disabled';
    },
    callback: function (scope) {
      var field_name = scope.block.getFieldValue('FIELDNAME')
      var text = scope.block.getFieldValue('TEXT') 
      const jsonText = `
      {
		"type": "field_label_serializable",
		"fields": {
		  "TEXT": "`+text +`",
		  "FIELDNAME": "`+ field_name +`"
		}
	  }
      `
      Blockly.Events.setGroup(true); // combine the events for undo
      const json_block = JSON.parse(jsonText)
      var new_block = Blockly.serialization.blocks.append(json_block, scope.block.workspace)
      
      var previous_block = scope.block.previousConnection.getSourceBlock()
      previous_block.nextConnection.connect(new_block.previousConnection)
      new_block.nextConnection.connect(scope.block.nextConnection.target)
      scope.block.dispose(true,true)
      Blockly.Events.setGroup(false); // stop combine the events for undo
    },
    scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
    id: 'replace_static_text',
    weight: 100,
  };
  Blockly.ContextMenuRegistry.registry.register(displayOption);
}

function registerReplaceDropdown() {
  const displayOption = {
    displayText: function(scope) {

      return "Replace with dropdown"
    },
    preconditionFn: function (scope) {
      if (scope.block.type == 'field_input')
      {
        return 'enabled';
      } 
      return 'disabled';
    },
    callback: function (scope) {
      var field_name = scope.block.getFieldValue('FIELDNAME')
      var text = scope.block.getFieldValue('TEXT')
      const jsonText = `
      {
			"type": "field_dropdown",
			"extraState": {
			  "options": "[\\"text\\",\\"text\\",\\"text\\"]"
			},
			"fields": {
			  "FIELDNAME": "`+ field_name + `",
			  "USER0": "` + text + `",
			  "CPU0": "`+ text.toUpperCase() + `"
			}
      }
      `
      const json_block = JSON.parse(jsonText);
      Blockly.Events.setGroup(true); // combine the events for undo
      var new_block = Blockly.serialization.blocks.append(json_block, scope.block.workspace);

      var previous_block = scope.block.previousConnection.getSourceBlock()
      previous_block.nextConnection.connect(new_block.previousConnection)
      new_block.nextConnection.connect(scope.block.nextConnection.target)
      scope.block.dispose(true,true)
      Blockly.Events.setGroup(false); // stop combine
    },
    scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
    id: 'replace_dropdown',
    weight: 100,
  };
  Blockly.ContextMenuRegistry.registry.register(displayOption);
}

// TODO make just like the zoom-to-fit plugin 
function hide_toolbox()
{
    var toolboxes = document.getElementsByClassName("blocklyToolboxDiv blocklyNonSelectable");
    for (var i=0;i<toolboxes.length;i=i+1)
    {
	    var toolbox = toolboxes[i]
		if (toolbox.style.display=="none")
		{ 
		   toolbox.style.display="block"
		   document.getElementById("hide").innerHTML = "Hide Toolboxs"
		}
		else
		{
			toolbox.style.display="none";
			document.getElementById("hide").innerHTML = "Show Toolboxs"
		}
		Blockly.getMainWorkspace().resize();
	}
}

function registerDownload(){
	const displayOption = {
  	displayText:function()
  	   {
  	   	  return "Screenshot"; //Blockly.Msg.DOWNLOAD
  	   },
	preconditionFn:function(a) {
		return "enabled"
	   },
	callback:function(a) {
         DownloadScreen.downloadScreenshot(a.workspace)
	   },
	scopeType:Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
	id:"blockDownload",
	weight:11
	};
	Blockly.ContextMenuRegistry.registry.register(displayOption);
	
};


function getUniqueNameForBlock(prefix, block) {
    var counter = 1;
    var existingNames = [];
    
    var blocks = block.workspace.getBlocksByType(block.type);

    for (var i = 0; i < blocks.length; i++) {
        var name = blocks[i].getFieldValue('NAME');
        existingNames.push(name);
    }    
    
    if (!existingNames.includes(prefix))
    {
    	return prefix
    }

    while(true) {
        var newName = prefix + "_" + counter;
        
        if (!existingNames.includes(newName)) {
            return newName;
        }
        
        counter++;
    }
}



// should mkae a copy of the block factory block of this type 
// rename to...
// already fill in fieldValues for all fields (by name)

function registerEditBlockType() {
  const displayOption = {
    displayText: function(scope) {

        var factory_block = find_factory_block(scope.block.type)
        if (factory_block) {
              var factory_block = find_factory_block(scope.block.type)
  	          var new_name = getUniqueNameForBlock(factory_block.getFieldValue('NAME')+'_copy', factory_block)
            
          return "Create " + new_name
        } else {
          return scope.block.type + " not available in factory."
        }
    },
    preconditionFn: function (scope) {
        var factory_block = find_factory_block(scope.block.type)
        if (factory_block) {
          return 'enabled';
        } else {
        	return 'hidden'; // only one grey is enough
        }
    },

    callback: function (scope) {
      
      var factory_block = find_factory_block(scope.block.type)

      var data = factory_block.toCopyData();
      var new_block = Blockly.serialization.blocks.append(data.saveInfo, factory_workspace);
      var new_name = getUniqueNameForBlock(factory_block.getFieldValue('NAME')+'_copy', new_block)
      new_block.setFieldValue(new_name, 'NAME')
      

      new_block.workspace.cleanUp()

      // The copy field values is needed if converted from basic blocks to new block type
      //copy_field_values(scope.block, new_block)

      var code_blocks = find_code_blocks(scope.block.type)
      
      for (var i=0;i<code_blocks.length;i++) {

		  var data = code_blocks[i].toCopyData();
		  var new_code_block = Blockly.serialization.blocks.append(data.saveInfo, CodeGen.code_workspace);

		  new_code_block.setFieldValue(new_block.id, 'TYPE')  
		  
		  // update the dropdowns to use the new id from the new block 
		  var blocks = new_code_block.getDescendants();
		  dropdownUpdateBlocksText(blocks)
          new_code_block.workspace.cleanUp()
	  }

      
      // is the copied block also part of a menu
      // just insert the new block here, so also connect it

      var toolbox_blocks = find_toolbox_blocks(scope.block.type)
      for (var i=0;i<toolbox_blocks.length;i++) {

		  var data = toolbox_blocks[i].toCopyData();

		  var new_code_block = Blockly.serialization.blocks.append(data.saveInfo, Toolbox.toolbox_workspace);

		  new_code_block.setFieldValue(new_block.id, 'TYPE')

          // insert the new block
	      var next_connection = toolbox_blocks[i].nextConnection;
	      next_connection.connect(new_code_block.previousConnection)
      } 

         
      // and search
      Concrete.select_block_type(new_name)

      
    },
    scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
    id: 'edit_block_type',
    weight: 100,
  };
  Blockly.ContextMenuRegistry.registry.register(displayOption);
}


function copy_field_values(from, to)
{
	for (var i=0; i< from.inputList.length;i=i+1 )
      {
      	for (var j=0; j<from.inputList[i].fieldRow.length;j=j+1)
      	{
		  var name = from.inputList[i].fieldRow[j].name
		  if (name) {
			  var value = from.getFieldValue(name)
               
              // find the field with "FIELDNAME" == name and set the 'TEXT' to value		  
              var children = get_blocks_inside(to)
              for (var k=0;k<children.length;k++) {
              	 if (children[k].getFieldValue('FIELDNAME')==name) {
              	     children[k].setFieldValue(value, 'TEXT')
              	 }
              }
		  }
      	}
      } 
}

function registerCombineBlocks() {
  const displayOption = {
    displayText: function(scope) {
    	var factory_block = find_factory_block(scope.block.type)
        if (factory_block) {
          return "Combine: " + scope.block.type
        } else {
          return scope.block.type + " not available in factory."
        }
    },
    preconditionFn: function (scope) {
        var factory_block = find_factory_block(scope.block.type)
        if (factory_block) {
          return 'enabled';
        } else {
        	return 'disabled';
        }
    },

    callback: function (scope) {

           

          // copy the factory_block
            
          var factory_block = find_factory_block(scope.block.type)

          Blockly.Events.setGroup(true); // combine the events for undo


		  var data = factory_block.toCopyData();
		  var new_block = Blockly.serialization.blocks.append(data.saveInfo, factory_workspace);

      var new_name = getUniqueNameForBlock(factory_block.getFieldValue('NAME')+'_combi', new_block)
      
		  new_block.setFieldValue(new_name, 'NAME')
          
          var old_input = new_block.getInput('INPUTS')
          var old_input_block = new_block.getInputTargetBlock('INPUTS');

          var previous_connection = old_input.connection;
            
          var combined_inputs = create_new_inputs(scope.block, previous_connection)              
          
          // dispose the old inputs (with children and without sound)
          old_input_block.dispose(false,false)
          Blockly.Events.setGroup(false); // combine the events for undo

          // TODO also copy the generated code
      
    },
    scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
    id: 'combine_block_type',
    weight: 100,
  };
  Blockly.ContextMenuRegistry.registry.register(displayOption);
}

function find_toolbox_blocks(block_type)
{
	  var ret_blocks=[]
      var all_blocks = Toolbox.toolbox_workspace.getBlocksByType('toolbox_block')
      for (var i=0;i<all_blocks.length;i++) {
      	if (all_blocks[i].getField('TYPE').getText()==block_type) {
      		ret_blocks.push(all_blocks[i])
      	}
      }   
      return ret_blocks
}

function find_code_blocks(block_type)
{
	  var ret_blocks=[]
      var all_blocks = CodeGen.code_workspace.getBlocksByType('generate_code')
      for (var i=0;i<all_blocks.length;i++) {
      	if (all_blocks[i].getField('TYPE').getText()==block_type) {
      		ret_blocks.push(all_blocks[i])
      	}
      }   
      return ret_blocks
}

function find_factory_block(block_type)
{
	  // in the block_factory find the block with the name block.type
      var all_blocks = factory_workspace.getBlocksByType('factory_base')
      for (var i=0;i<all_blocks.length;i++) {
      	if (all_blocks[i].getFieldValue('NAME')==block_type) {
      		return all_blocks[i]
      	}
      }   
}

// get all the blocks inside this block
function get_blocks_inside(block)
{
	var descendants = block.getDescendants(true);
	var nextBlock = block.getNextBlock();
	if (nextBlock) {
	  var index = descendants.indexOf(nextBlock);
	  descendants.splice(index, descendants.length - index);
	}
	return descendants
}  

function add_load_save_listeners()
{
	
	const inputElement = document.getElementById("load");
    inputElement.addEventListener("change", loadZip, false);
    
    document.getElementById("save").addEventListener("click", saveZip);
    
    document.getElementById("loadEditor").addEventListener("click", load_editor_from_website_button);
    saveDirectFiles();
    loadDirectFiles();
}

function get_mergable_json(workspace)
{
	  var json_text = save_mergeable(workspace) 
	  var data = JSON.stringify(json_text, undefined, 2);
    return data 
}

function get_json(workspace)
{
    var json_text = Blockly.serialization.workspaces.save(workspace);
	  var data = JSON.stringify(json_text, undefined, 2);
    return data
}

async function create_directory(dirHandle, name)
{
  const newDirHandle = await dirHandle.getDirectoryHandle(name, { create :true});
  return newDirHandle;
   	
}

async function get_directory(dirHandle, name)
{
  const newDirHandle = await dirHandle.getDirectoryHandle(name);
  return newDirHandle;
}

async function get_file(dirHandle, file_name)
{
  const newFileHandle = await dirHandle.getFileHandle(file_name);
  const file = await newFileHandle.getFile();
  var contents = await file.text();
  return contents
}
async function create_file(dirHandle, file_name, contents)
{
  const newFileHandle = await dirHandle.getFileHandle(file_name, { create: true });
  const file = await newFileHandle.getFile();
  const writable = await newFileHandle.createWritable();
  await writable.write(contents);
  await writable.close();  

}

function saveDirectFiles()
{
    const butDir = document.getElementById('save_direct');
    butDir.addEventListener('click', async () => {
	  var editor = get_editor()
    var language = document.getElementById('language').value;
    
    var dirHandle = await get('file');
    if (dirHandle) {
      console.log(`Retrieved file handle "${dirHandle.name}" from IndexedDB.`);
      dirHandle = await window.showDirectoryPicker(options={'recursive':true, 'startIn' : dirHandle });
    }
    else
    {
      dirHandle = await window.showDirectoryPicker(options={'recursive':true });
    }

	await set('file', dirHandle);
	console.log(`Stored file handle for "${dirHandle.name}" in IndexedDB.`);

    dirHandle = await create_directory(dirHandle, editor)

    await create_file(dirHandle, "editor.js", Editor.generate_editor_js(get_code(), language, editor));
    await create_file(dirHandle, "editor.html", Editor.generate_editor_html(editor));
    await create_file(dirHandle, "readme.txt","develop folder contains the develop\nStart the editor.html to use the editor. Open the example.json\n");
    await create_file(dirHandle, "example.json", get_json(Concrete.concrete_workspace));

    const new_dir = await create_directory(dirHandle, 'develop');
    //await create_file(new_dir, "factory.json", get_json(factory_workspace));
    //await create_file(new_dir, "toolbox.json", get_json(Toolbox.toolbox_workspace));
    //await create_file(new_dir, "codegen.json", get_json(CodeGen.code_workspace));
    //await create_file(new_dir, "concrete.json", get_json(Concrete.concrete_workspace));

    await create_file(new_dir, "factory.json", get_mergable_json(factory_workspace));
    await create_file(new_dir, "toolbox.json", get_mergable_json(Toolbox.toolbox_workspace));
    await create_file(new_dir, "codegen.json", get_mergable_json(CodeGen.code_workspace));
    await create_file(new_dir, "concrete.json", get_mergable_json(Concrete.concrete_workspace));
    
    })
}

function loadDirectFiles()
{
    const butDir = document.getElementById('load_direct');
    butDir.addEventListener('click', async () => {
	var editor = get_editor()
    var language = document.getElementById('language').value;
    
    var dirHandle = await get('file');
    if (dirHandle) {
      console.log(`Retrieved file handle "${dirHandle.name}" from IndexedDB.`);
      dirHandle = await window.showDirectoryPicker(options={'recursive':true, 'startIn' : dirHandle });
    }
    else
    {
      dirHandle = await window.showDirectoryPicker(options={'recursive':true });
    }

	await set('file', dirHandle);
	console.log(`Stored file handle for "${dirHandle.name}" in IndexedDB.`);

    dirHandle = await get_directory(dirHandle, editor)

    const new_dir = await get_directory(dirHandle, 'develop');

    var contents = await get_file(new_dir, "factory.json");
    load_json_text_to_workspace(factory_workspace, contents)
    var contents = await get_file(new_dir, "toolbox.json");
    load_json_text_to_workspace(Toolbox.toolbox_workspace, contents)
    var contents = await get_file(new_dir, "codegen.json");
    load_json_text_to_workspace(CodeGen.code_workspace, contents)
    var contents = await get_file(new_dir, "concrete.json");
    load_json_text_to_workspace(Concrete.concrete_workspace, contents)
    
    })
}


function get_load()
{
	return get_from_url('load');
}

function get_editor()
{
	return get_from_url("editor");
}

function removeParam(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        if (params_arr.length) rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}

function get_from_url(param)
{
	var url_params = window.location.search;
	let params = new URLSearchParams(url_params);
    let editor = params.get(param); 
  
    return editor
}

// save to one zip
function saveZip()
{
	var editor = get_editor()
    var language = document.getElementById('language').value;

	var zip = new JSZip();
    //zip.file("develop/factory.json", get_json(factory_workspace));
    //zip.file("develop/toolbox.json", get_json(Toolbox.toolbox_workspace));
    //zip.file("develop/codegen.json", get_json(CodeGen.code_workspace));
    //zip.file("develop/concrete.json", get_json(Concrete.concrete_workspace));
    
    zip.file("develop/factory.json", get_mergable_json(factory_workspace));
    zip.file("develop/toolbox.json", get_mergable_json(Toolbox.toolbox_workspace));
    zip.file("develop/codegen.json", get_mergable_json(CodeGen.code_workspace));
    zip.file("develop/concrete.json", get_mergable_json(Concrete.concrete_workspace));
    
    zip.file("editor.js", Editor.generate_editor_js(get_code(), language));
    zip.file("editor.html", Editor.generate_editor_html(editor));
    zip.file("example.json", get_json(Concrete.concrete_workspace));
    zip.file("readme.txt","develop folder contains the develop\nStart the editor.html to use the editor. Open the example.json\n");
    zip.generateAsync({type:"blob"})
        .then(function (blob) {
            saveAs(blob, editor +".zip");
    });
}

// saves to four seperate App Engine
function saveFiles_appengine()
{
	var url_params = window.location.search;
	let params = new URLSearchParams(url_params);
    let editor = params.get("editor"); 

	BlocklyStorage.link(factory_workspace, editor)
	BlocklyStorage.link(Toolbox.toolbox_workspace, editor)
	BlocklyStorage.link(CodeGen.code_workspace, editor)
	BlocklyStorage.link(Concrete.concrete_workspace, editor)
};

function add_concreate_load()
{
    const inputElement = document.getElementById("input");
    inputElement.addEventListener("change", handleFiles, false);
    function handleFiles() {
      for (let i = 0; i < this.files.length; i++) {
          var file = this.files[i];
          if (file) {
			var reader = new FileReader();
			reader.readAsText(file, "UTF-8");
			reader.onload = function (evt) {
				var json = JSON.parse(evt.target.result);

				Blockly.serialization.workspaces.load(json, Concrete.concrete_workspace)
		    }
            reader.onerror = function (evt) {
              document.getElementById("fileContents").innerHTML = "error reading file";
            }
         }
      }
   }
}

function replace_blocks(obj)
{
	var properties = Object.getOwnPropertyNames(obj)
	for (var j=0; j<properties.length;j++)
	{
        if (properties[j]=='block')
        {
			// remove the block but keep the id
			var id = obj.block.id
			delete obj.block
			obj.block = { "id":id }
        } else if (typeof(obj[properties[j]])=='object')
        {
        	replace_blocks(obj[properties[j]])
        }
	}
}

function inject_blocks(obj, saved_blocks)
{
    var properties = Object.getOwnPropertyNames(obj)
    for (var j=0; j<properties.length;j++)
	  {
        if (properties[j]=='block')
        {
	        obj.block = saved_blocks[obj.block.id]
        }
        // kind of strange that the type can be object and the value null 
        else if (typeof(obj[properties[j]])=='object' && obj[properties[j]]!=null)
        {
          inject_blocks(obj[properties[j]], saved_blocks)
        }
        else
        {
          // value, no need to process
        }
	  }
}

function save_mergeable(workspace)
{
    var blocks = workspace.getAllBlocks();
    var save_blocks = {};
    for (var i=0; i<blocks.length;i++)
    {
    	var json_obj = Blockly.serialization.blocks.save(blocks[i], {addCoordinates: true, 
    	                                                             addInputBlocks: true, 
    	                                                             addNextBlocks: true, 
    	                                                             doFullSerialization: true})

        replace_blocks(json_obj)
        save_blocks[blocks[i].id] = json_obj

    }
    save_blocks['top_blocks'] = workspace.getTopBlocks().map(block => block.id);
    save_blocks['mergeable'] = true;

    return save_blocks
}

function load_mergeable(saved_blocks, workspace)
{
	var keys = Object.keys(saved_blocks)
	for (var i=0; i<keys.length;i++)
	{
        inject_blocks(saved_blocks[keys[i]],saved_blocks)
	}
	workspace.clear()
	for (var i=0; i<saved_blocks['top_blocks'].length;i++)
	{
		var id = saved_blocks['top_blocks'][i]
		Blockly.serialization.blocks.append(saved_blocks[id], workspace)
    }
	
	
}


function load_editor_from_website(editor)
{
  load_all(editor)
  var pageUrl = '?' + 'editor='+editor;
  window.history.pushState('', '', pageUrl);
}


function load_editor_from_website_button()
{
  
  var editor = document.getElementById("example").value
  load_editor_from_website(editor)
  
}


function load_editor_from_website_url()
{
  var url_params = window.location.search;
  let params = new URLSearchParams(url_params);
  let editor = params.get("editor"); 
  
  load_editor_from_website(editor)
  
}




function load_all(name)
{
	/* editors should be loaded in order */
	fetch('editors/'+ name +'/develop/factory.json')
	.then(req => req.text())
	.then((res) => {
      load_json_text_to_workspace(factory_workspace, res);
	    fetch('editors/'+ name +'/develop/toolbox.json')
	    .then(req => req.text())
	    .then((res) => { 
         load_json_text_to_workspace(Toolbox.toolbox_workspace, res);
	       fetch('editors/'+ name +'/develop/codegen.json')
	       .then(req => req.text())
	       .then((res) => {
            load_json_text_to_workspace(CodeGen.code_workspace, res); 
    	      fetch('editors/'+ name +'/develop/concrete.json')
	          .then(req => req.text())
	          .then((res) => { 
               load_json_text_to_workspace(Concrete.concrete_workspace, res); 
    	         })
    	      })
    	   })
        })
}


function load_json_text_to_workspace(workspace, text)
{
  var json = JSON.parse(text);
  workspace.clear()
  if (json.mergeable)
  {
    load_mergeable(json, workspace)
  }
  else
  {
    Blockly.serialization.workspaces.load(json, workspace)
  }
}

function loadZip() 
{
  for (let i = 0; i < this.files.length; i++) {
	  var file = this.files[i];
	  if (file) 
	  {
		JSZip.loadAsync(file)                                   
		  .then(function(zip) {
			zip.file('develop/factory.json').async("text").then(function (json_text) {
			  load_json_text_to_workspace(factory_workspace, json_text);
				zip.file('develop/toolbox.json').async("text").then(function (json_text) {
				  load_json_text_to_workspace(Toolbox.toolbox_workspace, json_text);
					zip.file('develop/codegen.json').async("text").then(function (json_text) {
					  load_json_text_to_workspace(CodeGen.code_workspace, json_text);
						zip.file('develop/concrete.json').async("text").then(function (json_text) {
						  load_json_text_to_workspace(Concrete.concrete_workspace, json_text);
						});
					});
				});
			});
		  })
	  }
  }
}


function updateDropdownRename(event)
{
	if (event.type == "change" && (event.name=="NAME" || event.name=="FIELDNAME" ) || event.type == "create")
	{
    	myDropDownUpdate(Toolbox.toolbox_workspace)
        myDropDownUpdate(CodeGen.code_workspace)
	}
}



function myDropDownUpdate(workspace) {
  // find all dropdowns 
  var blocks = workspace.getAllBlocks(); 
  dropdownUpdateBlocks(blocks)
}

// copy is created so new id are created but text should still be there...
function dropdownUpdateBlocksText(blocks)
{
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
				  var value = field.getText();
				  var field_options = field.getOptions();
                  for (var l=0; l<field_options.length; l++)
                  {
                  	if (field_options[l][0] == value)
                  	{
                  		field.setValue(field_options[l][1])
                  	}
                  }  
				  field.forceRerender()
			   }
		   }
	   }
  }
}

function dropdownUpdateBlocks(blocks)
{
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

  /**
   * Zoom to Fit on "Space"
   * @param {KeyboardEvent} e The key down event.
   * @private
   */
function onWorkspaceKeyDown_(e) {
    if (e.code == "Space")
    {
       	factory_workspace.zoomToFit()
       	e.preventDefault();
    }
}


/**
   * Helper method for adding an event.
   * @param {!Element} node Node upon which to listen.
   * @param {string} name Event name to listen to (e.g. 'mousedown').
   * @param {Object} thisObject The value of 'this' in the function.
   * @param {!Function} func Function to call when event is triggered.
   * @private
   */
function addEvent_(node, name, thisObject, func) {
    const event = Blockly.bindEventWithChecks_(node, name, thisObject, func);
    //this.boundEvents_.push(event);
  }

function space_zoom_to_fit(workspace)
{
  const injectionDiv = workspace.getInjectionDiv();
  addEvent_(injectionDiv, 'keydown', this, (evt) => onWorkspaceKeyDown_(/** @type {KeyboardEvent} */ evt));
}

function save_restore_language()
{

  var url = window.location.href.split('#')[0];
  if ('localStorage' in window && window.localStorage[url+'language']) {
    var selection = document.getElementById('language') 
    CodeGen.select_language(selection, window.localStorage[url+'language'])      
  }

   window.addEventListener('unload',
      function() {
        if ('localStorage' in window) {
          var language = document.getElementById('language').value
          // Gets the current URL, not including the hash.
          var url = window.location.href.split('#')[0]+'language';
          window.localStorage.setItem(url, language);
        }
      })
}

let observer = new ResizeObserver(function(mutations) {
  for (var i=0; i< mutations.length;i++)
  {
  	onresize(mutations[i].target)
  }
  Blockly.svgResize(factory_workspace)
  Blockly.svgResize(Toolbox.toolbox_workspace)
  Blockly.svgResize(CodeGen.code_workspace)
  Blockly.svgResize(Concrete.concrete_workspace)
  
});    

var onresize = function(target) {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    var blocklyArea = target;

    var blocklyDiv = target.children[0].children[0]
    var element = blocklyArea;
    var x = 0;
    var y = 0;
    do {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent;
    } while (element);
    
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth - 20 + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight - 30 + 'px';
    Blockly.svgResize(factory_workspace);
  };

function handle_resize()
{
   var blocklyArea = document.getElementById('blocklyFactoryArea');
   observer.observe(blocklyArea, { attributes: true });
   blocklyArea = document.getElementById('blocklyToolboxArea');
   observer.observe(blocklyArea, { attributes: true });
   blocklyArea = document.getElementById('blocklyConcreteArea');
   observer.observe(blocklyArea, { attributes: true });
   blocklyArea = document.getElementById('blocklyGeneratorArea');
   observer.observe(blocklyArea, { attributes: true });

}

function saveFn(workspace)
{
  if (workspace.name=='Concrete')
  {
    var version = 'latest'
    return { 'editor': get_editor(), 
    'version' : 1.0,
    'url': 'https://cidt.asml.com/editors/latest/' + get_editor() + '/editor.html'}
  }
  else
  {
    return { 'editor': 'factory/' + workspace.name, 
    'version' : 1.0,
    'url': 'https://cidt.asml.com/editors/latest/factory/?editor=' + get_editor() + '&load=1'}

  }
}

function loadFn(hi)
{

}

function clearFn(workspace)
{

}

function register_workspace_serialization()
{
  Blockly.serialization.registry.register(
    'editor',  // Name
    {
      save: saveFn,      // Save function
      load: loadFn,      // Load function
      clear: clearFn,    // Clear function
      priority: 1,      // Priority
    }
    );
}

var errorHandler = null;
function enable_exception_logging()
{
  
  errorHandler = new StackdriverErrorReporter();
  errorHandler.start({
    key: "AIzaSyBhLrATN834bxB8yRWjTozgqMhb4BnSJ28",
    projectId: "motar-242711",
});
}




//function init_all()
document.addEventListener("DOMContentLoaded", function () 
{
  handle_resize();
  enable_exception_logging();

  factory_workspace.addChangeListener(myFactoryGeneration);
  factory_workspace.addChangeListener(updateDropdownRename);
  factory_workspace.addChangeListener(logEvents);
  
  BlocklyStorage.restoreBlocks(factory_workspace,'factory');
  BlocklyStorage.backupOnUnload(factory_workspace,'factory');


  // make sure at after the restore the blocks are generated
  myFactoryGeneration()
    
  register_workspace_serialization()

  CodeGen.init_code();

  Toolbox.init_toolbox();
  Concrete.init_concrete();
  
  // all blockly workspaces are initialized and restored 

  // save the block to logging
  setInterval(saveBlocks, 10000);

  // from now on also trigger the code and toolbox generation updates
  
  factory_workspace.addChangeListener(CodeGen.myCodeGeneration);

  factory_workspace.addChangeListener(Toolbox.myToolboxGeneration);
  
  //factory_workspace.addChangeListener(Concrete.reload);
  
  CodeGen.updateLanguageDropdown()
  save_restore_language()

  document.getElementById('language').addEventListener('change', CodeGen.myCodeGeneration, false);
  

  registerReplaceDropdown()
  registerDownload()
  registerReplaceStaticText()
  registerEditBlockType()
  registerCombineBlocks()
//  add_concreate_load()
  add_load_save_listeners()  
  
  factory_workspace.workspaceSearch = new WorkspaceSearch(factory_workspace);

  factory_workspace.workspaceSearch.init();
  factory_workspace.workspaceSearch.open();

  factory_zoomToFit = new ZoomToFitControl(factory_workspace);
  factory_zoomToFit.init();
//  space_zoom_to_fit(factory_workspace)
//  space_zoom_to_fit(CodeGen.code_workspace)
//  space_zoom_to_fit(Toolbox.toolbox_workspace)
//  space_zoom_to_fit(Concrete.concrete_workspace)
  
  if (get_load())
  {
	  load_editor_from_website_url()
	  // remove load from the url
	  
	  
	  window.history.pushState({}, document.title, removeParam('load', window.location.search));
  }

})
