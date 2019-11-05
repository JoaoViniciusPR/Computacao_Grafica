class Node{
    constructor(myidgraph,mycx,mycy,myname=""){
        //Basics
        this.id = "node"+Node.getCurrentId();
        Node.setCurrentId();
        this.idGraph = myidgraph;
        print(this.idGraph);
        Graph.getGraphById(this.idGraph).setListOfNodes(this.id,this);
        var infoInit = {id:this.id,cx:mycx,cy:mycy,r:Node.defaultR,fill:Node.defaultColor,stroke:"black","stroke-width":"1",cursor:"pointer"};
        this.SVG = create("circle",infoInit);
        this.drawed = false;
        this._edges = [];
        this.following = false;
        this.workMouse();
    }
    //Draw the node
    draw(){
        Graph.getGraphById(this.idGraph).SVG.appendChild(this.SVG);
    }
    //Remove the node
    remove(){
        Graph.getGraphById(this.idGraph).SVG.removeChild(this.SVG);
    }
    //Overlap the node
    overlap(){
        this.remove();
        this.draw();
    }
    //Id that will be used for new node
    static currentId = 1;
    static setCurrentId(){
        Node.currentId += 1;
    }
    static getCurrentId(){
        return Node.currentId;
    }
    //About edges of this node
    get edges(){
        return this._edges;
    }
    set edges(n){
        this._edges.push(n);
    }
    //Color functions
    //Default color of node
    static defaultColor = "rgb(150,150,150)";
    //Change color of node
    changeColor(newColor = Node.defaultColor){
        this.SVG.setAttribute("fill",newColor);
    }
    //Size functions
    static defaultR = 5;
    //Position functions
    follow(dot){
        this.SVG.setAttribute("cx",Graph.getGraphById(this.idGraph).limitX(dot.offsetX));
        this.SVG.setAttribute("cy",Graph.getGraphById(this.idGraph).limitY(dot.offsetY));
        //this.SVG.setAttribute("transform",Graph.getGraphById(this.idGraph).getInverseTransf());
        for (var i=0;i<this.edges.length;i++){
            Graph.getGraphById(this.idGraph).getEdgeById(this.edges[i]).update();
        }
    }
    //Mouse functions
    workMouse(){
        var auxId = this.idGraph;
        this.SVG.onmouseenter = function(){
            Graph.getGraphById(auxId).getNodeById(this.getAttribute("id")).mouseEnter();
        }
        this.SVG.onmouseleave = function(){
            Graph.getGraphById(auxId).getNodeById(this.getAttribute("id")).mouseLeave();
        }
        this.SVG.onmousedown = function(){
            Graph.getGraphById(auxId).getNodeById(this.getAttribute("id")).mouseDown();
        }
        this.SVG.onmouseup = function(){
            Graph.getGraphById(auxId).getNodeById(this.getAttribute("id")).mouseUp();
        }
        this.SVG.onmousemove = function(evt){
            Graph.getGraphById(auxId).getNodeById(this.getAttribute("id")).mouseMove(evt);
        }
    }
    mouseEnter(){
        this.changeColor("rgb(230,0,0)");
        for (var i=0;i<this.edges.length;i++){
            Graph.getGraphById(this.idGraph).getEdgeById(this.edges[i]).overlap();
            Graph.getGraphById(this.idGraph).getEdgeById(this.edges[i]).changeColor("rgb(230,0,0)");
        }
        this.overlap();
    }
    mouseLeave(){
        this.changeColor();
        for (var i=0;i<this.edges.length;i++){
            Graph.getGraphById(this.idGraph).getEdgeById(this.edges[i]).changeColor();
        }
    }
    mouseDown(){
        this.following = true;
        Graph.getGraphById(this.idGraph).idChoosenNode = this.id;
        this.SVG.setAttribute("cursor","grabbing");
    }
    mouseUp(){
        this.following = false;
        Graph.getGraphById(this.idGraph).idChoosenNode = "";
        this.SVG.setAttribute("cursor","pointer");
    }
    mouseMove(evt){
        if(this.following){
            this.follow(evt);
        }
    }

}