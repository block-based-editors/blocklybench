if (!Blockly.JavaScript) {
  Blockly.JavaScript = new Blockly.Generator('JavaScript');
  Blockly.JavaScript.ORDER_ATOMIC = 0;
}

Blockly.JavaScript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JavaScript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JavaScript['generate_parent_field_value'] = function(block) {
  var code ='';
  code += 'var parent = block.getSurroundParent();\n';
  code += 'if (parent)\n{  \n  code += parent.getFieldValue("';
  var field = block.getField('FIELDS');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '");\n}\n';

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

Blockly.JavaScript['generate_comment'] = function(block) {
  var code ='';
  code += 'if (block.getCommentText()) { code += block.getCommentText()    }      ';

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

Blockly.JavaScript['generate_token_value'] = function(block) {
  var code ='';
  code += 'code += ';
  code += Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_ATOMIC);

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

Blockly.JavaScript['generate_list_index'] = function(block) {
  var code ='';
  code += 'code += block.getSurroundParent().getDescendants().indexOf(block)-1;     ';

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

Blockly.JavaScript['generate_list_length'] = function(block) {
  var code ='';
  code += 'var target = block.getInputTargetBlock("';
  var field = block.getField('STATEMENTS');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '");\n';
  code += 'if (target) {\n ';
  code += '  code += target.getDescendants().length\n';
  code += '} else {\n ';
  code += '  code += "0"\n';
  code += '}\n';

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

Blockly.JavaScript['generate_field_value_token'] = function(block) {
  var code ='';
  code += 'code += "';
  var field = block.getField('BEFORE');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '"\ncode += block.getFieldValue("';
  var field = block.getField('FIELDS');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '");\ncode += "';
  var field = block.getField('AFTER');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '"\n';

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

Blockly.JavaScript['generate_field_text_token'] = function(block) {
  var code ='';
  code += 'code += "';
  var field = block.getField('BEFORE');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '"\ncode += block.getFieldText("';
  var field = block.getField('FIELDS');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '");\ncode += "';
  var field = block.getField('AFTER');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '"\n';

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

Blockly.JavaScript['generate_statements_token'] = function(block) {
  var code ='';
  code += 'code += "';
  var field = block.getField('BEFORE');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '"\ncode += block.getFieldText("';
  var field = block.getField('STATEMENTS');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '");\ncode += "';
  var field = block.getField('AFTER');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '"\n';

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