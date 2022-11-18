if (!Blockly.JSON) {
  Blockly.JSON = new Blockly.Generator('JSON');
  Blockly.JSON.ORDER_ATOMIC = 0;
}

Blockly.JSON.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JSON.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JSON['toolbox_block'] = function(block) {
  var code ='';
  if (block.getSurroundParent() && block.getSurroundParent().type!="toolbox_block_json_input") {
  code += '{\n  "kind": "block",\n  "type": "';
  var field = block.getField('TYPE');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '"\n},\n';
  } else {
  code += '{\n  "block": {\n    "type": "';
  var field = block.getField('TYPE');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '",\n  }\n},\n';
  }

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

Blockly.JSON['toolbox_block_all'] = function(block) {
  var code ='';
  if (block.getSurroundParent() && block.getSurroundParent().type!="toolbox_block_json_input") {
  code += '{\n  "kind": "block",\n  "type": "';
  var field = block.getField('TYPE');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '"\n},\n';
  } else {
  code += '{\n  "block": {\n    "type": "';
  var field = block.getField('TYPE');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '",\n  }\n},\n';
  }

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

Blockly.JSON['toolbox_block_json'] = function(block) {
  var code ='';
  if (block.getSurroundParent() && block.getSurroundParent().type!="toolbox_block_json_input") {
  code += '{\n  "kind": "block",\n  "type": \"';
  var field = block.getField('TYPE');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '", \n  "fields": {\n';
  code += Blockly.JSON.statementToCode(block, 'FIELDS');
  code += '  },\n';
  code += '  "inputs": {\n';
  code += Blockly.JSON.statementToCode(block, 'INPUTS');
  code += '  }\n},\n';
  } else {
  code += '{\n  "block": {\n    "type": "';
  var field = block.getField('TYPE');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '", \n    "fields": {\n';
  code += Blockly.JSON.statementToCode(block, 'FIELDS');
  code += '    },\n';
  code += '    "inputs": {\n';
  code += Blockly.JSON.statementToCode(block, 'INPUTS');
  code += '    }\n  },\n';
  code += '},\n';
  }

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
code += '{\n  "kind": "block",\n  "type": \"';

if (!Blockly.JSON) {
  Blockly.JSON = new Blockly.Generator('JSON');
  Blockly.JSON.ORDER_ATOMIC = 0;
}

Blockly.JSON.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JSON.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JSON['toolbox_block_json_field'] = function(block) {
  var code ='';
  code += '  "';
  var field = block.getField('NAME');
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
  code += '",\n';

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

Blockly.JSON['toolbox_block_json_input'] = function(block) {
  var code ='';
  code += '  "';
  var field = block.getField('NAME');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '" :';
  code += Blockly.JSON.statementToCode(block, 'BLOCKS');
  code += '';

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

Blockly.JSON['toolbox_variable_category'] = function(block) {
  var code ='';
  code += '{\n   "kind": "category",\n   "name": "Variables",\n   "custom": "VARIABLE"\n},';

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

Blockly.JSON['toolbox_seperator'] = function(block) {
  var code ='';
  code += '{ \n  "kind": "sep",\n  "gap": "';
  var field = block.getField('GAP');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '"\n},\n';

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

Blockly.JSON['toolbox_label'] = function(block) {
  var code ='';
  code += '{ \n  "kind": "label",\n  "text": "';
  var field = block.getField('TEXT');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '"\n},\n';

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

Blockly.JSON['toolbox_blocks'] = function(block) {
  var code ='';
  code += '{\n';
  code += ' "kind": "flyoutToolbox",\n';
  code += ' "contents": [\n';
  code += Blockly.JSON.statementToCode(block, 'LIST');
  code += ' ]\n};';

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

Blockly.JSON['toolbox_categories'] = function(block) {
  var code ='';
  code += '{\n';
  code += ' "kind": "categoryToolbox",\n';
  code += ' "contents": [\n';
  code += Blockly.JSON.statementToCode(block, 'LIST');
  code += '\n ]\n}';

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

Blockly.JSON['toolbox_category'] = function(block) {
  var code ='';
  code += '{\n';
  code += ' "kind": "category",\n';
  code += ' "contents": [\n';
  code += Blockly.JSON.statementToCode(block, 'LIST');
  code += ' ]\n},\n';

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