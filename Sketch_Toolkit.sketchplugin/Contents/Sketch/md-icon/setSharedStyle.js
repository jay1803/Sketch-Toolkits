function getSharedStyle (sharedStyles) {
    var sharedStyleContainer = [];
    var numberOfSharedStyles = Number(sharedStyles.numberOfSharedStyles());
    for (var i = 0; i < numberOfSharedStyles; i++) {
        var sharedStyle = sharedStyles.objects()[i];
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

function hasSharedStyle (layer) {
    var layerStyle = layer.style();
    var styleId = layerStyle.sharedObjectID();
    return styleId;
}

function isShape (artborad) {
    layers = artborad.children();
    for (var i = 0; i < layers.count(); i++) {
        var layer = layers[i];
        var layerName = layer.name();
        if (layer.class() == "MSShapeGroup" || layer.class() == "MSOvalShape") {
            var styleId = layer.style().sharedObjectID();
            // log(layerName + " is a " + layer.class() + " , and share id is " + styleId);
            return styleId;
        } else {
            // log(layerName + " is a " + layer.class() + " , do not have a style.");
        }
    }
}

function setSharedStyle (layers, sharedStyles) {
	for (var i = 0; i < layers.count(); i++) {
		var layer = layers[i];
		if (layer.class() == "MSShapeGroup" || layer.class() == "MSOvalShape") {
			var layerStyle = layer.style();
            var layerFill = layerStyle.fills().firstObject();

            var styleId = layerStyle.sharedObjectID();
            var sharedStyleContainer = getSharedStyle(sharedStyles);
            // log("styleId is " + styleId);

            var dark = getStyleIndex("icon_color_default", sharedStyleContainer);
            var light = getStyleIndex("icon_color_light", sharedStyleContainer);
            var primary = getStyleIndex("icon_color_primary", sharedStyleContainer);
            var secondary = getStyleIndex("icon_color_secondary", sharedStyleContainer);

            var darkId = getStyleId("icon_color_default", sharedStyleContainer);
            var lightId = getStyleId("icon_color_light", sharedStyleContainer);
            var primaryId = getStyleId("icon_color_primary", sharedStyleContainer);
            var secondaryId = getStyleId("icon_color_secondary", sharedStyleContainer);
            // log("lightId is " + lightId);

            if (layerFill != null) {
                // log(layer.name() + " is a type of " + layer.class() + ", and its style id is " + styleId);
                // log(String(styleId) == String(lightId));
                // log("Type of style id is " + typeof(styleId));
                // log("Type of style id is " + typeof(lightId));
                if (styleId == null) {
                    var fillColor = layerFill.color().immutableModelObject().hexValue().toString();
                    if (fillColor == "000000") {
                        // log("set style to default");
                        setStyleWithName(layer, "icon_color_default", sharedStyleContainer, sharedStyles);
                    }
                } else if (String(styleId) == String(darkId)) {
                    // log("set style from dark to light");
                    setStyleWithName(layer, "icon_color_light", sharedStyleContainer, sharedStyles);
                } else if (String(styleId) == String(lightId)) {
                    // log("set style from light to primary");
                    setStyleWithName(layer, "icon_color_primary", sharedStyleContainer, sharedStyles);
                } else if (String(styleId) == String(primaryId)) {
                    // log("set style from primary to secondary.");
                    setStyleWithName(layer, "icon_color_secondary", sharedStyleContainer, sharedStyles);
                }
            } else {
                log(layer.name() + " is a type of " + layer.class() + ", and it do not have been filled.");
            }
		}
	}
}