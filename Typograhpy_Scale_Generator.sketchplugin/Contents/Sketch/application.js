var onRun = function(context) {
    var document = context.document;
    var page = document.currentPage();
    var selection = context.selection;
    var text_styles = document.documentData().layerTextStyles();
    var styles = textStyles.objects();
    var font_sizes = [12, 14, 14, 16, 16, 20, 24, 34, 45, 56, 112];
    var fonts = ["PingFangSC-Regular", "PingFangSC-Medium", "PingFangSC-Light"];
    var line_heights = [16, 20, 24, 24, 28, 24, 32, 40, 50, 64, 128];
    var themes_opacity = {
        "darks_opacity": [0.87, 0.54, 0.38],
        "lights_opacity": [1, 0.7, 0.5],
        "blues_opacity": [1, 0.54, 0.38],
        "reds_opacity": [1, 0.54, 0.38]
    }
    var states_name = ["primary", "secondary", "hint"];
    var themes_name = ["dark", "light", "blue", "red"];
    var aligns_name = ["left", "right", "middle", "justify"]
    var textColor = MSColor.colorWithRed_green_blue_alpha(0/255, 0/255, 0/255, 0.87);

	for (var theme = 0; theme < theme_names.length; theme++) {
        print("Create Themes");
        // 生成默认文本
        var text = MSTextLayer.new();
        text.setName("preview");
        text.setStringValue("text number " + i);
        text.frame().setX(0);
        text.frame().setY(i * 40 + textHeight[i]);
        text.setFontSize(fontSize[i]);
        text.setLineHeight(textHeight[i]);
        text.setTextColor(textColor);
        text.setFontPostscriptName(textFontName[0]);
        text.setTextAlignment(1);
        page.addLayer(text);
        print("Create Text Style");
        var textStyle = textStyles.addSharedStyleWithName_firstInstance("name" + i, text.style());
        print("end");
    }
}
