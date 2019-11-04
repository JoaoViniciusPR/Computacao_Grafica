class Graph{
    constructor(){}
    //SVG that will be used for graph
    static currentSVG = document.getElementById("svg");
    static setCurrentSVG(myid){
        Graph.currentSVG = document.getElementById(myid);
    }
    static getCurrentSVG(){
        return Graph.currentSVG;
    }
    //About list of nodes
    static listOfNodes = {};
    static setListOfNodes(myid,mynode){
        Graph.listOfNodes[myid] = mynode;
    }
    static getListOfNodes(){
        return Graph.listOfNodes;
    }
    static getNodeById(myid){
        return Graph.listOfNodes[myid];
    }
    static idChoosenNode = "";
    //Limit the coordinates of nodes
    static limitX(x){
        if(x<6){return 6;}
        else if(x>width-6){return (width-6);}
        else {return x}
    }
    static limitY(y){
        if(y<6){return 6;}
        else if(y>height-6){return (height-6);}
        else {return y}
    }
    //About list of edges
    static listOfEdges = {};
    static setListOfEdges(myid,myedge){
        Graph.listOfEdges[myid] = myedge;
    }
    static getListOfEdges(){
        return Graph.listOfEdges;
    }
    static getEdgeById(myid){
        return Graph.listOfEdges[myid];
    }
    //Transformation functions
    static listOfTransfs = ["","",""];
    static updateTransf(){
        Graph.getCurrentSVG().setAttribute("transform",Graph.listOfTransfs.join(" "));
    }
    //Translate
    static translating = false;
    static dotTranslate = {x:0,y:0};
    static translate(evt){
        var translX = evt.offsetX-Graph.dotTranslate.x;
        var translY = evt.offsetY-Graph.dotTranslate.y;
        Graph.listOfTransfs[0] = "translate(" + translX + " " + translY + ")";
        Graph.updateTransf();
    }
    //Mouse functions
    static workMouse(){
        Graph.getCurrentSVG().onmousedown = function(evt){
            Graph.getCurrentSVG().setAttribute("cursor","move");
            Graph.translating = true;
            Graph.dotTranslate.x = evt.offsetX;
            Graph.dotTranslate.y = evt.offsetY;
        }
        Graph.getCurrentSVG().onmouseup = function(){
            Graph.getCurrentSVG().setAttribute("cursor","default");
            Graph.translating = false;
        }
        Graph.getCurrentSVG().onmousemove = function(evt){
            if (Graph.idChoosenNode!==""){
                Graph.getNodeById(Graph.idChoosenNode).mouseMove(evt);
            }
            else if(Graph.translating){
                //Graph.translate(evt);
            }
        }
    }
    //The first graph type: random
    static random(n,p){
        //Create the first node in the center
        var node0 = new Node(width/2,height/2);
        node0.draw();
        var number = 1;
        var myInterval = setInterval(function() {
            //Create random node
            var d = 10;
            var mycx = d+Math.floor(Math.random()*(width-(2*d)+1));
            var mycy = d+Math.floor(Math.random()*(height-(2*d)+1));
            var node = new Node(mycx,mycy);
            node.draw();
            //Create random edges
            for (var i=0;i<Object.keys(Graph.getListOfNodes()).length-1;i++){
                if (Math.random()<=p){
                    var edge = new Edge(node.id,(Object.keys(Graph.getListOfNodes()))[i]);
                    edge.draw();
                }
            }
            number += 1;
            if (number===n){
                clearInterval(myInterval);
            }
        },2000);
    }
}