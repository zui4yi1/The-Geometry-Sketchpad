
/**
 * 创建两直线的交点
 */
var createCrossDot = function (lines) {

    //TODO BUG 未进行重复验证
    var pos = getCrossPositon(lines);
    if (pos) {
        var dot = createPoint(pos.x, pos.y, pos.lineIds, true);
        dot.isCrossDot = true;
        dot.isActive = true;
        dot.parentLine = lines;
        // 补虚线
        addExpandingDashedLine(pos.lineIds[0], dot);
        addExpandingDashedLine(pos.lineIds[1], dot);
    }
}

/**
 * 两线交点的位置，也要分静态和动态的。。。
 * @param {*} lineIds 
 */
var getCrossPositon = function (lineIds) {
    if (lineIds.length !== 2) {
        return null;
    }
    var line1 = lineIds[0].split('_'),
        line2 = lineIds[1].split('_');

    var dot1 = dots[line1[0]],
        dot2 = dots[line1[1]],
        dot3 = dots[line2[0]],
        dot4 = dots[line2[1]];

    var k1 = (dot2.attr('cy') - dot1.attr('cy')) / (dot2.attr('cx') - dot1.attr('cx')); // 暂时不考虑垂线情况
    var k2 = (dot4.attr('cy') - dot3.attr('cy')) / (dot4.attr('cx') - dot3.attr('cx'));

    var x = (k1 * dot1.attr('cx') - k2 * dot3.attr('cx') - dot1.attr('cy') + dot3.attr('cy')) / (k1 - k2);
    var y = k1 * (x - dot1.attr('cx')) + dot1.attr('cy');
    return {
        x: x,
        y: y,
        lineIds: lineIds
    };
};


var setLineDotPosition = function (curDot, lineId, curMoveDotInx) {

    var base = curDot.rateBaseDot;
    var relt = curDot.relativeDot;

    var attr = {
        cx: dots[base].attr('cx') + (dots[relt].attr('cx') - dots[base].attr('cx')) * curDot.rate,
        cy: dots[base].attr('cy') +  (dots[relt].attr('cy') - dots[base].attr('cy')) * curDot.rate
    }
    curDot.attr(attr);
    setTextPos(curDot.curDotInx);

    return [addExpandingDashedLine(lineId, curDot)];
};



var setCrossDotPosition = function (curDot, lineId, curMoveDotInx, attr) {

    var pos = getCrossPositon(curDot.parentLine);
    curDot.attr({
        cx: pos.x,
        cy: pos.y
    });
    setTextPos(curDot.curDotInx);
    // 重画虚线
    return [
        addExpandingDashedLine(pos.lineIds[0], curDot),
        addExpandingDashedLine(pos.lineIds[1], curDot)
    ];

};

/**
 * 菜单事件，创建节点 
 */
var ECreateDot = function () {
    if (isDotUsed)
        return;
    isDotUsed = true;
    createPoint(20, 380); //在左下角的虚线框内创建一个节点
}

/**
 * 创建两线的中点
 */
var createLineDot = function (selectedLine) {
    if (selectedLine.length != 1) return;

    //需要过滤重复
    var lineDots = selectedLine[0].replace('_', '');
    var x = (dots[lineDots[0]].attr('cx') + dots[lineDots[1]].attr('cx')) / 2;
    var y = (dots[lineDots[0]].attr('cy') + dots[lineDots[1]].attr('cy')) / 2;

    var dot = createPoint(x, y, [selectedLine[0]]);
    dot.isLineDot = true;
    dot.isActive = true;
    dot.parentLine = selectedLine;
    dot.rateBaseDot = lineDots[0]; // 设置该点比例关系的基点准
    dot.relativeDot = lineDots[1];
    dot.rate = 0.5;
}

/**
 * 创建节点的底层函数
 */
var createPoint = function (x, y, lineIds, nodrag) {
    dots[dotInx] = paper.circle(x, y, 2.5).attr({
        'stroke-width': '5',
        'stroke': 'blue'
    });
    if (!nodrag) dots[dotInx].drag(move, start, up).toBack();
    dots[dotInx].curDotInx = dotInx;
    dots[dotInx].dblclick(dblclick)
    texts[dotInx] = paper.text(x + 10, y, chars[dotInx]).attr({
        'font-size': '14px',
        'fill': '#0343ef'
    });
    setTextPos(dotInx);
    if (lineIds && lineIds.length > 0) {
        dots[dotInx].lineIds = lineIds;
    }
    dotInx++;
    return dots[dotInx - 1];
};

//节点的双击事件
var dblclick = function () {
    if (!this.dblclicked) {
        if (lineObj.dots.length < 2) {
            this.dblclicked = true;
            this.attr({
                'stroke': 'red'
            });
            lineObj.dots.push(this.curDotInx);
            lineObj.dots.sort();
        }
    } else {
        this.dblclicked = false;
        this.attr({
            'stroke': 'blue'
        });
        var inx = lineObj.dots.indexOf(this.curDotInx);
        if (inx > -1) {
            lineObj.dots.splice(inx, 1);
        }
    }
}

/**
 * 
 * @param {} curDot 可为点或索引
 */
var dotPos = function (curDot) {
    if (!isNaN(curDot)) { //如果是数字即点的索引，则转为点
        curDot = dots[curDot]
    }
    return {
        cx: curDot.attr('cx'),
        cy: curDot.attr('cy')
    };
}

var setTextPos = function (inx) {
    texts[inx].attr({
        x: dots[inx].attr('cx') + 12,
        y: dots[inx].attr('cy') + 6
    });
};