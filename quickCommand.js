function charInx(str) {
    if (str.length == 1) {
        for (var i = 0; i < texts.length; i++) {
            if (texts[i].attr('text') == str.toUpperCase()) {
                return texts[i].curDotInx;
            }
        }
    } else if (str.length == 2) {
        var inx1, inx2;
        var strs = str.split('');
        for (var i = 0; i < texts.length; i++) {
            if (texts[i].attr('text') == strs[0].toUpperCase()) {
                inx1 = texts[i].curDotInx;
            }
            if (texts[i].attr('text') == strs[1].toUpperCase()) {
                inx2 = texts[i].curDotInx;
            }
        }
        return [inx1, inx2].sort();
    }
}

function removeObj(str) {
    var id = str.split('').map(function (s) {
        return charInx(s);
    }).sort().join('_');
    var pn = paper.getById(id);
    if (pn) pn.remove();
}

/**
 * don't use this function
 * @param {*} char 
 */
function removePoint(char) {
    var inx = charInx(char);
    var pn = paper.getById('dot_' + inx);
    if (pn) pn.remove();
}

function hideObj(str) {
    var id = str.split('').map(function (s) {
        return charInx(s);
    }).sort().join('_');
    var pn = paper.getById(id);
    pn.attr({
        opacity: 0
    })
}
function hidePoints() {
    for (var i = 0; i < arguments.length; i++) {
        var inx = charInx(arguments[i]);
        dots[inx].attr({
            opacity: 0
        });
        texts[inx].attr({
            opacity: 0
        })
    }
};

function showPoints(){
    for (var i = 0; i < arguments.length; i++) {
        var inx = charInx(arguments[i]);
        dots[inx].attr({
            opacity: 1
        });
        texts[inx].attr({
            opacity: 1
        })
    }
};

var createLineByChar = function (char1, char2) {
    var inx1, inx2;
    for (var i = 0; i < texts.length; i++) {
        if (texts[i].attr('text') == char1.toUpperCase()) {
            inx1 = i;
        }
        if (texts[i].attr('text') == char2.toUpperCase()) {
            inx2 = i;
        }
    }
    createLine(inx1, inx2);
};
var createDashLineByChar = function (char1, char2) {

    var inx1, inx2;
    for (var i = 0; i < texts.length; i++) {
        if (texts[i].attr('text') == char1.toUpperCase()) {
            inx1 = i;
        }
        if (texts[i].attr('text') == char2.toUpperCase()) {
            inx2 = i;
        }
    }
    createDashLine(inx1, inx2);
};

var selectLineByChar = function (char1, char2) {
    createLine(charInx(char1), charInx(char2));
};

var selectDotByChar = function (char) {
    var pn = dots[charInx(char)];
    if (!pn.dblclicked) {
        if (lineObj.dots.length < 2) {
            pn.dblclicked = true;
            pn.attr({
                'stroke': 'red'
            });
            lineObj.dots.push(pn.curDotInx);
            lineObj.dots.sort();
        }
    } else {
        pn.dblclicked = false;
        pn.attr({
            'stroke': 'blue'
        });
        var inx = lineObj.dots.indexOf(pn.curDotInx);
        if (inx > -1) {
            lineObj.dots.splice(inx, 1);
        }
    }
};

/**
 * 
 * @param {*} char1 'A' or 'AB'
 * @param {*} char2 'B' or undefined
 */
var createPointOnLineByChar = function (char1, char2) {
    if (!char2) {
        var strs = char1.split('');
        char1 = strs[0];
        char2 = strs[1];
    }
    var lineId = [charInx(char1), charInx(char2)].sort().join('_');
    createLineDot([lineId]);
};

var selectTriangleArea = function (char1, char2, char3) {
    var inx1 = charInx(char1),
        inx2 = charInx(char2),
        inx3 = charInx(char3);
    var dot1 = dots[inx1],
        dot2 = dots[inx2],
        dot3 = dots[inx3];
    var b = paper.path('M ' + dot1.attr('cx') + ',' + dot1.attr('cy') +
        ' L ' + dot2.attr('cx') + ',' + dot2.attr('cy') + '' +
        ' L ' + dot3.attr('cx') + ',' + dot3.attr('cy') + ' z');
    b.attr({
        fill: '#1212A0'
    });
    b.id = [inx1, inx2, inx3].sort().join('_');
};

var createCrossDotByChar = function (str1, str2) {
    createCrossDot([charInx(str1).join('_'), charInx(str2).join('_')])
};
