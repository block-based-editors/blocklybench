import * as Blockly from 'blockly';

Blockly.Blocks['generate_code'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("YAML", null, ), "LANGUAGE")
        .appendField("code for")
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
                  options.push(['no blocks in factory yet','NONE'])
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
    this.appendStatementInput("CODE")
        .setCheck(null);
    this.setColour(230);
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
      var options = field.getOptions(false);
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
Blockly.Blocks['generate_code_variable'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("YAML", null, ), "LANGUAGE")
        .appendField("code for")
        .appendField(new Blockly.FieldDropdown([
          ["variables_get","variables_get"],
          ["variables_set","variables_set"],
        ]
        ), "TYPE");
    this.appendStatementInput("CODE")
        .setCheck(null);
    this.setColour(230);
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
      var options = field.getOptions(false);
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
Blockly.Blocks['generate_token_value'] = {
  init: function() {
    this.appendValueInput("TOKEN")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
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

Blockly.Blocks['generate_token'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("...;\\n", null, ), "TOKEN");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
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
      var options = field.getOptions(false);
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

Blockly.Blocks['generate_token_if_next_block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Has next block?")
        .appendField(new Blockly.FieldTextInput(",", null, ), "TOKEN");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
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


Blockly.Blocks['generate_list_length'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Length of")
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

                    // get the parent block for this type, then the surrounding block for this field
                    // than the type field for the code_generation block
                    // than find in the factory_base blocks with name 'block_type'
                    // than find the all descendants (fields in the factory base)
                    var source_block = this.getSourceBlock()
                    
                    var parent = null;
                    var all_blocks = []
                    if (source_block)
                    {  parent = source_block.getSurroundParent()
                    }    
                    if (parent)
                    {
                        var field_type = parent.getField('TYPE')
                        var block_type = null;
                        if (field_type) { block_type = field_type.getText()}

                        var factory_blocks = workspace.getBlocksByType('factory_base').filter(block => block.getFieldValue('NAME')==block_type)
                        // probably only one block, but a temp copy can exist                         
                        for(var index=0;index<factory_blocks.length;index++)
                        {
                            Array.prototype.push.apply(all_blocks, factory_blocks[index].getDescendants())
                        }

                    }
                    
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
                  options.push(['attach first','NONE'])
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
            }), "STATEMENTS");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
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
      var options = field.getOptions(false);
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

Blockly.Blocks['generate_list_index'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Index of this child");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
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
      var options = field.getOptions(false);
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

Blockly.Blocks['generate_comment'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Comment ");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
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
      var options = field.getOptions(false);
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

Blockly.Blocks['generate_field_value2'] = {
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
                var fields = ["FIELDNAME","FIELDNAME1","FIELDNAME2"];
                var workspace_name = "Factory";
                var workspaces = Blockly.Workspace.getAll();
                for (var i=0; i< workspaces.length;i++) {
                  var workspace= workspaces[i]

                  if (workspace.name == workspace_name)
                  {
                    // get the parent block for this type, then the surrounding block for this field
                    // than the type field for the code_generation block
                    // than find in the factory_base blocks with name 'block_type'
                    // than find the all descendants (fields in the factory base)
                    var source_block = this.getSourceBlock()
                    
                    var parent = null;
                    var all_blocks = []
                    if (source_block)
                    {  parent = source_block.getSurroundParent()
                    }    
                    if (parent)
                    {
                        var field_type = parent.getField('TYPE')
                        var block_type = null;
                        if (field_type) { block_type = field_type.getText()}

                        var factory_blocks = workspace.getBlocksByType('factory_base').filter(block => block.getFieldValue('NAME')==block_type)
                        // probably only one block, but a temp copy can exist                         
                        for(var index=0;index<factory_blocks.length;index++)
                        {
                            Array.prototype.push.apply(all_blocks, factory_blocks[index].getDescendants())
                        }

                    }
                    
                    for(var j=0;j<all_blocks.length;j++)
                    {
                      for (var k=0; k<fields.length;k++)
                      {
                        var field_value = all_blocks[j].getFieldValue(fields[k])
                        if (field_value)
                        {
                          var index = ids.indexOf(all_blocks[j].id+k)
                          if (index !== -1) {
                            // should pop the old options as rename of field_value 
                            ids.splice(index, 1)
                            options.splice(index,1)                        
                          }
                          options.push([field_value, all_blocks[j].id+k])
                        }
                      }
                    }
                  }
                }
                options.sort();
                
                if (options.length==0)
                {
                  options.push(['attach first','NONE'])
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
            }), "FIELDS");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
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
      var options = field.getOptions(false);
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

Blockly.Blocks['generate_field_text'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Field ID")
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
                    // get the parent block for this type, then the surrounding block for this field
                    // than the type field for the code_generation block
                    // than find in the factory_base blocks with name 'block_type'
                    // than find the all descendants (fields in the factory base)
                    var source_block = this.getSourceBlock()
                    
                    var parent = null;
                    var all_blocks = []
                    if (source_block)
                    {  
                      parent = source_block.getSurroundParent()
                    }    
                    if (parent)
                    {
                        var field_type = parent.getField('TYPE')
                        var block_type = null;
                        if (field_type) { block_type = field_type.getText()}

                        var factory_blocks = workspace.getBlocksByType('factory_base').filter(block => block.getFieldValue('NAME')==block_type)
                        // probably only one block, but a temp copy can exist                         
                        for(var index=0;index<factory_blocks.length;index++)
                        {
                            Array.prototype.push.apply(all_blocks, factory_blocks[index].getDescendants())
                        }

                    }
                    
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
                  options.push(['attach first','NONE'])
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
            }), "FIELDS");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("For dropdown filed this will return the ID.");
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
      var options = field.getOptions(false);
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

Blockly.Blocks['generate_statements3'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Statements")
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
                    // get the parent block for this type, then the surrounding block for this field
                    // than the type field for the code_generation block
                    // than find in the factory_base blocks with name 'block_type'
                    // than find the all descendants (fields in the factory base)
                    var source_block = this.getSourceBlock()
                    
                    var parent = null;
                    var all_blocks = []
                    if (source_block)
                    {  
                        parent = source_block.getSurroundParent()
                    }    
                    if (parent)
                    {
                        var field_type = parent.getField('TYPE')
                        var block_type = null;
                        if (field_type) { block_type = field_type.getText()}

                        var factory_blocks = workspace.getBlocksByType('factory_base').filter(block => block.getFieldValue('NAME')==block_type)
                        // probably only one block, but a temp copy can exist                         
                        for(var index=0;index<factory_blocks.length;index++)
                        {
                            Array.prototype.push.apply(all_blocks, factory_blocks[index].getDescendants())
                        }

                    }
                    
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
                  options.push(['attach first','NONE'])
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
            }), "STATEMENTS")
        .appendField("Indent")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "INDENT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
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


Blockly.Blocks['generate_statements2'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Statements")
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
                    // get the parent block for this type, then the surrounding block for this field
                    // than the type field for the code_generation block
                    // than find in the factory_base blocks with name 'block_type'
                    // than find the all descendants (fields in the factory base)
                    var source_block = this.getSourceBlock()
                    
                    var parent = null;
                    var all_blocks = []
                    if (source_block)
                    {  
                        parent = source_block.getSurroundParent()
                    }    
                    if (parent)
                    {
                        var field_type = parent.getField('TYPE')
                        var block_type = null;
                        if (field_type) { block_type = field_type.getText()}

                        var factory_blocks = workspace.getBlocksByType('factory_base').filter(block => block.getFieldValue('NAME')==block_type)
                        // probably only one block, but a temp copy can exist                         
                        for(var index=0;index<factory_blocks.length;index++)
                        {
                            Array.prototype.push.apply(all_blocks, factory_blocks[index].getDescendants())
                        }

                    }
                    
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
                  options.push(['attach first','NONE'])
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
            }), "STATEMENTS");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
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
      var options = field.getOptions(false);
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

Blockly.Blocks['generate_values2'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Value")
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

                    // get the parent block for this type, then the surrounding block for this field
                    // than the type field for the code_generation block
                    // than find in the factory_base blocks with name 'block_type'
                    // than find the all descendants (fields in the factory base)
                    var source_block = this.getSourceBlock()
                    
                    var parent = null;
                    var all_blocks = []
                    if (source_block)
                    {  
                      parent = source_block.getSurroundParent()
                    }    
                    if (parent)
                    {
                        var field_type = parent.getField('TYPE')
                        var block_type = null;
                        if (field_type) { block_type = field_type.getText()}

                        var factory_blocks = workspace.getBlocksByType('factory_base').filter(block => block.getFieldValue('NAME')==block_type)
                        // probably only one block, but a temp copy can exist                         
                        for(var index=0;index<factory_blocks.length;index++)
                        {
                            Array.prototype.push.apply(all_blocks, factory_blocks[index].getDescendants())
                        }

                    }
                    
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
                  options.push(['attach first','NONE'])
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
            }), "VALUE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
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
      var options = field.getOptions(false);
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

Blockly.Blocks['generate_javascript'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("var obj = null;", null, ), "JAVASCRIPT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(10);
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
      var options = field.getOptions(false);
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


Blockly.Blocks['generate_parent_field_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Surrounding Parent Field")
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
            }), "FIELDS");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
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




Blockly.Blocks['generate_indent'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Indent")
        .appendField(new Blockly.FieldTextInput("  ", null, ), "INDENT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
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



Blockly.Blocks['generate_block_type'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("block_type");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
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
      var options = field.getOptions(false);
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



Blockly.Blocks['generate_token_if_length'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Length of")
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
            }), "STATEMENTS")
        .appendField(new Blockly.FieldDropdown([["==","=="], ["<=","<="], [">=",">="], ["!=","!="], ["<","<"], [">",">"]]), "OPERATOR")
        .appendField(new Blockly.FieldTextInput("0", null, ), "VALUE")
        .appendField(":")
        .appendField(new Blockly.FieldTextInput("...\\n", null, ), "TOKEN");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
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


Blockly.Blocks['generate_javascript_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("any_value_or_function", null, ), "JAVASCRIPT");
    this.setOutput(true, null);
    this.setColour(10);
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


