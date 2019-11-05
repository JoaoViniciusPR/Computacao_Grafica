class Graph{
    constructor(mysvg){
        //SVG that will be used for graph
        this.mainSVG = document.getElementById(mysvg);
        this.width = this.mainSVG.width.animVal.value;
        this.height = this.mainSVG.height.animVal.value;
        //Basics
        this.id = "graph"+Graph.getCurrentId();
        Graph.setCurrentId();
        Graph.setListOfGraphs(this.id,mysvg,this);
        this.SVG = create("g",{id:this.id});
        this.mainSVG.appendChild(this.SVG);
        this.listOfNodes = {};
        this.idChoosenNode = "";
        this.listOfEdges = {};
        this.workMouse();
        //Transformations
        this.listOfTransfs = [[0,0],[0,0,0],[1]];
        this.translating = false;
        this.dotTranslate = {x:0,y:0};
        this.oldTranslate = {x:0,y:0};
        this.rotating = false;
        this.dotRotate = {x:0,y:0};
    }
    //Id that will be used for new node
    static currentId = 1;
    static setCurrentId(){
        Graph.currentId += 1;
    }
    static getCurrentId(){
        return Graph.currentId;
    }
    //About list of graphs
    static listOfGraphs = {};
    static setListOfGraphs(myid,myidms,mygraph){
        Graph.listOfGraphs[myid] = mygraph;
        Graph.listOfGraphs[myidms] = mygraph;
    }
    static getListOfGraphs(){
        return Graph.listOfGraphs;
    }
    static getGraphById(myid){
        return Graph.listOfGraphs[myid];
    }
    static getGraphByIdMS(myid){
        return Graph.listOfGraphs[myid];
    }
    //About main SVG
    setMainSVG(myid){
        this.mainSVG = document.getElementById(myid);
        this.width = this.mainSVG.width.animVal.value;
        this.height = this.mainSVG.height.animVal.value;
    }
    getMainSVG(){
        return this.mainSVG;
    }
    //About list of nodes
    setListOfNodes(myid,mynode){
        this.listOfNodes[myid] = mynode;
    }
    getListOfNodes(){
        return this.listOfNodes;
    }
    getNodeById(myid){
        return this.listOfNodes[myid];
    }
    //Draw all of nodes for they overlap the edges
    drawAllNodes(){
        for (var i in this.getListOfNodes()){
            this.getListOfNodes()[i].overlap();
        }
    }
    //Limit the coordinates of nodes
    /*limitX(x){
        if(x<Node.defaultR+1){return Node.defaultR+1;}
        else if(x>width-(Node.defaultR+1)){return (width-(Node.defaultR+1));}
        else {return x}
    }
    limitY(y){
        if(y<Node.defaultR+1){return Node.defaultR+1;}
        else if(y>height-(Node.defaultR+1)){return (height-(Node.defaultR+1));}
        else {return y}
    }*/
    //About list of edges
    setListOfEdges(myid,myedge){
        this.listOfEdges[myid] = myedge;
    }
    getListOfEdges(){
        return this.listOfEdges;
    }
    getEdgeById(myid){
        return this.listOfEdges[myid];
    }
    //Transformation functions
    updateTransf(){
        var strTranslate = "translate("+this.listOfTransfs[0].join(" ")+") ";
        var strRotate = "rotate("+this.listOfTransfs[1].join(" ")+") ";
        var strScale = "scale("+this.listOfTransfs[2][0]+")";
        this.SVG.setAttribute("transform",strTranslate+strRotate+strScale);
    }
    getInverseTransf(x,y){
        return {x:x-this.listOfTransfs[0][0], y:y-this.listOfTransfs[0][1]};
    }
    //Translate
    translate(evt){
        var translX = evt.offsetX-this.dotTranslate.x+this.oldTranslate.x;
        var translY = evt.offsetY-this.dotTranslate.y+this.oldTranslate.y;
        this.listOfTransfs[0][0] = translX;
        this.listOfTransfs[0][1] = translY;
        this.updateTransf();
    }
    //Rotate
    rotate(evt){

    }
    //Mouse functions
    workMouse(){
        this.getMainSVG().onmousedown = function(evt){
            Graph.getGraphByIdMS(this.getAttribute("id")).mouseDown(evt);
        }
        this.getMainSVG().onmouseup = function(){
            Graph.getGraphByIdMS(this.getAttribute("id")).mouseUp();
        }
        this.getMainSVG().onmousemove = function(evt){
            Graph.getGraphByIdMS(this.getAttribute("id")).mouseMove(evt);
        }
    }
    mouseDown(evt){
        this.getMainSVG().setAttribute("cursor","move");
        this.translating = true;
        this.oldTranslate.x = this.listOfTransfs[0][0];
        this.oldTranslate.y = this.listOfTransfs[0][1];
        this.dotTranslate.x = evt.offsetX;
        this.dotTranslate.y = evt.offsetY;
    }
    mouseUp(){
        this.getMainSVG().setAttribute("cursor","default");
        this.translating = false;
    }
    mouseMove(evt){
        if (this.idChoosenNode!==""){
            this.getNodeById(this.idChoosenNode).mouseMove(evt);
        }
        else if(this.translating){
            this.translate(evt);
        }
    }
    //The first graph type: random
    random(n,p){
        var auxGraph = this;
        var myInterval = setInterval(function() {
            //Create random node
            var mycx = randInt(2*Node.defaultR,auxGraph.width-2*Node.defaultR);
            var mycy = randInt(2*Node.defaultR,auxGraph.height-2*Node.defaultR);
            var node = new Node(auxGraph.id,mycx,mycy);
            node.draw();
            //Create random edges
            for (var i=0;i<Object.keys(auxGraph.getListOfNodes()).length-1;i++){
                if (Math.random()<=p){
                    var edge = new Edge(auxGraph.id,node.id,(Object.keys(auxGraph.getListOfNodes()))[i]);
                    edge.draw();
                }
            }
            if (Object.keys(auxGraph.getListOfNodes()).length===n){
                clearInterval(myInterval);
            }
        },2000);
    }
}