var toolbox = {
 "kind": "categoryToolbox",
 "contents": [
  {
   "kind": "category",
   "name" : "Program",
   "colour": "#900",
   "contents": [
    {
      "kind": "block",
      "type": "start"
    },
    {
      "kind": "block",
      "type": "spotSelection"
    },
    {
      "kind": "block",
      "type": "sayText"
    },
    {
      "kind": "block",
      "type": "logText", 
      "fields": {
      },
      "inputs": {
        "LOG" :  {
          "block": {
            "type": "string",
          }
        },
      }
    },
    {
      "kind": "block",
      "type": "logVal", 
      "fields": {
      },
      "inputs": {
        "VAL" :  {
          "block": {
            "type": "spotPosition",
          }
        },
      }
    },
   ]
  },
  {
   "kind": "category",
   "name" : "Movement",
   "colour": "#36f",
   "contents": [
    {
      "kind": "block",
      "type": "move", 
      "fields": {
      },
      "inputs": {
        "DISTANCE" :  {
          "block": {
            "type": "number", 
            "fields": {
            "NUM" : "10",
            },
            "inputs": {
            }
          },
        },
        "DIRECTION" :  {
          "block": {
            "type": "vec3static", 
            "fields": {
            "VECTYPE" : "up",
            },
            "inputs": {
            }
          },
        },
      }
    },
    {
      "kind": "block",
      "type": "turn", 
      "fields": {
      },
      "inputs": {
        "ANGLE" :  {
          "block": {
            "type": "degree",
          }
        },
      }
    },
    {
      "kind": "block",
      "type": "goto", 
      "fields": {
      },
      "inputs": {
        "POSITION" :  {
          "block": {
            "type": "positionInputs", 
            "fields": {
            },
            "inputs": {
            "X" :  {
              "block": {
                "type": "number",
              }
            },
            "Y" :  {
              "block": {
                "type": "number",
              }
            },
            "Z" :  {
              "block": {
                "type": "number",
              }
            },
            }
          },
        },
      }
    },
    {
      "kind": "block",
      "type": "glidePos", 
      "fields": {
      },
      "inputs": {
        "SECONDS" :  {
          "block": {
            "type": "number", 
            "fields": {
            "NUM" : "2",
            },
            "inputs": {
            }
          },
        },
        "POSITION" :  {
          "block": {
            "type": "positionInputs", 
            "fields": {
            },
            "inputs": {
            "X" :  {
              "block": {
                "type": "number",
              }
            },
            "Y" :  {
              "block": {
                "type": "number",
              }
            },
            "Z" :  {
              "block": {
                "type": "number",
              }
            },
            }
          },
        },
      }
    },
    {
      "kind": "block",
      "type": "recall"
    },
    {
      "kind": "block",
      "type": "changexyz", 
      "fields": {
      },
      "inputs": {
        "CHANGE" :  {
          "block": {
            "type": "number", 
            "fields": {
            "NUM" : "10",
            },
            "inputs": {
            }
          },
        },
      }
    },
    {
      "kind": "block",
      "type": "setxyz", 
      "fields": {
      },
      "inputs": {
        "SET" :  {
          "block": {
            "type": "number", 
            "fields": {
            "NUM" : "10",
            },
            "inputs": {
            }
          },
        },
      }
    },
    {
      "kind": "block",
      "type": "turnAbout", 
      "fields": {
      },
      "inputs": {
        "ANGLE" :  {
          "block": {
            "type": "degree",
          }
        },
        "POSITION" :  {
          "block": {
            "type": "positionInputs", 
            "fields": {
            },
            "inputs": {
            "X" :  {
              "block": {
                "type": "number",
              }
            },
            "Y" :  {
              "block": {
                "type": "number",
              }
            },
            "Z" :  {
              "block": {
                "type": "number",
              }
            },
            }
          },
        },
      }
    },
   ]
  },
  {
   "kind": "category",
   "name" : "Interactive",
   "colour": "#c3c",
   "contents": [
    {
      "kind": "block",
      "type": "saySeconds", 
      "fields": {
      },
      "inputs": {
        "SAY" :  {
          "block": {
            "type": "string",
          }
        },
        "SAYSECONDS" :  {
          "block": {
            "type": "number", 
            "fields": {
            "NUM" : "2",
            },
            "inputs": {
            }
          },
        },
      }
    },
    {
      "kind": "block",
      "type": "say", 
      "fields": {
      },
      "inputs": {
        "SAY" :  {
          "block": {
            "type": "string",
          }
        },
      }
    },
    {
      "kind": "block",
      "type": "faceCamera"
    },
    {
      "kind": "block",
      "type": "scaleSpot", 
      "fields": {
      },
      "inputs": {
        "SCALE" :  {
          "block": {
            "type": "number", 
            "fields": {
            "NUM" : "0.5",
            },
            "inputs": {
            }
          },
        },
      }
    },
    {
      "kind": "block",
      "type": "hide"
    },
    {
      "kind": "block",
      "type": "show"
    },
    {
      "kind": "block",
      "type": "reset"
    },
   ]
  },
  {
   "kind": "category",
   "name" : "Values",
   "colour": "#090",
   "contents": [
    {
     "kind": "category",
     "name" : "Numbers",
     "colour": "#ff0",
     "contents": [
      {
        "kind": "block",
        "type": "number"
      },
      {
        "kind": "block",
        "type": "degree"
      },
      {
        "kind": "block",
        "type": "vec3mag"
      },
      {
        "kind": "block",
        "type": "vec3comp"
      },
     ]
    },
    {
     "kind": "category",
     "name" : "Positions",
     "colour": "#3c0",
     "contents": [
      {
        "kind": "block",
        "type": "positionInputs", 
        "fields": {
        },
        "inputs": {
          "X" :  {
            "block": {
              "type": "number", 
              "fields": {
              "NUM" : "0",
              },
              "inputs": {
              }
            },
          },
          "Y" :  {
            "block": {
              "type": "number", 
              "fields": {
              "NUM" : "0",
              },
              "inputs": {
              }
            },
          },
          "Z" :  {
            "block": {
              "type": "number", 
              "fields": {
              "NUM" : "0",
              },
              "inputs": {
              }
            },
          },
        }
      },
      {
        "kind": "block",
        "type": "presetPosition"
      },
      {
        "kind": "block",
        "type": "spotPosition"
      },
     ]
    },
    {
     "kind": "category",
     "name" : "Directions",
     "colour": "#9f9",
     "contents": [
      {
        "kind": "block",
        "type": "vec3static"
      },
      {
        "kind": "block",
        "type": "presetDirections"
      },
      {
        "kind": "block",
        "type": "directionFromTo", 
        "fields": {
        },
        "inputs": {
          "FROM" :  {
            "block": {
              "type": "spotPosition", 
              "fields": {
              "SPOT" : "this",
              },
              "inputs": {
              }
            },
          },
          "TO" :  {
            "block": {
              "type": "positionInputs", 
              "fields": {
              },
              "inputs": {
              "X" :  {
                "block": {
                  "type": "number", 
                  "fields": {
                  "NUM" : "0",
                  },
                  "inputs": {
                  }
                },
              },
              "Y" :  {
                "block": {
                  "type": "number", 
                  "fields": {
                  "NUM" : "0",
                  },
                  "inputs": {
                  }
                },
              },
              "Z" :  {
                "block": {
                  "type": "number", 
                  "fields": {
                  "NUM" : "0",
                  },
                  "inputs": {
                  }
                },
              },
              }
            },
          },
        }
      },
      {
        "kind": "block",
        "type": "vec3norm", 
        "fields": {
        },
        "inputs": {
          "VECTOR" :  {
            "block": {
              "type": "positionInputs", 
              "fields": {
              },
              "inputs": {
              "X" :  {
                "block": {
                  "type": "number", 
                  "fields": {
                  "NUM" : "0",
                  },
                  "inputs": {
                  }
                },
              },
              "Y" :  {
                "block": {
                  "type": "number", 
                  "fields": {
                  "NUM" : "0",
                  },
                  "inputs": {
                  }
                },
              },
              "Z" :  {
                "block": {
                  "type": "number", 
                  "fields": {
                  "NUM" : "0",
                  },
                  "inputs": {
                  }
                },
              },
              }
            },
          },
        }
      },
     ]
    },
    {
     "kind": "category",
     "name" : "Operators",
     "colour": "#963",
     "contents": [
      {
        "kind": "block",
        "type": "plus", 
        "fields": {
        },
        "inputs": {
          "A" :  {
            "block": {
              "type": "number",
            }
          },
          "B" :  {
            "block": {
              "type": "number",
            }
          },
        }
      },
      {
        "kind": "block",
        "type": "minus", 
        "fields": {
        },
        "inputs": {
          "A" :  {
            "block": {
              "type": "number",
            }
          },
          "B" :  {
            "block": {
              "type": "number",
            }
          },
        }
      },
      {
        "kind": "block",
        "type": "times", 
        "fields": {
        },
        "inputs": {
          "A" :  {
            "block": {
              "type": "number",
            }
          },
          "B" :  {
            "block": {
              "type": "number",
            }
          },
        }
      },
      {
        "kind": "block",
        "type": "divide", 
        "fields": {
        },
        "inputs": {
          "A" :  {
            "block": {
              "type": "number",
            }
          },
          "B" :  {
            "block": {
              "type": "number",
            }
          },
        }
      },
      {
        "kind": "block",
        "type": "mod", 
        "fields": {
        },
        "inputs": {
          "A" :  {
            "block": {
              "type": "number",
            }
          },
          "B" :  {
            "block": {
              "type": "number", 
              "fields": {
              "NUM" : "1",
              },
              "inputs": {
              }
            },
          },
        }
      },
      {
        "kind": "block",
        "type": "round", 
        "fields": {
        },
        "inputs": {
          "NUM" :  {
            "block": {
              "type": "number", 
              "fields": {
              "NUM" : "3.14",
              },
              "inputs": {
              }
            },
          },
        }
      },
      {
        "kind": "block",
        "type": "abs", 
        "fields": {
        },
        "inputs": {
          "NUM" :  {
            "block": {
              "type": "number", 
              "fields": {
              "NUM" : "-1",
              },
              "inputs": {
              }
            },
          },
        }
      },
     ]
    },
    {
     "kind": "category",
     "name" : "Strings",
     "colour": "#c6c",
     "contents": [
      {
        "kind": "block",
        "type": "string"
      },
      {
        "kind": "block",
        "type": "varText"
      },
      {
        "kind": "block",
        "type": "concat", 
        "fields": {
        },
        "inputs": {
          "A" :  {
            "block": {
              "type": "string", 
              "fields": {
              "TEXT" : "Hello ",
              },
              "inputs": {
              }
            },
          },
          "B" :  {
            "block": {
              "type": "string", 
              "fields": {
              "TEXT" : "World!",
              },
              "inputs": {
              }
            },
          },
        }
      },
     ]
    },
   ]
  },
  {
   "kind": "category",
   "name" : "Logic",
   "colour": "#3ff",
   "contents": [
    {
      "kind": "block",
      "type": "comparison", 
      "fields": {
        "CMP" : "=",
      },
      "inputs": {
        "A" :  {
          "block": {
            "type": "number",
          }
        },
        "B" :  {
          "block": {
            "type": "number",
          }
        },
      }
    },
    {
      "kind": "block",
      "type": "ifthen", 
      "fields": {
      },
      "inputs": {
        "CONDITION" :  {
          "block": {
            "type": "comparison", 
            "fields": {
            "CMP" : "=",
            },
            "inputs": {
            "A" :  {
              "block": {
                "type": "number",
              }
            },
            "B" :  {
              "block": {
                "type": "number",
              }
            },
            }
          },
        },
      }
    },
    {
      "kind": "block",
      "type": "ifthenelse", 
      "fields": {
      },
      "inputs": {
        "CONDITION" :  {
          "block": {
            "type": "comparison", 
            "fields": {
            "CMP" : "=",
            },
            "inputs": {
            "A" :  {
              "block": {
                "type": "number",
              }
            },
            "B" :  {
              "block": {
                "type": "number",
              }
            },
            }
          },
        },
      }
    },
   ]
  },
  {
   "kind": "category",
   "name" : "Events",
   "colour": "#990",
   "contents": [
    {
      "kind": "block",
      "type": "onClick"
    },
    {
      "kind": "block",
      "type": "onStart"
    },
   ]
  },
  {
   "kind": "category",
   "name" : "Control",
   "colour": "#66c",
   "contents": [
    {
      "kind": "block",
      "type": "repeat", 
      "fields": {
      },
      "inputs": {
        "SECONDS" :  {
          "block": {
            "type": "number", 
            "fields": {
            "NUM" : "2",
            },
            "inputs": {
            }
          },
        },
      }
    },
    {
      "kind": "block",
      "type": "repeatTimes", 
      "fields": {
      },
      "inputs": {
        "TIMES" :  {
          "block": {
            "type": "number", 
            "fields": {
            "NUM" : "10",
            },
            "inputs": {
            }
          },
        },
      }
    },
    {
      "kind": "block",
      "type": "delay", 
      "fields": {
      },
      "inputs": {
        "SECONDS" :  {
          "block": {
            "type": "number", 
            "fields": {
            "NUM" : "2",
            },
            "inputs": {
            }
          },
        },
      }
    },
    {
      "kind": "block",
      "type": "forallspots"
    },
    {
      "kind": "block",
      "type": "forSpotSelection"
    },
   ]
  },

 ]
}

// hardcoded till the end

var options = { 
  toolbox : toolbox, 
  collapse : true, 
  comments : true, 
  disable : false, 
  maxBlocks : Infinity, 
  trashcan : false, 
  horizontalLayout : false, 
  toolboxPosition : 'start', 
  css : true, 
  zoom: {
    controls: true,
  },
  media : 'https://blockly-demo.appspot.com/static/media/', 
  rtl : false, 
  scrollbars : true, 
  sounds : true, 
  oneBasedIndex : true
};

function codeGeneration(event) {
  if (Blockly.JavaScript)
  {  
    try {
          var code = Blockly.JavaScript.workspaceToCode(workspace);
    } catch (e) {
      console.warn("Error while creating code", e);
      code = "Error while creating code:" + e
    }     
    document.getElementById('codeDiv').value = code;
  }
}

function updateDropdownRename(event)
{
  if (event.type == "change" && (event.name=="NAME" || event.name=="FIELDNAME" ) || event.type == "create")
  {
    var blocks = workspace.getAllBlocks(); 
    for (var k = 0; k < blocks.length; k++) {
      var block = blocks[k];
 
      for (var i = 0, input; (input = block.inputList[i]); i++) {
        for (var j = 0, field; (field = input.fieldRow[j]); j++) {
          if (field.getOptions) // is dropdown
          {
           // during name update of a block  
           // stay to have the same value (block id)
           // but need to rerender the text
           // get and setValue are needed (probably some side effect)
           var value = field.getValue();
           var field_options = field.getOptions();
           field.setValue(value)     
           field.forceRerender()
          }
        }
      }
   }
  }
}

var workspace;

function vscode_start()
{
  inject();

  search();

}

function search()
{
  workspace.workspaceSearch = new WorkspaceSearch(workspace);

  workspace.workspaceSearch.init();
  workspace.workspaceSearch.open();
}

function inject()
{
  /* Inject your workspace */ 
  workspace = Blockly.inject("blocklyDiv", options);
  workspace.name="Concrete"
}

function start()
{
  inject();

  BlocklyStorage.restoreBlocks(workspace, 'concrete');
  BlocklyStorage.backupOnUnload(workspace, 'concrete');

  workspace.addChangeListener(codeGeneration);
  workspace.addChangeListener(updateDropdownRename);

  search();
  document.getElementById("save").addEventListener("click", saveFile);
  add_load()
  return workspace;
}

function get_json(workspace)
{
  var json_text = Blockly.serialization.workspaces.save(workspace);
  var data = JSON.stringify(json_text, undefined, 2);
  return data
}

function download(name, url) {
  const a = document.createElement('a')
  a.href = url
  
  a.download = name;
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

function saveFile()
{
    var data = get_json(workspace)
    var blob = new Blob([data], {type: 'text/plain;charset=utf-8'});
    var url = URL.createObjectURL(blob);
    download('concrete.json', url)
};

function add_load()
{
  const inputElement = document.getElementById("input");
  inputElement.addEventListener("change", handleFiles, false);
  function handleFiles() {
    for (let i = 0; i < this.files.length; i++) {
    var file = this.files[i];
    if (file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
      var json = JSON.parse(evt.target.result);
      Blockly.serialization.workspaces.load(json, workspace)
      }
      reader.onerror = function (evt) {
      document.getElementById("error").innerHTML = "error reading file";
      }
    }
    }
  }
}


