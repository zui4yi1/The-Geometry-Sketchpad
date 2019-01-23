var createLine = function (inx1, inx2) {

    // 需要验重

    var b = paper.path('M ' + dots[inx1].attr('cx') + ' ' + dots[inx1].attr('cy') + ' L ' + dots[inx2].attr('cx') + ' ' + dots[inx2].attr('cy') + '');
    b.attr({
        stroke: 'blue',
        'stroke-width': '3px'
    });
    b.click(selectLine);
    b.id = inx1 + '_' + inx2;

    lines.push({
        id: b.id,
        isActive: dots[inx1].isActive || dots[inx2].isActive ? true : false,
        style: 'solid',
        dots: [inx1, inx2]
    });
};

/**
 * 重画动态线
 * @param {*} lineId 
 */
var rePathLine = function (lineId) {
    var inx1 = lineId.split('_')[0], inx2 = lineId.split('_')[1];
    var pn = paper.getById(lineId);
    if (pn)
        pn.remove();
    clearLine(lineId);

    var b = paper.path('M ' + dots[inx1].attr('cx') + ' ' + dots[inx1].attr('cy') + ' L ' + dots[inx2].attr('cx') + ' ' + dots[inx2].attr('cy') + '');
    // 暂时都为虚线
    b.attr({
        stroke: 'blue',
        'stroke-dasharray': '- '
    });
    b.click(selectLine);
    b.id = lineId;
    lines.push({
        id: lineId,
        isActive: true,
        style: 'dashed',
        dots: [inx1, inx2].sort()
    });
};

var ECreateSolidLine = function () {

    var inx1, inx2;
    if (lineObj.dots.length < 2 || isCreated(lineObj.dots)) {
        return;
    }
    inx1 = lineObj.dots[0];
    inx2 = lineObj.dots[1];



    var b = paper.path('M ' + dots[inx1].attr('cx') + ' ' + dots[inx1].attr('cy') + ' L ' + dots[inx2].attr('cx') + ' ' + dots[inx2].attr('cy') + '');
    b.attr({
        stroke: 'blue',
        'stroke-width': '3px'
    });
    b.click(selectLine);
    b.id = inx1 + '_' + inx2;
    lines.push({
        id: b.id,
        isActive: dots[inx1].isActive || dots[inx2].isActive ? true : false,
        style: 'solid',
        dots: [inx1, inx2]
    });
};
var createSolidLine2 = function (pdots, curDotInx, attr) {

    var inx1, inx2, start;
    if (pdots) {
        inx1 = pdots[0];
        inx2 = pdots[1];
    }
    start = curDotInx == inx2 ? inx1 : inx2;

    var b = paper.path('M ' + dots[start].attr('cx') + ' ' + dots[start].attr('cy') +
        ' L ' + attr.cx + ' ' + attr.cy + '');
    b.attr({
        stroke: 'blue',
        'stroke-width': '3px'
    });
    b.click(selectLine);
    b.id = inx1 + '_' + inx2;
    lines.push({
        id: b.id,
        isActive: dots[inx1].isActive || dots[inx2].isActive ? true : false,
        style: 'solid',
        dots: [inx1, inx2].sort()
    });
};


var createDashLine = function (inx1, inx2) {
    // 需要验重
    var b = paper.path('M ' + dots[inx1].attr('cx') + ' ' + dots[inx1].attr('cy') + ' L ' + dots[inx2].attr('cx') + ' ' + dots[inx2].attr('cy') + '');
    b.attr({
        stroke: 'blue',
        'stroke-dasharray': '- ' //虚线没法设置宽度
    });
    b.id = inx1 + '_' + inx2;
    b.click(selectLine);
    lines.push({
        id: b.id,
        isActive: dots[inx1].isActive || dots[inx2].isActive ? true : false,
        style: 'dashed',
        dots: [inx1, inx2]
    });
};

var ECreateDashLine = function () {
    var inx1, inx2;
    if (lineObj.dots.length < 2 || isCreated(lineObj.dots)) {
        return;
    }
    inx1 = lineObj.dots[0];
    inx2 = lineObj.dots[1];
    var b = paper.path('M ' + dots[inx1].attr('cx') + ' ' + dots[inx1].attr('cy') + ' L ' + dots[inx2].attr('cx') + ' ' + dots[inx2].attr('cy') + '');
    b.attr({
        stroke: 'blue',
        'stroke-dasharray': '- ' //虚线没法设置宽度
    });
    b.id = inx1 + '_' + inx2;
    b.click(selectLine);
    lines.push({
        id: b.id,
        isActive: dots[inx1].isActive || dots[inx2].isActive ? true : false,
        style: 'dashed',
        dots: [inx1, inx2]
    });
};
var createDashLine2 = function (pdots, dotInx, attr) {
    var inx1, inx2;
    if (pdots) {
        inx1 = pdots[0];
        inx2 = pdots[1];
    }
    var b = paper.path('M ' +
        (inx1 == dotInx ? dots[inx2].attr('cx') : attr.cx) + ' ' +
        (inx1 == dotInx ? dots[inx2].attr('cy') : attr.cy) +
        ' L ' +
        (inx2 == dotInx ? dots[inx1].attr('cx') : attr.cx) + ' ' +
        (inx2 == dotInx ? dots[inx1].attr('cy') : attr.cy) + '');

    b.attr({
        stroke: 'blue',
        'stroke-dasharray': '- '
    });
    b.id = inx1 + '_' + inx2;
    b.click(selectLine);
    lines.push({
        id: b.id,
        isActive: dots[inx1].isActive || dots[inx2].isActive ? true : false,
        style: 'dashed',
        dots: [inx1, inx2]
    });
};

/**
 * 添加延长虚线
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
        var b = paper.path('M ' + dots[left].attr('cx') + ' ' + dots[left].attr('cy') + ' L ' + crossDot.attr('cx') + ' ' + crossDot.attr('cy') + '');
        b.attr({
            stroke: 'blue',
            'stroke-dasharray': '- '
        });
        b.click(selectLine);
        b.id = [left, crossDot.curDotInx].sort().join('_');
        lines.push({
            id: b.id,
            isActive: true,
            style: 'dashed',
            dots: [left, crossDot.curDotInx].sort()
        });
        return b.id; // 返回新增线的id
    } else if (dots[right].attr('cx') < crossDot.attr('cx')) {

        var b = paper.path('M ' + dots[right].attr('cx') + ' ' + dots[right].attr('cy') + ' L ' + crossDot.attr('cx') + ' ' + crossDot.attr('cy') + '');
        b.attr({
            stroke: 'blue',
            'stroke-dasharray': '- '
        });
        b.click(selectLine);
        b.id = [right, crossDot.curDotInx].sort().join('_');
        lines.push({
            id: b.id,
            isActive: true,
            style: 'dashed',
            dots: [right, crossDot.curDotInx].sort()
        });
        return b.id; // 返回新增线的id
    }
}

var addActiveDashedLine = function (posOps, activeDot) {
    var left, right;
    if (posOps[0].cx <= posOps[1].cx) {
        left = posOps[0], right = posOps[1];
    } else {
        left = posOps[1], right = posOps[0];
    }

    var id = [left.curDotInx, activeDot.curDotInx].sort().join('_');
    clearLine(id);
    var pn = paper.getById(id);
    if (pn)
        pn.remove();
    var id = [right.curDotInx, activeDot.curDotInx].sort().join('_');
    clearLine(id);
    var pn = paper.getById(id);
    if (pn)
        pn.remove();

    if (left.cx > activeDot.cx) { // 动态点在线段左边
        var b = paper.path('M ' + left.cx + ' ' + left.cy + ' L ' + activeDot.cx + ' ' + activeDot.cy + '');
        b.attr({
            stroke: 'blue',
            'stroke-dasharray': '- '
        });
        b.click(selectLine);
        b.id = [left.curDotInx, activeDot.curDotInx].sort().join('_');
        lines.push({
            id: b.id,
            isActive: dots[left.curDotInx].isActive || dots[activeDot.curDotInx].isActive ? true : false,
            style: 'dashed',
            dots: [left.curDotInx, right.curDotInx].sort()
        });
    } else if (right.cx < activeDot.cx) { //动态点在线段右边

        var b = paper.path('M ' + right.cx + ' ' + right.cy + ' L ' + activeDot.cx + ' ' + activeDot.cy + '');
        b.attr({
            stroke: 'blue',
            'stroke-dasharray': '- '
        });
        b.click(selectLine);
        b.id = [right.curDotInx, activeDot.curDotInx].sort().join('_');
        lines.push({
            id: b.id,
            isActive: dots[right.curDotInx].isActive || dots[activeDot.curDotInx].isActive ? true : false,
            style: 'dashed',
            dots: [left.curDotInx, right.curDotInx].sort()
        });
    }
};

var addDashedLine = function (lineId, attr, curDot) {
    var inxs = lineId.split('_');
    var left, right;
    if (dots[inxs[0]].attr('cx') <= dots[inxs[1]].attr('cx')) {
        left = inxs[0], right = inxs[1];
    } else {
        left = inxs[1], right = inxs[0];
    }
    var id = [left, curDot.curDotInx].sort().join('_');
    clearLine(id);
    var pn = paper.getById(id);
    if (pn)
        pn.remove();
    var id = [right, curDot.curDotInx].sort().join('_');
    clearLine(id);
    var pn = paper.getById(id);
    if (pn)
        pn.remove();
    if (dots[left].attr('cx') > attr.cx) {
        var b = paper.path('M ' + dots[left].attr('cx') + ' ' + dots[left].attr('cy') + ' L ' + attr.cx + ' ' + attr.cy + '');
        b.attr({
            stroke: 'blue',
            'stroke-dasharray': '- '
        });
        b.click(selectLine);
        b.id = [left, curDot.curDotInx].sort().join('_');
        lines.push({
            id: b.id,
            isActive: dots[left].isActive || dots[curDot.curDotInx].isActive ? true : false,
            style: 'dashed',
            dots: [left, curDot.curDotInx].sort()
        });
    } else if (dots[right].attr('cx') < attr.cx) {

        var b = paper.path('M ' + dots[right].attr('cx') + ' ' + dots[right].attr('cy') + ' L ' + attr.cx + ' ' + attr.cy + '');
        b.attr({
            stroke: 'blue',
            'stroke-dasharray': '- '
        });
        b.click(selectLine);
        b.id = [right, curDot.curDotInx].sort().join('_');
        lines.push({
            id: b.id,
            isActive: dots[right].isActive || dots[curDot.curDotInx].isActive ? true : false,
            style: 'dashed',
            dots: [right, curDot.curDotInx].sort()
        });
    }

}
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

