$("#c").attr("width", w);
$("#c").attr("height", h);
//var quickPos=0;
var mergeReturns = [];
var qA = 0;
var qB = 0;
var qAs = [];
var qBs = [];
var snaps=[];
var toAdd = [];
var recordPos = 0;
var bubblePos = 1;
var toSort = [];
var dis=[];
for (var i = 0; i < 200; i++) {
    toAdd[i] = i;
}
/*for(var i=0;i<200;i++){
    toSort[i]=toAdd[199-i];
}*/
/*for (var i = 0; i < 200; i++) {
    var choice = Math.floor(Math.random() * (toAdd.length - 0.1));
    toSort[i] = toAdd[choice];
    delete toAdd[choice];
}*/
for (var i = 0; i < 200; i++) {
    toSort[i] = Math.floor(Math.random() * (toAdd.length - 0.1));
}

var c = document.getElementById("c");
var ctx = c.getContext("2d");
s();
window.setInterval(tick, 10);
//window.setInterval(bubble,1);
//window.setInterval(quickSort,1);


function s() {
    toSort = mergeSort(toSort, 0);
    console.log(toSort);
}

function tick() {
    w = $("body").width() - 2;
    h = $("body").height() - 2;
    if (recordPos < qBs.length) {
        qA = qAs[recordPos];
        qB = qBs[recordPos];
        toSort=snaps[recordPos];
        recordPos++;
    }
    $("#c").attr("width", w);
    $("#c").attr("height", h);
    $(".toggle").attr("height", 30);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = w / 200;
    for (var i = 0; i < 200; i++) {

        ctx.strokeStyle = "white";
        if (i == qA) {
            ctx.strokeStyle = "red"
        };
        if (i == qB) {
            ctx.strokeStyle = "green"
        };
        ctx.beginPath();
        ctx.moveTo((i + 0.5) / 200 * w, h);
        ctx.lineTo((i + 0.5) / 200 * w, h * (1 - ((toSort[i] + 0.5) / 200)));
        ctx.stroke();
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
            toSort[s+result.length-1]=left[il-1];
            snaps = snaps.concat([toSort.concat([0])]);
        } else {
            result = result.concat([right[ir++]]);
            toSort[s+result.length-1]=right[ir-1];
            snaps = snaps.concat([toSort.concat([0])]);
        }
        qAs = qAs.concat([qA]);
        qBs = qBs.concat([qB]);
    }

        var res=result.concat(left.slice(il)).concat(right.slice(ir));
        for(var m=0;m<res.length;m++){
            toSort[s+m]=res[m];
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