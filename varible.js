var chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

var dots = [], lines = [];
var texts = []
var dotInx = 0;
var isDotUsed = false;

var selectedLine = [];

var lineObj = { //the obj for selected points, can be optimized
    dots: []
};

var paper = null;