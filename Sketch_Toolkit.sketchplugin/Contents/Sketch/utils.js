/**
 * iterate over a list and match the name of the item with the input key
 * @param  {NSArray} list input list to be iterated on
 * @param  {String} key  string value to be matched with the name of elements
 */
function findByIterating(list, key){
    for (var i =0; i < list.count(); i++) {
        var elementKey = list.objectAtIndex(i).name();
        if (elementKey && elementKey.isEqualToString(key)) {
            return list.objectAtIndex(i);
        }
    }
    return nil;
  }
  
/* Layer */
function findLayerByName(artboard, name) {
    return findByIterating(artboard.layers(), name);
}

/* Page */
function findPageByName(pages, name) {
    return findByIterating(pages, name);
}

/* Symbol */
function findSymbolByName(doc, name){
    return findSymbolByName(getSymbols(doc), name)
}

function findSymbolByName(symbols, name) {
    return findByIterating(symbols, name);
}



/**
 * Get all the symbols for a document.
 * @param {MSDocument} doc
 * @return {NSArray}
 */
function getSymbols(doc) {
    return doc.documentData().allSymbols();
}

/**
 * If Symbols page exists, switch to it, otherwise create it then switch to it.
 * @param {MSDocument} doc
 */
function showSymbolsPage(doc) {
    doc.setCurrentPage(doc.documentData().symbolsPageOrCreateIfNecessary());
}

/**
 * Get the last symbol on the page (bottom-most, right-most).
 * @param {NSArray} symbols
 * @return {MSSymbolMaster|nil}
 */
function getBottomSymbol(symbols) {
    return symbols.slice().sort(function(a, b) {
        var aRect = a.rect().origin;
        var bRect = b.rect().origin;
        // A is above B, -1;
        // A and B are horizontally equal, A is left of B, -1;
        // A and B are overlapping, 0;
        // B is left of A, 1;
        // B is above A, 1.
        return aRect.y < bRect.y ? -1 : (aRect.x < bRect.x ? -1 : (aRect.x === bRect.x ? 0 : 1));
    }).pop();
}


function createArtboard(doc, artboardName){
    var artboard = [MSArtboardGroup new]
    [artboard setName:artboardName]
    var frame = [artboard frame]
    [frame setX:0]
    [frame setY:0]
    [frame setWidth:800]
    [frame setHeight:600]
    [[doc currentPage] addLayer:artboard]
    return artboard
  }
  
  function createPageType1(doc, pageName){
    var doc = context.document;
    var page = [MSPage new]
    [page setName: pageName]
    doc.documentData().addPage(page);
    doc.loadLayerListPanel()
  }
  
  function createPageType2(doc, pageName){
    var doc = context.document;
    page = doc.documentData().addBlankPage()
    page.setName(pageName)
  }
  
  function createTextLayer(name, stringValue) {
      var textLayer = MSTextLayer.new();
      textLayer.stringValue = stringValue
      textLayer.name = name
      return textLayer;
  }
  
  function createSymbolFromLayer(page, layer, name) {
      page.addLayers([layer]);
      layer.isSelected = true;
      var layers = MSLayerArray.arrayWithLayers([layer]);
      if (MSSymbolCreator.canCreateSymbolFromLayers(layers)) {
          var symbolName = SYMBOL_PREFIX+"/"+name;
          var symbolInstance = MSSymbolCreator.createSymbolFromLayers_withName_onSymbolsPage(layers, symbolName, true);
          var symbolMaster = symbolInstance.symbolMaster();
          symbolMaster.setLayerListExpandedType(1);
          symbolInstance.removeFromParent();
      }
      return symbolMaster;
  }