import "./style.css";
import Blockly from "blockly";
import { FieldSlider } from "@blockly/field-slider";
import FieldDate from "@blockly/field-date";
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
    move: {
        scrollbars: {
            horizontal: true,
            vertical: true,
        },
        drag: false,
        wheel: false,
    },
    zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
        pinch: true,
    },
    trashcan: true,
});

/**************************  Was Checking Something Over Here **************************************/
// Blockly.Xml.workspaceToDom = function(workspace, opt_noId) {
//     var xml = Blockly.utils.xml.createElement('xml');
//     var variablesElement = Blockly.Xml.variablesToDom(
//         Blockly.Variables.allUsedVarModels(workspace));
//     if (variablesElement.hasChildNodes()) {
//         xml.appendChild(variablesElement);
//     }
//     var comments = workspace.getTopComments(true);
//     for (var i = 0, comment;
//         (comment = comments[i]); i++) {
//         xml.appendChild(comment.toXmlWithXY(opt_noId));
//     }
//     var blocks = workspace.getTopBlocks(true);
//     for (var i = 0, block;
//         (block = blocks[i]); i++) {
//         xml.appendChild(Blockly.Xml.blockToDomWithXY(block, opt_noId));
//     }
//     return xml;
// };
/************************************************************************************************ */
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
const callingAPI = () => {
    // return new Promise((resolve,reject)=>{
    axios.get("https://api.agify.io/?name=bella").then((res) => {
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
    init: function() {
        // Blockly.Extensions.apply('custom-tooltip-extension', this, false);
        // this.appendValueInput("STRING");
        this.appendValueInput("VALUE").setCheck("String").appendField("length of");

        this.setOutput(true, "Number");
        this.setColour(160);
        this.setTooltip("Returns number of letters in the provided text.");
        this.setHelpUrl("http://www.w3schools.com/jsref/jsref_length_string.asp");
    },
};

Blockly.JavaScript["string_length"] = function(block) {
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
Blockly.Blocks["main_function"] = {
    init: function() {
        this.appendDummyInput().appendField("main");
        this.appendStatementInput("MAIN_FUNCTION").setCheck(null);
        this.setColour(230);
        this.setTooltip("");
        // this.setPreviousStatement(true);
        this.setHelpUrl("https://www.google.com");
    },
};
Blockly.JavaScript["main_function"] = function(block) {
    let statements_main_function = Blockly.JavaScript.statementToCode(
        block,
        "MAIN_FUNCTION"
    );
    let mainCode = `function main(queyString,body,callback){
    ${statements_main_function}
    }`;
    return mainCode;
};
Blockly.Blocks["fields_date"] = {
    init: function() {
        this.appendDummyInput()
            .appendField("date: ")
            .appendField(new FieldDate("2020-02-20"), "date_field");
        this.setColour(230);
        this.setOutput(true);
    },
};
Blockly.JavaScript["fields_date"] = function(block) {
    return `new Date(${block.getFieldValue("date_field")})`;
};
Blockly.Blocks["object_builder"] = {
    init: function() {
        this.appendDummyInput()
            .appendField("body");
        this.appendValueInput("Attribute")
            .appendField("attribute");
        this.appendValueInput("Value")
            .appendField("value");
        this.setOutput(true);
    },
};
Blockly.JavaScript["object_builder"] = function(block) {
    // var attribute = block.getFieldValue("attribute");
    let attribute =
        Blockly.JavaScript.customisedValueToCode(
            block,
            "Attribute",
            Blockly.JavaScript.ORDER_MEMBER
        ) || "''";
    let tBA = block.getInputTargetBlock("Attribute");
    console.log(tBA);
    let tBV = block.getInputTargetBlock("Value");
    // let tupleAttribute = this.blockToCode(tBA);
    // let tupleValue = block.blockToCode(tBV);
    // console.log(tupleValue);
    // let attribute =
    //     Blockly.JavaScript.valueToCode(
    //         block,
    //         "Attribute");
    let value =
        Blockly.JavaScript.customisedValueToCode(
            block,
            "Value",
            Blockly.JavaScript.ORDER_MEMBER
        ) || "''";
    // let value =
    //     Blockly.JavaScript.valueToCode(
    //         block,
    //         "Value");
    let jsonObj = `{${attribute}:${value}}`;
    return jsonObj;
    // let value = Blockly.JavaScript.valueToCode(
};
/*******************************CustomisedValueToCode***************************************/
Blockly.Generator.prototype.customisedValueToCode = function(block, name, outerOrder) {
    if (isNaN(outerOrder)) {
        throw TypeError('Expecting valid order from block: ' + block.type);
    }
    var targetBlock = block.getInputTargetBlock(name);
    if (!targetBlock) {
        return '';
    }
    var tuple = this.blockToCode(targetBlock);
    console.log("Tuple", tuple);
    if (tuple === '') {
        // Disabled block.
        return '';
    }
    // Value blocks must return code and order of operations info.
    // Statement blocks must only return code.
    /*********Here I have commented error throw ******************************/

    if (Array.isArray(tuple)) {
        //   throw TypeError('Expecting tuple from value block: ' + targetBlock.type);
        tuple = tuple[0];

    }

    /*********************************************************************** */
    // var code = tuple[0];
    var code = tuple;
    // var innerOrder = tuple[1];
    // if (isNaN(innerOrder)) {
    //     throw TypeError('Expecting valid order from value block: ' +
    //         targetBlock.type);
    // }
    if (!code) {
        return '';
    }

    // Add parentheses if needed.
    // var parensNeeded = false;
    // var outerOrderClass = Math.floor(outerOrder);
    // var innerOrderClass = Math.floor(innerOrder);
    // if (outerOrderClass <= innerOrderClass) {
    //     if (outerOrderClass == innerOrderClass &&
    //         (outerOrderClass == 0 || outerOrderClass == 99)) {
    //         // Don't generate parens around NONE-NONE and ATOMIC-ATOMIC pairs.
    //         // 0 is the atomic order, 99 is the none order.  No parentheses needed.
    //         // In all known languages multiple such code blocks are not order
    //         // sensitive.  In fact in Python ('a' 'b') 'c' would fail.
    //     } else {
    //         // The operators outside this code are stronger than the operators
    //         // inside this code.  To prevent the code from being pulled apart,
    //         // wrap the code in parentheses.
    //         parensNeeded = true;
    //         // Check for special exceptions.
    //         for (var i = 0; i < this.ORDER_OVERRIDES.length; i++) {
    //             if (this.ORDER_OVERRIDES[i][0] == outerOrder &&
    //                 this.ORDER_OVERRIDES[i][1] == innerOrder) {
    //                 parensNeeded = false;
    //                 break;
    //             }
    //         }
    //     }
    // }
    // if (parensNeeded) {
    //     // Technically, this should be handled on a language-by-language basis.
    //     // However all known (sane) languages use parentheses for grouping.
    //     code = '(' + code + ')';
    // }
    return code;
};
/************************************************************************************************ */
/************************** Customised List ************************************************/
Blockly.Blocks['customised_list'] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this {Blockly.Block}
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg['LISTS_CREATE_WITH_HELPURL']);
        this.setStyle('list_blocks');
        this.itemCount_ = 3;
        this.updateShape_();
        this.setOutput(true);
        this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
        this.setTooltip(Blockly.Msg['LISTS_CREATE_WITH_TOOLTIP']);
    },
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function() {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function(xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this {Blockly.Block}
     */
    decompose: function(workspace) {
        var containerBlock = workspace.newBlock('lists_create_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('lists_create_with_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this {Blockly.Block}
     */
    compose: function(containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        var connections = [];
        while (itemBlock && !itemBlock.isInsertionMarker()) {
            connections.push(itemBlock.valueConnection_);
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
        // Disconnect any children that don't belong.
        for (var i = 0; i < this.itemCount_; i++) {
            var connection = this.getInput('ADD' + i).connection.targetConnection;
            if (connection && connections.indexOf(connection) == -1) {
                connection.disconnect();
            }
        }
        this.itemCount_ = connections.length;
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
        }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this {Blockly.Block}
     */
    saveConnections: function(containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            i++;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this {Blockly.Block}
     */
    updateShape_: function() {
        if (this.itemCount_ && this.getInput('EMPTY')) {
            this.removeInput('EMPTY');
        } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
            this.appendDummyInput('EMPTY')
                .appendField(Blockly.Msg['LISTS_CREATE_EMPTY_TITLE']);
        }
        // Add new inputs.
        for (var i = 0; i < this.itemCount_; i++) {
            if (!this.getInput('ADD' + i)) {
                var input = this.appendValueInput('ADD' + i)
                    .setAlign(Blockly.ALIGN_RIGHT);
                if (i == 0) {
                    input.appendField(Blockly.Msg['LISTS_CREATE_WITH_INPUT_WITH']);
                }
            }
        }
        // Remove deleted inputs.
        while (this.getInput('ADD' + i)) {
            this.removeInput('ADD' + i);
            i++;
        }
    }
};
Blockly.Blocks['lists_create_with_container'] = {
    /**
     * Mutator block for list container.
     * @this {Blockly.Block}
     */
    init: function() {
        this.setStyle('list_blocks');
        this.appendDummyInput()
            .appendField(Blockly.Msg['LISTS_CREATE_WITH_CONTAINER_TITLE_ADD']);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg['LISTS_CREATE_WITH_CONTAINER_TOOLTIP']);
        this.contextMenu = false;
    }
};

Blockly.Blocks['lists_create_with_item'] = {
    /**
     * Mutator block for adding items.
     * @this {Blockly.Block}
     */
    init: function() {
        this.setStyle('list_blocks');
        this.appendDummyInput()
            .appendField(Blockly.Msg['LISTS_CREATE_WITH_ITEM_TITLE']);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg['LISTS_CREATE_WITH_ITEM_TOOLTIP']);
        this.contextMenu = false;
    }
};

Blockly.JavaScript['customised_list'] = function(block) {
    // Create a list with any number of elements of any type.
    var elements = new Array(block.itemCount_);
    let elem = [];
    console.log("Customised List Elements", elements);
    for (var i = 0; i < block.itemCount_; i++) {
        // elements[i] = Blockly.JavaScript.valueToCode(block, 'ADD' + i,
        //     Blockly.JavaScript.ORDER_FUNCTION_CALL) || 'null';
        elements[i] = block.getFieldValue('ADD' + i);
        elem.push(block.getFieldValue('ADD' + i));
        console.log("Customised List Element", elem[i]);
        // elem.push()
    }

    var code = '[' + elements.join(', ') + ']';
    // return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    // return [code, Blockly.JavaScript.ORDER_ATOMIC];
    return code;
};
/************************************************************************************************/

Blockly.Blocks["function_caller"] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Calling Function")
            .appendField(
                new Blockly.FieldDropdown(
                    [
                        ["1", "functionOne"],
                        ["2", "functionTwo"],
                    ],
                    this.validate
                ),
                "funcDropdown"
            );

        // this.appendStatementInput("MAIN_FUNCTION")
        //     .setCheck(null);
        this.setColour(200);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
        this.setHelpUrl("");
    },
    validate: function(newValue) {
        this.getSourceBlock().updateConnections(newValue);
        return newValue;
    },
    updateConnections: function(newValue) {
        this.removeInput("functionOne", /* no error */ true);
        this.removeInput("functionTwo", /* no error */ true);
        if (newValue == "functionOne") {
            this.appendStatementInput("functionOne");
        } else if (newValue == "functionTwo") {
            this.appendValueInput("functionTwo");
        }
    },
};
Blockly.Blocks["customised_list_2"] = {
    init: function() {
        this.itemCount_ = 0;
        this.appendDummyInput()
            .appendField("List/Arrays/SquareBrackets")
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("No. of Elements", this.validate), "noOfElems")
        this.setOutput(true);
        // this.appendValueInput("Test")
        //     .appendField("Check")
    },
    validate: function(newValue) {
        this.getSourceBlock().updateConnections(newValue);
        return newValue;
    },
    updateConnections: function(newValue) {
        // this.removeInput("functionOne", /* no error */ true);
        // this.removeInput("functionTwo", /* no error */ true);
        // if (newValue == "functionOne") {
        //     this.appendStatementInput("functionOne");
        // } else if (newValue == "functionTwo") {
        //     this.appendValueInput("functionTwo");
        // }
        // let i = 0;
        // while (true) {
        //     if (this.getInput(`element${i}`)) {
        //         this.removeInput(`element${i}`, /* no error */ true);
        //     } else
        //         break;
        // }
        for (var i = 0; i < this.itemCount_; i++) {
            this.removeInput(`element${i}`, /* no error */ true);
        }
        this.itemCount_ = parseInt(newValue);
        for (let i = 0; i < parseInt(newValue); i++) {
            this.appendValueInput(`element${i}`);
        }
    },

}
Blockly.JavaScript['customised_list_2'] = function(block) {
    // Create a list with any number of elements of any type.
    var elements = new Array(block.itemCount_);
    let elem = [];
    let co = `[`;
    // console.log("Customised List Elements", elements);
    for (let i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.JavaScript.customisedValueToCode(block, 'element' + i,
            Blockly.JavaScript.ORDER_MEMBER) || "''";
        // elements[i] = block.getFieldValue(`element${i}`);
        elem.push(block.getFieldValue(`element${i}`));

        console.log("Customised List Element", elements[i]);
        co += `${elements[i]},`
            // elem.push()
    }
    co += `]`;
    let code1 = `[${block.getFieldValue("Test")}]`;
    return co;
};
Blockly.JavaScript["function_caller"] = function(block) {
    let mainCode = `const var${block.getFieldValue(
    "funcDropdown"
  )}=await ${block.getFieldValue("funcDropdown")}();\n`;
    return mainCode;
};
Blockly.Blocks["callback"] = {
    init: function() {
        this.appendDummyInput()
            .appendField("callback")
            .appendField(new Blockly.FieldVariable("callBack"), "callBack");
        this.setPreviousStatement(true);

        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    },
};
Blockly.JavaScript["callback"] = function(block) {
    let callbackVal = Blockly.JavaScript.valueToCode(
        block,
        "callbackVal",
        Blockly.JavaScript.ORDER_ATOMIC
    );
    let callbackCode = `callback(${callbackVal})`;
    return callbackCode;
};

Blockly.Blocks["api_call"] = {
    init: function() {
        // .setCheck("String")
        this.appendValueInput("=API_URL")
            .appendField("API Call")
            .appendField(new Blockly.FieldTextInput("defaultText"), "functionName")
            .appendField("authorization-type")
            .appendField(
                new Blockly.FieldDropdown([
                    ["x-api-key", "x-api-key"],
                    ["Authorization-Bearer", "Authorization-Bearer"],
                    ["access/secret keys", "access/secret keys"],
                ]),
                "funcDropdown"
            )
            .appendField("URL");
        this.appendDummyInput()
            .appendField("Method")
            .appendField(
                new Blockly.FieldDropdown([
                    ["get", "get"],
                    ["post", "post"],
                    ["put", "put"],
                    ["delete", "delete"],
                ]),
                "methods"
            );
        this.appendValueInput("Body")
            .appendField("Body");
        // .appendField(new Blockly.FieldMultilineInput("body"), "body");
        this.appendValueInput("PARAMS")
            .setCheck("String")
            .appendField("Parameters");
        this.appendValueInput("headers").setCheck("String").appendField("Headers");
        this.setInputsInline(false);
        // this.appendStatementInput("INSERTED").setCheck("Number");
        this.setColour(160);
        this.setTooltip("");
    },
};

Blockly.JavaScript["api_call"] = function(block) {
    let url =
        Blockly.JavaScript.valueToCode(
            block,
            "API_URL",
            Blockly.JavaScript.ORDER_FUNCTION_CALL
        ) || "''";
    let params =
        Blockly.JavaScript.valueToCode(
            block,
            "PARAMS",
            Blockly.JavaScript.ORDER_FUNCTION_CALL
        ) || "''";
    params = params.replaceAll(`"`, `\"`);
    let body =
        Blockly.JavaScript.customisedValueToCode(
            block,
            "Body",
            Blockly.JavaScript.ORDER_FUNCTION_CALL
        ) || "''";
    let headerType =
        Blockly.JavaScript.valueToCode(
            block,
            "headers",
            Blockly.JavaScript.ORDER_FUNCTION_CALL
        ) || "''";
    let name = block.getFieldValue("functionName");
    // let headerType= block.getFieldValue("Parameters");s
    return `async function ${name}(body) {
    return new Promise((resolve,reject)=>
    {
      let options={
        url:${url},
        qs:${params},
        method:"post"
        body:${body},
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
Blockly.JavaScript["string_length"] = function(block) {
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
    init: function() {
        this.appendDummyInput()
            .appendField('Define the Function: "Insert an Element"')
            .appendField(new Blockly.FieldVariable("element"), "pElement");
        this.appendStatementInput("INSERTED").setCheck("Number");
        this.setColour(15);
        this.setTooltip("");
    },
};
Blockly.JavaScript["insert_function"] = function(block) {
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
    document.getElementById("displayCode").value = code;
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

var initFunc = function(interpreter, globalObject) {
    console.log("YOYO", globalObject);
    var wrapper = function getXhr(callback) {
        var req = new XMLHttpRequest();
        req.open("GET", "https://api.agify.io/?name=bella", true);
        req.onreadystatechange = function() {
            if (req.readyState == 4 && req.status == 200) {
                console.log("Response");
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

Blockly.Blocks["more_custom_blocks"] = {
    init: function() {
        var initName = Blockly.Procedures.findLegalName("", this);
        var nameField = new Blockly.FieldTextInput(
            initName,
            Blockly.Procedures.rename
        );
        nameField.setSpellcheck(false);

        this.appendDummyInput()
            .appendField(Blockly.Msg["PROCEDURES_DEFRETURN_TITLE"])
            .appendField(nameField, "NAME")
            .appendField("", "PARAMS");

        this.setMutator(new Blockly.Mutator(["procedures_mutatorarg"]));
        if (
            (this.workspace.options.comments ||
                (this.workspace.options.parentWorkspace &&
                    this.workspace.options.parentWorkspace.options.comments)) &&
            Blockly.Msg["PROCEDURES_DEFRETURN_COMMENT"]
        ) {
            this.setCommentText(Blockly.Msg["PROCEDURES_DEFRETURN_COMMENT"]);
        }

        this.setStyle("procedure_blocks");
        this.setTooltip(Blockly.Msg["PROCEDURES_DEFRETURN_TOOLTIP"]);
        this.setHelpUrl(Blockly.Msg["PROCEDURES_DEFRETURN_HELPURL"]);
        this.appendStatementInput("Async Func").appendField("Async Anonym");
        this.appendValueInput("RETURN")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg["PROCEDURES_DEFRETURN_RETURN"]);
        // this.setNextStatement(true);
        this.setPreviousStatement(true);
        this.arguments_ = [];
        this.argumentVarModels_ = [];
        // this.setStatements_(true);
        // this.statementConnection_ = null;
    },
};
Blockly.JavaScript["more_custom_blocks"] = function(block) {
    return block + "\n";
};
// Blockly.JavaScript["procedures_defreturn"]=(block)=>{
//   let reqCode="async "+block;
//   return reqCode+"\n";
// }
Blockly.Blocks["custom_variable"] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Variable")
            .appendField(new Blockly.FieldTextInput("element"), "pElement");
        this.setColour(15);
        this.setTooltip("");
        this.appendDummyInput()
            .appendField("Calling Function")
            .appendField(
                new Blockly.FieldDropdown(
                    [
                        ["Select Type", "Select Type"],
                        ["Obtain from body", "body"],
                        ["Create a new variable", "newCreate"],
                        ["Create a new variable with value", "newCreateVal"]
                    ],
                    this.validate
                ),
                "varDropdown"
            );

    },
    validate: function(newValue) {
        this.getSourceBlock().updateConnections(newValue);
        return newValue;
    },
    updateConnections: function(newValue) {
        this.removeInput("body", /* no error */ true);
        this.removeInput("newCreate", /* no error */ true);
        this.removeInput("newCreateVal", /* no error */ true);
        this.removeInput("newCreateValue", true);
        if (newValue == "body") {
            this.setPreviousStatement(false);
            this.setNextStatement(false);
            this.setOutput(true);
        } else if (newValue == "newCreate") {
            this.setOutput(false);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
        } else if (newValue == "newCreateVal") {
            this.setOutput(false);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.appendValueInput("newCreateValue");
        }
    },
}
Blockly.JavaScript["custom_variable"] = function(block) {
    let varCode = block.getFieldValue("pElement");
    let varDropdown = block.getFieldValue("varDropdown");
    if (varDropdown == "body") {
        return varCode;
    } else if (varDropdown == "newCreate") {

        return 'let ' + varCode;
    } else if (varDropdown == "newCreateVal") {
        return 'let ' + varCode + '=' + Blockly.JavaScript.customisedValueToCode(block, "newCreateValue", Blockly.JavaScript.ORDER_FUNCTION_CALL);
    }
}

Blockly.Blocks["custom_while"] = {
    init: function() {
        // this.appendDummyInput().appendField("while");
        this.appendValueInput("While_Condition").setCheck("Boolean");
        this.appendStatementInput("While_Caller")
            .appendField("while")
            .appendField(new FieldSlider(50), "FIELDNAME");
        this.setPreviousStatement(true);
        this.setColour(250);
        this.setTooltip("Customised while loop");
    },
};
Blockly.JavaScript["custom_while"] = function(block) {
    var while_caller = Blockly.JavaScript.statementToCode(block, "While_Caller");
    var while_condition = Blockly.JavaScript.valueToCode(
        block,
        "While_Condition",
        Blockly.JavaScript.ORDER_FUNCTION_CALL
    );
    var while_code = "while(" + while_condition + "){" + while_caller + "}\n";
    return while_code;
};

Blockly.Blocks["controls_try"] = {
    // Try
    init: function() {
        this.setHelpUrl(Blockly.Msg.CONTROLS_REPEAT_HELPURL);

        this.setColour(120);
        this.appendStatementInput("TRY").appendField("try");
        // .appendTitle('try');
        this.appendStatementInput("CATCH").appendField("catch");
        // .appendTitle('catch');
        this.appendStatementInput("FINAL").appendField("final");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(
            "Standard try { } carch (err) {..} you must provide an error handler to consume the error message"
        );
    },
};

Blockly.JavaScript["controls_try"] = function(block) {
    // try catch
    var tryblock = Blockly.JavaScript.statementToCode(block, "TRY");
    var catchblock = Blockly.JavaScript.statementToCode(block, "CATCH");
    var finalblock = Blockly.JavaScript.statementToCode(block, "FINAL");
    var code = "try {\n" + tryblock + "}\n";
    code +=
        "catch(err){\n errorHandler(err.message);\n" +
        catchblock +
        "\n}" +
        "finally {\n" +
        finalblock +
        "\n}";
    return code + "\n";
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

const body = {
    "id": "Any",
    "joke": "Yoyo",
    "rating": "5",
    "type": "joke",
    "source": "joke",
    "created_at": "2017-03-27T10:00:00.000Z",
    "updated_at": "2017-03-27T10:00:00.000Z",
    "user": {
        "id": "Any",
        "name": "Any",
        "username": "Any",
        "email": "Any",
        "created_at": "2017-03-27T10:00:00.000Z",
        "updated_at": "2017-03-27T10:00:00.000Z",
        "avatar": "https://v2.jokeapi.dev/avatar/Any",
        "cover": "https://v2.jokeapi.dev/cover/Any",
        "bio": "Any",
        "website": "Any",
        "location": "Any",
        "facebook": "Any",
        "twitter": "Any",
        "After": {
            "id": "Any",
            "name": "Any",
        }
    },
    "comments": [{
            "id": "Any",
            "body": "Any",
            "created_at": "2017-03-27T10:00:00.000Z",
        },
        {
            "id": "Any2",
            "body": "Any2",
            "created_at": "2017-03-27T10:00:00.000Z",
        },
    ],
};
const debouncedSearch = () => {
    const val = document.getElementById("search").value;
    if (val.length > 0) {
        const keys = Object.keys(body);
        const baseFindings = keys.filter(key => key == val);
        if (!baseFindings.isEmpty()) {
            let li = document.createElement("li");
            li.setAttribute("class", "list-group-item");
            li.innerHTML = `body => ${val}`;
            document.getElementById("search-list").appendChild(li);
        }
        let entries = Object.entries(body);
        entries = Object.entries(body).filter((m) => typeof(m[1]) == 'object');
        while (!entries.isEmpty() && flag == 1) {
            noOfArrays = entries.filter((m) => Array.isArray(m[1]));
            noOfObjects = entries.filter((m) => !Array.isArray(m[1]));
            if (!noOfArrays.isEmpty()) {
                noOfArrays.forEach((m) => {
                    m[1].forEach((n) => {
                        if (n == val) {
                            let li = document.createElement("li");
                            li.setAttribute("class", "list-group-item");
                            li.innerHTML = `body => ${tailString}${val}`;
                            document.getElementById("search-list").appendChild(li);
                        }
                    });
                });

            }


        }

    }
}

function objectSearcher(obj, value, trailString) {
    const keys = Object.keys(obj);
    console.log("Object Keys", keys);
    const baseFindings = keys.filter(key => key == value);
    console.log("baseFindings", baseFindings);
    if (!baseFindings.length == 0) {
        // let li = document.createElement("li");
        // li.setAttribute("class", "list-group-item");
        // li.innerHTML = `${trailString}=>${value}`;
        // document.getElementById("search-list").appendChild(li);
        return `trailString => ${baseFindings[0]}`
    }
    let entries = Object.entries(body);
    entries = Object.entries(body).filter((m) => typeof(m[1]) == 'object');
    console.log("entries", entries);
    if (!entries.length == 0) {
        noOfArrays = entries.filter((m) => Array.isArray(m[1]));
        console.log("noOfArrays in objecr", noOfArrays);
        noOfObjects = entries.filter((m) => !Array.isArray(m[1]));
        console.log("noOfObjects in object", noOfObjects);
        if (!noOfArrays.length == 0) {
            noOfArrays.forEach((m) => {
                trailString += "=>" + m[0];
                console.log("trailString", trailString);
                arraySearcher(m, value, trailString);
            })
        }
        if (!noOfObjects.length == 0) {
            noOfObjects.forEach((m) => {
                trailString += "=>" + m[0];
                console.log("trailString", trailString);
                return `trailString => ${objectSearcher(m,value,trailString)}`
            })
        }
    } else {
        return "";
    }


}

function arraySearcher(obj, value, trailString) {
    const baseFindings = obj.indexOf(value);
    console.log("BaseFinfings In array", baseFindings);
    if (!baseFindings == -1) {
        return `${trailString} [${baseFindings}]`;
    }
    let entries = obj.filter((f) => typeof(f) == 'object');

    if (!entries.length == 0) {
        noOfArrays = entries.filter((m) => Array.isArray(m));
        let arrayKeys = obj.filter((f) => typeof(f) == 'object').filter((m) => !Array.isArray(m)).map((m) => obj.indexOf(m));
        console.log("ArrayKeys", arrayKeys);
        noOfObjects = entries.filter((m) => !Array.isArray(m));
        console.log("NoOfObjects", noOfObjects);

        if (!noOfArrays.length == 0) {
            noOfArrays.map((m, i) => {
                trailString += trailString + "=>" + arrayKeys[i];
                console.log("TrailString", trailString);
                arraySearcher(m, value, trailString);
            })
        }
        if (!noOfObjects.length == 0) {
            noOfObjects.map((m, i) => {
                trailString += trailString + "=>" + m;
                console.log("TrailString", trailString);
                objectSearcher(m, value, trailString);
            })
        }
    } else
        return "";
}

function objectSearcher1(obj, value, trailString) {
    const keys = Object.keys(obj);
    console.log("Object Keys", keys);
    const baseFindings = keys.filter(key => key == value);
    console.log("baseFindings", baseFindings);
    if (!baseFindings.length == 0) {
        // let li = document.createElement("li");
        // li.setAttribute("class", "list-group-item");
        // li.innerHTML = `${trailString}=>${value}`;
        // document.getElementById("search-list").appendChild(li);
        console.log("Main trail string in object", `${trailString} => ${baseFindings[0]}`);
        return `trailString => ${baseFindings[0]}`
    }
    let entries = Object.entries(body);
    entries = Object.entries(body).filter((m) => typeof(m[1]) == 'object');
    console.log("entries", entries);
    if (!entries.length == 0) {

        let noOfArrays = entries.filter((m) => Array.isArray(m[1]));
        console.log("noOfArrays in objecr", noOfArrays);
        let noOfObjects = entries.filter((m) => !Array.isArray(m[1]));
        console.log("noOfObjects in object", noOfObjects);
        if (!noOfArrays.length == 0) {
            noOfArrays.forEach((m) => {
                //                 trailString += "=>" + m;
                console.log("trailString", trailString);
                arraySearcher(m, value, trailString);
            })
        }
        if (!noOfObjects.length == 0) {
            noOfObjects.forEach((m) => {
                trailString += "=>" + m[0];
                console.log("trailString", trailString);
                return objectSearcher(m, value, trailString)
            })
        }
    } else {
        return "";
    }


}

function arraySearcher1(obj, value, trailString) {
    const baseFindings = obj.indexOf(value);
    console.log("BaseFinfings In array", baseFindings);
    if (!baseFindings == -1) {
        console.log("Main Trail String", `${trailString} [${baseFindings}]`);
        return `${trailString} [${baseFindings}]`;
    }
    let entries = obj.filter((f) => typeof(f) == 'object');
    console.log("Entries In Array", entries);
    if (Array.isArray(entries[0])) {
        if (!entries[0].length == 0) {
            let noOfArrays = entries[0].filter((m) => Array.isArray(m));
            console.log("No of arrays in array", noOfArrays);
            let arrayKeys = obj.filter((f) => typeof(f) == 'object').filter((m) => !Array.isArray(m)).map((m) => obj.indexOf(m));
            console.log("ArrayKeys", arrayKeys);
            noOfObjects = entries.filter((m) => !Array.isArray(m));
            console.log("NoOfObjects in array", noOfObjects);

            if (!noOfArrays.length == 0) {
                noOfArrays.map((m, i) => {
                    trailString = trailString;
                    console.log("TrailString", trailString);
                    arraySearcher(m, value, trailString);
                })
            }
            if (!noOfObjects.length == 0) {
                noOfObjects.map((m, i) => {
                    trailString = trailString + "=>" + JSON.stringify(arrayKeys[i]) + m;
                    console.log("TrailString", trailString);
                    objectSearcher(m, value, trailString);
                })
            }
        } else
            return "";
    } else {

        if (!entries.length == 0) {
            let noOfArrays = entries.filter((m) => Array.isArray(m));
            console.log("No of arrays in array", noOfArrays);
            let arrayKeys = obj.filter((f) => typeof(f) == 'object').filter((m) => !Array.isArray(m)).map((m) => obj.indexOf(m));
            console.log("ArrayKeys", arrayKeys);
            noOfObjects = entries.filter((m) => !Array.isArray(m));
            console.log("NoOfObjects in array", noOfObjects);

            if (!noOfArrays.length == 0) {
                noOfArrays.map((m, i) => {
                    trailString = trailString + "=>";
                    console.log("TrailString", trailString);
                    arraySearcher(m, value, trailString);
                })
            }
            if (!noOfObjects.length == 0) {
                noOfObjects.map((m, i) => {
                    trailString = trailString + "=>" + JSON.stringify(arrayKeys[i]) + m;
                    console.log("TrailString", trailString);
                    objectSearcher(m, value, trailString);
                })
            }
        } else
            return "";

    }
}

let keyPathPair = {};
let keyValuePair = {};

function process(key, value, tstr) {
    console.log(key + " : " + value + " : " + tstr + "=>" + key + " : " + typeof(value) + " : " + Array.isArray(value));
    if (keyPathPair[key]) {
        keyPathPair[key].push(tstr + "=>" + key)
    } else {
        keyPathPair[key] = [tstr + "=>" + key];
    }
    if (keyValuePair[key]) {
        if (typeof value == 'object') {
            keyValuePair[key].push(JSON.stringify(value));
        } else
            keyValuePair[key].push(value)
    } else {
        if (typeof value == 'object') {
            keyValuePair[key] = [JSON.stringify(value)];
        } else
            keyValuePair[key] = [value];
    }

}

let ts = 'body';

function traverse(o, func) {
    for (var i in o) {
        func.apply(this, [i, o[i], ts]);
        if (o[i] !== null && typeof(o[i]) == "object") {
            //going one step down in the object tree!!
            ts = ts + "=>" + i;
            traverse(o[i], func);
        }
    }
}

//that's all... no magic, no bloated framework
traverse(body, process);
console.log(keyPathPair);
console.log(keyValuePair);

const newDebouncedSearch = () => {
    while (document.getElementById('search-list').firstChild) {
        document.getElementById('search-list').removeChild(document.getElementById('search-list').firstChild);
    }
    const searchString = document.getElementById('search-bar').value;
    console.log("Search String", searchString);
    // console.log(Object.keys(keyPathPair));
    // console.log(Object.values(Object.keys(keyPathPair).filter((f) => f == searchString)[0]));
    const lists = Object.entries(keyPathPair).filter((m) => m[0] == searchString).map((m) => m[1])[0].map((m) => {
        console.log(m);
        let li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = `${m}`;
        document.getElementById("search-list").appendChild(li);
    });

}
const debounce = function(fn, d) {
    let timer;
    return function() {
        let context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            newDebouncedSearch.apply(context, arguments);
        }, d);
    }
}
const varForToolbox = () => {
    document.getElementById("dataHolder").style.display = "block";
    document.getElementById("textHolder").style.display = "none";
}
const codeArea = () => {
    document.getElementById("dataHolder").style.display = "none";
    document.getElementById("textHolder").style.display = "block";
}

const betterFunction = debounce(newDebouncedSearch, 1000);
window.varForToolbox = varForToolbox;
window.codeArea = codeArea;
window.betterFunction = betterFunction;
// window.debouncedSearch = debouncedSearch;
// window.newDebouncedSearch = newDebouncedSearch;