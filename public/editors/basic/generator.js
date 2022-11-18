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
if (!Blockly.JSON) {
  Blockly.JSON = new Blockly.Generator('JSON');
  Blockly.JSON.ORDER_ATOMIC = 0;
}

Blockly.JSON.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JSON.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JSON['basic_list_value'] = function(block) {
  var code ='';
  var field = block.getField('VALUE');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
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