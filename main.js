import "./style.css";
import Blockly from "blockly";

// document.querySelector('#app').innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `
var workspace = Blockly.inject("blocklyDiv", {
  toolbox: document.getElementById("toolbox"),
});
Blockly.Blocks["string_length"] = {
  init: function () {
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

function runJS() {
  Blockly.JavaScript.addReservedWords("code");
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  alert(code);
  try {
    console.log("Hey", code);
    eval(code);
  } catch (e) {
    alert(e);
  }
}
window.runJS = runJS;
