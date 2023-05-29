if (!Blockly.YAML) {
  Blockly.YAML = new Blockly.Generator('YAML');
  Blockly.YAML.ORDER_ATOMIC = 0;
}

Blockly.YAML.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.YAML.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.YAML['block_type'] = function(block) {
  var code ='';
  code += '...;\n';

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