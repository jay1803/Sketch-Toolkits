var onRun = function (context) {
	var sketch = context.api();
    var doc = sketch.selectedDocument;
    var selection = context.selection;
    var sharedStyles = doc.sketchObject.documentData().layerStyles();
    var numberOfSharedStyles = Number(sharedStyles.numberOfSharedStyles());
    log(sharedStyles.objects());
	if (selection.count() == 0) {
		showMessage("Please select something.")
	} else {
		for (var i = 0; i < selection.count(); i++) {
			var group = selection[i];
			var childrenLayer = group.children();
			setSharedStyle(childrenLayer, sharedStyles);
		}
	}
}
function setSharedStyle (layers, sharedStyles) {
	for (var i = 0; i < layers.count(); i++) {
		var layer = layers[i];
		if (layer.class() == "MSShapeGroup" || layer.class() == "MSOvalShape") {
			var layerStyle = layer.style();
            var layerFill = layerStyle.fills().firstObject();
            var layerSharedStyle = layerStyle.sharedObjectID();
            if (layerFill != null) {
                var fillColor = layerFill.color().immutableModelObject().hexValue().toString();
                if (fillColor == "000000") {
                    log("You found it!");
                    // sharedStyles.addSharedStyleWithName_firstInstance("icon_color_default", layer.style());
                    sharedStyle = sharedStyles.objects().objectAtIndex(4);
                    styleLayer(layer, sharedStyle);
                }
            }
		}
	}
}

function styleLayer(layer, style) {
    layer.setStyle(style.newInstance());
}