@import 'dataTypes.js';
@import 'inputs.js';

var input, values,
    firstChoices, group, rows,
    cols, textLayer;

values = importFromCSV();
//If we're using artboards, add to the current artboard
group = [MSLayerGroup new];

//If we're using artboards, add to the current artboard
if(doc.currentPage().artboards().count() > 0) {
    var currentArtboard = doc.currentPage().currentArtboard();
    // group = currentArtboard.addLayerOfType('group');
    currentArtboard.addLayers([group]);
} else {
    doc.currentPage().addLayers([group]);
}

group.setName('columns');


var width = 0;
var x = 0;
var selfX;
for(i=0; i<cols; i++) {
    textLayer = [MSTextLayer new];
    group.addLayers([textLayer]);
    resultStr = values[i].join('\n');
    textLayer.setStringValue(resultStr);
    textLayer.adjustFrameToFit();
    textLayer.setLineHeight(48);
    textLayer.frame().setX(x);
    width = textLayer.frame().width();
    selfX = textLayer.frame().x();
    x = selfX + width + 24;
}


function importFromCSV() {
    var path = dataTypes[dt].prompt();
    if(!path) return false;

    var contents = dataTypes[dt].load(path);

    var data = dataTypes[dt].transform(contents);
    cols = data.length;

    return data;
}