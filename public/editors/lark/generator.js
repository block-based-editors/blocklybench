if (!Blockly.LARK) {
  Blockly.LARK = new Blockly.Generator('LARK');
  Blockly.LARK.ORDER_ATOMIC = 0;
}

Blockly.LARK.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.LARK.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.LARK['node'] = function(block) {
  var code ='';
  var field = block.getField('NAME');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += ':\n';
  code += Blockly.LARK.statementToCode(block, 'CHILDS');

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.LARK.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.LARK) {
  Blockly.LARK = new Blockly.Generator('LARK');
  Blockly.LARK.ORDER_ATOMIC = 0;
}

Blockly.LARK.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.LARK.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.LARK['token'] = function(block) {
  var code ='';
  code += '"';
  var field = block.getField('VALUE');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '"\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.LARK.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;