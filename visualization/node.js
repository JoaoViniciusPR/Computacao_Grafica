class Node{
    constructor(mycx,mycy,myname=""){
        //Basics
        this.id = "node"+Node.getCurrentId();
        Node.setCurrentId();
        Graph.setListOfNodes(this.id,this);
        var infoInit = {id:this.id,cx:mycx,cy:mycy,r:5,fill:Node.defaultColor,stroke:"black","stroke-width":"1",cursor:"pointer"};
        this.SVG = create("circle",infoInit);
        this.drawed = false;
        this._edges = [];
        this.following = false;
        this.workMouse();
    }
    //Draw the node
    draw(){
        Graph.getCurrentSVG().appendChild(this.SVG);
    }
    //Remove the node
    remove(){
        Graph.getCurrentSVG().removeChild(this.SVG);
    }
    //Overlap the node
    overlap(){
        this.remove();
        this.draw();
    }
    //Draw all of nodes for they overlap the edges
    static drawAll(){
        for (var i in Graph.listOfNodes){
            Graph.listOfNodes[i].overlap();
        }
    }
    //Id that will be used for new node
    static currentId = 0;
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
    //Position functions
    follow(dot){
        this.SVG.setAttribute("cx",Graph.limitX(dot.offsetX));
        this.SVG.setAttribute("cy",Graph.limitY(dot.offsetY));
        for (var i=0;i<this.edges.length;i++){
            Graph.getEdgeById(this.edges[i]).update();
        }
    }
    //Mouse functions
    workMouse(){
        this.SVG.onmouseenter = function(){
            Graph.getNodeById(this.getAttribute("id")).mouseEnter();
        }
        this.SVG.onmouseleave = function(){
            Graph.getNodeById(this.getAttribute("id")).mouseLeave();
        }
        this.SVG.onmousedown = function(){
            Graph.getNodeById(this.getAttribute("id")).mouseDown();
        }
        this.SVG.onmouseup = function(){
            Graph.getNodeById(this.getAttribute("id")).mouseUp();
        }
        this.SVG.onmousemove = function(evt){
            Graph.getNodeById(this.getAttribute("id")).mouseMove(evt);
        }
    }
    mouseEnter(){
        this.changeColor("rgb(230,0,0)");
        for (var i=0;i<this.edges.length;i++){
            Graph.getEdgeById(this.edges[i]).overlap();
            Graph.getEdgeById(this.edges[i]).changeColor("rgb(230,0,0)");
        }
        this.overlap();
    }
    mouseLeave(){
        this.changeColor();
        for (var i=0;i<this.edges.length;i++){
            Graph.getEdgeById(this.edges[i]).changeColor();
        }
    }
    mouseDown(){
        this.following = true;
        Graph.idChoosenNode = this.id;
        this.SVG.setAttribute("cursor","grabbing");
    }
    mouseUp(){
        this.following = false;
        Graph.idChoosenNode = "";
        this.SVG.setAttribute("cursor","pointer");
    }
    mouseMove(evt){
        if(this.following){
            this.follow(evt);
        }
    }

}