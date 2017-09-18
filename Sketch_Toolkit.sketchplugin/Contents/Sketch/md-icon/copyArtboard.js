var onRun = function(context) {
    var sketch = context.api();
    var doc = sketch.selectedDocument;
    var selection = context.selection;
    for (var i = 0; i < selection.count(); i++) {
        var layer = selection[i];
        if (layer.class() == "MSSymbolMaster") {
            for (var l = 0; l < 10; l++) {
                layer = layer.duplicate();
                var layerFrame = layer.frame();
                var layerX = layerFrame.x();
                var layerY = layerFrame.y();
                var layerW = layerFrame.width();
                var layerH = layerFrame.height();
                var newLayerY = layerY + layerH + 24;
                layerFrame.setRect(NSMakeRect(layerX, newLayerY, layerW, layerH));
            }
        }
    }
}