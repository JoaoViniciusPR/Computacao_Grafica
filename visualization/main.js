var mainSVG = document.getElementById("svg");
var width = mainSVG.width.animVal.value;
var height = mainSVG.height.animVal.value;

var st = create("rect",{id:"st", x:"0", y:"0", width:width, height:height, fill:"transparent", stroke:"black", "stroke-width":3});
mainSVG.appendChild(st);
var projetor =1;
if (projetor===1){
    Edge.defaultColor = "rgb(0, 0, 255)";
}
var translate = {"Selecione o tipo de grafo":"","Aleatório":"random","Preferencial":"preferred",
    "Selecione a organização":"","Por grau":"degree"};

var graph = new Graph("svg");

function updateInfo(){
    Graph.animation = document.getElementById("animation").checked;
    var delay = document.getElementById("delay").checked;
    if (delay){
        Graph.delay = 2000;
    }
    else{
        Graph.delay = 0;
    }
}
function createGraph(reset){
    if (reset || graph.hasElements){
        var automatic = document.getElementById("automatic").checked;
        if (automatic){
            Graph.mode = "automatic";
            updateInfo();
            var graphType = translate[document.getElementById("graphType").value];
            var number = document.getElementById("number").value;
            var prob = document.getElementById("prob").value;
            if (number!=="" && prob!=="" && graphType!==""){
                graph.create(graphType,number,prob,reset);
            }
            else{
                //graph.create("preferred",5,0.7,reset);
            }
        }
        else{
            Graph.mode = "manual";
        }
    }
}
function clean(){
    if (graph.makingGraph===true){
        clearInterval(graph.myInterval);
    }
    graph.reset();
}
function resetTransf(){
    graph.infoTransf = {t:{x:0,y:0},r:[{ang:0,x:graph.dotRotate.x,y:graph.dotRotate.y}]};
    graph.updateTransf();
}
function newRank(){
    if (graph.hasElements){
        updateInfo();
        var rankType = translate[document.getElementById("rankType").value];
        graph.newRank(rankType);
    }
}

$("body").keydown(function (evt){
    updateInfo();
    //Tecla E
    if (evt.keyCode===69){
        graph.ableToCreateEdge = true;
        var manual = document.getElementById("manual").checked;
        if (manual){
            Graph.mode = "manual";
        }
    }
    //Tecla N
    if (evt.keyCode===78){
        graph.ableToCreateNode = true;
        var manual = document.getElementById("manual").checked;
        if (manual){
            Graph.mode = "manual";
        }
    }
    //Tecla R
    else if (evt.keyCode===82){
        graph.rotate();
    }
})
$("body").keyup(function (evt){
    updateInfo();
    //Tecla E
    if (evt.keyCode===69){
        graph.ableToCreateEdge = false;
    }
    //Tecla N
    if (evt.keyCode===78){
        graph.ableToCreateNode = false;
    }
})