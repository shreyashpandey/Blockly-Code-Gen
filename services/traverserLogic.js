let keyPathPair = {};
let keyValuePair = {};
export const callingTraverserLogic = (body) => {
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
        return tstr + "=>" + key;
    }

    let ts = "body";
    //Need to put traverse and process in a closure

    // function traverse(o, func) {
    //     for (var i in o) {
    //         func.apply(this, [i, o[i], ts]);
    //         if (o[i] !== null && typeof o[i] == "object") {
    //             ts = ts + "=>" + i;
    //             traverse(o[i], func);
    //         }
    //     }
    // }
    let tra = "body";

    function traverse(o) {

        for (var i in o) {
            if (!!o[i] && typeof(o[i]) == "object") {
                // console.log(i, o[i]);
                tra = process(i, o[i], ts);
                traverse(o[i]);
            } else {
                process(i, o[i], tra);
                // console.log(i, o[i]);
            }
        }
    }
    traverse(body);
    // traverse(body, process);
    console.log(keyPathPair);
    console.log(keyValuePair);
    return { keyPathPair: keyPathPair, keyValuePair: keyValuePair };
};