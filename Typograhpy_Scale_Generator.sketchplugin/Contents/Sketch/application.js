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
    var states_name = ["default", "secondary", "hint"];
    var themes_name = ["dark", "light", "blue", "red"];
    var aligns_name = ["left", "right", "middle", "justify"]

	for (var theme = 0; theme < themes_name.length; theme++) {
        print("start theme loop");
        // 生成文本
        var theme_name = themes_name[theme];
        for (var state = 0; state < states_name.length; state++) {
            print("start state loop");
            var state_name = states_name[state];
            var opacitys = themes_opacity[theme];
            var opacity = opacitys[state];
            for (var align = 0; align < aligns_name.length; align++) {
                print("start alignment loop");
                var align_name = aligns_name[align];
                for (var size = 0; size < font_sizes.length; size++) {
                    print("start font size loop");
                    var font_size = font_sizes[size],
                        size_name = font_size + "_Regular",
                        text = MSTextLayer.new(),
                        font = fonts[0],
                        x = state * 500,
                        y = theme * 2000 + 40 * size + 40 * line_heights[size] + 40 * align + 40 * state,
                        dark_color = MSColor.colorWithRed_green_blue_alpha(0/255, 0/255, 0/255, opacity),
                        light_color = MSColor.colorWithRed_green_blue_alpha(255/255, 255/255, 255/255, opacity),
                        blue_color = MSColor.colorWithRed_green_blue_alpha(63/255, 81/255, 181/255, opacity),
                        red_color = MSColor.colorWithRed_green_blue_alpha(255/255, 63/255, 128/255, opacity),
                        texts_color = [dark_color, light_color, blue_color, red_color],
                        text_color = texts_color[theme];
                    if (font_size == 112) {
                        var font = fonts[2];
                        var size_name = font_size + "_Light";
                    }
                    // if (font_size == 12 || font_size == 14){
                    //     for (var w = 0; w < 2; w++) {
                    //         var element = array[w];
                            
                    //     }
                    // }
                    var layer_name = theme_name + "/" + size_name + "/" + align_name + "/" + state_name;
                    var string_value = "文本标签";
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
                    print("====================================");
                }
            }
        }
    }
}