function copy(){
	//reference the Application
	var app = [NSApplication sharedApplication];
	for (var i = 0; i < 3; i++) {
		var newLayerFrame = newLayer.frame();
	    var newLayerName = newLayer.name();
	    var newX = newLayerFrame.x();
	    var newY = newLayerFrame.y();
	    var newW = newLayerFrame.width();
	    var newH = newLayerFrame.height();
	    var newLayerX = newX + newW + 24;
	    log(newLayerX);
	    // newLayer.setIsSelected(true);
	    group.setIsSelected(false);
	    newLayerFrame.setRect(NSMakeRect(newLayerX, newY, newW, newH));
	    if (newLayerName == nameDefault){
	        newLayer.setName(nameLight);
	    } else if (newLayerName == nameLight) {
	        newLayer.setName(namePrimary);   
	    } else if (newLayerName == namePrimary) {
	        newLayer.setName(nameSecondary);
	    } else {
	        alert("Layer name error", "Something woring with the layer name.")
	    }
	    newLayer = newLayer.duplicate();
	}
}