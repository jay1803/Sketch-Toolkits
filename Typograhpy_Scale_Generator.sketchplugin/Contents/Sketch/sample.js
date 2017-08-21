var stylesGenerator = function (context) {
  var doc = context.document
  var data = doc.documentData()
  var layers = context.selection
  var total = layers.count()
  var textStyles = data.layerTextStyles()
  var layerStyles = data.layerStyles()
  var textStylesAmount = textStyles.numberOfSharedStyles()
  var sharedStylesAmount = layerStyles.numberOfSharedStyles()
  var logs = {text: 0, layer: 0, overridden: 0, skipped: 0}
  var stylesObj = {}
  var selection = []

  // ===================================
  // pre-check
  // ===================================

  // kill process if no layers are selected, or store the pre-existing styles
  if (total) styles()
  else exit(false)

  // ===================================
  // existing styles
  // ===================================

  // iterate on the pre-existing styles
  function styles() {
    for (var i = 0; i < textStylesAmount; i++){
      var style = textStyles.objects().objectAtIndex(i)
      pushStyles(style.name(), style)
    }

    for (var i = 0; i < sharedStylesAmount; i++){
      var style = layerStyles.objects().objectAtIndex(i)
      pushStyles(style.name(), style)
    }

    compare()
  }

  // generate an array containing the pre-existing styles
  function pushStyles(name, style, type) {
    stylesObj[name] = style
  }

  // ===================================
  // styles comparison
  // ===================================

  // compare the selected layers with the list of existing one
  function compare() {
    for (var i = 0; i < total; i++) {
      var layer = layers[i]
      var type = layer.class()
      var name = layer.name()
      var style = layer.style()

      if (name in stylesObj) overwrite(layer, type, name, style)
      else create(name, style, type)
    }

    exit(true)
  }

  // ===================================
  // create or overwrite styles
  // ===================================

  // cast the layer type (text, shape) and create the related shared style
  function create(name, style, type) {
    if (type == 'MSTextLayer') {
      textStyles.addSharedStyleWithName_firstInstance(name, style)
      logs.text++
    } else if (type == 'MSShapeGroup') {
      layerStyles.addSharedStyleWithName_firstInstance(name, style)
      logs.layer++
    }

    pushStyles(name, style, type)
  }

  // overwrite the related shared style
  function overwrite(layer, type, name, style) {
    var stylesPointer = (type == 'MSTextLayer') ? textStyles : layerStyles

    stylesPointer.updateValueOfSharedObject_byCopyingInstance(stylesObj[name], style)
    stylesPointer.synchroniseInstancesOfSharedObject_withInstance(stylesObj[name], style)
    logs.overridden++
  }

  // ===================================
  // exit
  // ===================================

  // sketch logging, inspector reload
  function exit(executed) {
    var message

    if (executed) {
      message = 'Generated: '
        + logs.text + ' text styles, '
        + logs.layer + ' shared styles. '
        + 'Forced Overrides: ' + logs.overridden + '.'
    } else {
      message = 'No layer(s) selected!'
    }

    doc.showMessage(message)
    doc.reloadInspector()
  }
}