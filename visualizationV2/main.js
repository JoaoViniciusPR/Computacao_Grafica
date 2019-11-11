var mainSVG = document.getElementById("svg");
var width = mainSVG.width.animVal.value;
var height = mainSVG.height.animVal.value;

var st = create("rect",{id:"st", x:"0", y:"0", width:width, height:height, fill:"transparent", stroke:"black", "stroke-width":3});
mainSVG.appendChild(st);

var projetor = 0;
var graph = new Graph("svg");
function newRandomGraph(){
	var number = document.getElementById("number");
	var prob = document.getElementById("prob");
    var anim = document.getElementById("anim");
    Graph.animation = anim.value;
    if (projetor===1){
        Edge.defaultColor = "rgb(0, 0, 255)";
    }
    if (number.value!=="" && prob.value!==""){
        graph.randomGraph(number.value,prob.value);
    }
    else{
        graph.randomGraph(5,0.8);
    }
}
function newRankByDegree(){
    if (graph.hasElements){
        graph.rankByDegree();
    }
}

$("body").keydown(function (evt){
    //Tecla R
    if (evt.keyCode==82){
        graph.rotate();
    }
})