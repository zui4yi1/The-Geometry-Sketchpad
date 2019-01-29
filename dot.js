
/**
 * create dot from the selected cross lines
 */
var createCrossDot = function (lines) {

    //TODO valididation for repeat
    var pos = getCrossPositon(lines);
    if (!pos) return;
    if (pos) {
        var dot = createPoint(pos.x, pos.y, pos.lineIds, true);
        dot.isCrossDot = true;
        dot.isActive = true;
        dot.parentLine = lines;
        // add expanding lines
        addExpandingDashedLine(pos.lineIds[0], dot);
        addExpandingDashedLine(pos.lineIds[1], dot);
    }
}

/**
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

    var x, y;
    if (dot2.attr('cx') == dot1.attr('cx') && dot4.attr('cx') == dot3.attr('cx')) { // boths line are vertical        
        return null;
    } else if (dot2.attr('cx') == dot1.attr('cx')) {// dot1 & dot2 is vertical
        var k2 = (dot4.attr('cy') - dot3.attr('cy')) / (dot4.attr('cx') - dot3.attr('cx'));
        x = dot2.attr('cx');
        y = k2 * (x - dot3.attr('cx')) + dot3.attr('cy');
    } else if (dot4.attr('cx') == dot3.attr('cx')) {// dot3 & dot4 is vertical
        var k1 = (dot2.attr('cy') - dot1.attr('cy')) / (dot2.attr('cx') - dot1.attr('cx'));
        x = dot4.attr('cx');
        y = k1 * (x - dot1.attr('cx')) + dot1.attr('cy');
    } else { // no vertical lines
        var k1 = (dot2.attr('cy') - dot1.attr('cy')) / (dot2.attr('cx') - dot1.attr('cx'));
        var k2 = (dot4.attr('cy') - dot3.attr('cy')) / (dot4.attr('cx') - dot3.attr('cx'));

        if (k1 == k2) return null; // no cross point for parallel lines

        x = (k1 * dot1.attr('cx') - k2 * dot3.attr('cx') - dot1.attr('cy') + dot3.attr('cy')) / (k1 - k2);
        y = k1 * (x - dot1.attr('cx')) + dot1.attr('cy');
    }
    return {
        x: x,
        y: y,
        lineIds: lineIds
    };
};


var setLineDotPosition = function (curDot, lineId) {

    var base = curDot.rateBaseDot;
    var relt = curDot.relativeDot;

    var attr = {
        cx: dots[base].attr('cx') + (dots[relt].attr('cx') - dots[base].attr('cx')) * curDot.rate,
        cy: dots[base].attr('cy') + (dots[relt].attr('cy') - dots[base].attr('cy')) * curDot.rate
    }
    curDot.attr(attr);
    setTextPos(curDot.curDotInx);

    return [addExpandingDashedLine(lineId, curDot)];
};



var setCrossDotPosition = function (curDot) {

    var pos = getCrossPositon(curDot.parentLine);
    if (!pos) return;
    curDot.attr({
        cx: pos.x,
        cy: pos.y
    });
    setTextPos(curDot.curDotInx);
    return [
        addExpandingDashedLine(pos.lineIds[0], curDot),
        addExpandingDashedLine(pos.lineIds[1], curDot)
    ];

};

/**
 */
var ECreateDot = function () {
    if (isDotUsed)
        return;
    isDotUsed = true;
    createPoint(20, 380); // create the new point at the left-bottom of the canvas
}

/**
 * create a new point on the selected line in the middle
 */
var createLineDot = function (selectedLine) {
    if (selectedLine.length != 1) return;

    var lineDots = selectedLine[0].replace('_', '');
    var x = (dots[lineDots[0]].attr('cx') + dots[lineDots[1]].attr('cx')) / 2;
    var y = (dots[lineDots[0]].attr('cy') + dots[lineDots[1]].attr('cy')) / 2;

    var dot = createPoint(x, y, [selectedLine[0]]);
    dot.isLineDot = true;
    dot.isActive = true;
    dot.parentLine = selectedLine;
    dot.rateBaseDot = lineDots[0];
    dot.relativeDot = lineDots[1];
    dot.rate = 0.5;
    return dot;
}

/**
 * the base funtion to create point
 */
var createPoint = function (x, y, lineIds, nodrag) {
    dots[dotInx] = paper.circle(x, y, 2.5).attr({
        'stroke-width': '5',
        'stroke': nodrag == true ? '#239823' : 'blue' // note that cross-point can not be dragged and rendered green
    });
    if (!nodrag) dots[dotInx].drag(move, start, up).toBack();  // note that cross-point can not be dragged and rendered green
    dots[dotInx].curDotInx = dotInx;
//    dots[dotInx].dblclick(dblclick)
    texts[dotInx] = paper.text(x + 10, y, chars[dotInx]).attr({
        'font-size': '14px',
        'fill': '#0343ef'
    });
    texts[dotInx].curDotInx = dotInx;
    setTextPos(dotInx);
    if (lineIds && lineIds.length > 0) {
        dots[dotInx].lineIds = lineIds;
    }
    dotInx++;
    return dots[dotInx - 1];
};

/**
 * dblclick event for points
 */
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
 * set text positon for point
 * @param {*} inx 
 */
var setTextPos = function (inx) {
    texts[inx].attr({
        x: dots[inx].attr('cx') + 12,
        y: dots[inx].attr('cy') + 6
    });
};