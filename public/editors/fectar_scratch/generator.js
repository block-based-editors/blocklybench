if (!Blockly.JavaScript) {
  Blockly.JavaScript = new Blockly.Generator('JavaScript');
  Blockly.JavaScript.ORDER_ATOMIC = 0;
}

Blockly.JavaScript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JavaScript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JavaScript['vec3static'] = function(block) {
  var code ='';
  code += 'Vector3';
  code += '.';
  var field = block.getField('VECTYPE');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '';
  var surround_parent = block.getSurroundParent();
  if (surround_parent) {
    var input_name = null;
    for (var i=0; i< surround_parent.inputList.length; i++)
    {
      var input = surround_parent.inputList[i];
      if (input.type===Blockly.inputTypes.STATEMENT) {
        var target = surround_parent.getInputTargetBlock(input.name);
        if (target && target.getDescendants().includes(block)) {
          input_name = input.name;
        }
      }
    }
    if (surround_parent.data &&
        surround_parent.data.tokens &&
        surround_parent.data.tokens[input_name] &&
        surround_parent.data.tokens[input_name].seperator) {
      if (surround_parent.data.tokens[input_name].seperator_on_last || block.getNextBlock()) {
        code += surround_parent.data.tokens[input_name].seperator;
      }
    }
  }

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

Blockly.JavaScript['vec3mag'] = function(block) {
  var code ='';
  code += Blockly.JavaScript.valueToCode(block, 'VECTOR', Blockly.JavaScript.ORDER_ATOMIC);
  code += '.magnitude';

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

Blockly.JavaScript['vec3comp'] = function(block) {
  var code ='';
  code += Blockly.JavaScript.valueToCode(block, 'VECTOR', Blockly.JavaScript.ORDER_ATOMIC);
  code += '.';
  var field = block.getField('COMPONENT');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '';
  var surround_parent = block.getSurroundParent();
  if (surround_parent) {
    var input_name = null;
    for (var i=0; i< surround_parent.inputList.length; i++)
    {
      var input = surround_parent.inputList[i];
      if (input.type===Blockly.inputTypes.STATEMENT) {
        var target = surround_parent.getInputTargetBlock(input.name);
        if (target && target.getDescendants().includes(block)) {
          input_name = input.name;
        }
      }
    }
    if (surround_parent.data &&
        surround_parent.data.tokens &&
        surround_parent.data.tokens[input_name] &&
        surround_parent.data.tokens[input_name].seperator) {
      if (surround_parent.data.tokens[input_name].seperator_on_last || block.getNextBlock()) {
        code += surround_parent.data.tokens[input_name].seperator;
      }
    }
  }

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

Blockly.JavaScript['vec3norm'] = function(block) {
  var code ='';
  code += '(';
  code += Blockly.JavaScript.valueToCode(block, 'VECTOR', Blockly.JavaScript.ORDER_ATOMIC);
  code += ').normalized';

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

Blockly.JavaScript['number'] = function(block) {
  var code ='';
  code += '';
  var field = block.getField('NUM');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '';
  var surround_parent = block.getSurroundParent();
  if (surround_parent) {
    var input_name = null;
    for (var i=0; i< surround_parent.inputList.length; i++)
    {
      var input = surround_parent.inputList[i];
      if (input.type===Blockly.inputTypes.STATEMENT) {
        var target = surround_parent.getInputTargetBlock(input.name);
        if (target && target.getDescendants().includes(block)) {
          input_name = input.name;
        }
      }
    }
    if (surround_parent.data &&
        surround_parent.data.tokens &&
        surround_parent.data.tokens[input_name] &&
        surround_parent.data.tokens[input_name].seperator) {
      if (surround_parent.data.tokens[input_name].seperator_on_last || block.getNextBlock()) {
        code += surround_parent.data.tokens[input_name].seperator;
      }
    }
  }

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

Blockly.JavaScript['degree'] = function(block) {
  var code ='';
  code += '';
  var field = block.getField('DEG');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '';
  var surround_parent = block.getSurroundParent();
  if (surround_parent) {
    var input_name = null;
    for (var i=0; i< surround_parent.inputList.length; i++)
    {
      var input = surround_parent.inputList[i];
      if (input.type===Blockly.inputTypes.STATEMENT) {
        var target = surround_parent.getInputTargetBlock(input.name);
        if (target && target.getDescendants().includes(block)) {
          input_name = input.name;
        }
      }
    }
    if (surround_parent.data &&
        surround_parent.data.tokens &&
        surround_parent.data.tokens[input_name] &&
        surround_parent.data.tokens[input_name].seperator) {
      if (surround_parent.data.tokens[input_name].seperator_on_last || block.getNextBlock()) {
        code += surround_parent.data.tokens[input_name].seperator;
      }
    }
  }

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

Blockly.JavaScript['string'] = function(block) {
  var code ='';
  code += '"';
  var field = block.getField('TEXT');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '"';
  var surround_parent = block.getSurroundParent();
  if (surround_parent) {
    var input_name = null;
    for (var i=0; i< surround_parent.inputList.length; i++)
    {
      var input = surround_parent.inputList[i];
      if (input.type===Blockly.inputTypes.STATEMENT) {
        var target = surround_parent.getInputTargetBlock(input.name);
        if (target && target.getDescendants().includes(block)) {
          input_name = input.name;
        }
      }
    }
    if (surround_parent.data &&
        surround_parent.data.tokens &&
        surround_parent.data.tokens[input_name] &&
        surround_parent.data.tokens[input_name].seperator) {
      if (surround_parent.data.tokens[input_name].seperator_on_last || block.getNextBlock()) {
        code += surround_parent.data.tokens[input_name].seperator;
      }
    }
  }

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

Blockly.JavaScript['move'] = function(block) {
  var code ='';
  code += 'spot.position = spot.position + ';
  code += Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);
  code += '/100 * (';
  code += Blockly.JavaScript.valueToCode(block, 'DIRECTION', Blockly.JavaScript.ORDER_ATOMIC);
  code += ');\n';

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

Blockly.JavaScript['turn'] = function(block) {
  var code ='';
  code += 'spot.rotation = spot.rotation * Quaternion.Euler(0, ';
  code += Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC);
  code += ', 0);\n';

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

Blockly.JavaScript['start'] = function(block) {
  var code ='';
  code += '/**\n * @title';
  code += '{';
  var field = block.getField('TITLE');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '}\n';
  var surround_parent = block.getSurroundParent();
  if (surround_parent) {
    var input_name = null;
    for (var i=0; i< surround_parent.inputList.length; i++)
    {
      var input = surround_parent.inputList[i];
      if (input.type===Blockly.inputTypes.STATEMENT) {
        var target = surround_parent.getInputTargetBlock(input.name);
        if (target && target.getDescendants().includes(block)) {
          input_name = input.name;
        }
      }
    }
    if (surround_parent.data &&
        surround_parent.data.tokens &&
        surround_parent.data.tokens[input_name] &&
        surround_parent.data.tokens[input_name].seperator) {
      if (surround_parent.data.tokens[input_name].seperator_on_last || block.getNextBlock()) {
        code += surround_parent.data.tokens[input_name].seperator;
      }
    }
  }
  code += ' * @description';
  code += '{';
  var field = block.getField('DESC');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '}\n';
  var surround_parent = block.getSurroundParent();
  if (surround_parent) {
    var input_name = null;
    for (var i=0; i< surround_parent.inputList.length; i++)
    {
      var input = surround_parent.inputList[i];
      if (input.type===Blockly.inputTypes.STATEMENT) {
        var target = surround_parent.getInputTargetBlock(input.name);
        if (target && target.getDescendants().includes(block)) {
          input_name = input.name;
        }
      }
    }
    if (surround_parent.data &&
        surround_parent.data.tokens &&
        surround_parent.data.tokens[input_name] &&
        surround_parent.data.tokens[input_name].seperator) {
      if (surround_parent.data.tokens[input_name].seperator_on_last || block.getNextBlock()) {
        code += surround_parent.data.tokens[input_name].seperator;
      }
    }
  }
  code += ' */\n\n/**\n * @type{Spot}\n * @exposedAs{For which Spot is this code?}\n */\nconst spot;\nconst globalSpot = spot;\n\n';
  block.data = block.data || {};
  block.data.tokens = block.data.tokens || {};
  block.data.tokens['STATEMENTS'] = {} ;
  block.data.tokens['STATEMENTS'].before = '';
  block.data.tokens['STATEMENTS'].after = '';
  block.data.tokens['STATEMENTS'].seperator = '';
  block.data.tokens['STATEMENTS'].seperator_on_last = false;
  block.data.tokens['STATEMENTS'].indent = false;
  code += '';
  var targetBlock = block.getInputTargetBlock('STATEMENTS');
  code += Blockly.JavaScript.blockToCode(targetBlock);
  code += '';

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

Blockly.JavaScript['goto'] = function(block) {
  var code ='';
  code += 'spot.position = ';
  code += Blockly.JavaScript.valueToCode(block, 'POSITION', Blockly.JavaScript.ORDER_ATOMIC);
  code += ';\n';

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

Blockly.JavaScript['onClick'] = function(block) {
  var code ='';
  code += 'function onClick(eventParams) {\n  if (globalSpot != eventParams.spot) return;\n';
  block.data = block.data || {};
  block.data.tokens = block.data.tokens || {};
  block.data.tokens['STATEMENTS'] = {} ;
  block.data.tokens['STATEMENTS'].before = '';
  block.data.tokens['STATEMENTS'].after = '';
  block.data.tokens['STATEMENTS'].seperator = '';
  block.data.tokens['STATEMENTS'].seperator_on_last = false;
  block.data.tokens['STATEMENTS'].indent = true;
  code += '';
  code += Blockly.JavaScript.statementToCode(block, 'STATEMENTS');
  code += '';
  code += '}\n\n';

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

Blockly.JavaScript['plus'] = function(block) {
  var code ='';
  code += Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC);
  code += ' + ';
  code += Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC);

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

Blockly.JavaScript['minus'] = function(block) {
  var code ='';
  code += Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC);
  code += ' - ';
  code += Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC);

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

Blockly.JavaScript['times'] = function(block) {
  var code ='';
  code += Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC);
  code += ' * ';
  code += Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC);

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

Blockly.JavaScript['divide'] = function(block) {
  var code ='';
  code += Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC);
  code += ' / ';
  code += Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC);

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

Blockly.JavaScript['forallspots'] = function(block) {
  var code ='';
  code += 'for (const spot of Space.spots) {\n';
  code += '  if ';
  code += '(';
  var field = block.getField('OTHER');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += ')';
  var surround_parent = block.getSurroundParent();
  if (surround_parent) {
    var input_name = null;
    for (var i=0; i< surround_parent.inputList.length; i++)
    {
      var input = surround_parent.inputList[i];
      if (input.type===Blockly.inputTypes.STATEMENT) {
        var target = surround_parent.getInputTargetBlock(input.name);
        if (target && target.getDescendants().includes(block)) {
          input_name = input.name;
        }
      }
    }
    if (surround_parent.data &&
        surround_parent.data.tokens &&
        surround_parent.data.tokens[input_name] &&
        surround_parent.data.tokens[input_name].seperator) {
      if (surround_parent.data.tokens[input_name].seperator_on_last || block.getNextBlock()) {
        code += surround_parent.data.tokens[input_name].seperator;
      }
    }
  }
  code += ' {\n    if (globalSpot == spot) continue;\n  }\n';
  code += Blockly.JavaScript.statementToCode(block, 'STATEMENTS');
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

Blockly.JavaScript['spotSelection'] = function(block) {
  var code ='';
  code += '/**\n * @type{Spot[]}\n * @exposedAs{A selection of spots that are involved}\n */\nconst spotSelection;\n\n';

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

Blockly.JavaScript['presetPosition'] = function(block) {
  var code ='';
  code += '';
  var field = block.getField("PRESET"); code += field.getValue();
  code += '';
  var surround_parent = block.getSurroundParent();
  if (surround_parent) {
    var input_name = null;
    for (var i=0; i< surround_parent.inputList.length; i++)
    {
      var input = surround_parent.inputList[i];
      if (input.type===Blockly.inputTypes.STATEMENT) {
        var target = surround_parent.getInputTargetBlock(input.name);
        if (target && target.getDescendants().includes(block)) {
          input_name = input.name;
        }
      }
    }
    if (surround_parent.data &&
        surround_parent.data.tokens &&
        surround_parent.data.tokens[input_name] &&
        surround_parent.data.tokens[input_name].seperator) {
      if (surround_parent.data.tokens[input_name].seperator_on_last || block.getNextBlock()) {
        code += surround_parent.data.tokens[input_name].seperator;
      }
    }
  }

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

Blockly.JavaScript['reset'] = function(block) {
  var code ='';
  code += '';
  var field = block.getField("RESET"); code += field.getValue();
  code += '';
  var surround_parent = block.getSurroundParent();
  if (surround_parent) {
    var input_name = null;
    for (var i=0; i< surround_parent.inputList.length; i++)
    {
      var input = surround_parent.inputList[i];
      if (input.type===Blockly.inputTypes.STATEMENT) {
        var target = surround_parent.getInputTargetBlock(input.name);
        if (target && target.getDescendants().includes(block)) {
          input_name = input.name;
        }
      }
    }
    if (surround_parent.data &&
        surround_parent.data.tokens &&
        surround_parent.data.tokens[input_name] &&
        surround_parent.data.tokens[input_name].seperator) {
      if (surround_parent.data.tokens[input_name].seperator_on_last || block.getNextBlock()) {
        code += surround_parent.data.tokens[input_name].seperator;
      }
    }
  }
  code += '.reset();\n';

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

Blockly.JavaScript['saySeconds'] = function(block) {
  var code ='';
  code += '\nsayTextSpot.text = ';
  code += Blockly.JavaScript.valueToCode(block, 'SAY', Blockly.JavaScript.ORDER_ATOMIC);
  code += ';\nsayTextSpot.position = spot.position + (spot.scale.y + 0.1) * Vector3.up;\n';
  code += 'sayTextSpot.show();\n';
  code += 'setTimeout(() => {sayTextSpot.hide();}, ';
  code += Blockly.JavaScript.valueToCode(block, 'SAYSECONDS', Blockly.JavaScript.ORDER_ATOMIC);
  code += ' * 1000);\n\n';

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

Blockly.JavaScript['say'] = function(block) {
  var code ='';
  code += '\nsayTextSpot.text = ';
  code += Blockly.JavaScript.valueToCode(block, 'SAY', Blockly.JavaScript.ORDER_ATOMIC);
  code += ';\nsayTextSpot.position = spot.position + (spot.scale.y + 0.1) * Vector3.up;\n';
  code += 'sayTextSpot.show();\n';

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

Blockly.JavaScript['forSpotSelection'] = function(block) {
  var code ='';
  code += '\nfor (const spot of spotSelection) {\n';
  code += Blockly.JavaScript.statementToCode(block, 'STATEMENTS');
  code += '}\n\n';

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

Blockly.JavaScript['sayText'] = function(block) {
  var code ='';
  code += '/**\n * @type{Text3D}\n * @exposedAs{Text object for "say"}\n */\nconst sayTextSpot;\nsayTextSpot.hide();\nsayTextSpot.facingCameraStart(false);\n\n';

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

Blockly.JavaScript['show'] = function(block) {
  var code ='';
  code += 'spot.show();\n';

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

Blockly.JavaScript['hide'] = function(block) {
  var code ='';
  code += 'spot.hide();\n';

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

Blockly.JavaScript['logText'] = function(block) {
  var code ='';
  code += 'log(';
  code += Blockly.JavaScript.valueToCode(block, 'LOG', Blockly.JavaScript.ORDER_ATOMIC);
  code += ');\n';

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

Blockly.JavaScript['varText'] = function(block) {
  var code ='';
  code += '';
  var field = block.getField("VAR"); code += field.getValue();
  code += '.';
  var surround_parent = block.getSurroundParent();
  if (surround_parent) {
    var input_name = null;
    for (var i=0; i< surround_parent.inputList.length; i++)
    {
      var input = surround_parent.inputList[i];
      if (input.type===Blockly.inputTypes.STATEMENT) {
        var target = surround_parent.getInputTargetBlock(input.name);
        if (target && target.getDescendants().includes(block)) {
          input_name = input.name;
        }
      }
    }
    if (surround_parent.data &&
        surround_parent.data.tokens &&
        surround_parent.data.tokens[input_name] &&
        surround_parent.data.tokens[input_name].seperator) {
      if (surround_parent.data.tokens[input_name].seperator_on_last || block.getNextBlock()) {
        code += surround_parent.data.tokens[input_name].seperator;
      }
    }
  }
  code += '';
  var field = block.getField("VAL"); code += field.getValue();
  code += '';
  var surround_parent = block.getSurroundParent();
  if (surround_parent) {
    var input_name = null;
    for (var i=0; i< surround_parent.inputList.length; i++)
    {
      var input = surround_parent.inputList[i];
      if (input.type===Blockly.inputTypes.STATEMENT) {
        var target = surround_parent.getInputTargetBlock(input.name);
        if (target && target.getDescendants().includes(block)) {
          input_name = input.name;
        }
      }
    }
    if (surround_parent.data &&
        surround_parent.data.tokens &&
        surround_parent.data.tokens[input_name] &&
        surround_parent.data.tokens[input_name].seperator) {
      if (surround_parent.data.tokens[input_name].seperator_on_last || block.getNextBlock()) {
        code += surround_parent.data.tokens[input_name].seperator;
      }
    }
  }

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

Blockly.JavaScript['logVal'] = function(block) {
  var code ='';
  code += 'log(';
  code += Blockly.JavaScript.valueToCode(block, 'VAL', Blockly.JavaScript.ORDER_ATOMIC);
  code += ');\n';

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

Blockly.JavaScript['glidePos'] = function(block) {
  var code ='';
  code += 'spot.moveTo(';
  code += Blockly.JavaScript.valueToCode(block, 'POSITION', Blockly.JavaScript.ORDER_ATOMIC);
  code += ', ';
  code += Blockly.JavaScript.valueToCode(block, 'SECONDS', Blockly.JavaScript.ORDER_ATOMIC);
  code += ');\n';

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

Blockly.JavaScript['repeat'] = function(block) {
  var code ='';
  code += '\nsetInterval(() => {\n';
  code += Blockly.JavaScript.statementToCode(block, 'STATEMENTS');
  code += '}, ';
  code += Blockly.JavaScript.valueToCode(block, 'SECONDS', Blockly.JavaScript.ORDER_ATOMIC);
  code += ' * 1000);\n\n';

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

Blockly.JavaScript['repeatTimes'] = function(block) {
  var code ='';
  code += '\nfor (int iter = 0; iter < ';
  code += Blockly.JavaScript.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ATOMIC);
  code += '; iter++) {\n';
  code += Blockly.JavaScript.statementToCode(block, 'STATEMENTS');
  code += '}\n\n';

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

Blockly.JavaScript['directionFromTo'] = function(block) {
  var code ='';
  code += '(';
  code += Blockly.JavaScript.valueToCode(block, 'TO', Blockly.JavaScript.ORDER_ATOMIC);
  code += ' - ';
  code += Blockly.JavaScript.valueToCode(block, 'FROM', Blockly.JavaScript.ORDER_ATOMIC);
  code += ').normalized';

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

Blockly.JavaScript['faceCamera'] = function(block) {
  var code ='';
  code += 'spot.facingCamera';
  var field = block.getField("FACECAM"); code += field.getValue();
  code += ';\n';
  var surround_parent = block.getSurroundParent();
  if (surround_parent) {
    var input_name = null;
    for (var i=0; i< surround_parent.inputList.length; i++)
    {
      var input = surround_parent.inputList[i];
      if (input.type===Blockly.inputTypes.STATEMENT) {
        var target = surround_parent.getInputTargetBlock(input.name);
        if (target && target.getDescendants().includes(block)) {
          input_name = input.name;
        }
      }
    }
    if (surround_parent.data &&
        surround_parent.data.tokens &&
        surround_parent.data.tokens[input_name] &&
        surround_parent.data.tokens[input_name].seperator) {
      if (surround_parent.data.tokens[input_name].seperator_on_last || block.getNextBlock()) {
        code += surround_parent.data.tokens[input_name].seperator;
      }
    }
  }

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

Blockly.JavaScript['delay'] = function(block) {
  var code ='';
  code += '\nsetTimeout(() => {\n';
  code += Blockly.JavaScript.statementToCode(block, 'STATEMENTS');
  code += '}, ';
  code += Blockly.JavaScript.valueToCode(block, 'SECONDS', Blockly.JavaScript.ORDER_ATOMIC);
  code += ' * 1000);\n\n';

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

Blockly.JavaScript['spotPosition'] = function(block) {
  var code ='';
  code += '';
  var field = block.getField("SPOT"); code += field.getValue();
  code += '.position';
  var surround_parent = block.getSurroundParent();
  if (surround_parent) {
    var input_name = null;
    for (var i=0; i< surround_parent.inputList.length; i++)
    {
      var input = surround_parent.inputList[i];
      if (input.type===Blockly.inputTypes.STATEMENT) {
        var target = surround_parent.getInputTargetBlock(input.name);
        if (target && target.getDescendants().includes(block)) {
          input_name = input.name;
        }
      }
    }
    if (surround_parent.data &&
        surround_parent.data.tokens &&
        surround_parent.data.tokens[input_name] &&
        surround_parent.data.tokens[input_name].seperator) {
      if (surround_parent.data.tokens[input_name].seperator_on_last || block.getNextBlock()) {
        code += surround_parent.data.tokens[input_name].seperator;
      }
    }
  }

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

Blockly.JavaScript['positionInputs'] = function(block) {
  var code ='';
  code += 'new Vector3(';
  code += Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
  code += '/100, ';
  code += Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
  code += '/100, ';
  code += Blockly.JavaScript.valueToCode(block, 'Z', Blockly.JavaScript.ORDER_ATOMIC);
  code += '/100)';

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

Blockly.JavaScript['turnAbout'] = function(block) {
  var code ='';
  code += 'let rotation = Quaternion.Euler(0, ';
  code += Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC);
  code += ', 0);\nspot.rotation = rotation * spot.rotation;\nspot.position = rotation * (spot.position - ';
  code += Blockly.JavaScript.valueToCode(block, 'POSITION', Blockly.JavaScript.ORDER_ATOMIC);
  code += ') + ';
  code += Blockly.JavaScript.valueToCode(block, 'POSITION', Blockly.JavaScript.ORDER_ATOMIC);
  code += ';\n';

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

Blockly.JavaScript['scaleSpot'] = function(block) {
  var code ='';
  code += 'spot.scale = spot.scale * ';
  code += Blockly.JavaScript.valueToCode(block, 'SCALE', Blockly.JavaScript.ORDER_ATOMIC);
  code += ';\n';

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

Blockly.JavaScript['changexyz'] = function(block) {
  var code ='';
  code += 'spot.position = spot.position + ';
  code += Blockly.JavaScript.valueToCode(block, 'CHANGE', Blockly.JavaScript.ORDER_ATOMIC);
  code += '/100 * Vector3.';
  var field = block.getField("COMPONENT"); code += field.getValue();
  code += ';\n';
  var surround_parent = block.getSurroundParent();
  if (surround_parent) {
    var input_name = null;
    for (var i=0; i< surround_parent.inputList.length; i++)
    {
      var input = surround_parent.inputList[i];
      if (input.type===Blockly.inputTypes.STATEMENT) {
        var target = surround_parent.getInputTargetBlock(input.name);
        if (target && target.getDescendants().includes(block)) {
          input_name = input.name;
        }
      }
    }
    if (surround_parent.data &&
        surround_parent.data.tokens &&
        surround_parent.data.tokens[input_name] &&
        surround_parent.data.tokens[input_name].seperator) {
      if (surround_parent.data.tokens[input_name].seperator_on_last || block.getNextBlock()) {
        code += surround_parent.data.tokens[input_name].seperator;
      }
    }
  }

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

Blockly.JavaScript['setxyz'] = function(block) {
  var code ='';
  code += 'spot.position = ';
  code += Blockly.JavaScript.valueToCode(block, 'SET', Blockly.JavaScript.ORDER_ATOMIC);
  code += '/100 * Vector3.';
  var field = block.getField("COMPONENT"); code += field.getValue();
  code += ';\n';
  var surround_parent = block.getSurroundParent();
  if (surround_parent) {
    var input_name = null;
    for (var i=0; i< surround_parent.inputList.length; i++)
    {
      var input = surround_parent.inputList[i];
      if (input.type===Blockly.inputTypes.STATEMENT) {
        var target = surround_parent.getInputTargetBlock(input.name);
        if (target && target.getDescendants().includes(block)) {
          input_name = input.name;
        }
      }
    }
    if (surround_parent.data &&
        surround_parent.data.tokens &&
        surround_parent.data.tokens[input_name] &&
        surround_parent.data.tokens[input_name].seperator) {
      if (surround_parent.data.tokens[input_name].seperator_on_last || block.getNextBlock()) {
        code += surround_parent.data.tokens[input_name].seperator;
      }
    }
  }

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

Blockly.JavaScript['recall'] = function(block) {
  var code ='';
  code += 'spot.position = new Vector3(Math.min(spot.position.x + 3, 6) - 3,\n\t\t\t    Math.min(spot.position.y + 3, 6) - 3,\n\t\t\t    Math.min(spot.position.z + 3, 6) - 3);\n';

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

Blockly.JavaScript['onStart'] = function(block) {
  var code ='';
  code += 'onStart();\n\nfunction onStart() {\n';
  code += Blockly.JavaScript.statementToCode(block, 'STATEMENTS');
  code += '}\n\n';

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

Blockly.JavaScript['presetDirections'] = function(block) {
  var code ='';
  code += '';
  var field = block.getField("PRESET"); code += field.getValue();
  code += '';
  var surround_parent = block.getSurroundParent();
  if (surround_parent) {
    var input_name = null;
    for (var i=0; i< surround_parent.inputList.length; i++)
    {
      var input = surround_parent.inputList[i];
      if (input.type===Blockly.inputTypes.STATEMENT) {
        var target = surround_parent.getInputTargetBlock(input.name);
        if (target && target.getDescendants().includes(block)) {
          input_name = input.name;
        }
      }
    }
    if (surround_parent.data &&
        surround_parent.data.tokens &&
        surround_parent.data.tokens[input_name] &&
        surround_parent.data.tokens[input_name].seperator) {
      if (surround_parent.data.tokens[input_name].seperator_on_last || block.getNextBlock()) {
        code += surround_parent.data.tokens[input_name].seperator;
      }
    }
  }

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

Blockly.JavaScript['mod'] = function(block) {
  var code ='';
  code += Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC);
  code += ' % ';
  code += Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC);

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

Blockly.JavaScript['round'] = function(block) {
  var code ='';
  code += 'Math.round(';
  code += Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC);
  code += ')';

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

Blockly.JavaScript['abs'] = function(block) {
  var code ='';
  code += 'Math.abs(';
  code += Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC);
  code += ')';

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

Blockly.JavaScript['wait'] = function(block) {
  var code ='';
  code += 'await new Promise(r => setTimeout(r, ';
  code += Blockly.JavaScript.valueToCode(block, 'SECONDS', Blockly.JavaScript.ORDER_ATOMIC);
  code += ' * 1000));\n';

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

Blockly.JavaScript['equal'] = function(block) {
  var code ='';
  code += '(';
  code += Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC);
  code += ' === ';
  code += Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC);
  code += ')';

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

Blockly.JavaScript['notEqual'] = function(block) {
  var code ='';
  code += '(';
  code += Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC);
  code += ' !== ';
  code += Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC);
  code += ')';

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

Blockly.JavaScript['comparison'] = function(block) {
  var code ='';
  code += Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC);
  code += ' ';
  var field = block.getField("CMP"); code += field.getValue();
  code += ' ';
  var surround_parent = block.getSurroundParent();
  if (surround_parent) {
    var input_name = null;
    for (var i=0; i< surround_parent.inputList.length; i++)
    {
      var input = surround_parent.inputList[i];
      if (input.type===Blockly.inputTypes.STATEMENT) {
        var target = surround_parent.getInputTargetBlock(input.name);
        if (target && target.getDescendants().includes(block)) {
          input_name = input.name;
        }
      }
    }
    if (surround_parent.data &&
        surround_parent.data.tokens &&
        surround_parent.data.tokens[input_name] &&
        surround_parent.data.tokens[input_name].seperator) {
      if (surround_parent.data.tokens[input_name].seperator_on_last || block.getNextBlock()) {
        code += surround_parent.data.tokens[input_name].seperator;
      }
    }
  }
  code += Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC);

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

Blockly.JavaScript['ifthen'] = function(block) {
  var code ='';
  code += 'if (';
  code += Blockly.JavaScript.valueToCode(block, 'CONDITION', Blockly.JavaScript.ORDER_ATOMIC);
  block.data = block.data || {};
  block.data.tokens = block.data.tokens || {};
  block.data.tokens['STATEMENTS'] = {} ;
  block.data.tokens['STATEMENTS'].before = ') {\n';
  block.data.tokens['STATEMENTS'].after = '}\n';
  block.data.tokens['STATEMENTS'].seperator = '';
  block.data.tokens['STATEMENTS'].seperator_on_last = false;
  block.data.tokens['STATEMENTS'].indent = true;
  code += ') {\n';
  code += Blockly.JavaScript.statementToCode(block, 'STATEMENTS');
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

Blockly.JavaScript['ifthenelse'] = function(block) {
  var code ='';
  code += 'if (';
  code += Blockly.JavaScript.valueToCode(block, 'CONDITION', Blockly.JavaScript.ORDER_ATOMIC);
  block.data = block.data || {};
  block.data.tokens = block.data.tokens || {};
  block.data.tokens['STATEMENTS'] = {} ;
  block.data.tokens['STATEMENTS'].before = ') {\n';
  block.data.tokens['STATEMENTS'].after = '}';
  block.data.tokens['STATEMENTS'].seperator = '';
  block.data.tokens['STATEMENTS'].seperator_on_last = false;
  block.data.tokens['STATEMENTS'].indent = true;
  code += ') {\n';
  code += Blockly.JavaScript.statementToCode(block, 'STATEMENTS');
  code += '}';
  block.data = block.data || {};
  block.data.tokens = block.data.tokens || {};
  block.data.tokens['ELSE'] = {} ;
  block.data.tokens['ELSE'].before = ' else {\n';
  block.data.tokens['ELSE'].after = '}\n';
  block.data.tokens['ELSE'].seperator = '';
  block.data.tokens['ELSE'].seperator_on_last = false;
  block.data.tokens['ELSE'].indent = true;
  code += ' else {\n';
  code += Blockly.JavaScript.statementToCode(block, 'ELSE');
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

Blockly.JavaScript['concat'] = function(block) {
  var code ='';
  code += '"" + ';
  code += Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC);
  code += ' + ';
  code += Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC);

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