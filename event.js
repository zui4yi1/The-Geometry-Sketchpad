function selectLine(inx1, inx2) {
    var lineId = [inx1, inx2].sort().join('_');
    if (selectedLine.length >= 2 || selectedLine.indexOf(lineId) > -1) {
        console.info('most 2 lines can be selected, or the line has been selected');
        return;
    }
    var pn = paper.getById(lineId);
    pn.attr({ stroke: 'red' });
    selectedLine.push(lineId);
}

function ESelectLine() {
    var ds = this.id.split('_')
    selectLine(ds[0], ds[1]);
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

    var dot = createLineDot(selectedLine);
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

function printDots() {
    return dots.map(function (d) {
        return d.curDotInx + ',' + chars[d.curDotInx] + ',' + parseInt(d.attr('cx')) + ',' + parseInt(d.attr('cy'));

    });
}
function printLines() {
    return lines.map(function (d) {
        return d.id + ',' + chars[d.dots[0]] + chars[d.dots[1]];

    });
}
