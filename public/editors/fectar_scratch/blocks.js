Blockly.Blocks['vec3static'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/north_east_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("direction")
        .appendField(new Blockly.FieldDropdown([["up","up"], ["forward","forward"], ["left","left"], ["right","right"], ["back","back"], ["down","down"]]), "VECTYPE");
    this.setOutput(true, ["Vector3", "direction"]);
    this.setColour(150);
 this.setTooltip("A pre-defined direction vector.");
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

Blockly.Blocks['vec3mag'] = {
  init: function() {
    this.appendValueInput("VECTOR")
        .setCheck("Vector3")
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/straighten_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("length of");
    this.setOutput(true, "Number");
    this.setColour(65);
 this.setTooltip("The magnitude (length) of the input vector.");
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

Blockly.Blocks['vec3norm'] = {
  init: function() {
    this.appendValueInput("VECTOR")
        .setCheck("Vector3")
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/crop_white_48dp.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
        .appendField("normalize");
    this.setOutput(true, ["Vector3", "direction", "position"]);
    this.setColour(150);
 this.setTooltip("Changes the input vector to have length 1, maintaining the direction.");
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

Blockly.Blocks['number'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0, null, ), "NUM");
    this.setOutput(true, "Number");
    this.setColour(65);
 this.setTooltip("Any number.");
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

Blockly.Blocks['vec3comp'] = {
  init: function() {
    this.appendValueInput("VECTOR")
        .setCheck("Vector3")
        .appendField(new Blockly.FieldDropdown([["X component","x"], ["Y component","y"], ["Z component","z"]]), "COMPONENT")
        .appendField("of");
    this.setOutput(true, "Number");
    this.setColour(65);
 this.setTooltip("One component of a vector.");
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

Blockly.Blocks['move'] = {
  init: function() {
    this.appendValueInput("DISTANCE")
        .setCheck("Number")
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/directions_run_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("move");
    this.appendValueInput("DIRECTION")
        .setCheck("direction")
        .appendField("in direction");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "function");
    this.setColour(210);
 this.setTooltip("Change the position relative to the spot's position.");
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

Blockly.Blocks['turn'] = {
  init: function() {
    this.appendValueInput("ANGLE")
        .setCheck("degree")
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/360_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("turn")
        .appendField(new Blockly.FieldDropdown([["↺",""], ["↻","-"]]), "CLOCK");
    this.appendDummyInput()
        .appendField("degrees");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "function");
    this.setColour(210);
 this.setTooltip("Turn the spot on its own axis.");
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

Blockly.Blocks['start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/play_circle_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Title")
        .appendField(new Blockly.FieldTextInput("My program", null, ), "TITLE");
    this.appendDummyInput()
        .appendField("Description")
        .appendField(new Blockly.FieldTextInput("My description", null, ), "DESC");
    this.appendStatementInput("STATEMENTS")
        .setCheck("preamble");
    this.setColour(345);
 this.setTooltip("Needed for all programs, creating the basic menu.");
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

Blockly.Blocks['goto'] = {
  init: function() {
    this.appendValueInput("POSITION")
        .setCheck("position")
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/edit_location_alt_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("go to position");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "function");
    this.setColour(210);
 this.setTooltip("Change the position of the spot to an absolute position.");
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

Blockly.Blocks['onClick'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/flag_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("when program spot clicked do:");
    this.appendStatementInput("STATEMENTS")
        .setCheck("function");
    this.setPreviousStatement(true, ["preamble", "event"]);
    this.setNextStatement(true, "event");
    this.setColour(60);
 this.setTooltip("When this spot is clicked, execute the blocks inside.");
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

Blockly.Blocks['forallspots'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/format_list_numbered_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("for all (other")
        .appendField(new Blockly.FieldCheckbox("TRUE", null, ), "OTHER")
        .appendField(") spots");
    this.appendStatementInput("STATEMENTS")
        .setCheck("function");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "function");
    this.setColour(230);
 this.setTooltip("For all spots in the space, optionally excluding the program spot, execute the blocks inside.");
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

Blockly.Blocks['plus'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck(["Number", "Vector3"]);
    this.appendValueInput("B")
        .setCheck(["Number", "Vector3"])
        .appendField("+");
    this.setInputsInline(true);
    this.setOutput(true, ["Number", "Vector3", "position", "direction"]);
    this.setColour(20);
 this.setTooltip("Addition for numbers and vectors.");
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

Blockly.Blocks['minus'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck(["Number", "Vector3"]);
    this.appendValueInput("B")
        .setCheck(["Number", "Vector3"])
        .appendField("-");
    this.setInputsInline(true);
    this.setOutput(true, ["Number", "Vector3", "position", "direction"]);
    this.setColour(20);
 this.setTooltip("Subtraction for numbers and vectors.");
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

Blockly.Blocks['times'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck(["Number", "Vector3"]);
    this.appendValueInput("B")
        .setCheck(["Number", "Vector3"])
        .appendField("×");
    this.setInputsInline(true);
    this.setOutput(true, ["Number", "Vector3", "position", "direction"]);
    this.setColour(20);
 this.setTooltip("Multiplication for numbers and vectors.");
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

Blockly.Blocks['divide'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck(["Number", "Vector3"]);
    this.appendValueInput("B")
        .setCheck("Number")
        .appendField("/");
    this.setInputsInline(true);
    this.setOutput(true, ["Number", "Vector3", "position", "direction"]);
    this.setColour(45);
 this.setTooltip("Division for numbers and vectors.");
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

Blockly.Blocks['spotSelection'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/check_box_white_48dp.png", 16, 16, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Add spot selection");
    this.setPreviousStatement(true, "preamble");
    this.setNextStatement(true, "preamble");
    this.setColour(345);
 this.setTooltip("Put this block at the top to add a spot selection option to the menu.");
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

Blockly.Blocks['presetPosition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/location_on_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField(new Blockly.FieldDropdown([["random","new Vector3(Math.random() * 6 - 3, Math.random() * 6 - 3, Math.random() * 6 - 3)"], ["camera","Space.camera.position"]]), "PRESET")
        .appendField("position");
    this.setOutput(true, ["Vector3", "position"]);
    this.setColour(120);
 this.setTooltip("A preset position, either randomly generated or from the environment.");
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

Blockly.Blocks['reset'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/undo_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("reset")
        .appendField(new Blockly.FieldDropdown([["this spot","spot"], ["all spots","Space"]]), "RESET");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "function");
    this.setColour(290);
 this.setTooltip("Reset this spots or all spots in the space.");
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

Blockly.Blocks['saySeconds'] = {
  init: function() {
    this.appendValueInput("SAY")
        .setCheck("String")
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/chat_bubble_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("say");
    this.appendValueInput("SAYSECONDS")
        .setCheck("Number")
        .appendField("for");
    this.appendDummyInput()
        .appendField("seconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "function");
    this.setColour(290);
 this.setTooltip("Make the spot say a message. A Text3D objects needs to exist and be selected in the menu.");
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

Blockly.Blocks['forSpotSelection'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/checklist_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("for spots in selection");
    this.appendStatementInput("STATEMENTS")
        .setCheck("function");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "function");
    this.setColour(230);
 this.setTooltip("For every spot selected in the menu, execute the blocks inside.");
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

Blockly.Blocks['sayText'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/chat_white_48dp.png", 16, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Add 'say' capability");
    this.setPreviousStatement(true, "preamble");
    this.setNextStatement(true, "preamble");
    this.setColour(345);
 this.setTooltip("Add the capability to say things to this spot. Select a Text3D from the menu.");
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

Blockly.Blocks['show'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/visibility_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("show spot");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "function");
    this.setColour(290);
 this.setTooltip("Show the relevant spot.");
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

Blockly.Blocks['hide'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/visibility_off_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("hide spot");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "function");
    this.setColour(290);
 this.setTooltip("Hide the relevant spot.");
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

Blockly.Blocks['logText'] = {
  init: function() {
    this.appendValueInput("LOG")
        .setCheck("String")
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/terminal_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Log text");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "function");
    this.setColour(315);
 this.setTooltip("A log block for debugging.");
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

Blockly.Blocks['glidePos'] = {
  init: function() {
    this.appendValueInput("SECONDS")
        .setCheck("Number")
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/moving_white_48dp.png", 20, 20, { alt: "*", flipRtl: "FALSE" }))
        .appendField("glide");
    this.appendValueInput("POSITION")
        .setCheck("position")
        .appendField("seconds to");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "function");
    this.setColour(210);
 this.setTooltip("Move the spot to the specified position within the specified duration.");
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

Blockly.Blocks['repeat'] = {
  init: function() {
    this.appendValueInput("SECONDS")
        .setCheck("Number")
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/replay_white_48dp.png", 20, 20, { alt: "*", flipRtl: "FALSE" }))
        .appendField("repeat every");
    this.appendDummyInput()
        .appendField("seconds");
    this.appendStatementInput("STATEMENTS")
        .setCheck("function");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "function");
    this.setColour(230);
 this.setTooltip("On the specified interval, execute the blocks inside.");
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

Blockly.Blocks['directionFromTo'] = {
  init: function() {
    this.appendValueInput("FROM")
        .setCheck("position")
        .appendField("direction from");
    this.appendValueInput("TO")
        .setCheck("position")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/north_east_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("to");
    this.setInputsInline(false);
    this.setOutput(true, ["Vector3", "direction"]);
    this.setColour(150);
 this.setTooltip("A direction from one position to another.");
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

Blockly.Blocks['faceCamera'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/video_camera_front_white_48dp.png", 20, 20, { alt: "*", flipRtl: "FALSE" }))
        .appendField(new Blockly.FieldDropdown([["do","Start(false)"], ["don't","Stop()"]]), "FACECAM")
        .appendField("face camera");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "function");
    this.setColour(290);
 this.setTooltip("Make the relevant spot face the camera.");
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

Blockly.Blocks['delay'] = {
  init: function() {
    this.appendValueInput("SECONDS")
        .setCheck("Number")
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/hourglass_bottom_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("after");
    this.appendDummyInput()
        .appendField("seconds");
    this.appendStatementInput("STATEMENTS")
        .setCheck("function");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "function");
    this.setColour(230);
 this.setTooltip("After the specified delay, execute the blocks inside.");
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

Blockly.Blocks['spotPosition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/location_on_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField(new Blockly.FieldDropdown([["this","spot"], ["program","globalSpot"]]), "SPOT")
        .appendField("spot position");
    this.setOutput(true, ["Vector3", "position"]);
    this.setColour(120);
 this.setTooltip("The position of the specified spot.");
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

Blockly.Blocks['positionInputs'] = {
  init: function() {
    this.appendValueInput("X")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/location_on_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("X:");
    this.appendValueInput("Y")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Y:");
    this.appendValueInput("Z")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Z:");
    this.setInputsInline(true);
    this.setOutput(true, ["Vector3", "position"]);
    this.setColour(120);
 this.setTooltip("A custom position vector, with number inputs.");
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

Blockly.Blocks['turnAbout'] = {
  init: function() {
    this.appendValueInput("ANGLE")
        .setCheck("degree")
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/360_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("turn")
        .appendField(new Blockly.FieldDropdown([["↺",""], ["↻","-"]]), "CLOCK");
    this.appendValueInput("POSITION")
        .setCheck("position")
        .appendField("degrees around");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "function");
    this.setColour(210);
 this.setTooltip("Turn around the given position's up axis, instead of its own up axis.");
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

Blockly.Blocks['scaleSpot'] = {
  init: function() {
    this.appendValueInput("SCALE")
        .setCheck("Number")
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/aspect_ratio_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("scale spot by");
    this.appendDummyInput();
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "function");
    this.setColour(290);
 this.setTooltip("Multiply the size of the spot by the given value.");
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

Blockly.Blocks['changexyz'] = {
  init: function() {
    this.appendValueInput("CHANGE")
        .setCheck("Number")
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/add_location_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("change")
        .appendField(new Blockly.FieldDropdown([["X","right"], ["Y","up"], ["Z","forward"]]), "COMPONENT")
        .appendField("by");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "function");
    this.setColour(210);
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

Blockly.Blocks['setxyz'] = {
  init: function() {
    this.appendValueInput("SET")
        .setCheck("Number")
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/edit_location_alt_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("set")
        .appendField(new Blockly.FieldDropdown([["X","right"], ["Y","up"], ["Z","forward"]]), "COMPONENT")
        .appendField("to");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "function");
    this.setColour(210);
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

Blockly.Blocks['recall'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/keyboard_return_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("if out of bounds, bring back");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "function");
    this.setColour(210);
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

Blockly.Blocks['say'] = {
  init: function() {
    this.appendValueInput("SAY")
        .setCheck("String")
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/chat_bubble_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("say");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "function");
    this.setColour(290);
 this.setTooltip("Make the spot say a message. A Text3D objects needs to exist and be selected in the menu.");
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

Blockly.Blocks['onStart'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/flag_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("when program starts do:");
    this.appendStatementInput("STATEMENTS")
        .setCheck("function");
    this.setPreviousStatement(true, ["preamble", "event"]);
    this.setNextStatement(true, "event");
    this.setColour(60);
 this.setTooltip("When this spot is clicked, execute the blocks inside.");
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

Blockly.Blocks['presetDirections'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/north_east_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField(new Blockly.FieldDropdown([["random direction","new Vector3(Math.random(), Math.random(), Math.random()).normalized"], ["camera direction","Space.camera.forward"]]), "PRESET");
    this.setOutput(true, ["Vector3", "direction"]);
    this.setColour(150);
 this.setTooltip("A preset direction. Randomly generated or taken from the environment.");
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

Blockly.Blocks['mod'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck("Number");
    this.appendValueInput("B")
        .setCheck("Number")
        .appendField("mod");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(65);
 this.setTooltip("A remainder operation for numbers.");
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

Blockly.Blocks['round'] = {
  init: function() {
    this.appendValueInput("NUM")
        .setCheck("Number")
        .appendField("round");
    this.setOutput(true, "Number");
    this.setColour(65);
 this.setTooltip("Rounding to the nearest integer.");
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

Blockly.Blocks['abs'] = {
  init: function() {
    this.appendValueInput("NUM")
        .setCheck("Number")
        .appendField("absolute");
    this.setOutput(true, "Number");
    this.setColour(65);
 this.setTooltip("The absolute value of a number.");
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

Blockly.Blocks['varText'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["this spot","spot"], ["program spot","globalSpot"]]), "VAR")
        .appendField(new Blockly.FieldDropdown([["position","position.toString()"], ["rotation","rotation.toString()"], ["Euler rotation","rotationEuler.toString()"], ["ID","id"], ["name","name"], ["scale","scale.toString()"], ["type","type"], ["is locked to camera","isAlwaysFacingCamera"], ["is paused","isPausing"], ["is visible","isVisible"]]), "VAL");
    this.setOutput(true, "String");
    this.setColour(315);
 this.setTooltip("Various attributes of spots as strings.");
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

Blockly.Blocks['logVal'] = {
  init: function() {
    this.appendValueInput("VAL")
        .setCheck(null)
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/terminal_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Log");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "function");
    this.setColour(315);
 this.setTooltip("A log block for debugging.");
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

Blockly.Blocks['wait'] = {
  init: function() {
    this.appendValueInput("SECONDS")
        .setCheck("Number")
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/hourglass_bottom_white_48dp.png", 18, 18, { alt: "*", flipRtl: "FALSE" }))
        .appendField("wait for");
    this.appendDummyInput()
        .appendField("seconds");
    this.setColour(230);
 this.setTooltip("deprecated");
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

Blockly.Blocks['repeatTimes'] = {
  init: function() {
    this.appendValueInput("TIMES")
        .setCheck("Number")
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/images/icons/material/system/1x/replay_white_48dp.png", 20, 20, { alt: "*", flipRtl: "FALSE" }))
        .appendField("repeat");
    this.appendDummyInput()
        .appendField("times");
    this.appendStatementInput("STATEMENTS")
        .setCheck("function");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "function");
    this.setColour(230);
 this.setTooltip("On the specified interval, execute the blocks inside.");
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

Blockly.Blocks['degree'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldAngle(15), "DEG");
    this.setOutput(true, "degree");
    this.setColour(65);
 this.setTooltip("Any degree from 0 to 360.");
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

Blockly.Blocks['ifthen'] = {
  init: function() {
    this.appendValueInput("CONDITION")
        .setCheck("Boolean")
        .appendField("if");
    this.appendStatementInput("STATEMENTS")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "function");
    this.setColour(165);
 this.setTooltip("If condition, do stuff.");
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

Blockly.Blocks['ifthenelse'] = {
  init: function() {
    this.appendValueInput("CONDITION")
        .setCheck("Boolean")
        .appendField("if");
    this.appendStatementInput("STATEMENTS")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("else");
    this.appendStatementInput("ELSE")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "function");
    this.setColour(165);
 this.setTooltip("If condition, do stuff, else, do other stuff.");
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

Blockly.Blocks['comparison'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["=","==="], ["≠","!=="], [">",">"], ["<","<"], ["≥",">="], ["≤","<="]]), "CMP");
    this.appendValueInput("B")
        .setCheck(null);
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(180);
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

Blockly.Blocks['string'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("Hello!", null, ), "TEXT");
    this.setOutput(true, "String");
    this.setColour(315);
 this.setTooltip("Any string.");
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

Blockly.Blocks['concat'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck("String");
    this.appendValueInput("B")
        .setCheck("String")
        .appendField("join");
    this.setInputsInline(true);
    this.setOutput(true, "String");
    this.setColour(315);
 this.setTooltip("Concatenate any two values into a string.");
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

