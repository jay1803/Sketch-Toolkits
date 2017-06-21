@import 'rename.js'
var onRun = function(context) {
    var sketch = context.api();
    var doc = sketch.selectedDocument;
    var selection = context.selection;
    var sharedStyles = doc.sketchObject.documentData().layerStyles();

    if (selection.count() == 0) {
        // doc.showMessage("Please select something.");
    } else {
        log("--- New test start here ---")
        for (var i = 0; i < selection.count(); i++) {
            var group = selection[i];
            if (group.class() == "MSLayerGroup") {
                var childrenLayer = group.children();
                var artborad = group.parentGroup();
                var iconName = getIconName(group);
                var hasStyle = isShape(artborad);
                if (hasStyle == null) {
                    setDefaultName(artborad, iconName);
                    setSharedStyle(childrenLayer, sharedStyles);
                    copyLayer(artborad, sharedStyles);
                    log("set style first");
                } else {
                    copyLayer(artborad, sharedStyles);
                    log("set style after")
                }
            }
        }
    }
}