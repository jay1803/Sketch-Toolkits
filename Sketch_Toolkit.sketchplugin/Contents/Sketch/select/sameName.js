const sketch = require('sketch')
const document = sketch.getSelectedDocument()
const selectedLayers = document.selectedLayers
const selectedCount = selectedLayers.length
const selectedName = selectedLayers.name

console.log(selectedCount)

if (selectedCount == 1) {
    selectedLayers.forEach(function (selectedLayer, i) {
        const name = selectedLayer.name;
        const layers = document.getLayersNamed(name)
        layers.forEach(function (layer, index) {
            layer.selected = true
        })
      })
} else if (selectedCount > 1) {
    console.log("You selected too many layers, please just select one layer.")
} else {
    console.log("You don't select any layers.")
}
