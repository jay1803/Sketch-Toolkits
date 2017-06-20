function rename(layer, nameDefault, nameLight, namePrimary, nameSecondary) {
    var layerFrame = layer.frame();
    var layerName = layer.name();
    var layerX = layerFrame.x();
    var layerY = layerFrame.y();
    var layerW = layerFrame.width();
    var layerH = layerFrame.height();
    var newLayerX = newX + newW + 24;
    // newLayer.setIsSelected(true);
    // group.setIsSelected(false);
    layerFrame.setRect(NSMakeRect(newLayerX, layerY, layerW, layerH));
    if (layerName == nameDefault){
        newLayer.setName(nameLight);
    } else if (layerName == nameLight) {
        newLayer.setName(namePrimary);   
    } else if (layerName == namePrimary) {
        newLayer.setName(nameSecondary);
    } else {
        alert("Layer name error", "Something woring with the layer name.")
    }
    newLayer = newLayer.duplicate();
}