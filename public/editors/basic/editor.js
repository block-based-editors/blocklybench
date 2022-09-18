Blockly.Blocks['basic_list'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("list");
    this.appendStatementInput("LIST")
        .setCheck("value");
    this.setPreviousStatement(true, "value");
    this.setNextStatement(true, "value");
    this.setColour(120);
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

Blockly.Blocks['model_cpd_name_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable("CPD_NAME", null, ), "KEY")
        .appendField(":")
        .appendField(new Blockly.FieldTextInput("DIVEIN", null, ), "VALUE");
    this.setPreviousStatement(true, "key_value");
    this.setNextStatement(true, "key_value");
    this.setColour(120);
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

Blockly.Blocks['basic_dict'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("dict");
    this.appendStatementInput("LIST")
        .setCheck("key_value");
    this.setPreviousStatement(true, "value");
    this.setNextStatement(true, "value");
    this.setColour(120);
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

Blockly.Blocks['basic_list_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("list_value", null, ), "VALUE");
    this.setPreviousStatement(true, "value");
    this.setNextStatement(true, "value");
    this.setColour(120);
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

Blockly.Blocks['basic_key_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("key", null, ), "KEY")
        .appendField(":")
        .appendField(new Blockly.FieldTextInput("value", null, ), "VALUE");
    this.setPreviousStatement(true, "key_value");
    this.setNextStatement(true, "key_value");
    this.setColour(120);
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

Blockly.Blocks['basic_key_list'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("key", null, ), "KEY")
        .appendField(": list ");
    this.appendStatementInput("LIST")
        .setCheck("value");
    this.setPreviousStatement(true, "key_value");
    this.setNextStatement(true, "key_value");
    this.setColour(120);
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

Blockly.Blocks['basic_key_dict'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("key", null, ), "KEY")
        .appendField(": dict");
    this.appendStatementInput("LIST")
        .setCheck("key_value");
    this.setPreviousStatement(true, "key_value");
    this.setNextStatement(true, "key_value");
    this.setColour(120);
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

if (!Blockly.JavaScript) {
  Blockly.JavaScript = new Blockly.Generator('JavaScript');
  Blockly.JavaScript.ORDER_ATOMIC = 0;
}

Blockly.JavaScript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JavaScript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JavaScript['basic_key_dict'] = function(block) {
  var code ='';
  code += '"';
  var field = block.getField('KEY');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '" : "';
  code += 'basic_key_dict'
  code += '", \n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.JSON) {
  Blockly.JSON = new Blockly.Generator('JSON');
  Blockly.JSON.ORDER_ATOMIC = 0;
}

Blockly.JSON.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JSON.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JSON['basic_key_list'] = function(block) {
  var code ='';
  code += '"';
  var field = block.getField('KEY');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '" : "';
  code += 'basic_key_list'
  code += '," # key_value with KEY = "';
  var field = block.getField('KEY');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '" should create block with type: ';
  code += 'basic_key_list'
  code += '\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.JSON.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.JSON) {
  Blockly.JSON = new Blockly.Generator('JSON');
  Blockly.JSON.ORDER_ATOMIC = 0;
}

Blockly.JSON.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JSON.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JSON['basic_dict'] = function(block) {
  var code ='';
  code += '{\n';
  code += Blockly.JSON.statementToCode(block, 'LIST');
  code += '}';
  if(block.getNextBlock()) {code += ","};
  code += '\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.JSON.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.YAML) {
  Blockly.YAML = new Blockly.Generator('YAML');
  Blockly.YAML.ORDER_ATOMIC = 0;
}

Blockly.YAML.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.YAML.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.YAML['basic_dict'] = function(block) {
  var code ='';
  code += Blockly.YAML.statementToCode(block, 'LIST');

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.YAML.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.JavaScript) {
  Blockly.JavaScript = new Blockly.Generator('JavaScript');
  Blockly.JavaScript.ORDER_ATOMIC = 0;
}

Blockly.JavaScript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JavaScript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JavaScript['basic_dict'] = function(block) {
  var code ='';
  code += Blockly.JavaScript.statementToCode(block, 'LIST');

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.JavaScript) {
  Blockly.JavaScript = new Blockly.Generator('JavaScript');
  Blockly.JavaScript.ORDER_ATOMIC = 0;
}

Blockly.JavaScript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JavaScript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JavaScript['basic_key_value'] = function(block) {
  var code ='';
  code += '"';
  var field = block.getField('KEY');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '" : "';
  code += 'basic_key_value'
  code += '", ';
  code += '\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.JSON) {
  Blockly.JSON = new Blockly.Generator('JSON');
  Blockly.JSON.ORDER_ATOMIC = 0;
}

Blockly.JSON.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JSON.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JSON['basic_key_value'] = function(block) {
  var code ='';
  code += '"';
  var field = block.getField('KEY');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '" : "';
  var field = block.getField('VALUE');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '"';
  if(block.getNextBlock()) {code += ","};
  code += '\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.JSON.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.YAML) {
  Blockly.YAML = new Blockly.Generator('YAML');
  Blockly.YAML.ORDER_ATOMIC = 0;
}

Blockly.YAML.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.YAML.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.YAML['basic_key_value'] = function(block) {
  var code ='';
  var field = block.getField('KEY');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += ' : ';
  var field = block.getField('VALUE');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.YAML.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.JSON) {
  Blockly.JSON = new Blockly.Generator('JSON');
  Blockly.JSON.ORDER_ATOMIC = 0;
}

Blockly.JSON.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JSON.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JSON['basic_key_dict'] = function(block) {
  var code ='';
  code += '"';
  var field = block.getField('KEY');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '": {\n';
  code += Blockly.JSON.statementToCode(block, 'LIST');
  code += '}';
  if(block.getNextBlock()) {code += ","};
  code += '\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.JSON.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.YAML) {
  Blockly.YAML = new Blockly.Generator('YAML');
  Blockly.YAML.ORDER_ATOMIC = 0;
}

Blockly.YAML.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.YAML.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.YAML['basic_key_dict'] = function(block) {
  var code ='';
  var field = block.getField('KEY');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += ':\n';
  code += Blockly.YAML.statementToCode(block, 'LIST');

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.YAML.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.YAML) {
  Blockly.YAML = new Blockly.Generator('YAML');
  Blockly.YAML.ORDER_ATOMIC = 0;
}

Blockly.YAML.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.YAML.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.YAML['basic_key_list'] = function(block) {
  var code ='';
  var field = block.getField('KEY');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += ':\n';
  code += Blockly.YAML.statementToCode(block, 'LIST');

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.YAML.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.JSON) {
  Blockly.JSON = new Blockly.Generator('JSON');
  Blockly.JSON.ORDER_ATOMIC = 0;
}

Blockly.JSON.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JSON.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JSON['basic_key_list'] = function(block) {
  var code ='';
  code += '"';
  var field = block.getField('KEY');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '" : [\n';
  code += Blockly.JSON.statementToCode(block, 'LIST');
  code += ']\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.JSON.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.JSON) {
  Blockly.JSON = new Blockly.Generator('JSON');
  Blockly.JSON.ORDER_ATOMIC = 0;
}

Blockly.JSON.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JSON.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JSON['basic_list'] = function(block) {
  var code ='';
  code += '[\n';
  code += Blockly.JSON.statementToCode(block, 'LIST');
  code += ']';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.JSON.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.JavaScript) {
  Blockly.JavaScript = new Blockly.Generator('JavaScript');
  Blockly.JavaScript.ORDER_ATOMIC = 0;
}

Blockly.JavaScript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JavaScript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JavaScript['basic_list'] = function(block) {
  var code ='';
  code += Blockly.JavaScript.statementToCode(block, 'LIST');

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.YAML) {
  Blockly.YAML = new Blockly.Generator('YAML');
  Blockly.YAML.ORDER_ATOMIC = 0;
}

Blockly.YAML.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.YAML.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.YAML['basic_list'] = function(block) {
  var code ='';
  code += Blockly.YAML.statementToCode(block, 'LIST');

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.YAML.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.YAML) {
  Blockly.YAML = new Blockly.Generator('YAML');
  Blockly.YAML.ORDER_ATOMIC = 0;
}

Blockly.YAML.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.YAML.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.YAML['basic_list_value'] = function(block) {
  var code ='';
  code += '- ';
  var field = block.getField('VALUE');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.YAML.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.JavaScript) {
  Blockly.JavaScript = new Blockly.Generator('JavaScript');
  Blockly.JavaScript.ORDER_ATOMIC = 0;
}

Blockly.JavaScript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JavaScript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JavaScript['basic_list_value'] = function(block) {
  var code ='';
  code += '- ';
  var field = block.getField('VALUE');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Loading and saving blocks with localStorage and cloud storage.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

// Create a namespace.
var BlocklyStorage = {};



BlocklyStorage.HTTPREQUEST_ERROR = 'There was a problem with the request.\n';
BlocklyStorage.LINK_ALERT = 'Share your blocks with this link:\n\n%1';
BlocklyStorage.HASH_ERROR = 'Sorry, "%1" doesn\'t correspond with any saved Blockly file.';
BlocklyStorage.XML_ERROR = 'Could not load your saved file.\n' +
		'Perhaps it was created with a different version of Blockly?';

/**
 * Backup code blocks to localStorage.
 * @param {!Blockly.WorkspaceSvg} workspace Workspace.
 * @private
 */
BlocklyStorage.backupBlocks_ = function(workspace, id) {
  if ('localStorage' in window) {
    var json_text = Blockly.serialization.workspaces.save(workspace);
    // Gets the current URL, not including the hash.
    var url = window.location.href.split('#')[0]+id+'.json';
    window.localStorage.setItem(url, JSON.stringify(json_text));
  }
};

/**
 * Bind the localStorage backup function to the unload event.
 * @param {Blockly.WorkspaceSvg=} opt_workspace Workspace.
 */
BlocklyStorage.backupOnUnload = function(opt_workspace,id) {
  var workspace = opt_workspace || Blockly.getMainWorkspace();
  window.addEventListener('unload',
      function() {BlocklyStorage.backupBlocks_(workspace,id);}, false);
};

/**
 * Restore code blocks from localStorage.
 * @param {Blockly.WorkspaceSvg=} opt_workspace Workspace.
 */
BlocklyStorage.restoreBlocks = function(opt_workspace, id) {
  var url = window.location.href.split('#')[0];
  if ('localStorage' in window && window.localStorage[url+id+'.json']) {
    var workspace = opt_workspace || Blockly.getMainWorkspace();
    var json = JSON.parse(window.localStorage[url+id+'.json']);
    Blockly.serialization.workspaces.load(json, workspace);
   }
};

/**
 * Save blocks to database and return a link containing key to XML.
 * @param {Blockly.WorkspaceSvg=} opt_workspace Workspace.
 */
BlocklyStorage.link = function(opt_workspace, editor) {
  var workspace = opt_workspace || Blockly.getMainWorkspace();
  var xml = Blockly.Xml.workspaceToDom(workspace, true);
  // Remove x/y coordinates from XML if there's only one block stack.
  // There's no reason to store this, removing it helps with anonymity.
  if (workspace.getTopBlocks(false).length == 1 && xml.querySelector) {
    var block = xml.querySelector('block');
    if (block) {
      block.removeAttribute('x');
      block.removeAttribute('y');
    }
  }
  var data = Blockly.Xml.domToText(xml);
  BlocklyStorage.makeRequest_('/storage', 'xml', data, workspace, editor);
};

/**
 * Retrieve XML text from database using given key.
 * @param {string} key Key to XML, obtained from href.
 * @param {Blockly.WorkspaceSvg=} opt_workspace Workspace.
 */
BlocklyStorage.retrieveXml = function(key, opt_workspace, editor) {
  var workspace = opt_workspace || Blockly.getMainWorkspace();
  BlocklyStorage.makeRequest_('/storage', 'key', key, workspace, editor);
};

/**
 * Global reference to current AJAX request.
 * @type {XMLHttpRequest}
 * @private
 */
BlocklyStorage.httpRequest_ = null;

/**
 * Fire a new AJAX request.
 * @param {string} url URL to fetch.
 * @param {string} name Name of parameter.
 * @param {string} content Content of parameter.
 * @param {!Blockly.WorkspaceSvg} workspace Workspace.
 * @private
 */
BlocklyStorage.makeRequest_ = function(url, name, content, workspace, editor) {
  if (BlocklyStorage.httpRequest_) {
    // AJAX call is in-flight.
    BlocklyStorage.httpRequest_.abort();
  }
  BlocklyStorage.httpRequest_ = new XMLHttpRequest();
  BlocklyStorage.httpRequest_.name = name;
  BlocklyStorage.httpRequest_.onreadystatechange =
      BlocklyStorage.handleRequest_;
  BlocklyStorage.httpRequest_.open('POST', url);
  BlocklyStorage.httpRequest_.setRequestHeader('Content-Type',
      'application/x-www-form-urlencoded');
  BlocklyStorage.httpRequest_.send(name + '=' + encodeURIComponent(content)+ '&workspace=' + encodeURIComponent(workspace.name));
  BlocklyStorage.httpRequest_.workspace = workspace;
};

/**
 * Callback function for AJAX call.
 * @private
 */
BlocklyStorage.handleRequest_ = function() {
  if (BlocklyStorage.httpRequest_.readyState == 4) {
    if (BlocklyStorage.httpRequest_.status != 200) {
      BlocklyStorage.alert(BlocklyStorage.HTTPREQUEST_ERROR + '\n' +
          'httpRequest_.status: ' + BlocklyStorage.httpRequest_.status);
    } else {
      var data = BlocklyStorage.httpRequest_.responseText.trim();
      if (BlocklyStorage.httpRequest_.name == 'xml') {
        window.location.hash = data;
        BlocklyStorage.alert(BlocklyStorage.LINK_ALERT.replace('%1',
            window.location.href));
      } else if (BlocklyStorage.httpRequest_.name == 'key') {
        if (!data.length) {
          BlocklyStorage.alert(BlocklyStorage.HASH_ERROR.replace('%1',
              window.location.hash));
        } else {
          BlocklyStorage.loadXml_(data, BlocklyStorage.httpRequest_.workspace);
        }
      }
      BlocklyStorage.monitorChanges_(BlocklyStorage.httpRequest_.workspace);
    }
    BlocklyStorage.httpRequest_ = null;
  }
};

/**
 * Start monitoring the workspace.  If a change is made that changes the XML,
 * clear the key from the URL.  Stop monitoring the workspace once such a
 * change is detected.
 * @param {!Blockly.WorkspaceSvg} workspace Workspace.
 * @private
 */
BlocklyStorage.monitorChanges_ = function(workspace) {
  var startXmlDom = Blockly.Xml.workspaceToDom(workspace);
  var startXmlText = Blockly.Xml.domToText(startXmlDom);
  function change() {
    var xmlDom = Blockly.Xml.workspaceToDom(workspace);
    var xmlText = Blockly.Xml.domToText(xmlDom);
    if (startXmlText != xmlText) {
      window.location.hash = '';
      workspace.removeChangeListener(change);
    }
  }
  workspace.addChangeListener(change);
};

/**
 * Load blocks from XML.
 * @param {string} xml Text representation of XML.
 * @param {!Blockly.WorkspaceSvg} workspace Workspace.
 * @private
 */
BlocklyStorage.loadXml_ = function(xml, workspace) {
  try {
    xml = Blockly.Xml.textToDom(xml);
  } catch (e) {
    BlocklyStorage.alert(BlocklyStorage.XML_ERROR + '\nXML: ' + xml);
    return;
  }
  // Clear the workspace to avoid merge.
  workspace.clear();
  Blockly.Xml.domToWorkspace(xml, workspace);
};

/**
 * Present a text message to the user.
 * Designed to be overridden if an app has custom dialogs, or a butter bar.
 * @param {string} message Text to alert.
 */
BlocklyStorage.alert = function(message) {
  window.alert(message);
};

toolbox = {
 "kind": "flyoutToolbox",
 "contents": [
  {
    "kind": "block",
    "type": "basic_list"
  },
  {
    "kind": "block",
    "type": "basic_dict"
  },
  {
    "kind": "block",
    "type": "basic_list_value"
  },
  {
    "kind": "block",
    "type": "basic_key_value"
  },
  {
    "kind": "block",
    "type": "basic_key_list"
  },
  {
    "kind": "block",
    "type": "basic_key_dict"
  },
 ]
};
    




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


