/* TODO: Change toolbox XML ID if necessary. Can export toolbox XML from Workspace Factory. */

import * as Blockly from 'blockly';

var import_workspace = null;

function myImportGeneration(event) {
  //var code = Blockly.JavaScript.workspaceToCode(import_workspace);
  var code = Blockly.Python.workspaceToCode(import_workspace);
  document.getElementById('import_code').value = code;
  // eval the just generated code 
 // eval(code)
//  init_yaml()
//  myConcreteCodeGeneration()
}


function myImportXMLGeneration(event) {
  var xml = Blockly.Xml.workspaceToDom(import_workspace, true);
  var xml_text = Blockly.Xml.domToPrettyText(xml);
  var element = document.getElementById('import_generated_xml')
  element.value = xml_text;
}

function init_import() {


	var toolbox = document.getElementById("code_toolbox");

    toolbox = ''
	var options = { 
		toolbox : toolbox, 
		collapse : false, 
		comments : true, 
		disable : false, 
		maxBlocks : Infinity, 
		trashcan : false, 
		horizontalLayout : false, 
		toolboxPosition : 'start', 
		css : true, 
		media : 'https://blockly-demo.appspot.com/static/media/', 
		rtl : false, 
		scrollbars : true, 
		sounds : true, 
		oneBasedIndex : true
	};

    if (!import_workspace) {


		/* Inject your workspace */ 
		import_workspace = Blockly.inject("blocklyImportDiv", options);
		import_workspace.name = "Import"

        var xml = document.getElementById("import_xxx");


        //Blockly.Xml.domToWorkspace(xml, import_workspace);

	//	BlocklyStorage.restoreBlocks(import_workspace,'import');
		BlocklyStorage.backupOnUnload(import_workspace,'import');

		import_workspace.addChangeListener(myImportGeneration);
		import_workspace.addChangeListener(myImportXMLGeneration);
		
    }
	
}


function import_generation()
{
	const domText = Blockly.Xml.textToDom(`
    <xml xmlns="https://developers.google.com/blockly/xml">
    <block type="procedures_defreturn">
    <mutation statements="false">
    </mutation>
    <field name="NAME">function_name</field>
    <comment pinned="false">This function will create the block xml.</comment>
    <value name="RETURN">
    <block type="text_join" inline="false">
        <mutation items="10"></mutation>
        <value name="ADD0">
          <block type="text_multiline">
            <field name="TEXT"></field>
          </block>
        </value>
        <value name="ADD1">
        </value>
        <value name="ADD2">
          <block type="text_multiline">
            <field name="TEXT"></field>
          </block>
        </value>
        <value name="ADD3">
        </value>
        
        <value name="ADD4">
          <block type="text_multiline">
            <field name="TEXT"></field>
          </block>
        </value>
        <value name="ADD5">
        </value>
        
        <value name="ADD6">
          <block type="text_multiline">
            <field name="TEXT"></field>
          </block>
        </value>
        <value name="ADD7">
        </value>
        
        <value name="ADD8">
          <block type="text_multiline">
            <field name="TEXT"></field>
          </block>
        </value>
      
      </block>
    </value>
    </block>
    </xml>`)

    
    function get_variables_get_block(var_name) {
    	return Blockly.Xml.textToDom(`
          <xml xmlns="https://developers.google.com/blockly/xml">
          <block type="variables_get" >
            <field name="VAR">` + var_name + `</field>
          </block>
          </xml>`)
    }
  
  
  var blocks = factory_workspace.getAllBlocks();
  for (k=0;k<blocks.length;k++)
  {
  	var block = blocks[k];
  	
  	if (block.type=="factory_base")
  	{
      var blockType = block.getFieldValue('NAME')
      var block_id = Blockly.Xml.domToWorkspace(domText, import_workspace);
	  var new_block = import_workspace.getBlockById(block_id)  
	  new_block.setFieldValue('import_' + blockType + '_xml','NAME')
	  var vars = new_block.getVars()
	  

	  var variables = new_block.getVarModels()

	  
	  
	  var text_join = new_block.getInput('RETURN').connection.targetBlock()
	  

	  var factory_block = import_workspace.newBlock(blockType)

      var values = []
      for (var i=0; i< factory_block.inputList.length;i=i+1 )
      {
      	for (var j=0; j<factory_block.inputList[i].fieldRow.length;j=j+1)
      	{
		  var name = factory_block.inputList[i].fieldRow[j].name
		  if (name) {
              // value is need to match in the xml later on
              values.push(factory_block.getFieldValue(name))

              vars.push(name)
			  
		      var arg = import_workspace.createVariable(name)
			  variables.push(arg)
			  new_block.updateParams_();

		  }
      	}
      }
      name='NEXT'
	  vars.push(name)

	  var arg = import_workspace.createVariable(name)
	  variables.push(arg)
	  new_block.updateParams_();


      
      //factory_block.nextConnection.connect(dummy_next_block.previousConnection)

	  variable_input.connection.connect(new_get_variable_block.outputConnection)

	  var xml = Blockly.Xml.blockToDom(factory_block, true); // no_id

	  var text = Blockly.Xml.domToPrettyText(xml);
      // this text misses the placeholders for statements and next :-(
      // option 1: generate the xml for next and statements ourselves
      // option 2: connect dummy blocks
      // but quite some other stuff is here as mutators
            

      text = text.replace('</block>','<next></next></block>')
      //todo statements
      //todo next

      var xml_parts = []
      for (var i=0;i<vars.length-1;i++) {
         var split = text.split('<field name="'+ vars[i] +'">'+values[i])
      	 xml_parts.push(split[0])
      	 text = split[1]
      }
      xml_parts.push(text)
      // and now make the text_join with xml_parts + variables
      for (var i=0;i<vars.length-1;i++) {
          // set the text of this part
      	  var multi_line = text_join.getInputTargetBlock('ADD'+(i*2))
      	  multi_line.setFieldValue(xml_parts[i] + '<field name="' + vars[i] + '">','TEXT')
          // create a new get_variable block and connect that to the input 
          var variable_input = text_join.getInput('ADD'+(i*2+1))
      	  var block_id = Blockly.Xml.domToWorkspace(get_variables_get_block(vars[i]), import_workspace);
      	  var new_get_variable_block = import_workspace.getBlockById(block_id)  
          variable_input.connection.connect(new_get_variable_block.outputConnection)
      }
      // add the last line ends on </block>
      before_next = xml_parts[i].split('<next>')

      var multi_line = text_join.getInputTargetBlock('ADD'+(i*2))
      multi_line.setFieldValue(before_next[0]+'<next>','TEXT')
      var variable_input = text_join.getInput('ADD'+(i*2+1))
   	  var block_id = Blockly.Xml.domToWorkspace(get_variables_get_block('NEXT'), import_workspace);
	  var new_get_variable_block = import_workspace.getBlockById(block_id)  
	  variable_input.connection.connect(new_get_variable_block.outputConnection)
      
      i++
      var multi_line = text_join.getInputTargetBlock('ADD'+(i*2))
      multi_line.setFieldValue(before_next[1],'TEXT')
      

	}
    factory_block.dispose()
  	// for now one block is enough
  	//if(k==2) { break}
  }
  import_generation = null  // and stop

}