var start = function () {
    this.cxx = this.attr('cx'); //记录起始坐标
    this.cyy = this.attr('cy');
    this.isMoving = true;
};
//拖动事件
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
        if (_x == 0) {// 垂直平移
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
//拖动结束后的事件
var up = function () {
    isDotUsed = false;
    this.isMoving = undefined;
    console.info(this.attr('cx'), this.attr('cy'))
};

/**
 * 重画线
 * 点的位置已确定
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
        var style = temLines[i].style;
        var curDots = temLines[i].dots;
        var id = temLines[i].id;

        // 先更新动态节点
        moveActiveDot(id, curDotInx, attr);

        clearLine(id);
        var pn = paper.getById(id);
        if (pn)
            pn.remove();

        if (style == 'solid') {
            createSolidLine2(curDots, curDotInx, attr);
        } else {
            createDashLine2(curDots, curDotInx, attr);
        }
    }

};

// 动态点，目前有线上点和两线交点两种
// 动态点具有线的id的属性，是个数组
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
            setLineDotPosition(temp, lineId, curDotInx);

        }
        else if (temp.isCrossDot) {
            setCrossDotPosition(temp, lineId, curDotInx, attr);
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