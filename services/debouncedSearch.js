import { callingTraverserLogic } from "./traverserLogic";
const { keyPathPair, keyValuePair } = callingTraverserLogic();
export const newDebouncedSearch = () => {
    while (document.getElementById("search-list").firstChild) {
        document
            .getElementById("search-list")
            .removeChild(document.getElementById("search-list").firstChild);
    }
    const searchString = document.getElementById("search-bar").value;
    console.log("Search String", searchString);
    // console.log(Object.keys(keyPathPair));
    // console.log(Object.values(Object.keys(keyPathPair).filter((f) => f == searchString)[0]));
    console.log("keyPathPair", keyPathPair);
    console.log("searchString", Object.entries(keyPathPair).filter((m) => m[0] == searchString)
        .map((m) => m[1]));
    const lists = Object.entries(keyPathPair)
        .filter((m) => m[0] == searchString)
        .map((m) => { console.log("M", m); return m[1] })[0]
        .map((m) => {
            console.log(m);
            let li = document.createElement("li");
            li.setAttribute("class", "list-group-item");
            li.setAttribute("style", "word-wrap: break-word;")
            li.setAttribute("draggable", true);
            li.setAttribute("id", m.replaceAll("=>", "#"));
            li.setAttribute("ondragstart", "drag(event)");
            li.innerHTML = `${m}`;
            document.getElementById("search-list").appendChild(li);
        });
};
export const debounce = function(fn, d) {
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