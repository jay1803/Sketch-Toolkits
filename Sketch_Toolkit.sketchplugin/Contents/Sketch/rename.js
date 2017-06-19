var onRun = function(context) {
    function selectChildren(layers) {
        for (var x=0; x < [layers count]; x++){
            log(layers)
            var childLayer = layers[x];
            [childLayer select:true byExpandingSelection:true]
      }
    }
    var doc = context.document;
    var selection = context.selection;

    if (selection.count() == 0) {
        doc.showMessage("Please select something.");
    } else {
        for (var i = 0; i < selection.count(); i++) {
            if (selection[i].class() == "MSLayerGroup") {
                var group = selection[i];
                var gm = /(ic\_)(\w+)(\_24px$)/;
                var groupName = group.name();
                var groupNameList = groupName.split(gm);
                var iconName = groupNameList[2];
                var layer = group.parentGroup();
                var re = /(icon\/\w+\/)(\w+)(\/(default|light|primary|secondary))/;
                var layerName = layer.name();
                var layerFrame = layer.frame();
                var layerX = layerFrame.x();
                var layerY = layerFrame.y();
                var layerW = layerFrame.width();
                var layerH = layerFrame.height();
                var nameDefault = layerName.replace(re, "$1" + iconName + "$3");
                var nameLight = nameDefault.replace(re, "$1" + "$2" + "/light");
                var namePrimary = nameDefault.replace(re, "$1" + "$2" + "/primary");
                var nameSecondary = nameDefault.replace(re, "$1" + "$2" + "/secondary");
                layer.setName(nameDefault);
                if (layerName == nameDefault) {
                    doc.showMessage("artboard name has changed from: " + layerName + " to: " + groupName);
                    var newLayer = layer.duplicate();
                    group.setIsSelected(false);
                    newLayer.setIsSelected(true);
                    if (newLayer.isSelected()){
                        [newLayer select: false byExpandingSelection:true];
                        selectChildren([newLayer layers]);
                    }
                    // for (var i = 0; i < 3; i++) {
                    //     var newLayerFrame = newLayer.frame();
                    //     var newLayerName = newLayer.name();
                    //     var newX = newLayerFrame.x();
                    //     var newY = newLayerFrame.y();
                    //     var newW = newLayerFrame.width();
                    //     var newH = newLayerFrame.height();
                    //     var newLayerX = newX + newW + 24;
                    //     log(newLayerX);
                    //     // newLayer.setIsSelected(true);
                    //     group.setIsSelected(false);
                    //     newLayerFrame.setRect(NSMakeRect(newLayerX, newY, newW, newH));
                    //     if (newLayerName == nameDefault){
                    //         newLayer.setName(nameLight);
                    //     } else if (newLayerName == nameLight) {
                    //         newLayer.setName(namePrimary);   
                    //     } else if (newLayerName == namePrimary) {
                    //         newLayer.setName(nameSecondary);
                    //     } else {
                    //         alert("Layer name error", "Something woring with the layer name.")
                    //     }
                    //     newLayer = newLayer.duplicate();
                    // }
                }
            } else {
                doc.showMessage("Please select a artboard.");
            }
        }
    }
}