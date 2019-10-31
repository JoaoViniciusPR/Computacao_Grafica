function print(p){
    console.log(p);
}

var xmlns = "http://www.w3.org/2000/svg";
var mainSVG = document.getElementById("svg");
var width = mainSVG.width.animVal.value;
var height = mainSVG.height.animVal.value;

function create(typeSVG,info){
    var newE = document.createElementNS(xmlns,typeSVG);
    for(var i in info){
        newE.setAttribute(i,info[i]);
    }
    return newE;
}

var st = create("rect",{id:"st", x:"0", y:"0", width:width, height:height, fill:"transparent", stroke:"black", "stroke-width":3});
mainSVG.appendChild(st);