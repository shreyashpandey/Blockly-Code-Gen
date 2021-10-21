import Blockly from "blockly";

export const workspace = Blockly.inject("blocklyDiv", {
    rtl: false,
    renderer: "zelos",
    toolboxPosition: "top",
    toolbox: document.getElementById("toolbox"),
    move: {
        scrollbars: {
            horizontal: true,
            vertical: true,
        },
        drag: false,
        wheel: false,
    },
    grid: {
        spacing: 20,
        length: 3,
        colour: 'lightblue',
        snap: true
    },
    zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 1.0,
        minScale: 0.3,
        scaleSpeed: 1.2,
        pinch: true,
    },
    trashcan: true,
    // theme: Blockly.Theme.defineTheme('customisedDark', {
    //     'base': Blockly.Themes.Classic,
    //     'componentStyles': {
    //         'workspaceBackgroundColour': '#1e1e1e',
    //         'toolboxBackgroundColour': 'blackBackground',
    //         'toolboxForegroundColour': '#fff',
    //         'flyoutBackgroundColour': '#252526',
    //         'flyoutForegroundColour': '#ccc',
    //         'flyoutOpacity': 1,
    //         'scrollbarColour': '#797979',
    //         'insertionMarkerColour': '#fff',
    //         'insertionMarkerOpacity': 0.3,
    //         'scrollbarOpacity': 0.4,
    //         'cursorColour': '#d0d0d0',
    //         'blackBackground': '#333'
    //     }
    // })

});
// populateRandom(workspace, 10);