if (!Blockly.LANG) {
  Blockly.LANG = new Blockly.Generator('LANG');
  Blockly.LANG.ORDER_ATOMIC = 0;
}

Blockly.LANG.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.LANG.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.LANG['nice_new_block'] = function(block) {
  var code ='';
  code += '"';
  var field = block.getField('NAME');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '":\n';
  code += Blockly.LANG.statementToCode(block, 'STATEMENTS');

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.LANG.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;