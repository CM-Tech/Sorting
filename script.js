var w = window.innerWidth;
var h = window.innerHeight;
var canvas = document.getElementById("c");
canvas.width = w;
canvas.height = h;
var ctx = canvas.getContext("2d");
//var quickPos=0;
var bars = 128;
var mergeReturns = [];
var qA = 0;
var qB = 0;
var qAs = [];
var qBs = [];
var snaps = [];
var toAdd = [];
var recordPos = 0;
var bubblePos = 1;
var toSort = [];
var dis = [];
for (var i = 0; i < bars; i++) {
    toAdd[i] = i;
}
/*for(var i=0;i<bars;i++){
    toSort[i]=toAdd[bars-1-i];
}*/
for (var i = 0; i < bars; i++) {
    var choice = Math.floor(Math.random() * (toAdd.length - 0.1));
    toSort[i] = toAdd[choice];
    toAdd.splice(choice, 1);
}
/*for (var i = 0; i < bars; i++) {
    toSort[i] = Math.floor(Math.random() * (toAdd.length - 0.1));
}*/


s();
window.setInterval(tick, 10);
//window.setInterval(bubble,1);
//window.setInterval(quickSort,1);


function s() {
    toSort = mergeSort(toSort, 0);
}

function tick() {
    w = window.innerWidth;
    h = window.innerHeight;
    if (recordPos < qBs.length) {
        qA = qAs[recordPos];
        qB = qBs[recordPos];
        toSort = snaps[recordPos];
        recordPos++;
    }
    canvas.width = w;
    canvas.height = h;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, w, h);
    var lastX = 0;
    for (var i = 0; i < bars; i++) {
        ctx.fillStyle = "white";
        if (i == qA) {
            ctx.fillStyle = "#FF1744";
        };
        if (i == qB) {
            ctx.fillStyle = "#00E676";
        };
        var drawX = Math.floor(w / bars * (i + 1));
        var barH = Math.round(h * (((toSort[i] + 1) / bars)));
        ctx.beginPath();
        ctx.rect(lastX + 1, h - barH, Math.max(drawX - lastX - 1, 1), barH);
        ctx.fill();
        lastX = drawX;
    }
}



function merge(left, right, s, s2) {
    var result = [],
        il = 0,
        ir = 0;

    while (il < left.length && ir < right.length) {
        qA = il + s;
        qB = ir + s2;


        if (left[il] < right[ir]) {


            result = result.concat([left[il++]]);
            toSort[s + result.length - 1] = left[il - 1];
            snaps = snaps.concat([toSort.concat([0])]);
        } else {
            result = result.concat([right[ir++]]);
            toSort[s + result.length - 1] = right[ir - 1];
            snaps = snaps.concat([toSort.concat([0])]);
        }
        qAs = qAs.concat([qA]);
        qBs = qBs.concat([qB]);
    }

    var res = result.concat(left.slice(il)).concat(right.slice(ir));
    for (var m = 0; m < res.length; m++) {
        toSort[s + m] = res[m];
    }
    snaps = snaps.concat([toSort.concat([])]);
    qAs = qAs.concat([qA]);
    qBs = qBs.concat([qB]);
    return result.concat(left.slice(il)).concat(right.slice(ir));
}

function mergeSort(items, s) {

    if (items.length < 2) {
        return items;
    }

    var middle = Math.floor(items.length / 2);
    var left = items.slice(0, middle);
    var right = items.slice(middle);
    var params = merge(mergeSort(left, s), mergeSort(right, s + middle), s, s + middle);

    // Add the arguments to replace everything between 0 and last item in the array
    //params.unshift(0, items.length);
    //items.splice.apply(items, params);
    return params;
}
