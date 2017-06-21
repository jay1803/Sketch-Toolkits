@import 'rename.js'
var onRun = function(context) {
    var sketch = context.api();
    var doc = sketch.selectedDocument;
    var selection = context.selection;
    var sharedStyles = doc.sketchObject.documentData().layerStyles();

    if (selection.count() == 0) {
        // doc.showMessage("Please select something.");
    } else {
        for (var i = 0; i < selection.count(); i++) {
            var group = selection[i];
            var childrenLayer = group.children();
            var layer = group.parentGroup();
            var iconName = getIconName(group);
            setDefaultName(layer, iconName);
            setSharedStyle(childrenLayer, sharedStyles);
            copyLayer(layer, iconName, sharedStyles);
        }
    }
}