
// Load editor
import editor from "./editor/editor.js";

// start editor
let ei = new editor({"solutionId": "uddannelseloen"}); 
// When data is loaded
ei.loadData(function(txt){
    // Start viz
    new viz(txt, data);

    // Show userinterface
    ei.initGUI();
});