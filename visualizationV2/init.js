function print(p){
    console.log(p);
}

function printevt(evt){
    print("Client "+evt.clientX+" "+evt.clientY);
    print("Offset "+evt.offsetX+" "+evt.offsetY);
    print("layer "+evt.layerX+" "+evt.layerY);
    print("movement "+evt.movementX+" "+evt.movementY);
    print("page "+evt.pageX+" "+evt.pageY);
    print("Screen "+evt.screenX+" "+evt.screenY);
    print("X "+evt.x+" "+"Y "+evt.y);
}

function randInt(a,b){
    return a+Math.floor(Math.random()*(b+1-a));
}

function cos(angle){
    return Math.cos(angle*(Math.PI/180));
}
function sin(angle){
    return Math.sin(angle*(Math.PI/180));
}

function create(typeSVG,info){
    var xmlns = "http://www.w3.org/2000/svg";
    var newE = document.createElementNS(xmlns,typeSVG);
    for(var i in info){
        newE.setAttribute(i,info[i]);
    }
    return newE;
}

/*animateEdges(){
    //var ghosts = [];
    var vectors = [];
    var totalSteps = 400;
    for (var i=0;i<this.edges.length;i++){
        var auxEdge = Graph.getGraphById(this.idGraph).getEdgeById(this.edges[i]);
        /*var ghost = create("line", {x1:auxEdge.SVG.getAttribute("x1"), y1:auxEdge.SVG.getAttribute("y1"),
            x2:auxEdge.SVG.getAttribute("x2"), y2:auxEdge.SVG.getAttribute("y2"),
            stroke:"rgb(179, 218, 255)","stroke-width":"1"});
        Graph.getGraphById(this.idGraph).SVG.appendChild(ghost);*/
        /*var ghost = new Edge(this.idGraph,auxEdge.idSource,auxEdge.idTarget);
        ghost.draw();
        ghosts.push(ghost);*/
        /*vectors.push({x:auxEdge.SVG.getAttribute("x2")-auxEdge.SVG.getAttribute("x1"),
            y:auxEdge.SVG.getAttribute("y2")-auxEdge.SVG.getAttribute("y1")});
    }
    var auxNode = this;
    var step = 1;
    var edgeAnimInterval = setInterval(function() {
        for (var i=0;i<vectors.length;i++){
            var auxEdge = Graph.getGraphById(auxNode.idGraph).getEdgeById(auxNode.edges[i]);
            var newx2 = parseFloat(auxEdge.SVG.getAttribute("x1"))+vectors[i].x*(step/totalSteps);
            var newy2 = parseFloat(auxEdge.SVG.getAttribute("y1"))+vectors[i].y*(step/totalSteps);
            auxEdge.SVG.setAttribute("x2",newx2);
            auxEdge.SVG.setAttribute("y2",newy2);
            if (step===1){auxEdge.draw();}
            else {auxEdge.overlap();}
        }
        step+=1;
        if (step===totalSteps){
            for (var i=0;i<vectors.length;i++){
                Graph.getGraphById(auxNode.idGraph).getEdgeById(auxNode.edges[i]).update();
                //ghosts[i].remove();
            }
            clearInterval(edgeAnimInterval);
        }
    },1);
}*/