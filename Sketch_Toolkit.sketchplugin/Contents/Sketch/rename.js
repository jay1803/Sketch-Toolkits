@import 'setSharedStyle.js'

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
        log("layer name already changed.")
    } else {
        layer.setName(nameDefault);
        log("set layer name to default.");
    }
}

function rename(layer) {
    var layerName = layer.name();
    var re = /(icon\/\w+\/)(\w+)(\/(default|light|primary|secondary))/;
    var nameDefault = layerName.replace(re, "$1" + "$2" + "/default");
    var nameLight = nameDefault.replace(re, "$1" + "$2" + "/light");
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
}

function copyTime (layer) {
    var layerName = layer.name();
    var re = /(icon\/\w+\/)(\w+)(\/(default|light|primary|secondary))/;
    var nameDefault = layerName.replace(re, "$1" + "$2" + "/default");
    var nameLight = nameDefault.replace(re, "$1" + "$2" + "/light");
    var namePrimary = nameDefault.replace(re, "$1" + "$2" + "/primary");
    var nameSecondary = nameDefault.replace(re, "$1" + "$2" + "/secondary");
    if (layerName == nameDefault) {
        return 3;
    } else if (layerName == nameLight) {
        return 2;
    } else if (layerName == namePrimary) {
        return 1;
    }
}

function copyLayer (layer, sharedStyles) {
    var time = copyTime(layer);
    // log(time);
    for (var i = 0; i < time; i++) {
        layer = layer.duplicate();
        var subLayer = layer.children();
        var layerFrame = layer.frame();
        var layerName = layer.name();
        var layerX = layerFrame.x();
        var layerY = layerFrame.y();
        var layerW = layerFrame.width();
        var layerH = layerFrame.height();
        var newLayerX = layerX + layerW + 24;
        rename(layer);
        setSharedStyle(subLayer, sharedStyles);
        layerFrame.setRect(NSMakeRect(newLayerX, layerY, layerW, layerH));
    }
}