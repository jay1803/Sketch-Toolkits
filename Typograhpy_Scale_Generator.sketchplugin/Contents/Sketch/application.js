var onRun = function(context) {
    var document = context.document;
    var page = document.currentPage();
    var selection = context.selection;
    var text_styles = document.documentData().layerTextStyles();
    var styles = text_styles.objects();
    var font_sizes = [12, 14, 14, 16, 16, 20, 24, 34, 45, 56, 112];
    var fonts = ["PingFangSC-Regular", "PingFangSC-Medium", "PingFangSC-Light"];
    var line_heights = [16, 20, 24, 24, 28, 24, 32, 40, 50, 64, 128];
    var themes_opacity = [
        [0.87, 0.54, 0.38],
        [1, 0.7, 0.5],
        [1, 0.54, 0.38],
        [1, 0.54, 0.38]
    ]
    var states_name = ["primary", "secondary", "hint"];
    var themes_name = ["dark", "light", "blue", "red"];
    var aligns_name = ["left", "right", "middle", "justify"]
    var text_color = MSColor.colorWithRed_green_blue_alpha(0/255, 0/255, 0/255, 0.87);

	for (var theme = 0; theme < themes_name.length; theme++) {
        print("start theme loop");
        // 生成文本
        var y = theme * 800;
        var theme_name = themes_name[theme];
        for (var state = 0; state < states_name.length; state++) {
            print("start state loop");
            var state_name = states_name[state];
            var opacitys = themes_opacity[state];
            var x = state * 1000;
            for (var opacity = 0; opacity < opacitys.length; opacity++) {
                print("start opacity loop");
                var op = opacitys[opacity];
                for (var align = 0; align < aligns_name.length; align++) {
                    print("start alignment loop");
                    var align_name = aligns_name[align];
                    for (var size = 0; size < font_sizes.length; size++) {
                        print("start font size loop");
                        var font_size = font_sizes[size];
                        var size_name = size + "_Regular";
                        var text = MSTextLayer.new();
                        var font = fonts[0];
                        if (font_size == 112) {
                            var font = fonts[2];
                            var size_name = size + "_Regular";
                        }
                        // if (font_size == 12 || font_size == 14){
                        //     for (var w = 0; w < 2; w++) {
                        //         var element = array[w];
                                
                        //     }
                        // }
                        var layer_name = theme_name + "/" + size_name + "/" + align_name + "/" + state_name;
                        var string_value = layer_name;
                        text.setName(layer_name);
                        text.setStringValue(string_value);
                        text.frame().setX(x);
                        text.frame().setY(y);
                        text.setFontSize(font_size);
                        text.setLineHeight(line_heights[size]);
                        text.setTextColor(text_color);
                        text.setFontPostscriptName(font);
                        text.setTextAlignment(align);
                        page.addLayer(text);
                        print("Create Text Style");
                        var text_style = text_styles.addSharedStyleWithName_firstInstance(layer_name, text.style());
                        print("the end");
                    }
                }
            }
        }
    }
}