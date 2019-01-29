paper = new Raphael(document.getElementById('container'), 500, 500);


var test1 = function () {
    createPoint(231, 381);
    createPoint(99, 315);
    createPoint(247, 214);
    createPoint(148, 252);

    createLine(0, 1);
    createLine(2, 3);
    createLine(0, 2);
    createLineDot(['0_2']);



    createCrossDot(['0_1', '2_3']);
    createDashLine(4, 5);
};
var test2 = function () {
    createPoint(231, 381);

    createPoint(247, 214);
    createPoint(148, 252);

    createLine(1, 2);

    createLineDot(['1_2']);
    createDashLine(0, 3);
};
var test3 = function () {
    createPoint(231, 381);

    createPoint(247, 214);
    createPoint(148, 252);


    createLine(1, 2);
    createLineDot(['1_2']);

};
var test4 = function () {
    createPoint(43, 319);
    createPoint(63, 257);
    createPoint(136, 230);
    createPoint(177, 249);


    createPoint(188, 280);
    createPoint(153, 320);

    createLine(0, 1);
    createLine(1, 2);
    createLine(2, 3);
    createLine(3, 4);
    createLine(4, 5);
    createLine(5, 0);

    createCrossDot(['0_1', '3_4']);
    createCrossDot(['1_2', '4_5']);
    createCrossDot(['2_3', '0_5']);

};

test4();