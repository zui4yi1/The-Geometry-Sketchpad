var start = function () {
    this.cxx = this.attr('cx');
    this.cyy = this.attr('cy');
    this.isMoving = true;
};

var move = function (dx, dy) {
    var curDotInx = this.curDotInx;
    var attr = {};
    if (this.isLineDot) {
        var lineId = this.lineIds[0];

        var inxs = lineId.split('_');
        var left, right;
        var rate;
        if (dots[inxs[0]].attr('cx') <= dots[inxs[1]].attr('cx')) {
            left = inxs[0], right = inxs[1];
        } else {
            left = inxs[1], right = inxs[0];
        }

        var _x = dots[right].attr('cx') - dots[left].attr('cx');
        var _y = dots[right].attr('cy') - dots[left].attr('cy');
        if (_x == 0) { // vertical
            attr = { cx: this.cxx, cy: this.cyy + dy };
            rate = (attr.cy - dots[left].attr('cy')) / (dots[right].attr('cy') - dots[left].attr('cy'));
        } else {
            attr = { cx: this.cxx + dx, cy: this.cyy + dx * _y / _x };
            rate = (attr.cx - dots[left].attr('cx')) / (dots[right].attr('cx') - dots[left].attr('cx'));
        }
        this.rate = rate;
        this.rateBaseDot = left;
        this.relativeDot = right;

        this.attr(attr);
        setTextPos(curDotInx);

        addExpandingDashedLine(lineId, this);
        reDrawLine(curDotInx, attr);
    } else {
        attr = { cx: this.cxx + dx, cy: this.cyy + dy };

        this.attr(attr);
        setTextPos(curDotInx);

        reDrawLine(curDotInx, attr);
    }

};
var up = function () {
    isDotUsed = false;
    this.isMoving = undefined;
    console.info('point '+ chars[this.curDotInx]+' new pos: ' + this.attr('cx') + ',' + this.attr('cy'));
};

/**
 * @param {*} curDotInx 
 * @param {*} attr 
 */
var reDrawLine = function (curDotInx, attr) {
    var temLines = [];
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].id.indexOf(curDotInx) > -1) {
            temLines.push(lines[i]);
        }
    }
    for (var i = 0; i < temLines.length; i++) {
        var id = temLines[i].id;

        // update the active dot
        moveActiveDot(id, curDotInx, attr);

        rePathLine(id);
    }

};

/**
 * update the active dot
 * @param {*} lineId 
 * @param {*} curDotInx 
 * @param {*} attr 
 */
var moveActiveDot = function (lineId, curDotInx, attr) {
    var dts = [];
    for (var i = 0; i < dots.length; i++) {
        var temp = dots[i];
        if (curDotInx == temp.curDotInx) continue;

        if (temp.isActive && temp.parentLine.indexOf(lineId) > -1) {
            dts.push(temp);
        }
    }
    for (var i = 0; i < dts.length; i++) {
        var temp = dts[i];

        if (temp.isLineDot) {
            setLineDotPosition(temp, lineId);

        }
        else if (temp.isCrossDot) {
            setCrossDotPosition(temp);
        }
        moveActiveLine(temp);
    }

};

var moveActiveLine = function (curDot) {

    var arr = [];
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].isActive && lines[i].id.indexOf(curDot.curDotInx) > -1) {
            arr.push(lines[i].id);
        }
    }
    for (var i = 0; i < arr.length; i++) {
        rePathLine(arr[i]);
    }

};

var toChar = function (id) {
    id = id + '';
    var cs = id.split('_').sort();
    return cs.map(function (i) {
        return chars[i];
    }).join('');
};