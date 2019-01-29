/**
 * the base funtion to create line
 * @param {*} inx1
 * @param {*} inx2
 * @param {*} style solid or dashed, default is solid
 * @returns raphael object
 */
var createLine = function (inx1, inx2, style) {

    var lineId = [inx1, inx2].sort().join('_');
    if (paper.getById(lineId)) {
        console.info('the Line is existing')
        return;
    }

    var b = paper.path('M ' + dots[inx1].attr('cx') + ' ' + dots[inx1].attr('cy') + ' L ' + dots[inx2].attr('cx') + ' ' + dots[inx2].attr('cy') + '');
    var attr = style != 'dashed' ? { stroke: 'blue', 'stroke-width': '1px' } : { stroke: 'blue', 'stroke-dasharray': '- ' };
    b.attr(attr);
  //  b.click(ESelectLine);
    b.id = lineId;

    lines.push({
        id: b.id,
        isActive: dots[inx1].isActive || dots[inx2].isActive ? true : false,
        style: style != 'dashed' ? 'solid' : style,
        dots: [inx1, inx2].sort()
    });
    return b;
};



/**
 * redraw line
 * @param {*} lineId 
 */
var rePathLine = function (lineId) {
    var inx1 = lineId.split('_')[0], inx2 = lineId.split('_')[1];
    var pn = paper.getById(lineId);
    var line = searchLineById(lineId);
    if (!line) return;
    var style = line.style;
    if (pn)
        pn.remove();
    clearLine(lineId);

    createLine(inx1, inx2, style);
};

var ECreateSolidLine = function () {

    var inx1, inx2;
    if (lineObj.dots.length < 2 || isCreated(lineObj.dots)) {
        return;
    }
    inx1 = lineObj.dots[0];
    inx2 = lineObj.dots[1];

    createLine(inx1, inx2);
};

var createDashLine = function (inx1, inx2) {
    createLine(inx1, inx2, 'dashed');
};



var ECreateDashLine = function () {
    var inx1, inx2;
    if (lineObj.dots.length < 2 || isCreated(lineObj.dots)) {
        return;
    }
    inx1 = lineObj.dots[0];
    inx2 = lineObj.dots[1];
    createLine(inx1, inx2, 'dashed');
};


/**
 * add expanding line with dashed style
 */
var addExpandingDashedLine = function (lineId, crossDot) {
    var inxs = lineId.split('_');
    var left, right;
    if (dots[inxs[0]].attr('cx') <= dots[inxs[1]].attr('cx')) {
        left = inxs[0], right = inxs[1];
    } else {
        left = inxs[1], right = inxs[0];
    }


    var id = [left, crossDot.curDotInx].sort().join('_');
    clearLine(id);
    var pn = paper.getById(id);
    if (pn)
        pn.remove();
    var id = [right, crossDot.curDotInx].sort().join('_');
    clearLine(id);
    var pn = paper.getById(id);
    if (pn)
        pn.remove();

    if (dots[left].attr('cx') > crossDot.attr('cx')) {
        var b = createLine(left, crossDot.curDotInx, 'dashed');
        return b.id;
    } else if (dots[right].attr('cx') < crossDot.attr('cx')) {
        var b = createLine(right, crossDot.curDotInx, 'dashed');
        return b.id;
    }
};

function clearLine(id) {
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].id == id) {
            lines.splice(i, 1);
            return;
        }
    }
}
function isCreated(dots) {
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].dots[0] == dots[0] && lines[i].dots[1] == dots[1])
            return true;
    }
    return false;
}
function searchLineById(lineId) {
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].id === lineId) {
            return lines[i];
        }
    }
    return null;
}

