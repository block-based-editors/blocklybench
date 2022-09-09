
import * as Blockly from 'blockly';

Blockly.Code = new Blockly.Generator('Code');


Blockly.Code.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.Code.blockToCode(nextBlock);
    return code + nextCode;
}
;

Blockly.Code['generate_statements'] = function(block) {
  var statements = block.getFieldValue('STATEMENTS');
 
  var language = block.getSurroundParent().getFieldValue('LANGUAGE')
  var code = "code += Blockly." + language + ".statementToCode(block, '" + statements +"');\n"
  return code;
};

Blockly.Code['generate_values'] = function(block) {
  var value = block.getFieldValue('VALUE');
  var language = block.getSurroundParent().getFieldValue('LANGUAGE')
  var code = "code += Blockly." + language + ".valueToCode(block, '" + value +"', Blockly." +language +".ORDER_ATOMIC);\n"
  return code;
};

Blockly.Code['generate_values2'] = function(block) {
  var field = block.getField('VALUE');
  var value = field.getText();
  var language = block.getSurroundParent().getFieldValue('LANGUAGE')
  var code = "code += Blockly." + language + ".valueToCode(block, '" + value +"', Blockly." +language +".ORDER_ATOMIC);\n"
  return code;
};

Blockly.Code['generate_token'] = function(block) {
  var text_token = block.getFieldValue('TOKEN');
  
  var code = "code += '" + text_token + "';\n"
  return code;
};

Blockly.Code['generate_token_if_next_block'] = function(block) {
  var code ='';
  code += 'if(block.getNextBlock()) {code += "';
  var field = block.getField('TOKEN');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '"};\n';

  return code;
}
;



Blockly.Code['generate_code'] = function(block) {
  var text_language = block.getFieldValue('LANGUAGE');

  var text_type = block.getField('TYPE').getText();
  var statements_name = Blockly.Code.statementToCode(block, 'CODE');
  
  var code = ''
  code += "if (!Blockly."+ text_language+") {\n"
  code += "  Blockly." + text_language + " = new Blockly.Generator('" + text_language +"');\n"
  code += "  Blockly." + text_language + ".ORDER_ATOMIC = 0;\n"
  code += "}\n\n"
  code += "Blockly." + text_language + ".scrub_ = function(block, code, opt_thisOnly) {"
  code += `
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.`+text_language +`.blockToCode(nextBlock);
    return code + nextCode;
}

`;

  code += "Blockly." + text_language + "['" + text_type + "'] = function(block) {\n"
  code += "  var code ='';\n"; 

  code += statements_name + "\n";
  code += "  // if this block is a 'value' then code + ORDER needs to be returned\n";
  code += "  if(block.outputConnection) {\n    return [code, Blockly." + text_language + ".ORDER_ATOMIC];\n  }\n  else // no value block\n"
  code += "  {\n    return code;\n  }\n}\n;"

  return code;
};

Blockly.Code['generate_code_input'] = Blockly.Code['generate_code'] 
Blockly.Code['generate_code_variable'] = Blockly.Code['generate_code'] 

Blockly.Code['generate_field_value'] = function(block) {

  var dropdown_fields = block.getFieldValue('FIELDS');
  var code = '' 
  code += "var field = block.getField('" + dropdown_fields +"');\n"
  code += "if (!field) { return 'Field: " + dropdown_fields +" is not available on block: "+ block.getSurroundParent().getField('TYPE').getText() +"'}\n"
  code += "if (field.getText()) {\n"
  code += "  code += field.getText();\n"
  code += "} else {\n"
  code += "  code += field.getValue();\n"
  code += "}\n"
  return code;
};

Blockly.Code['generate_indent'] = function(block) {
  var code ='';
  code += 'Blockly.';
  code += block.getSurroundParent().getFieldValue('LANGUAGE');
  code += '.INDENT="';
  var field = block.getField('INDENT');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '";\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.Code.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;


Blockly.Code['generate_block_type'] = function(block) {
  var code ='';
  // should be code generation time
  code += "code += '" + block.getSurroundParent().getField('TYPE').getText() + "'\n"
  return code;
}
;


Blockly.Code['generate_field_value2'] = function(block) {

  var dropdown_fields = block.getField('FIELDS');
  var code = '' 
  code += "var field = block.getField('" + dropdown_fields.getText() +"');\n"
  code += "if (field.getText()) {\n"
  code += "  code += field.getText();\n"
  code += "} else {\n"
  code += "  code += field.getValue();\n"
  code += "}\n"
  return code;
};

Blockly.Code['generate_statements3'] = function(block) {
  var statements_field = block.getField('STATEMENTS');
  var ident = block.getFieldValue('INDENT');
  var statements = statements_field.getText();
  
  var language = block.getSurroundParent().getFieldValue('LANGUAGE')
  var code = ''
  if (ident=='FALSE')
  {
    code += "const targetBlock = block.getInputTargetBlock('" + statements + "');\n"
    code += "code += Blockly." + language + ".blockToCode(targetBlock);\n"
  }
  else
  {
    code += "code += Blockly." + language + ".statementToCode(block, '" + statements +"');\n"
  }
  return code;
};

Blockly.Code['generate_statements2'] = function(block) {
  var statements_field = block.getField('STATEMENTS');
  var statements = statements_field.getText();
 
  var language = block.getSurroundParent().getFieldValue('LANGUAGE')
  var code = "code += Blockly." + language + ".statementToCode(block, '" + statements +"');\n"

  return code;
};



Blockly.Code['generate_javascript'] = function(block) {
  var javascript = block.getFieldValue('JAVASCRIPT');
  var code = javascript + '\n';
  return code;
};

Blockly.Code['generate_comment'] = function(block) {
  var code ='';
  code += 'if (block.getCommentText()) {\n code += block.getCommentText();\n}\n';
  return code;
}
;

Blockly.Code['generate_list_index'] = function(block) {
  var code ='';
  code += 'code += block.getSurroundParent().getDescendants().indexOf(block)-1;\n';

  return code;
}
;


Blockly.Code['generate_parent_field_value'] = function(block) {
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
    return [code, Blockly.Code.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;



Blockly.Code['generate_list_length'] = function(block) {
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


  return code;
}
;


Blockly.Code['generate_field_text'] = function(block) {
  var code ='';
  code += 'var field = block.getField("';
  var field = block.getField('FIELDS');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '"); code += field.getValue();';

  return code;
}
;