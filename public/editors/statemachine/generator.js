if (!Blockly.DOT) {
  Blockly.DOT = new Blockly.Generator('DOT');
  Blockly.DOT.ORDER_ATOMIC = 0;
}

Blockly.DOT.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.DOT.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.DOT['state'] = function(block) {
  var code ='';
  code += Blockly.DOT.statementToCode(block, 'TRANSITIONS');

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.DOT.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.DOT) {
  Blockly.DOT = new Blockly.Generator('DOT');
  Blockly.DOT.ORDER_ATOMIC = 0;
}

Blockly.DOT.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.DOT.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.DOT['machine'] = function(block) {
  var code ='';
  code += 'digraph G {\n';
  code += Blockly.DOT.statementToCode(block, 'STATES');
  code += '}';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.DOT.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.DOT) {
  Blockly.DOT = new Blockly.Generator('DOT');
  Blockly.DOT.ORDER_ATOMIC = 0;
}

Blockly.DOT.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.DOT.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.DOT['transition'] = function(block) {
  var code ='';
  var parent = block.getSurroundParent();
  if (parent)
  {
    code += parent.getFieldValue("STATE_NAME");
  }
  code += ' -> ';
  var field = block.getField('TO_STATE');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += ' [label="';
  var field = block.getField('EVENT');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '"]\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.DOT.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;