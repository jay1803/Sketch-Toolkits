var onRun = function (context) {
	var sketch = context.api();
    var doc = sketch.selectedDocument;
    var selection = context.selection;
    var sharedStyles = doc.sketchObject.documentData().layerStyles();
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

function getSharedStyle (sharedStyles) {
    var sharedStyleContainer = [];
    var numberOfSharedStyles = Number(sharedStyles.numberOfSharedStyles());
    for (var i = 0; i < numberOfSharedStyles; i++) {
        var sharedStyle = sharedStyles.objects()[i];
        // var styleName = sharedStyle.name();
        // var styleId = sharedStyle.id();
        sharedStyleContainer.push({
            "id" : sharedStyle.objectID(),
            "name" : sharedStyle.name(),
            "index" : i
        });
    }
    return sharedStyleContainer;
}

function getStyleIndex (name ,sharedStyleContainer) {
    var number = sharedStyleContainer.length;
    for (var i = 0; i < number; i++) {
        var style = sharedStyleContainer[i]
            if (name == style["name"]) {
                return style["index"];
        }
    }
}

function getStyleId (name, sharedStyleContainer) {
    var number = sharedStyleContainer.length;
    for (var i = 0; i < number; i++) {
        var style = sharedStyleContainer[i]
            if (name == style["name"]) {
                return style["id"];
        }
    }
}

function setStyleWithName (layer, name, sharedStyleContainer, sharedStyles) {
    var indexOfStyle = getStyleIndex(name, sharedStyleContainer);
    var style = sharedStyles.objects().objectAtIndex(indexOfStyle);
    layer.setStyle(style.newInstance());
}

function setSharedStyle (layers, sharedStyles) {
	for (var i = 0; i < layers.count(); i++) {
		var layer = layers[i];
		if (layer.class() == "MSShapeGroup" || layer.class() == "MSOvalShape") {
			var layerStyle = layer.style();
            var layerFill = layerStyle.fills().firstObject();
            var styleId = layerStyle.sharedObjectID();
            var styles = getSharedStyle(sharedStyles);
            var dark = getStyleIndex("icon_color_default", styles);
            var light = getStyleIndex("icon_color_light", styles);
            var primary = getStyleIndex("icon_color_primary", styles);
            var secondary = getStyleIndex("icon_color_secondary", styles);
            var darkId = getStyleId("icon_color_default", styles);
            var lightId = getStyleId("icon_color_light", styles);
            var primaryId = getStyleId("icon_color_primary", styles);
            var secondaryId = getStyleId("icon_color_secondary", styles);
            if (layerFill != null) {
                switch (styleId) {
                    case null:
                        var fillColor = layerFill.color().immutableModelObject().hexValue().toString();
                        if (fillColor == "000000") {
                            log("You found it!");
                            setStyleWithName(layer, "icon_color_default", styles, sharedStyles);
                        }
                        break;
                    case darkId:
                        setStyleWithName(layer, "icon_color_light", styles, sharedStyles);
                        break;
                    case lightId:
                        setStyleWithName(layer, "icon_color_primary", styles, sharedStyles);
                    case primaryId:
                        setStyleWithName(layer, "icon_color_secondary", styles, sharedStyles);
                    default:
                        log("style set done.")
                        break;
                }
            }
		}
	}
}