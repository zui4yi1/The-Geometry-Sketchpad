function selectLine() {
    // 暂只是单向选中，不做toggle选择
    if (selectedLine.length >= 2 || (selectedLine.length == 1 && selectedLine[0] == this.id))
        return;
    this.attr({ stroke: 'red' });
    selectedLine.push(this.id);
}
var ECreateCrossDot = function () {
    createCrossDot(selectedLine);
};

function EClearSelectLine() {
    for (var i = 0; i < selectedLine.length; i++) {
        for (var j = 0; j < lines.length; j++) {
            if (selectedLine[i] == lines[j].id) {
                var pn = paper.getById(lines[j].id);
                if (pn)
                    pn.attr({
                        stroke: "blue"
                    });
            }
        }
    }
    selectedLine = [];
}


var ECreateLineDot = function () {

    if (selectedLine.length != 1) return;

    createLineDot(selectedLine);
    dot.parentLine = selectedLine;
};

function EClearSelectDot() {
    for (var i = 0; i < lineObj.dots.length; i++) {
        dots[lineObj.dots[i]].dblclicked = false;
        dots[lineObj.dots[i]].attr({
            'stroke': 'blue'
        });
    }
    lineObj.dots = [];
}