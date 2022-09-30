# -*- coding: utf-8 -*-
"""YAML or JSON to Blockly JSON"""

import os
from collections import OrderedDict

def list_value_json(value):
  block = {
            "block": {
              "type": "basic_list_value",
              "fields" : {
                  "VALUE":value
              },
              "next" : {}
            }
          }
  next = block['block']['next']
  return (block, next)

def dict_json():
  block = { 
            "block": {
              "type": "basic_dict",
              "inputs": {
                "LIST": {}
              },
              "next" : {}
            }
          }
                    
  statements = block['block']['inputs']['LIST']
  next = block['block']['next']
  return (block, statements, next)

def list_json():
  block = {
            "block" : {
              "type": "basic_list",
              "inputs": {
                "LIST": {}
              },
              "next": {}
            }
          }
  statements = block['block']['inputs']['LIST']
  next = block['block']['next']
  return (block, statements, next)

def key_list_json(key):
  block = {
            "block" : {
              "type": "basic_key_list",
              "fields": {
                "KEY": key
              },
              "inputs": {
                "LIST": {}
              },
              "next": {}
            }
          }
 
  statements = block['block']['inputs']['LIST']
  next = block['block']['next']
  return (block, statements, next)
  
def key_dict_json(key):
  block = {
            "block" : {
              "type": "basic_key_dict",
              "fields": {
                "KEY": key
              },
              "inputs": {
                "LIST": {}
              },
              "next" : {}
            }
          }

                                    
  statements = block['block']['inputs']['LIST']
  next = block['block']['next']
  return (block, statements, next)

def key_value_json(key, value):
  block = {
            "block": {
              "type": "basic_key_value",
              "fields": {
                "KEY": key,
                "VALUE": value
              },
              "next": {}
            }
          }
           
  next = block['block']['next']
  return(block, next)
  
def list_values_to_json(last_block, values):
   for value in values:  
       if type(value)==list or type(value)==dict or type(value)==OrderedDict:
         last_block = list_or_dict_to_json(value, last_block)
       else:
         (block, next) = list_value_json(value)
         last_block.update(block)
         last_block = next
   # end of list nothing to return         

   
def dict_values_to_json(last_block, data):
    for key, value in data.items():
        if key.startswith('ADEL'):
            pass
        elif type(value)==list:
            (block, statements, next) = key_list_json(key)
            last_block.update(block)
            last_block = statements
            list_values_to_json(last_block, value)
                
            last_block = block
        elif type(value)==dict or type(value)==OrderedDict:
            # if value contains keys "name" and "typestr" -> make ddf_field
            #if contains(value, "name", "typestr"):
            (block, statements, next) = key_dict_json(key)
            #else:
            #   (block, statements, next) = key_dict_json(key)
            last_block.update(block)
            last_block = statements
            dict_values_to_json(last_block, value)
            last_block = next
        else:
            (block, next) = key_value_json(key, value)
            last_block.update(block)
            last_block = next
    # nothing to return end of dict
    
# data can be dict or list  
def list_or_dict_to_json(data, last_block):
  
  if type(data)==list:
      (block, statements, next) = list_json()
      last_block.update( block)
      last_block = statements
      list_values_to_json(last_block, data)
      last_block = next
  
  elif type(data)==dict or type(data)==OrderedDict:
      (block, statements, next) = dict_json()
      last_block.update(block)
      last_block = statements
      dict_values_to_json(last_block, data)
      last_block = next
  else:
      print('can not start with value should be list or dict: ' + str(type(data)))
  return last_block
  
      
def get_root(data):

  root = {
  "blocks": {
    "languageVersion": 0,
    "blocks": [{}]
    }
  }
  
  top_block = {}
  list_or_dict_to_json(data, top_block)
  # kind of strange that the blocks array does not need a block inside
  root['blocks']['blocks'][0] = top_block['block']
  
  return root

import oyaml as yaml
import json

import sys
sys.setrecursionlimit(1500)
filename = sys.argv[1]
import os
path, file_extension = os.path.splitext(filename)
print ('Parsing: '+ path + ' with ' + file_extension)

with open(filename, 'r') as f:
    
    if file_extension in ['.yml','.yaml']:
       data = yaml.safe_load(f)
    elif file_extension in ['.json']:
       data = json.load(f)   
    else:
       print ('No file proviced?' + sys.argv[1])
       sys.exit(1)
   
    root = get_root(data)
    #print(root)
   
    with open(path+'.blockly','w') as f:
        json.dump(root, f, indent=4)
        print ('Saved to ' + path + '.blockly')
   
