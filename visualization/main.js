var mainSVG = document.getElementById("svg");
var width = mainSVG.width.animVal.value;
var height = mainSVG.height.animVal.value;

var st = create("rect",{id:"st", x:"0", y:"0", width:width, height:height, fill:"transparent", stroke:"black", "stroke-width":3});
mainSVG.appendChild(st);

var graph = new Graph("svg");

function newRandomGraph(){
	var number = document.getElementById("number");
	var prob = document.getElementById("prob");
	var anim = document.getElementById("anim");
	
    graph.random(number.value,prob.value,anim.checked);
}

$("body").keydown(function (evt){
    //Tecla R
    if (evt.keyCode==82){
        graph.rotate();
    }
})