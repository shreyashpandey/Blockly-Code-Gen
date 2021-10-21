import { callingTraverserLogic } from "./traverserLogic"
export let changeBody = () => {
    document.getElementById("bodyTextParent").setAttribute("tabindex", "-1");
    document.getElementById("bodyTextParent").setAttribute("class", "modal fade");
    document
        .getElementById("bodyTextParent")
        .setAttribute("style", "display:none;");
    let newbody = document.getElementById("bodyValue").value.trim(" ");
    // newbody = JSON.stringify(newbody);
    console.log("Body", JSON.parse(newbody));
    newbody = JSON.parse(newbody);
    // console.log("New Body", body);
    console.log("Type of new body", typeof(newbody));
    callingTraverserLogic(newbody);
};