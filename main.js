import "./style.css";
import Blockly from "blockly";
import axios from "axios";
// import * as Blockly from 'blockly';
// import {registerTooltipExtension} from '@blockly/block-extension-tooltip';
// import {request} from "./node_modules/request/index.js";
// import request from "request";

// document.querySelector('#app').innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `
var workspace = Blockly.inject("blocklyDiv", {
  toolbox: document.getElementById("toolbox"),
});
// registerTooltipExtension((block) => {
//   // Custom tooltip rendering method.
//   const el = document.createElement('div');
//   el.className = 'my-custom-tooltip';
//   el.textContent = block.getTooltip();
//   return el;
// }, 'custom-tooltip-extension');

// Blockly.Blocks['my-block'] = {
//   init: function() {
//     Blockly.Extensions.apply('custom-tooltip-extension', this, false);
//   },
// };
const callingAPI=()=>{
  // return new Promise((resolve,reject)=>{
    axios.get("https://api.agify.io/?name=bella").then((res)=>{
      console.log(res);
      // resolve(res);
    });
      // });
};
// callingAPI();
// callingAPI().then((body)=>{
//   console.log(body);
//   }).catch((err)=>{
//     console.log(err);
//   });
Blockly.Blocks["string_length"] = {
  init: function () {
    // Blockly.Extensions.apply('custom-tooltip-extension', this, false);
    // this.appendValueInput("STRING");
    this.appendValueInput("VALUE").setCheck("String").appendField("length of");

    this.setOutput(true, "Number");
    this.setColour(160);
    this.setTooltip("Returns number of letters in the provided text.");
    this.setHelpUrl("http://www.w3schools.com/jsref/jsref_length_string.asp");
  },
};

Blockly.JavaScript["string_length"] = function (block) {
  // String or array length.
  var argument0 =
    Blockly.JavaScript.valueToCode(
      block,
      "VALUE",
      Blockly.JavaScript.ORDER_FUNCTION_CALL
    ) || "''";
  console.log("Hey", argument0);
  return [argument0 + ".length", Blockly.JavaScript.ORDER_MEMBER];
};
Blockly.Blocks["api_call"]={
  init: function() {
    this.appendValueInput("API_URL")
      .setCheck("String")
      .appendField("API Call");
    this.appendValueInput("PARAMS")
      .setCheck("String")
      .appendField("Parameters");
    this.appendValueInput("headers").setCheck("String").appendField("Headers");
    this.setInputsInline(true);
    this.appendStatementInput("INSERTED").setCheck("Number");
    this.setColour(160);
    this.setTooltip("");
  }
};

Blockly.JavaScript["api_call"] = function (block) {
  let url=Blockly.JavaScript.valueToCode(
    block,
    "API_URL",
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || "''";
  let headerType=Blockly.JavaScript.valueToCode(
    block,
    "PARAMS",
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || "''";
  // let headerType= block.getFieldValue("Parameters");s
  return `async function name(body) {
    return new Promise((resolve,reject)=>
    {
      let options={
        url:${url},
        qs:{
        },
        method:"post"
        body:{},
        headers:${headerType},
        json:true
      };
      request.post(options,(err,res,body)=>{
        if(err)
        reject(err);
        else
        {
          if(res.statusCode==200)
          {
            resolve(body);
          }
          else
          {
            reject(res.body.ExceptionMessage);
          }
        }
      })
    })`;
};
Blockly.JavaScript["string_length"] = function (block) {
  // String or array length.
  var argument0 =
    Blockly.JavaScript.valueToCode(
      block,
      "VALUE",
      Blockly.JavaScript.ORDER_FUNCTION_CALL
    ) || "''";
  console.log("Hey", argument0);
  return [argument0 + ".length", Blockly.JavaScript.ORDER_MEMBER];
};


Blockly.Blocks["insert_function"] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Define the Function: "Insert an Element"')
      .appendField(new Blockly.FieldVariable("element"), "pElement");
    this.appendStatementInput("INSERTED").setCheck("Number");
    this.setColour(15);
    this.setTooltip("");
  },
};
Blockly.JavaScript["insert_function"] = function (block) {
  var pElement = Blockly.JavaScript.variableDB_.getName(
    block.getFieldValue("pElement"),
    Blockly.Variables.NAME_TYPE
  );
  var statements = Blockly.JavaScript.statementToCode(block, "INSERTED");
  // TODO: Assemble JavaScript into code variable.
  var cod = statements + ";\n";
  return cod;
};
function nextStep(myInterpreter) {
  
}

function runJS() {
  Blockly.JavaScript.addReservedWords("code");
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  alert(code);
  try {
    var myInterpreter = new Interpreter(code, initFunc);
    if (myInterpreter.step()) {
      window.setTimeout(nextStep, 0);
    }
    // nextStep(myInterpreter);
    console.log("Hey", code);
    eval(code);
  } catch (e) {
    alert(e);
  }
}
window.runJS = runJS;

var initFunc = function (interpreter, globalObject) {
  console.log("YOYO",globalObject);
  var wrapper =function getXhr(callback) {
    var req = new XMLHttpRequest();
    req.open("GET", 'https://api.agify.io/?name=bella', true);
    req.onreadystatechange = function () {
      if (req.readyState == 4 && req.status == 200) {
        console.log('Response');
        callback(req.responseText);
      }
    };
    req.send(null);
    console.log("YOYO1");
    // fetch('https://v2.jokeapi.dev/joke/Any').then((res)=>console.log("Response",res)).catch((err)=>console.log("Error",err));
    console.log("Heyyyy");
    callback("Heyyyy");
  };
  interpreter.setProperty(
    globalObject,
    "getXhr",
    interpreter.createAsyncFunction(wrapper)
  );
};

Blockly.Blocks['more_custom_blocks']={
  init: function() {
    var initName = Blockly.Procedures.findLegalName('', this);
    var nameField = new Blockly.FieldTextInput(initName,
        Blockly.Procedures.rename);
    nameField.setSpellcheck(false);
    this.appendStatementInput('Async Func').appendField('Async Anonym');
    this.appendDummyInput()
        .appendField(Blockly.Msg['PROCEDURES_DEFRETURN_TITLE'])
        .appendField(nameField, 'NAME')
        .appendField('', 'PARAMS');
    this.appendValueInput('RETURN')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg['PROCEDURES_DEFRETURN_RETURN']);
    this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
    if ((this.workspace.options.comments ||
         (this.workspace.options.parentWorkspace &&
          this.workspace.options.parentWorkspace.options.comments)) &&
        Blockly.Msg['PROCEDURES_DEFRETURN_COMMENT']) {
      this.setCommentText(Blockly.Msg['PROCEDURES_DEFRETURN_COMMENT']);
    }
    this.setStyle('procedure_blocks');
    this.setTooltip(Blockly.Msg['PROCEDURES_DEFRETURN_TOOLTIP']);
    this.setHelpUrl(Blockly.Msg['PROCEDURES_DEFRETURN_HELPURL']);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
    this.arguments_ = [];
    this.argumentVarModels_ = [];
    // this.setStatements_(true);
    // this.statementConnection_ = null;
  }
};
Blockly.JavaScript['more_custom_blocks'] = function(block) {


  return block + '\n';
};
// Blockly.JavaScript["procedures_defreturn"]=(block)=>{
//   let reqCode="async "+block;
//   return reqCode+"\n"; 
// }
Blockly.Blocks['controls_try'] = {
  // Try
  init: function() {
    this.setHelpUrl(Blockly.Msg.CONTROLS_REPEAT_HELPURL);

    this.setColour(120);
    this.appendStatementInput('TRY').appendField("try");
        // .appendTitle('try');
    this.appendStatementInput('CATCH').appendField("catch");
        // .appendTitle('catch');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Standard try { } carch (err) {..} you must provide an error handler to consume the error message');
  }
};

Blockly.JavaScript['controls_try'] = function(block) {

  // try catch
  var tryblock = Blockly.JavaScript.statementToCode(block, 'TRY');
  var catchblock = Blockly.JavaScript.statementToCode(block, 'CATCH');
  var code = 'try {\n' + tryblock + '}\n';
  code += 'catch(err){\n errorHandler(err.message);\n' + catchblock + '\n}';
  return code + '\n';
};

// const callingApi=()=>{
//   return new Promise((resolve,reject)=>{
//     request(
//       'https://v2.jokeapi.dev/joke/Any',
//       (error,response,body)=>{
//         if(error){
//           reject(error);
//         }else{
//           resolve(body);
//         }
//       }
//     );
//   }
//   );
// };

