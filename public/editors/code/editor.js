var toolbox = {
 "kind": "categoryToolbox",
 "contents": [
  {
   "kind": "category",
   "name" : "Basic",
   "colour": "#090",
   "contents": [
    {
      "kind": "block",
      "type": "generate_code"
    },
    {
      "kind": "block",
      "type": "generate_code_variable"
    },
    {
      "kind": "block",
      "type": "generate_token"
    },
    {
      "kind": "block",
      "type": "generate_token_value", 
      "fields": {
      },
      "inputs": {
        "TOKEN" :  {
          "block": {
            "type": "text",
          }
        },
      }
    },
    {
      "kind": "block",
      "type": "generate_field_value2"
    },
    {
      "kind": "block",
      "type": "generate_field_value_token"
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
      "type": "generate_field_text_token"
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
      "type": "generate_statements_token"
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
   "kind": "category",
   "name" : "Extra",
   "colour": "#399",
   "contents": [
    {
      "kind": "block",
      "type": "generate_block_type"
    },
    {
      "kind": "block",
      "type": "generate_list_length"
    },
    {
      "kind": "block",
      "type": "generate_parent_field_value"
    },
    {
      "kind": "block",
      "type": "generate_token_if_length"
    },
    {
      "kind": "block",
      "type": "generate_token_if_next_block"
    },
    {
      "kind": "block",
      "type": "generate_block_type"
    },
    {
      "kind": "block",
      "type": "generate_code_variable"
    },
   ]
  },
  {
   "kind": "category",
   "name" : "Logic",
   "colour": "#366",
   "contents": [
    {
      "kind": "block",
      "type": "generate_javascript_value"
    },
    {
      "kind": "block",
      "type": "controls_if"
    },
    {
      "kind": "block",
      "type": "logic_compare"
    },
    {
      "kind": "block",
      "type": "logic_operation"
    },
    {
      "kind": "block",
      "type": "logic_negate"
    },
    {
      "kind": "block",
      "type": "logic_boolean"
    },
    {
      "kind": "block",
      "type": "logic_null"
    },
    {
      "kind": "block",
      "type": "text"
    },
    {
      "kind": "block",
      "type": "math_number"
    },
    {
      "kind": "block",
      "type": "variables_get"
    },
    {
      "kind": "block",
      "type": "procedures_defreturn"
    },
    {
      "kind": "block",
      "type": "procedures_defnoreturn"
    },
   ]
  },
  {
     "kind": "category",
     "name": "Variables",
     "custom": "VARIABLE"
  },
 ]
}

// hardcoded till the end

var options = { 
  toolbox : toolbox, 
  collapse : true, 
  comments : true, 
  disable : false, 
  maxBlocks : Infinity, 
  trashcan : false, 
  horizontalLayout : false, 
  toolboxPosition : 'start', 
  css : true, 
  zoom: {
    controls: true,
  },
  media : 'https://blockly-demo.appspot.com/static/media/', 
  rtl : false, 
  scrollbars : true, 
  sounds : true, 
  oneBasedIndex : true
};

function codeGeneration(event) {
  if (Blockly.JavaScript)
  {  
    try {
          var code = Blockly.JavaScript.workspaceToCode(workspace);
    } catch (e) {
      console.warn("Error while creating code", e);
      code = "Error while creating code:" + e
    }     
    document.getElementById('codeDiv').value = code;
  }
}

function updateDropdownRename(event)
{
  if (event.type == "change" && (event.name=="NAME" || event.name=="FIELDNAME" ) || event.type == "create")
  {
    var blocks = workspace.getAllBlocks(); 
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
}

var workspace;

function vscode_start()
{
  inject();

  search();

}

function search()
{
  workspace.workspaceSearch = new WorkspaceSearch(workspace);

  workspace.workspaceSearch.init();
  workspace.workspaceSearch.open();
}

function inject()
{
  /* Inject your workspace */ 
  workspace = Blockly.inject("blocklyDiv", options);
  workspace.name="Concrete"
}

function start()
{
  inject();

  BlocklyStorage.restoreBlocks(workspace, 'concrete');
  BlocklyStorage.backupOnUnload(workspace, 'concrete');

  workspace.addChangeListener(codeGeneration);
  workspace.addChangeListener(updateDropdownRename);

  search();
  document.getElementById("save").addEventListener("click", saveFile);
  add_load()
  return workspace;
}

function get_json(workspace)
{
  var json_text = Blockly.serialization.workspaces.save(workspace);
  var data = JSON.stringify(json_text, undefined, 2);
  return data
}

function download(name, url) {
  const a = document.createElement('a')
  a.href = url
  
  a.download = name;
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

function saveFile()
{
    var data = get_json(workspace)
    var blob = new Blob([data], {type: 'text/plain;charset=utf-8'});
    var url = URL.createObjectURL(blob);
    download('concrete.json', url)
};

function add_load()
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
      Blockly.serialization.workspaces.load(json, workspace)
      }
      reader.onerror = function (evt) {
      document.getElementById("error").innerHTML = "error reading file";
      }
    }
    }
  }
}


