import "./style.css";
import Blockly from "blockly";
import { FieldSlider } from "@blockly/field-slider";
import FieldDate from "@blockly/field-date";
import axios from "axios";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.js";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search.js";
import "codemirror/addon/dialog/dialog.js";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/comment/comment.js";
import "codemirror/addon/wrap/hardwrap.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/keymap/sublime.js"
// var CodeMirror = require("codemirror");
// import * as Blockly from 'blockly';
// import {registerTooltipExtension} from '@blockly/block-extension-tooltip';
// import {request} from "./node_modules/request/index.js";
// import request from "request";

// document.querySelector('#app').innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `
// let blk = document.createElement("block");
// blk.setAttribute("type", "more_custom_blocks");
// blk.setAttribute("id", "more_custom_blocks");
// document.getElementById("toolbox").appendChild(blk);
var value = "// The bindings defined specifically in the Sublime Text mode\nvar bindings = {\n";
var map = CodeMirror.keyMap.sublime;
console.log("Map for Code Mirror", map);
for (var key in map) {
    var val = map[key];
    if (key != "fallthrough" && val != "..." && (!/find/.test(val) || /findUnder/.test(val)))
        value += "  \"" + key + "\": \"" + val + "\",\n";
}
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
console.log("Workspace", workspace);
// let blk = document.createElement("block");
// blk.setAttribute("type", "custom_block");
// blk.setAttribute("id", "custom_block");
// document.getElementById("toolbox").appendChild(blk);
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

var reUsableBlocks = ["custom_variable", "function_caller", "newblock", "api_call"];
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
        this.appendDummyInput().appendField("body");
        this.appendValueInput("Attribute").appendField("attribute");
        this.appendValueInput("Value").appendField("value");
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
Blockly.Generator.prototype.customisedValueToCode = function(
    block,
    name,
    outerOrder
) {
    if (isNaN(outerOrder)) {
        throw TypeError("Expecting valid order from block: " + block.type);
    }
    var targetBlock = block.getInputTargetBlock(name);
    if (!targetBlock) {
        return "";
    }
    var tuple = this.blockToCode(targetBlock);
    console.log("Tuple", tuple);
    if (tuple === "") {
        // Disabled block.
        return "";
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
        return "";
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
Blockly.Blocks["customised_list"] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this {Blockly.Block}
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg["LISTS_CREATE_WITH_HELPURL"]);
        this.setStyle("list_blocks");
        this.itemCount_ = 3;
        this.updateShape_();
        this.setOutput(true);
        this.setMutator(new Blockly.Mutator(["lists_create_with_item"]));
        this.setTooltip(Blockly.Msg["LISTS_CREATE_WITH_TOOLTIP"]);
    },
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function() {
        var container = Blockly.utils.xml.createElement("mutation");
        container.setAttribute("items", this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function(xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute("items"), 10);
        this.updateShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this {Blockly.Block}
     */
    decompose: function(workspace) {
        var containerBlock = workspace.newBlock("lists_create_with_container");
        containerBlock.initSvg();
        var connection = containerBlock.getInput("STACK").connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock("lists_create_with_item");
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
        var itemBlock = containerBlock.getInputTargetBlock("STACK");
        // Count number of inputs.
        var connections = [];
        while (itemBlock && !itemBlock.isInsertionMarker()) {
            connections.push(itemBlock.valueConnection_);
            itemBlock =
                itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        }
        // Disconnect any children that don't belong.
        for (var i = 0; i < this.itemCount_; i++) {
            var connection = this.getInput("ADD" + i).connection.targetConnection;
            if (connection && connections.indexOf(connection) == -1) {
                connection.disconnect();
            }
        }
        this.itemCount_ = connections.length;
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(connections[i], this, "ADD" + i);
        }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this {Blockly.Block}
     */
    saveConnections: function(containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock("STACK");
        var i = 0;
        while (itemBlock) {
            var input = this.getInput("ADD" + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            i++;
            itemBlock =
                itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this {Blockly.Block}
     */
    updateShape_: function() {
        if (this.itemCount_ && this.getInput("EMPTY")) {
            this.removeInput("EMPTY");
        } else if (!this.itemCount_ && !this.getInput("EMPTY")) {
            this.appendDummyInput("EMPTY").appendField(
                Blockly.Msg["LISTS_CREATE_EMPTY_TITLE"]
            );
        }
        // Add new inputs.
        for (var i = 0; i < this.itemCount_; i++) {
            if (!this.getInput("ADD" + i)) {
                var input = this.appendValueInput("ADD" + i).setAlign(
                    Blockly.ALIGN_RIGHT
                );
                if (i == 0) {
                    input.appendField(Blockly.Msg["LISTS_CREATE_WITH_INPUT_WITH"]);
                }
            }
        }
        // Remove deleted inputs.
        while (this.getInput("ADD" + i)) {
            this.removeInput("ADD" + i);
            i++;
        }
    },
};
Blockly.Blocks["lists_create_with_container"] = {
    /**
     * Mutator block for list container.
     * @this {Blockly.Block}
     */
    init: function() {
        this.setStyle("list_blocks");
        this.appendDummyInput().appendField(
            Blockly.Msg["LISTS_CREATE_WITH_CONTAINER_TITLE_ADD"]
        );
        this.appendStatementInput("STACK");
        this.setTooltip(Blockly.Msg["LISTS_CREATE_WITH_CONTAINER_TOOLTIP"]);
        this.contextMenu = false;
    },
};

Blockly.Blocks["lists_create_with_item"] = {
    /**
     * Mutator block for adding items.
     * @this {Blockly.Block}
     */
    init: function() {
        this.setStyle("list_blocks");
        this.appendDummyInput().appendField(
            Blockly.Msg["LISTS_CREATE_WITH_ITEM_TITLE"]
        );
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg["LISTS_CREATE_WITH_ITEM_TOOLTIP"]);
        this.contextMenu = false;
    },
};

Blockly.JavaScript["customised_list"] = function(block) {
    // Create a list with any number of elements of any type.
    var elements = new Array(block.itemCount_);
    let elem = [];
    console.log("Customised List Elements", elements);
    for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.JavaScript.customisedValueToCode(block, 'ADD' + i,
            Blockly.JavaScript.ORDER_FUNCTION_CALL) || 'null';
        // elements[i] = block.getFieldValue("ADD" + i);
        // elem.push(block.getFieldValue("ADD" + i));
        console.log("Customised List Element", elem[i]);
        // elem.push()
    }

    var code = "[" + elements.join(", ") + "]";
    // return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    // return [code, Blockly.JavaScript.ORDER_ATOMIC];
    return code;
};
/************************************************************************************************/
/********************************  Controls-If Generator Changed  ***************************************************/
Blockly.JavaScript['controls_if'] = function(block) {
    // If/elseif/else condition.
    var n = 0;
    var code = '',
        branchCode, conditionCode;
    if (Blockly.JavaScript.STATEMENT_PREFIX) {
        // Automatic prefix insertion is switched off for this block.  Add manually.
        code += Blockly.JavaScript.injectId(Blockly.JavaScript.STATEMENT_PREFIX,
            block);
    }
    do {
        conditionCode = Blockly.JavaScript.customisedValueToCode(block, 'IF' + n,
            Blockly.JavaScript.ORDER_NONE) || 'false';
        branchCode = Blockly.JavaScript.statementToCode(block, 'DO' + n);
        if (Blockly.JavaScript.STATEMENT_SUFFIX) {
            branchCode = Blockly.JavaScript.prefixLines(
                Blockly.JavaScript.injectId(Blockly.JavaScript.STATEMENT_SUFFIX,
                    block), Blockly.JavaScript.INDENT) + branchCode;
        }
        code += (n > 0 ? ' else ' : '') +
            'if (' + conditionCode + ') {\n' + branchCode + '}';
        ++n;
    } while (block.getInput('IF' + n));

    if (block.getInput('ELSE') || Blockly.JavaScript.STATEMENT_SUFFIX) {
        branchCode = Blockly.JavaScript.statementToCode(block, 'ELSE');
        if (Blockly.JavaScript.STATEMENT_SUFFIX) {
            branchCode = Blockly.JavaScript.prefixLines(
                Blockly.JavaScript.injectId(Blockly.JavaScript.STATEMENT_SUFFIX,
                    block), Blockly.JavaScript.INDENT) + branchCode;
        }
        code += ' else {\n' + branchCode + '}';
    }
    return code + '\n';
};

Blockly.JavaScript['controls_ifelse'] = Blockly.JavaScript['controls_if'];

Blockly.JavaScript['logic_compare'] = function(block) {
    // Comparison operator.
    var OPERATORS = {
        'EQ': '==',
        'NEQ': '!=',
        'LT': '<',
        'LTE': '<=',
        'GT': '>',
        'GTE': '>='
    };
    var operator = OPERATORS[block.getFieldValue('OP')];
    var order = (operator == '==' || operator == '!=') ?
        Blockly.JavaScript.ORDER_EQUALITY : Blockly.JavaScript.ORDER_RELATIONAL;
    var argument0 = Blockly.JavaScript.customisedValueToCode(block, 'A', order) || '0';
    var argument1 = Blockly.JavaScript.customisedValueToCode(block, 'B', order) || '0';
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};

Blockly.JavaScript['logic_operation'] = function(block) {
    // Operations 'and', 'or'.
    var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
    var order = (operator == '&&') ? Blockly.JavaScript.ORDER_LOGICAL_AND :
        Blockly.JavaScript.ORDER_LOGICAL_OR;
    var argument0 = Blockly.JavaScript.customisedValueToCode(block, 'A', order);
    var argument1 = Blockly.JavaScript.customisedValueToCode(block, 'B', order);
    if (!argument0 && !argument1) {
        // If there are no arguments, then the return value is false.
        argument0 = 'false';
        argument1 = 'false';
    } else {
        // Single missing arguments have no effect on the return value.
        var defaultArgument = (operator == '&&') ? 'true' : 'false';
        if (!argument0) {
            argument0 = defaultArgument;
        }
        if (!argument1) {
            argument1 = defaultArgument;
        }
    }
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};

Blockly.JavaScript['logic_negate'] = function(block) {
    // Negation.
    var order = Blockly.JavaScript.ORDER_LOGICAL_NOT;
    var argument0 = Blockly.JavaScript.customisedValueToCode(block, 'BOOL', order) ||
        'true';
    var code = '!' + argument0;
    return [code, order];
};

Blockly.JavaScript['logic_boolean'] = function(block) {
    // Boolean values true and false.
    var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['logic_null'] = function(block) {
    // Null data type.
    return ['null', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['logic_ternary'] = function(block) {
    // Ternary operator.
    var value_if = Blockly.JavaScript.customisedValueToCode(block, 'IF',
        Blockly.JavaScript.ORDER_CONDITIONAL) || 'false';
    var value_then = Blockly.JavaScript.customisedValueToCode(block, 'THEN',
        Blockly.JavaScript.ORDER_CONDITIONAL) || 'null';
    var value_else = Blockly.JavaScript.customisedValueToCode(block, 'ELSE',
        Blockly.JavaScript.ORDER_CONDITIONAL) || 'null';
    var code = value_if + ' ? ' + value_then + ' : ' + value_else;
    return [code, Blockly.JavaScript.ORDER_CONDITIONAL];
};


/************************************************************************************************/

/********************************  Controls-Loop Generator Changed  ***************************************************/

Blockly.JavaScript['controls_repeat_ext'] = function(block) {
    // Repeat n times.
    if (block.getField('TIMES')) {
        // Internal number.
        var repeats = String(Number(block.getFieldValue('TIMES')));
    } else {
        // External number.
        var repeats = Blockly.JavaScript.customisedValueToCode(block, 'TIMES',
            Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    }
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    branch = Blockly.JavaScript.addLoopTrap(branch, block);
    var code = '';
    var loopVar = Blockly.JavaScript.nameDB_.getDistinctName(
        'count', Blockly.VARIABLE_CATEGORY_NAME);
    var endVar = repeats;
    if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
        endVar = Blockly.JavaScript.nameDB_.getDistinctName(
            'repeat_end', Blockly.VARIABLE_CATEGORY_NAME);
        code += 'var ' + endVar + ' = ' + repeats + ';\n';
    }
    code += 'for (var ' + loopVar + ' = 0; ' +
        loopVar + ' < ' + endVar + '; ' +
        loopVar + '++) {\n' +
        branch + '}\n';
    return code;
};

Blockly.JavaScript['controls_repeat'] =
    Blockly.JavaScript['controls_repeat_ext'];

Blockly.JavaScript['controls_whileUntil'] = function(block) {
    // Do while/until loop.
    var until = block.getFieldValue('MODE') == 'UNTIL';
    var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL',
        until ? Blockly.JavaScript.ORDER_LOGICAL_NOT :
        Blockly.JavaScript.ORDER_NONE) || 'false';
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    branch = Blockly.JavaScript.addLoopTrap(branch, block);
    if (until) {
        argument0 = '!' + argument0;
    }
    return 'while (' + argument0 + ') {\n' + branch + '}\n';
};

Blockly.JavaScript['controls_for'] = function(block) {
    // For loop.
    var variable0 = Blockly.JavaScript.nameDB_.getName(
        block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    var argument0 = Blockly.JavaScript.valueToCode(block, 'FROM',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var argument1 = Blockly.JavaScript.valueToCode(block, 'TO',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var increment = Blockly.JavaScript.valueToCode(block, 'BY',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '1';
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    branch = Blockly.JavaScript.addLoopTrap(branch, block);
    var code;
    if (Blockly.isNumber(argument0) && Blockly.isNumber(argument1) &&
        Blockly.isNumber(increment)) {
        // All arguments are simple numbers.
        var up = Number(argument0) <= Number(argument1);
        code = 'for (' + variable0 + ' = ' + argument0 + '; ' +
            variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' +
            variable0;
        var step = Math.abs(Number(increment));
        if (step == 1) {
            code += up ? '++' : '--';
        } else {
            code += (up ? ' += ' : ' -= ') + step;
        }
        code += ') {\n' + branch + '}\n';
    } else {
        code = '';
        // Cache non-trivial values to variables to prevent repeated look-ups.
        var startVar = argument0;
        if (!argument0.match(/^\w+$/) && !Blockly.isNumber(argument0)) {
            startVar = Blockly.JavaScript.nameDB_.getDistinctName(
                variable0 + '_start', Blockly.VARIABLE_CATEGORY_NAME);
            code += 'var ' + startVar + ' = ' + argument0 + ';\n';
        }
        var endVar = argument1;
        if (!argument1.match(/^\w+$/) && !Blockly.isNumber(argument1)) {
            endVar = Blockly.JavaScript.nameDB_.getDistinctName(
                variable0 + '_end', Blockly.VARIABLE_CATEGORY_NAME);
            code += 'var ' + endVar + ' = ' + argument1 + ';\n';
        }
        // Determine loop direction at start, in case one of the bounds
        // changes during loop execution.
        var incVar = Blockly.JavaScript.nameDB_.getDistinctName(
            variable0 + '_inc', Blockly.VARIABLE_CATEGORY_NAME);
        code += 'var ' + incVar + ' = ';
        if (Blockly.isNumber(increment)) {
            code += Math.abs(increment) + ';\n';
        } else {
            code += 'Math.abs(' + increment + ');\n';
        }
        code += 'if (' + startVar + ' > ' + endVar + ') {\n';
        code += Blockly.JavaScript.INDENT + incVar + ' = -' + incVar + ';\n';
        code += '}\n';
        code += 'for (' + variable0 + ' = ' + startVar + '; ' +
            incVar + ' >= 0 ? ' +
            variable0 + ' <= ' + endVar + ' : ' +
            variable0 + ' >= ' + endVar + '; ' +
            variable0 + ' += ' + incVar + ') {\n' +
            branch + '}\n';
    }
    return code;
};

Blockly.JavaScript['controls_forEach'] = function(block) {
    // For each loop.
    var variable0 = Blockly.JavaScript.nameDB_.getName(
        block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    var argument0 = Blockly.JavaScript.valueToCode(block, 'LIST',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '[]';
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    branch = Blockly.JavaScript.addLoopTrap(branch, block);
    var code = '';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    var listVar = argument0;
    if (!argument0.match(/^\w+$/)) {
        listVar = Blockly.JavaScript.nameDB_.getDistinctName(
            variable0 + '_list', Blockly.VARIABLE_CATEGORY_NAME);
        code += 'var ' + listVar + ' = ' + argument0 + ';\n';
    }
    var indexVar = Blockly.JavaScript.nameDB_.getDistinctName(
        variable0 + '_index', Blockly.VARIABLE_CATEGORY_NAME);
    branch = Blockly.JavaScript.INDENT + variable0 + ' = ' +
        listVar + '[' + indexVar + '];\n' + branch;
    code += 'for (var ' + indexVar + ' in ' + listVar + ') {\n' + branch + '}\n';
    return code;
};

Blockly.JavaScript['controls_flow_statements'] = function(block) {
    // Flow statements: continue, break.
    var xfix = '';
    if (Blockly.JavaScript.STATEMENT_PREFIX) {
        // Automatic prefix insertion is switched off for this block.  Add manually.
        xfix += Blockly.JavaScript.injectId(Blockly.JavaScript.STATEMENT_PREFIX,
            block);
    }
    if (Blockly.JavaScript.STATEMENT_SUFFIX) {
        // Inject any statement suffix here since the regular one at the end
        // will not get executed if the break/continue is triggered.
        xfix += Blockly.JavaScript.injectId(Blockly.JavaScript.STATEMENT_SUFFIX,
            block);
    }
    if (Blockly.JavaScript.STATEMENT_PREFIX) {
        var loop = Blockly.Constants.Loops
            .CONTROL_FLOW_IN_LOOP_CHECK_MIXIN.getSurroundLoop(block);
        if (loop && !loop.suppressPrefixSuffix) {
            // Inject loop's statement prefix here since the regular one at the end
            // of the loop will not get executed if 'continue' is triggered.
            // In the case of 'break', a prefix is needed due to the loop's suffix.
            xfix += Blockly.JavaScript.injectId(Blockly.JavaScript.STATEMENT_PREFIX,
                loop);
        }
    }
    switch (block.getFieldValue('FLOW')) {
        case 'BREAK':
            return xfix + 'break;\n';
        case 'CONTINUE':
            return xfix + 'continue;\n';
    }
    throw Error('Unknown flow statement.');
};
/************************************************************************************************/
Blockly.Blocks["customised_list_2"] = {
    init: function() {
        this.itemCount_ = 0;
        this.appendDummyInput().appendField("List/Arrays/SquareBrackets");
        this.appendDummyInput().appendField(
            new Blockly.FieldTextInput("No. of Elements", this.validate),
            "noOfElems"
        );
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
};
Blockly.JavaScript["customised_list_2"] = function(block) {
    // Create a list with any number of elements of any type.
    var elements = new Array(block.itemCount_);
    let elem = [];
    let co = `[`;
    // console.log("Customised List Elements", elements);
    for (let i = 0; i < block.itemCount_; i++) {
        elements[i] =
            Blockly.JavaScript.customisedValueToCode(
                block,
                "element" + i,
                Blockly.JavaScript.ORDER_MEMBER
            ) || "''";
        // elements[i] = block.getFieldValue(`element${i}`);
        elem.push(block.getFieldValue(`element${i}`));

        console.log("Customised List Element", elements[i]);
        co += `${elements[i]},`;
        // elem.push()
    }
    co += `]`;
    let code1 = `[${block.getFieldValue("Test")}]`;
    return co;
};
let functionCallArray = [];
Blockly.Blocks["function_caller"] = {
    init: function() {
        functionCallArray = [];
        if (localStorage.getItem("FunctionsPresent") !== "") {
            this.functionsPresent = localStorage.getItem("FunctionsPresent").split(",").map((m) => {
                functionCallArray.push([m, m]);
            })
            console.log("Function Call Array", functionCallArray);
            this.appendDummyInput()
                .appendField("Calling Function")
                .appendField(new Blockly.FieldDropdown(functionCallArray), "funcDropdown");
        } else {
            console.log("Function Call Array", functionCallArray);
            this.appendDummyInput()
                .appendField("Calling Function")
                .appendField(new Blockly.FieldTextInput("No functions Present"), "funcNotPresent");
        }

        // .appendField(
        //     new Blockly.FieldDropdown(
        //         [
        //             ["1", "functionOne"],
        //             ["2", "functionTwo"],
        //         ],
        //         this.validate
        //     ),
        //     "funcDropdown"
        // );

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
Blockly.JavaScript["function_caller"] = function(block) {
    if (block.getFieldValue("funcNotPresent")) {
        return `//No functions present in workspace`;
    } else {
        let varCode = `const lsq${block.getFieldValue(
        "funcDropdown"
      )}`;
        const variablesPresent = localStorage.getItem("VariablesPresent");
        if (variablesPresent == "") {
            let variables = [];
            variables.push(varCode);
            localStorage.setItem("VariablesPresent", variables);
        } else {

            localStorage.setItem("VariablesPresent", localStorage.getItem("VariablesPresent").split(",").push(varCode));
        }
        let mainCode = `const lsq${block.getFieldValue(
    "funcDropdown"
  )}=await ${block.getFieldValue("funcDropdown")}();\n`;
        return mainCode;
    }
};
let variableCallArray = [];
Blockly.Blocks["callback"] = {
    init: function() {
        this.appendDummyInput()
            .appendField("callback")
            .appendField(new Blockly.FieldTextInput("CallbackResponse"), "callBack");
        variableCallArray = [];
        if (localStorage.getItem("VariablesPresent") !== "") {
            this.variablesPresent = localStorage.getItem("VariablesPresent").split(",").map((m) => {
                variableCallArray.push([m, m]);
            })
            console.log("Variable Call Array", variableCallArray);
            this.appendDummyInput()
                .appendField("callbackVariable")
                .appendField(new Blockly.FieldDropdown(variableCallArray), "varDropdown");
        } else {
            console.log("Variable Call Array", variableCallArray);
            this.appendDummyInput()
                .appendField("callbackVariable")
                .appendField(new Blockly.FieldTextInput("No variables Present"), "varNotPresent");
        }
        this.setPreviousStatement(true);

        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    },
};
Blockly.JavaScript["callback"] = function(block) {
    if (block.getFieldValue("varNotPresent")) {
        return `//No variables present in workspace`;
    } else {
        let callbackText = block.getFieldValue("callBack");
        let mainCode = `callback("${callbackText}",${block.getFieldValue("varDropdown")};\n`;
        return mainCode;
    }
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
        this.appendValueInput("Body").appendField("Body");
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
    const functionsPresent = localStorage.getItem("FunctionsPresent");
    if (functionsPresent == "") {
        let functions = [];
        functions.push(name);
        localStorage.setItem("FunctionsPresent", functions);
    } else {
        localStorage.setItem("FunctionsPresent", localStorage.getItem("FunctionsPresent").split(",").push(name));
    }
    // let headerType= block.getFieldValue("Parameters");s
    return `async function ${name}(body) { 
    return new Promise((resolve,reject)=>
    {
      let options={
        url:${url},
        qs:${params},
        method:"post",
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
            ls.log.Info(${name} response,body);
            resolve(body);
          }
          else
          {
            ls.log.Error(${name} exception message,res.body.ExceptionMessage);
            reject(res.body.ExceptionMessage);
          }
        }
      });
    });
}`;
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

function nextStep(myInterpreter) {}

function codeEditor() {
    var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
        // lineNumbers: true,
        // mode: "text/x-csrc",
        // keyMap: "vim",
        // matchBrackets: true,
        // showCursorWhenSelecting: true
        lineNumbers: true,
        mode: "javascript",
        keyMap: "sublime",
        autoCloseBrackets: true,
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: "monokai",
        tabSize: 2,
        value: code
    });
}

function runJS() {
    Blockly.JavaScript.addReservedWords("code");
    let code = Blockly.JavaScript.workspaceToCode(workspace);
    console.log("Top Blocks present in workspace", workspace.topBlocks_);
    console.log("Function Value Required", workspace.topBlocks_[0]["inputList"][0]["fieldRow"][1]["value_"]);
    let functionValue = workspace.topBlocks_.map((tl) => {
        if (tl.inputList[0]["fieldRow"] != 0)
            tl.inputList[0]["fieldRow"][1];
    })
    console.log("Function", functionValue);
    // code = code.replace("\r\n", "\\r\\n");
    document.getElementById("code").value = code;
    codeEditor();
    /************************** */
    var editor = CodeMirror.fromTextArea(document.getElementById("displayCode"), {
        lineNumbers: true,
        mode: "javascript",
        keyMap: "sublime",
        autoCloseBrackets: true,
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: "monokai",
        tabSize: 2,
        value: code
    });
    console.log(editor);
    // var input = document.getElementById("select");

    // function selectTheme() {
    //     var theme = input.options[input.selectedIndex].textContent;
    //     editor.setOption("theme", theme);
    //     location.hash = "#" + theme;
    // }
    // var choice = (location.hash && location.hash.slice(1)) ||
    //     (document.location.search &&
    //         decodeURIComponent(document.location.search.slice(1)));
    // if (choice) {
    //     input.value = choice;
    //     editor.setOption("theme", choice);
    // }
    // CodeMirror.on(window, "hashchange", function() {
    //     var theme = location.hash.slice(1);
    //     if (theme) {
    //         input.value = theme;
    //         selectTheme();
    //     }
    // });
    /************************** */
    alert(code);
    try {
        // var myInterpreter = new Interpreter(code, initFunc);
        // if (myInterpreter.step()) {
        //     window.setTimeout(nextStep, 0);
        // }
        // nextStep(myInterpreter);
        // console.log("Hey", code);

        eval(code);
    } catch (e) {
        console.log("Error In workspace", e);
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
                        ["Create a new variable with value", "newCreateVal"],
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
};
Blockly.JavaScript["custom_variable"] = function(block) {
    let varCode = block.getFieldValue("pElement");
    const variablesPresent = localStorage.getItem("VariablesPresent");
    if (variablesPresent == "") {
        let variables = [];
        variables.push(varCode);
        localStorage.setItem("VariablesPresent", variables);
    } else {

        localStorage.setItem("VariablesPresent", localStorage.getItem("VariablesPresent").split(",").push(varCode));
    }
    let varDropdown = block.getFieldValue("varDropdown");
    if (varDropdown == "body") {
        return varCode;
    } else if (varDropdown == "newCreate") {
        return "let " + varCode;
    } else if (varDropdown == "newCreateVal") {
        return (
            "let " +
            varCode +
            "=" +
            Blockly.JavaScript.customisedValueToCode(
                block,
                "newCreateValue",
                Blockly.JavaScript.ORDER_FUNCTION_CALL
            )
        );
    }
};
Blockly.Blocks["list_traverser"] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Traverse List")
            .appendField(new Blockly.FieldTextInput("element"), "element")
        this.appendStatementInput("traverser")
        this.setColour(45);
        this.setTooltip("");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}
Blockly.JavaScript["list_traverser"] = function(block) {
    // let traverse = block.getFieldValue("traverse");
    let element = block.getFieldValue("element");
    let traversed = Blockly.JavaScript.statementToCode(block, "traverser");

    return "for(let  i  of " + element + "){\n" + traversed + "\n}"
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
    id: "Any",
    joke: "Yoyo",
    rating: "5",
    type: "joke",
    source: "joke",
    created_at: "2017-03-27T10:00:00.000Z",
    updated_at: "2017-03-27T10:00:00.000Z",
    user: {
        id: "Any",
        name: "Any",
        username: "Any",
        email: "Any",
        created_at: "2017-03-27T10:00:00.000Z",
        updated_at: "2017-03-27T10:00:00.000Z",
        avatar: "https://v2.jokeapi.dev/avatar/Any",
        cover: "https://v2.jokeapi.dev/cover/Any",
        bio: "Any",
        website: "Any",
        location: "Any",
        facebook: "Any",
        twitter: "Any",
        After: {
            id: "Any",
            name: "Any",
        },
    },
    comments: [{
            id: "Any",
            body: "Any",
            created_at: "2017-03-27T10:00:00.000Z",
        },
        {
            id: "Any2",
            body: "Any2",
            created_at: "2017-03-27T10:00:00.000Z",
        },
    ],
};
const debouncedSearch = () => {
    const val = document.getElementById("search").value;
    if (val.length > 0) {
        const keys = Object.keys(body);
        const baseFindings = keys.filter((key) => key == val);
        if (!baseFindings.isEmpty()) {
            let li = document.createElement("li");
            li.setAttribute("class", "list-group-item");
            li.innerHTML = `body => ${val}`;
            document.getElementById("search-list").appendChild(li);
        }
        let entries = Object.entries(body);
        entries = Object.entries(body).filter((m) => typeof m[1] == "object");
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
};

function objectSearcher(obj, value, trailString) {
    const keys = Object.keys(obj);
    console.log("Object Keys", keys);
    const baseFindings = keys.filter((key) => key == value);
    console.log("baseFindings", baseFindings);
    if (!baseFindings.length == 0) {
        // let li = document.createElement("li");
        // li.setAttribute("class", "list-group-item");
        // li.innerHTML = `${trailString}=>${value}`;
        // document.getElementById("search-list").appendChild(li);
        return `trailString => ${baseFindings[0]}`;
    }
    let entries = Object.entries(body);
    entries = Object.entries(body).filter((m) => typeof m[1] == "object");
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
            });
        }
        if (!noOfObjects.length == 0) {
            noOfObjects.forEach((m) => {
                trailString += "=>" + m[0];
                console.log("trailString", trailString);
                return `trailString => ${objectSearcher(m, value, trailString)}`;
            });
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
    let entries = obj.filter((f) => typeof f == "object");

    if (!entries.length == 0) {
        noOfArrays = entries.filter((m) => Array.isArray(m));
        let arrayKeys = obj
            .filter((f) => typeof f == "object")
            .filter((m) => !Array.isArray(m))
            .map((m) => obj.indexOf(m));
        console.log("ArrayKeys", arrayKeys);
        noOfObjects = entries.filter((m) => !Array.isArray(m));
        console.log("NoOfObjects", noOfObjects);

        if (!noOfArrays.length == 0) {
            noOfArrays.map((m, i) => {
                trailString += trailString + "=>" + arrayKeys[i];
                console.log("TrailString", trailString);
                arraySearcher(m, value, trailString);
            });
        }
        if (!noOfObjects.length == 0) {
            noOfObjects.map((m, i) => {
                trailString += trailString + "=>" + m;
                console.log("TrailString", trailString);
                objectSearcher(m, value, trailString);
            });
        }
    } else return "";
}

function objectSearcher1(obj, value, trailString) {
    const keys = Object.keys(obj);
    console.log("Object Keys", keys);
    const baseFindings = keys.filter((key) => key == value);
    console.log("baseFindings", baseFindings);
    if (!baseFindings.length == 0) {
        // let li = document.createElement("li");
        // li.setAttribute("class", "list-group-item");
        // li.innerHTML = `${trailString}=>${value}`;
        // document.getElementById("search-list").appendChild(li);
        console.log(
            "Main trail string in object",
            `${trailString} => ${baseFindings[0]}`
        );
        return `trailString => ${baseFindings[0]}`;
    }
    let entries = Object.entries(body);
    entries = Object.entries(body).filter((m) => typeof m[1] == "object");
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
            });
        }
        if (!noOfObjects.length == 0) {
            noOfObjects.forEach((m) => {
                trailString += "=>" + m[0];
                console.log("trailString", trailString);
                return objectSearcher(m, value, trailString);
            });
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
    let entries = obj.filter((f) => typeof f == "object");
    console.log("Entries In Array", entries);
    if (Array.isArray(entries[0])) {
        if (!entries[0].length == 0) {
            let noOfArrays = entries[0].filter((m) => Array.isArray(m));
            console.log("No of arrays in array", noOfArrays);
            let arrayKeys = obj
                .filter((f) => typeof f == "object")
                .filter((m) => !Array.isArray(m))
                .map((m) => obj.indexOf(m));
            console.log("ArrayKeys", arrayKeys);
            noOfObjects = entries.filter((m) => !Array.isArray(m));
            console.log("NoOfObjects in array", noOfObjects);

            if (!noOfArrays.length == 0) {
                noOfArrays.map((m, i) => {
                    trailString = trailString;
                    console.log("TrailString", trailString);
                    arraySearcher(m, value, trailString);
                });
            }
            if (!noOfObjects.length == 0) {
                noOfObjects.map((m, i) => {
                    trailString = trailString + "=>" + JSON.stringify(arrayKeys[i]) + m;
                    console.log("TrailString", trailString);
                    objectSearcher(m, value, trailString);
                });
            }
        } else return "";
    } else {
        if (!entries.length == 0) {
            let noOfArrays = entries.filter((m) => Array.isArray(m));
            console.log("No of arrays in array", noOfArrays);
            let arrayKeys = obj
                .filter((f) => typeof f == "object")
                .filter((m) => !Array.isArray(m))
                .map((m) => obj.indexOf(m));
            console.log("ArrayKeys", arrayKeys);
            noOfObjects = entries.filter((m) => !Array.isArray(m));
            console.log("NoOfObjects in array", noOfObjects);

            if (!noOfArrays.length == 0) {
                noOfArrays.map((m, i) => {
                    trailString = trailString + "=>";
                    console.log("TrailString", trailString);
                    arraySearcher(m, value, trailString);
                });
            }
            if (!noOfObjects.length == 0) {
                noOfObjects.map((m, i) => {
                    trailString = trailString + "=>" + JSON.stringify(arrayKeys[i]) + m;
                    console.log("TrailString", trailString);
                    objectSearcher(m, value, trailString);
                });
            }
        } else return "";
    }
}

let keyPathPair = {};
let keyValuePair = {};

function process(key, value, tstr) {
    console.log(
        key +
        " : " +
        value +
        " : " +
        tstr +
        "=>" +
        key +
        " : " +
        typeof value +
        " : " +
        Array.isArray(value)
    );
    if (keyPathPair[key]) {
        keyPathPair[key].push(tstr + "=>" + key);
    } else {
        keyPathPair[key] = [tstr + "=>" + key];
    }
    if (keyValuePair[key]) {
        if (typeof value == "object") {
            keyValuePair[key].push(JSON.stringify(value));
        } else keyValuePair[key].push(value);
    } else {
        if (typeof value == "object") {
            keyValuePair[key] = [JSON.stringify(value)];
        } else keyValuePair[key] = [value];
    }
}

let ts = "body";

function traverse(o, func) {
    for (var i in o) {
        func.apply(this, [i, o[i], ts]);
        if (o[i] !== null && typeof o[i] == "object") {
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
    while (document.getElementById("search-list").firstChild) {
        document
            .getElementById("search-list")
            .removeChild(document.getElementById("search-list").firstChild);
    }
    const searchString = document.getElementById("search-bar").value;
    console.log("Search String", searchString);
    // console.log(Object.keys(keyPathPair));
    // console.log(Object.values(Object.keys(keyPathPair).filter((f) => f == searchString)[0]));
    const lists = Object.entries(keyPathPair)
        .filter((m) => m[0] == searchString)
        .map((m) => m[1])[0]
        .map((m) => {
            console.log(m);
            let li = document.createElement("li");
            li.setAttribute("class", "list-group-item");
            li.setAttribute("style", "word-wrap: break-word;")
            li.setAttribute("draggable", true);
            li.setAttribute("id", m.replaceAll("=>", "_"));
            li.setAttribute("ondragstart", "drag(event)");
            li.innerHTML = `${m}`;
            document.getElementById("search-list").appendChild(li);
        });
};
const debounce = function(fn, d) {
    let timer;
    return function() {
        let context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            newDebouncedSearch.apply(context, arguments);
        }, d);
    };
};
const varForToolbox = () => {
    document.getElementById("dataHolder").style.display = "block";
    document.getElementById("dropBox").style.display = "block";
    document.getElementById("textHolder").style.display = "none";
};
const codeArea = () => {
    document.getElementById("dropBox").style.display = "none";
    document.getElementById("dataHolder").style.display = "none";
    document.getElementById("textHolder").style.display = "block";
};

const betterFunction = debounce(newDebouncedSearch, 500);
window.varForToolbox = varForToolbox;
window.codeArea = codeArea;
window.betterFunction = betterFunction;
// window.debouncedSearch = debouncedSearch;
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();

    let data = ev.dataTransfer.getData("text");
    console.log("qqq", data);
    let button = document.createElement("button");
    button.setAttribute("class", "btn btn-danger");
    button.setAttribute("id", `but${data}`);
    button.setAttribute("style", "float:right");
    button.setAttribute("onclick", "deleteList(this)");
    button.innerHTML = "Delete";
    document.getElementById(data).setAttribute("draggable", false);
    document.getElementById(data).removeEventListener("drop", function(e) { e.preventDefault(); });
    document.getElementById(data).appendChild(button);
    ev.target.appendChild(document.getElementById(data));
}

function removeDrop() {
    console.log("removed");
}

function deleteList(e) {
    e.parentNode.remove();
}

function updatingToolbox(id) {
    // eval(Blockly.Blocks['newblock'] = {
    //     init: function() {
    //         this.setColour(230);
    //         this.setTooltip('');
    //         this.setHelpUrl('');
    //     }
    // });

    // eval(Blockly.JavaScript['newblock'] = function(block) {
    //     // TODO: Assemble JavaScript into code variable.
    //     var code = '...;\n';
    //     return code;
    // });
    let block_name = `usedToBeValue${id}`;
    let toolBoxid = "toolbox"
    let block_categoryName = "TO-BEUsed"

    var xml;
    xml = '<block type=' + block_name + '></block>';
    console.log($('#' + toolBoxid));
    console.log(document.getElementById(toolBoxid));
    $('#' + toolBoxid).find("[name='" + block_categoryName + "']").append(xml);
    workspace.updateToolbox(document.getElementById(toolBoxid));
}
localStorage.setItem("UsedValuesFromBody", []);
localStorage.setItem("FunctionsPresent", []);
localStorage.setItem("VariablesPresent", []);

function addToToolbox() {
    let childNodes = document.getElementById("dropBox").childNodes;
    let lS = localStorage.getItem("UsedValuesFromBody");
    if (lS == "") {
        for (let i = 3; i < childNodes.length; i++) {
            if (localStorage.getItem("UsedValuesFromBody") == "") {
                localStorage.setItem("UsedValuesFromBody", childNodes[i].id);
                creatingBlockAndGenerator(childNodes[i].id);
            } else {
                localStorage.setItem("UsedValuesFromBody", localStorage.getItem("UsedValuesFromBody") + "," + childNodes[i].id);
                creatingBlockAndGenerator(childNodes[i].id);
            }
        }
    } else {
        for (let i = 3; i < childNodes.length; i++) {
            localStorage.setItem("UsedValuesFromBody", localStorage.getItem("UsedValuesFromBody") + "," + childNodes[i].id);
            creatingBlockAndGenerator(childNodes[i].id);
        }
    }
    console.log("Child Nodes", childNodes);
    // console.log("Child Nodes Id", childNodes[3].id);


}

function creatingBlockAndGenerator(id) {
    Blockly.Blocks[`usedToBeValue${id}`] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput(id.replaceAll("_", ".")), id);
            this.setColour(15);
            this.setOutput(true, null);
            this.setTooltip("");
        },
    };
    Blockly.JavaScript[`usedToBeValue${id}`] = function(block) {
        let code = block.getFieldValue(id);
        return code;
    };
    updatingToolbox(id);
}
window.setInterval(() => workspaceChecker(), 15000);

function workspaceChecker() {
    let topBlocks = workspace.topBlocks_;
    let variableStorage = [],
        functionStorage = [];
    let filteredBlocks = topBlocks.filter((tB) => reUsableBlocks.includes(tB.type));
    if (filteredBlocks.length != 0) {
        console.log("Workspace is not empty");
        filteredBlocks = filteredBlocks.map((fB) => {
            if (fB.type == "api_call") {
                functionStorage.push(fB["inputList"][0]["fieldRow"][1]["value_"]);
                localStorage.setItem("FunctionsPresent", functionStorage);

            } else {
                console.log("Variables Workspace Details", fB["inputList"][0]["fieldRow"][1]["value_"]);
                variableStorage.push(fB["inputList"][0]["fieldRow"][1]["value_"]);
                localStorage.setItem("VariablesPresent", variableStorage);
            }

        })
    }
    let variables = localStorage.getItem("VariablesPresent").split(",");
    let functions = localStorage.getItem("FunctionsPresent").split(",");
    if (variables == "" && functions == "") {
        alert("Please create a function or variable first");
    }
}

window.addToToolbox = addToToolbox;
window.deleteList = deleteList;
window.allowDrop = allowDrop;
window.drag = drag;
window.drop = drop;
// window.newDebouncedSearch = newDebouncedSearch;