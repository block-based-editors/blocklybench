if (!Blockly.Javascript) {
  Blockly.Javascript = new Blockly.Generator('Javascript');
  Blockly.Javascript.ORDER_ATOMIC = 0;
}

Blockly.Javascript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Javascript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.Javascript['Vector3'] = function(block) {
  var code ='';
  code += 'new Vector3(';
  var field = block.getField('X');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += ', ';
  var field = block.getField('Y');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += ', ';
  var field = block.getField('Z');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += ')';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Javascript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.Javascript) {
  Blockly.Javascript = new Blockly.Generator('Javascript');
  Blockly.Javascript.ORDER_ATOMIC = 0;
}

Blockly.Javascript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Javascript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.Javascript['Color'] = function(block) {
  var code ='';
  code += 'new Color(';
  var field = block.getField('NAME');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += ')';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Javascript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.Javascript) {
  Blockly.Javascript = new Blockly.Generator('Javascript');
  Blockly.Javascript.ORDER_ATOMIC = 0;
}

Blockly.Javascript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Javascript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.Javascript['Color_alpha'] = function(block) {
  var code ='';
  code += 'new Color(';
  var field = block.getField('NAME');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += ',';
  var field = block.getField('ALPHA');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += ')';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Javascript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.Javascript) {
  Blockly.Javascript = new Blockly.Generator('Javascript');
  Blockly.Javascript.ORDER_ATOMIC = 0;
}

Blockly.Javascript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Javascript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.Javascript['Spot'] = function(block) {
  var code ='';
  code += 'new Spot(';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Javascript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.Javascript) {
  Blockly.Javascript = new Blockly.Generator('Javascript');
  Blockly.Javascript.ORDER_ATOMIC = 0;
}

Blockly.Javascript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Javascript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.Javascript['variables_get'] = function(block) {
  var code ='';
  var name = block.getField('VAR').getVariable().name
  code += name

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Javascript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.Javascript) {
  Blockly.Javascript = new Blockly.Generator('Javascript');
  Blockly.Javascript.ORDER_ATOMIC = 0;
}

Blockly.Javascript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Javascript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.Javascript['forAllSpots'] = function(block) {
  var code ='';
  code += 'for (let i = 0; i < Space.spots.length; i++) {\n';
  code += '  var ';
  var field = block.getField('NAME');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += ' = Space.spots[i];\n';
  code += Blockly.Javascript.statementToCode(block, 'STATEMENTS');
  code += '};\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Javascript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.Javascript) {
  Blockly.Javascript = new Blockly.Generator('Javascript');
  Blockly.Javascript.ORDER_ATOMIC = 0;
}

Blockly.Javascript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Javascript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.Javascript['Vector3_static'] = function(block) {
  var code ='';
  code += 'Vector3.';
  var field = block.getField('VECTOR');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Javascript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.Javascript) {
  Blockly.Javascript = new Blockly.Generator('Javascript');
  Blockly.Javascript.ORDER_ATOMIC = 0;
}

Blockly.Javascript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Javascript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.Javascript['show_hideSpotVariable'] = function(block) {
  var code ='';
  code += Blockly.Javascript.valueToCode(block, 'SPOT', Blockly.Javascript.ORDER_ATOMIC);
  code += '.';
  var field = block.getField("SHOW_HIDE"); code += field.getValue();code += ';\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Javascript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.Javascript) {
  Blockly.Javascript = new Blockly.Generator('Javascript');
  Blockly.Javascript.ORDER_ATOMIC = 0;
}

Blockly.Javascript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Javascript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.Javascript['variables_set'] = function(block) {
  var code ='';
  var name = block.getField('VAR').getVariable().name
  code += name + " = "
  code += Blockly.Javascript.valueToCode(block, 'VALUE', Blockly.Javascript.ORDER_ATOMIC);
  code += ';';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Javascript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.Javascript) {
  Blockly.Javascript = new Blockly.Generator('Javascript');
  Blockly.Javascript.ORDER_ATOMIC = 0;
}

Blockly.Javascript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Javascript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.Javascript['Quaternion'] = function(block) {
  var code ='';
  code += 'new Quaternion(';
  var field = block.getField('X');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += ', ';
  var field = block.getField('Y');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += ', ';
  var field = block.getField('Z');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += ')';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Javascript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.Javascript) {
  Blockly.Javascript = new Blockly.Generator('Javascript');
  Blockly.Javascript.ORDER_ATOMIC = 0;
}

Blockly.Javascript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Javascript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.Javascript['show_hideSpot'] = function(block) {
  var code ='';
  code += 'Space.';
  var field = block.getField("SHOW_HIDE"); code += field.getValue();code += '("';
  var field = block.getField("NAME"); code += field.getValue();code += '");\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Javascript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.Javascript) {
  Blockly.Javascript = new Blockly.Generator('Javascript');
  Blockly.Javascript.ORDER_ATOMIC = 0;
}

Blockly.Javascript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Javascript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.Javascript['getSpot'] = function(block) {
  var code ='';
  code += 'Space.getSpot("';
  var field = block.getField('NAME');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '")';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Javascript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.Javascript) {
  Blockly.Javascript = new Blockly.Generator('Javascript');
  Blockly.Javascript.ORDER_ATOMIC = 0;
}

Blockly.Javascript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Javascript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.Javascript['getSpotById'] = function(block) {
  var code ='';
  code += 'Space.getSpotById("';
  var field = block.getField('ID');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '")';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Javascript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.Javascript) {
  Blockly.Javascript = new Blockly.Generator('Javascript');
  Blockly.Javascript.ORDER_ATOMIC = 0;
}

Blockly.Javascript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Javascript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.Javascript['getCamera'] = function(block) {
  var code ='';
  code += 'Space.camera';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Javascript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.Javascript) {
  Blockly.Javascript = new Blockly.Generator('Javascript');
  Blockly.Javascript.ORDER_ATOMIC = 0;
}

Blockly.Javascript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Javascript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.Javascript['setInterval'] = function(block) {
  var code ='';
  code += 'var intervalHandler = setInterval(() => {\n';
  code += Blockly.Javascript.statementToCode(block, 'STATEMENTS');
  code += '\n}, ';
  var field = block.getField('INTERVAL');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += ');\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Javascript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.Javascript) {
  Blockly.Javascript = new Blockly.Generator('Javascript');
  Blockly.Javascript.ORDER_ATOMIC = 0;
}

Blockly.Javascript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Javascript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.Javascript['clearInterval'] = function(block) {
  var code ='';
  code += 'clearInterval(intervalHandler);';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Javascript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.Javascript) {
  Blockly.Javascript = new Blockly.Generator('Javascript');
  Blockly.Javascript.ORDER_ATOMIC = 0;
}

Blockly.Javascript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Javascript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.Javascript['reset_space'] = function(block) {
  var code ='';
  code += 'Space.reset();\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Javascript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.Javascript) {
  Blockly.Javascript = new Blockly.Generator('Javascript');
  Blockly.Javascript.ORDER_ATOMIC = 0;
}

Blockly.Javascript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Javascript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.Javascript['onClick'] = function(block) {
  var code ='';
  code += 'function onClick(eventParams) { \n';
  code += '  var ';
  var field = block.getField('NAME');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += ' = eventParams.spot;\n';
  code += Blockly.Javascript.statementToCode(block, 'STATEMENTS');
  code += '};\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Javascript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.Javascript) {
  Blockly.Javascript = new Blockly.Generator('Javascript');
  Blockly.Javascript.ORDER_ATOMIC = 0;
}

Blockly.Javascript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Javascript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.Javascript['spot_set_prop'] = function(block) {
  var code ='';
  var field = block.getField('NAME');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '.';
  var field = block.getField('PROPERTY');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += ' = ';
  code += Blockly.Javascript.valueToCode(block, 'INPUT', Blockly.Javascript.ORDER_ATOMIC);
  code += ';\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Javascript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.Javascript) {
  Blockly.Javascript = new Blockly.Generator('Javascript');
  Blockly.Javascript.ORDER_ATOMIC = 0;
}

Blockly.Javascript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Javascript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.Javascript['Quaternion_euler'] = function(block) {
  var code ='';
  code += Blockly.Javascript.valueToCode(block, 'INPUT', Blockly.Javascript.ORDER_ATOMIC);
  code += '.euler(';
  var field = block.getField('X');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += ', ';
  var field = block.getField('Y');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += ', ';
  var field = block.getField('Z');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += ');';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Javascript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.Javascript) {
  Blockly.Javascript = new Blockly.Generator('Javascript');
  Blockly.Javascript.ORDER_ATOMIC = 0;
}

Blockly.Javascript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Javascript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.Javascript['get_spot_property'] = function(block) {
  var code ='';
  code += Blockly.Javascript.valueToCode(block, 'INPUT', Blockly.Javascript.ORDER_ATOMIC);
  code += '.';
  var field = block.getField("OPERATOR"); code += field.getValue();
  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Javascript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.Javascript) {
  Blockly.Javascript = new Blockly.Generator('Javascript');
  Blockly.Javascript.ORDER_ATOMIC = 0;
}

Blockly.Javascript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Javascript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.Javascript['log'] = function(block) {
  var code ='';
  code += 'log(';
  code += Blockly.Javascript.valueToCode(block, 'NAME', Blockly.Javascript.ORDER_ATOMIC);
  code += ');\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Javascript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.Javascript) {
  Blockly.Javascript = new Blockly.Generator('Javascript');
  Blockly.Javascript.ORDER_ATOMIC = 0;
}

Blockly.Javascript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Javascript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.Javascript['log_text'] = function(block) {
  var code ='';
  code += 'log("';
  var field = block.getField('NAME');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '");\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Javascript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.Javascript) {
  Blockly.Javascript = new Blockly.Generator('Javascript');
  Blockly.Javascript.ORDER_ATOMIC = 0;
}

Blockly.Javascript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Javascript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.Javascript['Angle'] = function(block) {
  var code ='';
  code += 'Angle(';
  code += Blockly.Javascript.valueToCode(block, 'FROM', Blockly.Javascript.ORDER_ATOMIC);
  code += ', ';
  code += Blockly.Javascript.valueToCode(block, 'TO', Blockly.Javascript.ORDER_ATOMIC);
  code += ')\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Javascript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.Javascript) {
  Blockly.Javascript = new Blockly.Generator('Javascript');
  Blockly.Javascript.ORDER_ATOMIC = 0;
}

Blockly.Javascript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Javascript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.Javascript['Distance'] = function(block) {
  var code ='';
  code += 'Angle(';
  code += Blockly.Javascript.valueToCode(block, 'FROM', Blockly.Javascript.ORDER_ATOMIC);
  code += ', ';
  code += Blockly.Javascript.valueToCode(block, 'TO', Blockly.Javascript.ORDER_ATOMIC);
  code += ')\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Javascript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.Javascript) {
  Blockly.Javascript = new Blockly.Generator('Javascript');
  Blockly.Javascript.ORDER_ATOMIC = 0;
}

Blockly.Javascript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Javascript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.Javascript['Cross'] = function(block) {
  var code ='';
  code += 'Cross(';
  code += Blockly.Javascript.valueToCode(block, 'FROM', Blockly.Javascript.ORDER_ATOMIC);
  code += ', ';
  code += Blockly.Javascript.valueToCode(block, 'TO', Blockly.Javascript.ORDER_ATOMIC);
  code += ')\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Javascript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;