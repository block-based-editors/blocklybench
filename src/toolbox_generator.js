import * as Blockly from 'blockly';

if (!Blockly.YAML) {
  Blockly.YAML = new Blockly.Generator('YAML');
  Blockly.YAML.ORDER_ATOMIC = 0;
}

Blockly.YAML.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.YAML.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.YAML['toolbox_block'] = function(block) {
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

Blockly.YAML['toolbox_block_json'] = function(block) {
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
  code += Blockly.YAML.statementToCode(block, 'FIELDS');
  code += '  },\n';
  code += '  "inputs": {\n';
  code += Blockly.YAML.statementToCode(block, 'INPUTS');
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
  code += Blockly.YAML.statementToCode(block, 'FIELDS');
  code += '    },\n';
  code += '    "inputs": {\n';
  code += Blockly.YAML.statementToCode(block, 'INPUTS');
  code += '    }\n  },\n';
  code += '},\n';
  }

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

Blockly.YAML['toolbox_block_json_field'] = function(block) {
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

Blockly.YAML['toolbox_block_json_input'] = function(block) {
  var code ='';
  code += '  "';
  var field = block.getField('NAME');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '" :';
  code += Blockly.YAML.statementToCode(block, 'BLOCKS');
  code += '';

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

Blockly.YAML['toolbox_variable_category'] = function(block) {
  var code ='';
  code += '{\n   "kind": "category",\n   "name": "Variables",\n   "custom": "VARIABLE"\n},';

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

Blockly.YAML['toolbox_seperator'] = function(block) {
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

Blockly.YAML['toolbox_label'] = function(block) {
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

Blockly.YAML['toolbox_blocks'] = function(block) {
  var code ='';
  code += '{\n';
  code += ' "kind": "flyoutToolbox",\n';
  code += ' "contents": [\n';
  code += Blockly.YAML.statementToCode(block, 'LIST');
  code += ' ]\n};';

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

Blockly.YAML['toolbox_categories'] = function(block) {
  var code ='';
  code += '{\n';
  code += ' "kind": "categoryToolbox",\n';
  code += ' "contents": [\n';
  code += Blockly.YAML.statementToCode(block, 'LIST');
  code += '\n ]\n}';

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

Blockly.YAML['toolbox_category'] = function(block) {
  var code ='';
  code += '{\n';
  code += ' "kind": "category",\n';
  code += ' "name" : "';
  var field = block.getField('NAME');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '",\n "colour": "';
  var field = block.getField('COLOUR');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '",\n "contents": [\n';
  code += Blockly.YAML.statementToCode(block, 'LIST');
  code += ' ]\n},\n';

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