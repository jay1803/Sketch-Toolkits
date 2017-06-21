@import 'setSharedStyle.js'
var onRun = function(context) {
    var sketch = context.api();
    var doc = sketch.selectedDocument;
    var selection = context.selection;
    var sharedStyles = doc.sketchObject.documentData().layerStyles();

    var group = selection[0];
    var childrenLayer = group.children();
    var layer = group.parentGroup();
    var iconName = getIconName(group);
    setDefaultName(layer, iconName);
    setSharedStyle(childrenLayer, sharedStyles);
    copyLayer(layer, iconName, sharedStyles);
}

function getIconName(group) {
    var childrenLayer = group.children();
    var gm = /(ic\_)(\w+)(\_24px$)/;
    var groupName = group.name();
    var groupNameList = groupName.split(gm);
    var iconName = groupNameList[2];
    return iconName;
}

function setDefaultName (layer, iconName) {
    var layerName = layer.name();
    var re = /(icon\/\w+\/)(\w+)(\/(default|light|primary|secondary))/;
    var nameDefault = layerName.replace(re, "$1" + iconName + "$3");
    if (layerName == nameDefault) {
        log("DONE.")
    } else {
        layer.setName(nameDefault);
    }
}

function rename(layer) {
    var layerName = layer.name();
    var re = /(icon\/\w+\/)(\w+)(\/(default|light|primary|secondary))/;
    var nameDefault = layerName.replace(re, "$1" + "$2" + "/default");
    var nameLight = layerName.replace(re, "$1" + "$2" + "/light");
    var namePrimary = nameDefault.replace(re, "$1" + "$2" + "/primary");
    var nameSecondary = nameDefault.replace(re, "$1" + "$2" + "/secondary");
    if (layerName == nameDefault) {
        layer.setName(nameLight);
    } else if (layerName == nameLight) {
        layer.setName(namePrimary);
    } else if (layerName == namePrimary) {
        layer.setName(nameSecondary);
    } else {
        layer.setName(nameDefault);
    }
    // switch (layerName) {
    //     case nameDefault:
    //         layer.setName(nameLight);
    //         break;
    //     case nameLight:
    //         layer.setName(namePrimary);
    //         break;
    //     case namePrimary:
    //         layer.setName(nameSecondary);
    //         break;
    //     default:
    //         layer.setName(nameDefault);
    //         break;
    // }
}

function copyLayer (layer, iconName, sharedStyles) {
    for (var i = 0; i < 3; i++) {
        layer = layer.duplicate();
        var childrenLayer = layer.children();
        var layerFrame = layer.frame();
        var layerName = layer.name();
        var layerX = layerFrame.x();
        var layerY = layerFrame.y();
        var layerW = layerFrame.width();
        var layerH = layerFrame.height();
        var newLayerX = layerX + layerW + 24;
        rename(layer, iconName);
        setSharedStyle(childrenLayer, sharedStyles);
        layerFrame.setRect(NSMakeRect(newLayerX, layerY, layerW, layerH));
    }
}