var factory_dict_template = `
<block type="factory_base">
    <mutation connections="BOTH"/>
    <field name="NAME">dict_template</field>
    <field name="INLINE">AUTO</field>
    <field name="CONNECTIONS">BOTH</field>
    <statement name="INPUTS">
      <block type="input_dummy">
        <field name="ALIGN">LEFT</field>
        <statement name="FIELDS">
           <block type="field_static" >
             <field name="TEXT">dict:</field>
             <next>
             </next>
           </block>
        </statement>
      </block>
    </statement>
    <value name="TOPTYPE">
      <shadow type="type_null">
      <block type="type_other">
        <field name="TYPE">key_value</field>
      </block>
    </value>
    <value name="BOTTOMTYPE">
      <shadow type="type_null"/>
      <block type="type_other">
        <field name="TYPE">key_value</field>
      </block>
    </value>
    <value name="COLOUR">
      <block type="colour_hue">
        <mutation colour="#5ba55b"/>
        <field name="HUE">120</field>
      </block>
    </value>
  </block>
  `



var key_to_block = { 
// "CPD_NAME":"model_cpd_name_value",
}
var JsonToBlocklyXML = {}

function xml_find(xmlElement, nodeName)
{
  for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == nodeName) {
        return childNode;
      }
  }
}

function list_value_xml(value) {
  var ret = {}
  var xml = Blockly.utils.xml.textToDomDocument('<block type="basic_list_value"><field name="VALUE">' + value + '</field><next></next></block>')
  ret.block = xml.childNodes[0]
  ret.next = xml_find(ret.block, 'next')
  return ret
}

function dict_xml() {
  var ret = {}
  var xml = Blockly.utils.xml.textToDomDocument('<block type="basic_dict"> <statement name="LIST"></statement><next></next></block>')
  ret.block = xml.childNodes[0]
  ret.statements = xml_find(ret.block,'statement')
  ret.next = xml_find(ret.block, 'next')
  
  return ret
}

function  list_xml() {
  var ret = {}
  var xml = Blockly.utils.xml.textToDomDocument('<block type="basic_list"> <statement name="LIST"></statement><next></next></block>')
  ret.block = xml.childNodes[0]
  ret.statements = xml_find(ret.block,'statement')
  ret.next = xml_find(ret.block, 'next')
  return ret
}

function  key_list_xml(key) {
  var ret = {}
  var block_type = get_block_type(key,"basic_key_list")
  var xml = Blockly.utils.xml.textToDomDocument('<block type="'+block_type+'"><field name="KEY">'+key+'</field><statement name="LIST"></statement><next></next></block>')
  ret.block = xml.childNodes[0]
  ret.statements = xml_find(ret.block,'statement')
  ret.next = xml_find(ret.block, 'next')
  return ret
}

function getWorkspaceByName(name)
{
    var workspaces = Blockly.Workspace.getAll();
	for (var i=0; i< workspaces.length;i++) {
	  var workspace = workspaces[i]

	  if (workspace.name == name)
	  {
		return workspace
	  }
	}
}
  
function  key_dict_xml(key, key_value_list) {
  // note key_value_list is not used for the normal key_dict
  // but if specifics need to be create the info is needed
  var block_type = get_block_type(key,"basic_key_dict")
  var ret = {}
  var xml = Blockly.utils.xml.textToDomDocument('<block type="'+block_type+'"><field name="KEY">'+key+'</field><statement name="LIST"></statement><next></next></block>')
  ret.block = xml.childNodes[0]
  ret.statements = xml_find(ret.block,'statement')
  ret.next = xml_find(ret.block, 'next')
  return ret
}

function get_block_type(key, default_key)
{
  // this key_to_block_type should come from code generation
  var workspace = getWorkspaceByName('Concrete')
  var code = Blockly.JSON.workspaceToCode(workspace);
  var key_to_block_type = {}
  eval('key_to_block_type = { ' + code+ '}') 

  
  var block_type = key_to_block_type[key]
  if (!block_type) { 
     block_type = default_key;
  }
  return block_type 

}

function  key_value_xml(key, value) {
  // depending on the key another block should be created
  
  var block_type = get_block_type(key,"basic_key_value")
  var ret = {}
  var xml = Blockly.utils.xml.textToDomDocument('<block type="'+block_type+'"><field name="KEY">'+key +'</field><field name="VALUE">'+ value +'</field><next></next></block>')
  ret.block = xml.childNodes[0]
  ret.next = xml_find(ret.block, 'next')
  return ret
}
  
function  list_values_to_xml(last_block, values) {
   var ret = {}
   for (var value of values) {  
      if (typeof(value)=='object') {
         last_block = list_or_dict_to_xml(value, last_block)
      }  else
      {
         ret = list_value_xml(value)
         last_block.append(ret.block)
         last_block = ret.next
      }
   
   }
   // end of list nothing to return         
}
   
function dict_values_to_xml(last_block, data) 
{
    var ret = {}
    for(var key in data) {
      var value = data[key];

        if (Array.isArray(value)) {
            ret = key_list_xml(key)
            last_block.append(ret.block)
            last_block = ret.statements
            list_values_to_xml(last_block, value)
                
            last_block = ret.next
        }
        else if (typeof(value)=="object") {
            
            ret = key_dict_xml(key)
            
            last_block.append(ret.block)
            last_block = ret.statements
            dict_values_to_xml(last_block, value)
            last_block = ret.next
            }
        else{
            ret = key_value_xml(key, value)
            last_block.append(ret.block)
            last_block = ret.next  
        } 
   //# nothing to return end of dict
    }
}

// data can be dict or list  
function  list_or_dict_to_xml(data, last_block) {
  
  if (Array.isArray(data)) {
      var ret = list_xml()
      
      last_block.appendChild(ret.block)
      last_block = ret.statements
      list_values_to_xml(last_block, data)
      last_block = ret.next
  } else if (typeof(data)=="object") {
      var ret = dict_xml()
      last_block.append(ret.block)
      last_block = ret.statements
      dict_values_to_xml(last_block, data)
      last_block = ret.next
  }
  else
  {
      print('can not start with value should be list or dict: ' + type(data))
  }
  return last_block
}  
    
      

JsonToBlocklyXML.load = function (data) {

  var root = Blockly.utils.xml.textToDomDocument('<xml xmlns="https://developers.google.com/blockly/xml"></xml>')
  
  list_or_dict_to_xml(data, root.childNodes[0])
  
  
  return root.childNodes[0] // return the node instead of the document
}


export default JsonToBlocklyXML;
   
