import * as Blockly from 'blockly';

Blockly.Blocks['toolbox_seperator'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Gap")
        .appendField(new Blockly.FieldTextInput("24", null, ), "GAP");
    this.setPreviousStatement(true, "block");
    this.setNextStatement(true, "block");
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  },

  /*
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var field;
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions) // is dropdown
        {
          var dropdown = Blockly.utils.xml.createElement('dropdown');
          dropdown.setAttribute('field', field.name);
        
          container.appendChild(dropdown)
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option = Blockly.utils.xml.createElement('option');
            option.setAttribute('text', options[i][0]);
            option.setAttribute('id', options[i][1]);
            dropdown.appendChild(option);
          }
        }
      }
    }
    return container;
  },
  saveExtraState: function() {
    var field;
    var state = {'dropdowns':[]};
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions) // is dropdown
        {
          var field_state = {'field':field.name, 'options' : []}
          state.dropdowns.push(field_state);
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option_state = {'text': options[i][0], 'id':options[i][1]}
            field_state.options.push(option_state)
          }
        }
      }
    }
    return state;
  },

  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {

    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'dropdown') {
        var field_name = childNode.getAttribute('field');
        var field = this.getField(field_name);
    
        var options = field.getOptions(false)
        var ids = options.map(option => option[1]);
        
        for (var j = 0, optionsElement; (optionsElement = childNode.childNodes[j]); j++) {
          if (optionsElement.nodeName.toLowerCase() == 'option') {
            var text = optionsElement.getAttribute('text');
            var id = optionsElement.getAttribute('id');
            if (!ids.includes(id)) {
              options.push([text,id])
            }
          }
        }
        field.savedOptionsSet = true;     
      }
    }
  },
  loadExtraState: function(state) {
    for (var i=0; i<state.dropdowns.length; i++)
    {
      var field_name = state.dropdowns[i].field;
      var field = this.getField(field_name);
      if (field.getOptions)
      { 
         var options = field.getOptions(false);
      }
      else
      {
        var options = []
      }
      var ids = options.map(option => option[1]);
      for (var j =0; j<state.dropdowns[i].options.length;j++)
      {
        var text = state.dropdowns[i].options[j].text;
        var id = state.dropdowns[i].options[j].id;
        if (!ids.includes(id)) {
          options.push([text,id])
        }
      }
      field.savedOptionsSet = true;
    }
  }



};

Blockly.Blocks['toolbox_label'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Label")
        .appendField(new Blockly.FieldTextInput("Label", null, ), "TEXT");
    this.setPreviousStatement(true, "block");
    this.setNextStatement(true, "block");
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  },

  /*
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var field;
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions) // is dropdown
        {
          var dropdown = Blockly.utils.xml.createElement('dropdown');
          dropdown.setAttribute('field', field.name);
        
          container.appendChild(dropdown)
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option = Blockly.utils.xml.createElement('option');
            option.setAttribute('text', options[i][0]);
            option.setAttribute('id', options[i][1]);
            dropdown.appendChild(option);
          }
        }
      }
    }
    return container;
  },
  saveExtraState: function() {
    var field;
    var state = {'dropdowns':[]};
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions) // is dropdown
        {
          var field_state = {'field':field.name, 'options' : []}
          state.dropdowns.push(field_state);
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option_state = {'text': options[i][0], 'id':options[i][1]}
            field_state.options.push(option_state)
          }
        }
      }
    }
    return state;
  },

  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {

    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'dropdown') {
        var field_name = childNode.getAttribute('field');
        var field = this.getField(field_name);
    
        var options = field.getOptions(false)
        var ids = options.map(option => option[1]);
        
        for (var j = 0, optionsElement; (optionsElement = childNode.childNodes[j]); j++) {
          if (optionsElement.nodeName.toLowerCase() == 'option') {
            var text = optionsElement.getAttribute('text');
            var id = optionsElement.getAttribute('id');
            if (!ids.includes(id)) {
              options.push([text,id])
            }
          }
        }
        field.savedOptionsSet = true;     
      }
    }
  },
  loadExtraState: function(state) {
    for (var i=0; i<state.dropdowns.length; i++)
    {
      var field_name = state.dropdowns[i].field;
      var field = this.getField(field_name);
      if (field.getOptions)
      { 
         var options = field.getOptions(false);
      }
      else
      {
        var options = []
      }
      var ids = options.map(option => option[1]);
      for (var j =0; j<state.dropdowns[i].options.length;j++)
      {
        var text = state.dropdowns[i].options[j].text;
        var id = state.dropdowns[i].options[j].id;
        if (!ids.includes(id)) {
          options.push([text,id])
        }
      }
      field.savedOptionsSet = true;
    }
  }



};

Blockly.Blocks['toolbox_variable_category'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Category Variables");
    this.setPreviousStatement(true, "category");
    this.setNextStatement(true, "category");
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  },

  /*
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var field;
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions) // is dropdown
        {
          var dropdown = Blockly.utils.xml.createElement('dropdown');
          dropdown.setAttribute('field', field.name);
        
          container.appendChild(dropdown)
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option = Blockly.utils.xml.createElement('option');
            option.setAttribute('text', options[i][0]);
            option.setAttribute('id', options[i][1]);
            dropdown.appendChild(option);
          }
        }
      }
    }
    return container;
  },
  saveExtraState: function() {
    var field;
    var state = {'dropdowns':[]};
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions) // is dropdown
        {
          var field_state = {'field':field.name, 'options' : []}
          state.dropdowns.push(field_state);
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option_state = {'text': options[i][0], 'id':options[i][1]}
            field_state.options.push(option_state)
          }
        }
      }
    }
    return state;
  },

  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {

    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'dropdown') {
        var field_name = childNode.getAttribute('field');
        var field = this.getField(field_name);
    
        var options = field.getOptions(false)
        var ids = options.map(option => option[1]);
        
        for (var j = 0, optionsElement; (optionsElement = childNode.childNodes[j]); j++) {
          if (optionsElement.nodeName.toLowerCase() == 'option') {
            var text = optionsElement.getAttribute('text');
            var id = optionsElement.getAttribute('id');
            if (!ids.includes(id)) {
              options.push([text,id])
            }
          }
        }
        field.savedOptionsSet = true;     
      }
    }
  },
  loadExtraState: function(state) {
    for (var i=0; i<state.dropdowns.length; i++)
    {
      var field_name = state.dropdowns[i].field;
      var field = this.getField(field_name);
      if (field.getOptions)
      { 
         var options = field.getOptions(false);
      }
      else
      {
        var options = []
      }
      var ids = options.map(option => option[1]);
      for (var j =0; j<state.dropdowns[i].options.length;j++)
      {
        var text = state.dropdowns[i].options[j].text;
        var id = state.dropdowns[i].options[j].id;
        if (!ids.includes(id)) {
          options.push([text,id])
        }
      }
      field.savedOptionsSet = true;
    }
  }



};

Blockly.Blocks['toolbox_functions_category'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Category Functions");
    this.setPreviousStatement(true, "category");
    this.setNextStatement(true, "category");
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  },

  /*
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var field;
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions && !field.variable_) // is dropdown and not a variable
        {
          var dropdown = Blockly.utils.xml.createElement('dropdown');
          dropdown.setAttribute('field', field.name);
        
          container.appendChild(dropdown)
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option = Blockly.utils.xml.createElement('option');
            option.setAttribute('text', options[i][0]);
            option.setAttribute('id', options[i][1]);
            dropdown.appendChild(option);
          }
        }
      }
    }
    return container;
  },
  saveExtraState: function() {
    var field;
    var state = {'dropdowns':[]};
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions && !field.variable_) // is dropdown and not a variable
        {
          var field_state = {'field':field.name, 'options' : []}
          state.dropdowns.push(field_state);
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option_state = {'text': options[i][0], 'id':options[i][1]}
            field_state.options.push(option_state)
          }
        }
      }
    }
    return state;
  },

  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {

    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'dropdown') {
        var field_name = childNode.getAttribute('field');
        var field = this.getField(field_name);
    
        var options = field.getOptions(false)
        var ids = options.map(option => option[1]);
        
        for (var j = 0, optionsElement; (optionsElement = childNode.childNodes[j]); j++) {
          if (optionsElement.nodeName.toLowerCase() == 'option') {
            var text = optionsElement.getAttribute('text');
            var id = optionsElement.getAttribute('id');
            if (!ids.includes(id)) {
              options.push([text,id])
            }
          }
        }
        field.savedOptionsSet = true;     
      }
    }
  },
  loadExtraState: function(state) {
    for (var i=0; i<state.dropdowns.length; i++)
    {
      var field_name = state.dropdowns[i].field;
      var field = this.getField(field_name);
      if (field && field.getOptions && !field.variable_) // is dropdown and not a variable
      { 
         var options = field.getOptions(false);
      }
      else
      {
        var options = []
      }
      
      var ids = options.map(option => option[1]);
      for (var j =0; j<state.dropdowns[i].options.length;j++)
      {
        var text = state.dropdowns[i].options[j].text;
        var id = state.dropdowns[i].options[j].id;
        if (!ids.includes(id)) {
          options.push([text,id])
        }
      }
      if (field) // field can be temp gone if no name is set temparory
      {
        field.savedOptionsSet = true;
      }
    }
  }



};



Blockly.Blocks['toolbox_block_json'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Block")
        .appendField(new Blockly.FieldDropdown(function() {
                // options filed from dom
                // this function should always return a [['at least one option id','at least one option text']] 
                // 1. when the block is created this function is called
                // 2. than the saved dom options are set
                // 3. than we should wait for all blocks to be loaded for function below to work 
                

                if (this.savedOptionsSet)
                {
                  var options = this.getOptions(true); // get from Cache
                }
                else
                { 
                  var options = []
                }
                var ids = options.map(option => option[1]);
                var field = "NAME";
                var workspace_name = "Factory";
                var workspaces = Blockly.Workspace.getAll();
                for (var i=0; i< workspaces.length;i++) {
                  var workspace= workspaces[i]

                  if (workspace.name == workspace_name)
                  {
                    var all_blocks = workspace.getAllBlocks()
                    for(var j=0;j<all_blocks.length;j++)
                    {
                      var field_value = all_blocks[j].getFieldValue(field)
                      if (field_value)
                      {
                        var index = ids.indexOf(all_blocks[j].id)
                        if (index !== -1) {
                          // should pop the old options as rename of field_value 
                          ids.splice(index, 1)
                          options.splice(index,1)                        
                        }
                        options.push([field_value, all_blocks[j].id])
                      }
                    }
                  }
                }
                options.sort();
                
                if (options.length==0)
                {
                  options.push(['no options yet','NONE'])
                }
                if (options.length>1)
                {
                  var ids = options.map(option => option[1]);
                  var index = ids.indexOf('NONE')
                  if (index !== -1) {
                    // should pop the old options as rename of field_value 
                    options.splice(index,1)                        
                  }
                }
                return options;
            }), "TYPE");
    this.appendStatementInput("FIELDS")
        .setCheck("field")
        .appendField("Fields");
    this.appendStatementInput("INPUTS")
        .setCheck("input")
        .appendField("Inputs");
    this.setPreviousStatement(true, "block");
    this.setNextStatement(true, "block");
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  },

  /*
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var field;
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions) // is dropdown
        {
          var dropdown = Blockly.utils.xml.createElement('dropdown');
          dropdown.setAttribute('field', field.name);
        
          container.appendChild(dropdown)
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option = Blockly.utils.xml.createElement('option');
            option.setAttribute('text', options[i][0]);
            option.setAttribute('id', options[i][1]);
            dropdown.appendChild(option);
          }
        }
      }
    }
    return container;
  },
  saveExtraState: function() {
    var field;
    var state = {'dropdowns':[]};
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions) // is dropdown
        {
          var field_state = {'field':field.name, 'options' : []}
          state.dropdowns.push(field_state);
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option_state = {'text': options[i][0], 'id':options[i][1]}
            field_state.options.push(option_state)
          }
        }
      }
    }
    return state;
  },

  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {

    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'dropdown') {
        var field_name = childNode.getAttribute('field');
        var field = this.getField(field_name);
    
        var options = field.getOptions(false)
        var ids = options.map(option => option[1]);
        
        for (var j = 0, optionsElement; (optionsElement = childNode.childNodes[j]); j++) {
          if (optionsElement.nodeName.toLowerCase() == 'option') {
            var text = optionsElement.getAttribute('text');
            var id = optionsElement.getAttribute('id');
            if (!ids.includes(id)) {
              options.push([text,id])
            }
          }
        }
        field.savedOptionsSet = true;     
      }
    }
  },
  loadExtraState: function(state) {
    for (var i=0; i<state.dropdowns.length; i++)
    {
      var field_name = state.dropdowns[i].field;
      var field = this.getField(field_name);
      if (field.getOptions)
      { 
         var options = field.getOptions(false);
      }
      else
      {
        var options = []
      }
      var ids = options.map(option => option[1]);
      for (var j =0; j<state.dropdowns[i].options.length;j++)
      {
        var text = state.dropdowns[i].options[j].text;
        var id = state.dropdowns[i].options[j].id;
        if (!ids.includes(id)) {
          options.push([text,id])
        }
      }
      field.savedOptionsSet = true;
    }
  }



};

Blockly.Blocks['toolbox_block_json_input'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Input")
        .appendField(new Blockly.FieldDropdown(function() {
                // options filed from dom
                // this function should always return a [['at least one option id','at least one option text']] 
                // 1. when the block is created this function is called
                // 2. than the saved dom options are set
                // 3. than we should wait for all blocks to be loaded for function below to work 
                

                if (this.savedOptionsSet)
                {
                  var options = this.getOptions(true); // get from Cache
                }
                else
                { 
                  var options = []
                }
                var ids = options.map(option => option[1]);
                var field = "INPUTNAME";
                var workspace_name = "Factory";
                var workspaces = Blockly.Workspace.getAll();
                for (var i=0; i< workspaces.length;i++) {
                  var workspace= workspaces[i]

                  if (workspace.name == workspace_name)
                  {
                    var all_blocks = workspace.getAllBlocks()
                    for(var j=0;j<all_blocks.length;j++)
                    {
                      var field_value = all_blocks[j].getFieldValue(field)
                      if (field_value)
                      {
                        var index = ids.indexOf(all_blocks[j].id)
                        if (index !== -1) {
                          // should pop the old options as rename of field_value 
                          ids.splice(index, 1)
                          options.splice(index,1)                        
                        }
                        options.push([field_value, all_blocks[j].id])
                      }
                    }
                  }
                }
                options.sort();
                
                if (options.length==0)
                {
                  options.push(['no options yet','NONE'])
                }
                if (options.length>1)
                {
                  var ids = options.map(option => option[1]);
                  var index = ids.indexOf('NONE')
                  if (index !== -1) {
                    // should pop the old options as rename of field_value 
                    options.splice(index,1)                        
                  }
                }
                return options;
            }), "NAME");
    this.appendStatementInput("BLOCKS")
        .setCheck("block");
    this.setPreviousStatement(true, "input");
    this.setNextStatement(true, "input");
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  },

  /*
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var field;
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions) // is dropdown
        {
          var dropdown = Blockly.utils.xml.createElement('dropdown');
          dropdown.setAttribute('field', field.name);
        
          container.appendChild(dropdown)
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option = Blockly.utils.xml.createElement('option');
            option.setAttribute('text', options[i][0]);
            option.setAttribute('id', options[i][1]);
            dropdown.appendChild(option);
          }
        }
      }
    }
    return container;
  },
  saveExtraState: function() {
    var field;
    var state = {'dropdowns':[]};
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions) // is dropdown
        {
          var field_state = {'field':field.name, 'options' : []}
          state.dropdowns.push(field_state);
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option_state = {'text': options[i][0], 'id':options[i][1]}
            field_state.options.push(option_state)
          }
        }
      }
    }
    return state;
  },

  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {

    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'dropdown') {
        var field_name = childNode.getAttribute('field');
        var field = this.getField(field_name);
    
        var options = field.getOptions(false)
        var ids = options.map(option => option[1]);
        
        for (var j = 0, optionsElement; (optionsElement = childNode.childNodes[j]); j++) {
          if (optionsElement.nodeName.toLowerCase() == 'option') {
            var text = optionsElement.getAttribute('text');
            var id = optionsElement.getAttribute('id');
            if (!ids.includes(id)) {
              options.push([text,id])
            }
          }
        }
        field.savedOptionsSet = true;     
      }
    }
  },
  loadExtraState: function(state) {
    for (var i=0; i<state.dropdowns.length; i++)
    {
      var field_name = state.dropdowns[i].field;
      var field = this.getField(field_name);
      if (field.getOptions)
      { 
         var options = field.getOptions(false);
      }
      else
      {
        var options = []
      }
      var ids = options.map(option => option[1]);
      for (var j =0; j<state.dropdowns[i].options.length;j++)
      {
        var text = state.dropdowns[i].options[j].text;
        var id = state.dropdowns[i].options[j].id;
        if (!ids.includes(id)) {
          options.push([text,id])
        }
      }
      field.savedOptionsSet = true;
    }
  }



};

Blockly.Blocks['toolbox_block_json_field'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Field")
        .appendField(new Blockly.FieldDropdown(function() {
                // options filed from dom
                // this function should always return a [['at least one option id','at least one option text']] 
                // 1. when the block is created this function is called
                // 2. than the saved dom options are set
                // 3. than we should wait for all blocks to be loaded for function below to work 
                

                if (this.savedOptionsSet)
                {
                  var options = this.getOptions(true); // get from Cache
                }
                else
                { 
                  var options = []
                }
                var ids = options.map(option => option[1]);
                var field = "FIELDNAME";
                var workspace_name = "Factory";
                var workspaces = Blockly.Workspace.getAll();
                for (var i=0; i< workspaces.length;i++) {
                  var workspace= workspaces[i]

                  if (workspace.name == workspace_name)
                  {
                    var all_blocks = workspace.getAllBlocks()
                    for(var j=0;j<all_blocks.length;j++)
                    {
                      var field_value = all_blocks[j].getFieldValue(field)
                      if (field_value)
                      {
                        var index = ids.indexOf(all_blocks[j].id)
                        if (index !== -1) {
                          // should pop the old options as rename of field_value 
                          ids.splice(index, 1)
                          options.splice(index,1)                        
                        }
                        options.push([field_value, all_blocks[j].id])
                      }
                    }
                  }
                }
                options.sort();
                
                if (options.length==0)
                {
                  options.push(['no options yet','NONE'])
                }
                if (options.length>1)
                {
                  var ids = options.map(option => option[1]);
                  var index = ids.indexOf('NONE')
                  if (index !== -1) {
                    // should pop the old options as rename of field_value 
                    options.splice(index,1)                        
                  }
                }
                return options;
            }), "NAME")
        .appendField(new Blockly.FieldTextInput("value", null, ), "VALUE");
    this.setPreviousStatement(true, "field");
    this.setNextStatement(true, "field");
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  },

  /*
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var field;
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions) // is dropdown
        {
          var dropdown = Blockly.utils.xml.createElement('dropdown');
          dropdown.setAttribute('field', field.name);
        
          container.appendChild(dropdown)
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option = Blockly.utils.xml.createElement('option');
            option.setAttribute('text', options[i][0]);
            option.setAttribute('id', options[i][1]);
            dropdown.appendChild(option);
          }
        }
      }
    }
    return container;
  },
  saveExtraState: function() {
    var field;
    var state = {'dropdowns':[]};
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions) // is dropdown
        {
          var field_state = {'field':field.name, 'options' : []}
          state.dropdowns.push(field_state);
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option_state = {'text': options[i][0], 'id':options[i][1]}
            field_state.options.push(option_state)
          }
        }
      }
    }
    return state;
  },

  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {

    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'dropdown') {
        var field_name = childNode.getAttribute('field');
        var field = this.getField(field_name);
    
        var options = field.getOptions(false)
        var ids = options.map(option => option[1]);
        
        for (var j = 0, optionsElement; (optionsElement = childNode.childNodes[j]); j++) {
          if (optionsElement.nodeName.toLowerCase() == 'option') {
            var text = optionsElement.getAttribute('text');
            var id = optionsElement.getAttribute('id');
            if (!ids.includes(id)) {
              options.push([text,id])
            }
          }
        }
        field.savedOptionsSet = true;     
      }
    }
  },
  loadExtraState: function(state) {
    for (var i=0; i<state.dropdowns.length; i++)
    {
      var field_name = state.dropdowns[i].field;
      var field = this.getField(field_name);
      if (field.getOptions)
      { 
         var options = field.getOptions(false);
      }
      else
      {
        var options = []
      }
      var ids = options.map(option => option[1]);
      for (var j =0; j<state.dropdowns[i].options.length;j++)
      {
        var text = state.dropdowns[i].options[j].text;
        var id = state.dropdowns[i].options[j].id;
        if (!ids.includes(id)) {
          options.push([text,id])
        }
      }
      field.savedOptionsSet = true;
    }
  }



};

Blockly.Blocks['toolbox_blocks'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Toolbox (blocks)");
    this.appendStatementInput("LIST")
        .setCheck("block");
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  },

  /*
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var field;
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions) // is dropdown
        {
          var dropdown = Blockly.utils.xml.createElement('dropdown');
          dropdown.setAttribute('field', field.name);
        
          container.appendChild(dropdown)
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option = Blockly.utils.xml.createElement('option');
            option.setAttribute('text', options[i][0]);
            option.setAttribute('id', options[i][1]);
            dropdown.appendChild(option);
          }
        }
      }
    }
    return container;
  },
  saveExtraState: function() {
    var field;
    var state = {'dropdowns':[]};
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions) // is dropdown
        {
          var field_state = {'field':field.name, 'options' : []}
          state.dropdowns.push(field_state);
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option_state = {'text': options[i][0], 'id':options[i][1]}
            field_state.options.push(option_state)
          }
        }
      }
    }
    return state;
  },

  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {

    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'dropdown') {
        var field_name = childNode.getAttribute('field');
        var field = this.getField(field_name);
    
        var options = field.getOptions(false)
        var ids = options.map(option => option[1]);
        
        for (var j = 0, optionsElement; (optionsElement = childNode.childNodes[j]); j++) {
          if (optionsElement.nodeName.toLowerCase() == 'option') {
            var text = optionsElement.getAttribute('text');
            var id = optionsElement.getAttribute('id');
            if (!ids.includes(id)) {
              options.push([text,id])
            }
          }
        }
        field.savedOptionsSet = true;     
      }
    }
  },
  loadExtraState: function(state) {
    for (var i=0; i<state.dropdowns.length; i++)
    {
      var field_name = state.dropdowns[i].field;
      var field = this.getField(field_name);
      if (field.getOptions)
      { 
         var options = field.getOptions(false);
      }
      else
      {
        var options = []
      }
      var ids = options.map(option => option[1]);
      for (var j =0; j<state.dropdowns[i].options.length;j++)
      {
        var text = state.dropdowns[i].options[j].text;
        var id = state.dropdowns[i].options[j].id;
        if (!ids.includes(id)) {
          options.push([text,id])
        }
      }
      field.savedOptionsSet = true;
    }
  }



};

Blockly.Blocks['toolbox_block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Block")
        .appendField(new Blockly.FieldDropdown(function() {
                // options filed from dom
                // this function should always return a [['at least one option id','at least one option text']] 
                // 1. when the block is created this function is called
                // 2. than the saved dom options are set
                // 3. than we should wait for all blocks to be loaded for function below to work 
                

                if (this.savedOptionsSet)
                {
                  var options = this.getOptions(true); // get from Cache
                }
                else
                { 
                  var options = []
                }
                var ids = options.map(option => option[1]);
                var field = "NAME";
                var workspace_name = "Factory";
                var workspaces = Blockly.Workspace.getAll();
                for (var i=0; i< workspaces.length;i++) {
                  var workspace= workspaces[i]

                  if (workspace.name == workspace_name)
                  {
                    var all_blocks = workspace.getAllBlocks()
                    for(var j=0;j<all_blocks.length;j++)
                    {
                      var field_value = all_blocks[j].getFieldValue(field)
                      if (field_value)
                      {
                        var index = ids.indexOf(all_blocks[j].id)
                        if (index !== -1) {
                          // should pop the old options as rename of field_value 
                          ids.splice(index, 1)
                          options.splice(index,1)                        
                        }
                        options.push([field_value, all_blocks[j].id])
                      }
                    }
                  }
                }
                options.sort();
                
                if (options.length==0)
                {
                  options.push(['no options yet','NONE'])
                }
                if (options.length>1)
                {
                  var ids = options.map(option => option[1]);
                  var index = ids.indexOf('NONE')
                  if (index !== -1) {
                    // should pop the old options as rename of field_value 
                    options.splice(index,1)                        
                  }
                }
                return options;
            }), "TYPE");
    this.setPreviousStatement(true, "block");
    this.setNextStatement(true, "block");
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  },

  /*
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var field;
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions) // is dropdown
        {
          var dropdown = Blockly.utils.xml.createElement('dropdown');
          dropdown.setAttribute('field', field.name);
        
          container.appendChild(dropdown)
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option = Blockly.utils.xml.createElement('option');
            option.setAttribute('text', options[i][0]);
            option.setAttribute('id', options[i][1]);
            dropdown.appendChild(option);
          }
        }
      }
    }
    return container;
  },
  saveExtraState: function() {
    var field;
    var state = {'dropdowns':[]};
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions) // is dropdown
        {
          var field_state = {'field':field.name, 'options' : []}
          state.dropdowns.push(field_state);
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option_state = {'text': options[i][0], 'id':options[i][1]}
            field_state.options.push(option_state)
          }
        }
      }
    }
    return state;
  },

  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {

    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'dropdown') {
        var field_name = childNode.getAttribute('field');
        var field = this.getField(field_name);
    
        var options = field.getOptions(false)
        var ids = options.map(option => option[1]);
        
        for (var j = 0, optionsElement; (optionsElement = childNode.childNodes[j]); j++) {
          if (optionsElement.nodeName.toLowerCase() == 'option') {
            var text = optionsElement.getAttribute('text');
            var id = optionsElement.getAttribute('id');
            if (!ids.includes(id)) {
              options.push([text,id])
            }
          }
        }
        field.savedOptionsSet = true;     
      }
    }
  },
  loadExtraState: function(state) {
    for (var i=0; i<state.dropdowns.length; i++)
    {
      var field_name = state.dropdowns[i].field;
      var field = this.getField(field_name);
      if (field.getOptions)
      { 
         var options = field.getOptions(false);
      }
      else
      {
        var options = []
      }
      var ids = options.map(option => option[1]);
      for (var j =0; j<state.dropdowns[i].options.length;j++)
      {
        var text = state.dropdowns[i].options[j].text;
        var id = state.dropdowns[i].options[j].id;
        if (!ids.includes(id)) {
          options.push([text,id])
        }
      }
      field.savedOptionsSet = true;
    }
  }



};

Blockly.Blocks['toolbox_categories'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Toolbox (categories)");
    this.appendStatementInput("LIST")
        .setCheck("category");
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  },

  /*
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var field;
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions) // is dropdown
        {
          var dropdown = Blockly.utils.xml.createElement('dropdown');
          dropdown.setAttribute('field', field.name);
        
          container.appendChild(dropdown)
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option = Blockly.utils.xml.createElement('option');
            option.setAttribute('text', options[i][0]);
            option.setAttribute('id', options[i][1]);
            dropdown.appendChild(option);
          }
        }
      }
    }
    return container;
  },
  saveExtraState: function() {
    var field;
    var state = {'dropdowns':[]};
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions) // is dropdown
        {
          var field_state = {'field':field.name, 'options' : []}
          state.dropdowns.push(field_state);
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option_state = {'text': options[i][0], 'id':options[i][1]}
            field_state.options.push(option_state)
          }
        }
      }
    }
    return state;
  },

  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {

    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'dropdown') {
        var field_name = childNode.getAttribute('field');
        var field = this.getField(field_name);
    
        var options = field.getOptions(false)
        var ids = options.map(option => option[1]);
        
        for (var j = 0, optionsElement; (optionsElement = childNode.childNodes[j]); j++) {
          if (optionsElement.nodeName.toLowerCase() == 'option') {
            var text = optionsElement.getAttribute('text');
            var id = optionsElement.getAttribute('id');
            if (!ids.includes(id)) {
              options.push([text,id])
            }
          }
        }
        field.savedOptionsSet = true;     
      }
    }
  },
  loadExtraState: function(state) {
    for (var i=0; i<state.dropdowns.length; i++)
    {
      var field_name = state.dropdowns[i].field;
      var field = this.getField(field_name);
      if (field.getOptions)
      { 
         var options = field.getOptions(false);
      }
      else
      {
        var options = []
      }
      var ids = options.map(option => option[1]);
      for (var j =0; j<state.dropdowns[i].options.length;j++)
      {
        var text = state.dropdowns[i].options[j].text;
        var id = state.dropdowns[i].options[j].id;
        if (!ids.includes(id)) {
          options.push([text,id])
        }
      }
      field.savedOptionsSet = true;
    }
  }



};

Blockly.Blocks['toolbox_category'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Category")
        .appendField(new Blockly.FieldTextInput("name", null, ), "NAME")
        .appendField(new Blockly.FieldColour("#3366ff"), "COLOUR")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "EXPAND");
    this.appendStatementInput("LIST")
        .setCheck(["block", "category"]);
    this.setPreviousStatement(true, "category");
    this.setNextStatement(true, "category");
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  },

  /*
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var field;
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions) // is dropdown
        {
          var dropdown = Blockly.utils.xml.createElement('dropdown');
          dropdown.setAttribute('field', field.name);
        
          container.appendChild(dropdown)
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option = Blockly.utils.xml.createElement('option');
            option.setAttribute('text', options[i][0]);
            option.setAttribute('id', options[i][1]);
            dropdown.appendChild(option);
          }
        }
      }
    }
    return container;
  },
  saveExtraState: function() {
    var field;
    var state = {'dropdowns':[]};
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions) // is dropdown
        {
          var field_state = {'field':field.name, 'options' : []}
          state.dropdowns.push(field_state);
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option_state = {'text': options[i][0], 'id':options[i][1]}
            field_state.options.push(option_state)
          }
        }
      }
    }
    return state;
  },

  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {

    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'dropdown') {
        var field_name = childNode.getAttribute('field');
        var field = this.getField(field_name);
    
        var options = field.getOptions(false)
        var ids = options.map(option => option[1]);
        
        for (var j = 0, optionsElement; (optionsElement = childNode.childNodes[j]); j++) {
          if (optionsElement.nodeName.toLowerCase() == 'option') {
            var text = optionsElement.getAttribute('text');
            var id = optionsElement.getAttribute('id');
            if (!ids.includes(id)) {
              options.push([text,id])
            }
          }
        }
        field.savedOptionsSet = true;     
      }
    }
  },
  loadExtraState: function(state) {
    for (var i=0; i<state.dropdowns.length; i++)
    {
      var field_name = state.dropdowns[i].field;
      var field = this.getField(field_name);
      if (field.getOptions)
      { 
         var options = field.getOptions(false);
      }
      else
      {
        var options = []
      }
      var ids = options.map(option => option[1]);
      for (var j =0; j<state.dropdowns[i].options.length;j++)
      {
        var text = state.dropdowns[i].options[j].text;
        var id = state.dropdowns[i].options[j].id;
        if (!ids.includes(id)) {
          options.push([text,id])
        }
      }
      field.savedOptionsSet = true;
    }
  }



};


Blockly.Blocks['toolbox_block_all'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Block")
        .appendField(new Blockly.FieldDropdown([["colour_blend","colour_blend"],["colour_hue","colour_hue"],["colour_picker","colour_picker"],["colour_random","colour_random"],["colour_rgb","colour_rgb"],["controls_flow_statements","controls_flow_statements"],["controls_for","controls_for"],["controls_forEach","controls_forEach"],["controls_if","controls_if"],["controls_if_else","controls_if_else"],["controls_if_elseif","controls_if_elseif"],["controls_if_if","controls_if_if"],["controls_ifelse","controls_ifelse"],["controls_repeat","controls_repeat"],["controls_repeat_ext","controls_repeat_ext"],["controls_whileUntil","controls_whileUntil"],["factory_base","factory_base"],["field_angle","field_angle"],["field_checkbox","field_checkbox"],["field_colour","field_colour"],["field_date","field_date"],["field_dropdown","field_dropdown"],["field_dropdown_container","field_dropdown_container"],["field_dropdown_fixed_item","field_dropdown_fixed_item"],["field_dropdown_function","field_dropdown_function"],["field_dropdown_option_image","field_dropdown_option_image"],["field_dropdown_option_text","field_dropdown_option_text"],["field_dropdown_statement","field_dropdown_statement"],["field_dropdown_url","field_dropdown_url"],["field_dropdown_url_split","field_dropdown_url_split"],["field_dropdown_workspaces","field_dropdown_workspaces"],["field_image","field_image"],["field_input","field_input"],["field_label_serializable","field_label_serializable"],["field_number","field_number"],["field_static","field_static"],["field_variable","field_variable"],["generate_block_type","generate_block_type"],["generate_code","generate_code"],["generate_code_variable","generate_code_variable"],["generate_comment","generate_comment"],["generate_field_text","generate_field_text"],["generate_field_value2","generate_field_value2"],["generate_indent","generate_indent"],["generate_javascript","generate_javascript"],["generate_javascript_value","generate_javascript_value"],["generate_list_index","generate_list_index"],["generate_list_length","generate_list_length"],["generate_parent_field_value","generate_parent_field_value"],["generate_statements2","generate_statements2"],["generate_statements3","generate_statements3"],["generate_token","generate_token"],["generate_token_if_length","generate_token_if_length"],["generate_token_if_next_block","generate_token_if_next_block"],["generate_values2","generate_values2"],["input_dummy","input_dummy"],["input_statement","input_statement"],["input_value","input_value"],["lists_create_empty","lists_create_empty"],["lists_create_with","lists_create_with"],["lists_create_with_container","lists_create_with_container"],["lists_create_with_item","lists_create_with_item"],["lists_getIndex","lists_getIndex"],["lists_getSublist","lists_getSublist"],["lists_indexOf","lists_indexOf"],["lists_isEmpty","lists_isEmpty"],["lists_length","lists_length"],["lists_repeat","lists_repeat"],["lists_reverse","lists_reverse"],["lists_setIndex","lists_setIndex"],["lists_sort","lists_sort"],["lists_split","lists_split"],["logic_boolean","logic_boolean"],["logic_compare","logic_compare"],["logic_negate","logic_negate"],["logic_null","logic_null"],["logic_operation","logic_operation"],["logic_ternary","logic_ternary"],["math_arithmetic","math_arithmetic"],["math_atan2","math_atan2"],["math_change","math_change"],["math_constant","math_constant"],["math_constrain","math_constrain"],["math_modulo","math_modulo"],["math_number","math_number"],["math_number_property","math_number_property"],["math_on_list","math_on_list"],["math_random_float","math_random_float"],["math_random_int","math_random_int"],["math_round","math_round"],["math_single","math_single"],["math_trig","math_trig"],["procedures_callnoreturn","procedures_callnoreturn"],["procedures_callreturn","procedures_callreturn"],["procedures_defnoreturn","procedures_defnoreturn"],["procedures_defreturn","procedures_defreturn"],["procedures_ifreturn","procedures_ifreturn"],["procedures_mutatorarg","procedures_mutatorarg"],["procedures_mutatorcontainer","procedures_mutatorcontainer"],["text","text"],["text_append","text_append"],["text_changeCase","text_changeCase"],["text_charAt","text_charAt"],["text_count","text_count"],["text_create_join_container","text_create_join_container"],["text_create_join_item","text_create_join_item"],["text_getSubstring","text_getSubstring"],["text_indexOf","text_indexOf"],["text_isEmpty","text_isEmpty"],["text_join","text_join"],["text_length","text_length"],["text_multiline","text_multiline"],["text_print","text_print"],["text_prompt","text_prompt"],["text_prompt_ext","text_prompt_ext"],["text_replace","text_replace"],["text_reverse","text_reverse"],["text_trim","text_trim"],["toolbox_block","toolbox_block"],["toolbox_block_all","toolbox_block_all"],["toolbox_block_json","toolbox_block_json"],["toolbox_block_json_field","toolbox_block_json_field"],["toolbox_block_json_input","toolbox_block_json_input"],["toolbox_blocks","toolbox_blocks"],["toolbox_categories","toolbox_categories"],["toolbox_category","toolbox_category"],["toolbox_label","toolbox_label"],["toolbox_seperator","toolbox_seperator"],["toolbox_variable_category","toolbox_variable_category"],["type_boolean","type_boolean"],["type_group","type_group"],["type_group_container","type_group_container"],["type_group_item","type_group_item"],["type_list","type_list"],["type_null","type_null"],["type_number","type_number"],["type_other","type_other"],["type_string","type_string"],["variables_get","variables_get"],["variables_get_dynamic","variables_get_dynamic"],["variables_set","variables_set"],["variables_set_dynamic","variables_set_dynamic"]]),"TYPE");
    this.setPreviousStatement(true, "block");
    this.setNextStatement(true, "block");
    this.setColour(315);
 this.setTooltip("All existing blocks");
 this.setHelpUrl("");
  },

  /*
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var field;
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions && !field.variable_) // is dropdown and not a variable
        {
          var dropdown = Blockly.utils.xml.createElement('dropdown');
          dropdown.setAttribute('field', field.name);
        
          container.appendChild(dropdown)
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option = Blockly.utils.xml.createElement('option');
            option.setAttribute('text', options[i][0]);
            option.setAttribute('id', options[i][1]);
            dropdown.appendChild(option);
          }
        }
      }
    }
    return container;
  },
  saveExtraState: function() {
    var field;
    var state = {'dropdowns':[]};
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions && !field.variable_) // is dropdown and not a variable
        {
          var field_state = {'field':field.name, 'options' : []}
          state.dropdowns.push(field_state);
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option_state = {'text': options[i][0], 'id':options[i][1]}
            field_state.options.push(option_state)
          }
        }
      }
    }
    return state;
  },

  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {

    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'dropdown') {
        var field_name = childNode.getAttribute('field');
        var field = this.getField(field_name);
    
        var options = field.getOptions(false)
        var ids = options.map(option => option[1]);
        
        for (var j = 0, optionsElement; (optionsElement = childNode.childNodes[j]); j++) {
          if (optionsElement.nodeName.toLowerCase() == 'option') {
            var text = optionsElement.getAttribute('text');
            var id = optionsElement.getAttribute('id');
            if (!ids.includes(id)) {
              options.push([text,id])
            }
          }
        }
        field.savedOptionsSet = true;     
      }
    }
  },
  loadExtraState: function(state) {
    for (var i=0; i<state.dropdowns.length; i++)
    {
      var field_name = state.dropdowns[i].field;
      var field = this.getField(field_name);
      if (field.getOptions && !field.variable_) // is dropdown and not a variable
      { 
         var options = field.getOptions(false);
      }
      else
      {
        var options = []
      }
      var ids = options.map(option => option[1]);
      for (var j =0; j<state.dropdowns[i].options.length;j++)
      {
        var text = state.dropdowns[i].options[j].text;
        var id = state.dropdowns[i].options[j].id;
        if (!ids.includes(id)) {
          options.push([text,id])
        }
      }
      field.savedOptionsSet = true;
    }
  }



};

