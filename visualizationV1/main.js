//var text = myname;
//this.tsvg = create("text",{x:mycx,y:mycy-8,"font-size":"14",fill:"black",'text-anchor':'middle'});
var mainSVG = document.getElementById("svg");
var width = mainSVG.width.animVal.value;
var height = mainSVG.height.animVal.value;

var st = create("rect",{id:"st", x:"0", y:"0", width:width, height:height, fill:"transparent", stroke:"black", "stroke-width":3});
mainSVG.appendChild(st);

var graph = new Graph("svg");
function newRandomGraph(){
    graph.random(5,0.5);
}

$("body").keydown(function (evt){
    if (evt.keyCode==82){
        graph.rotate();
    }
})