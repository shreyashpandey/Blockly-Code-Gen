import { workspace } from './workspaceInjection';
var reUsableBlocks = ["custom_variable", "function_caller", "newblock", "api_call"];
export const workspaceChecker = () => {
    let topBlocks = workspace.topBlocks_;
    console.log("Workspace", workspace);
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
        console.log("Please create a function or variable first");
    }
};