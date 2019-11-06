class Node{
    constructor(myidgraph,mycx,mycy,myname=""){
        //Basics
        this.id = "node"+Node.getCurrentId();
        Node.setCurrentId();
        this.idGraph = myidgraph;
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
    //Animate the edges of this node
    animateEdges(){
        var ghosts = [];
        var vectors = [];
        var totalSteps = 400;
        for (var i=0;i<this.edges.length;i++){
            var auxEdge = Graph.getGraphById(this.idGraph).getEdgeById(this.edges[i]);
            /*var ghost = create("line", {x1:auxEdge.SVG.getAttribute("x1"), y1:auxEdge.SVG.getAttribute("y1"),
                x2:auxEdge.SVG.getAttribute("x2"), y2:auxEdge.SVG.getAttribute("y2"),
                stroke:"rgb(179, 218, 255)","stroke-width":"1"});
            Graph.getGraphById(this.idGraph).SVG.appendChild(ghost);*/
            var ghost = new Edge(this.idGraph,auxEdge.idSource,auxEdge.idTarget);
            ghost.draw();
            ghosts.push(ghost);
            vectors.push({x:auxEdge.SVG.getAttribute("x2")-auxEdge.SVG.getAttribute("x1"),
                y:auxEdge.SVG.getAttribute("y2")-auxEdge.SVG.getAttribute("y1")});
        }
        var auxNode = this;
        var step = 1;
        var animInterval = setInterval(function() {
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
                    ghosts[i].remove();
                }
                clearInterval(animInterval);
            }
        },1);
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
        var coord = Graph.getGraphById(this.idGraph).getInverseTransf(dot.offsetX,dot.offsetY);
        this.SVG.setAttribute("cx",coord.x);
        this.SVG.setAttribute("cy",coord.y);
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
    //Random functions
    static randomNode(myidgraph,p=false,anim=false){
        var mycx = randInt(2*Node.defaultR,Graph.getGraphById(myidgraph).width-2*Node.defaultR);
        var mycy = randInt(2*Node.defaultR,Graph.getGraphById(myidgraph).height-2*Node.defaultR);
        var node = new Node(myidgraph,mycx,mycy);
        node.draw();
        if (p){
            node.randomEdges(p,anim);
        }
    }
    randomEdges(p,anim=false){
        for (var i=0;i<Object.keys(Graph.getGraphById(this.idGraph).getListOfNodes()).length-1;i++){
            if (Math.random()<=p){
                var edge = new Edge(this.idGraph,this.id,(Object.keys(Graph.getGraphById(this.idGraph).getListOfNodes()))[i]);
                if(!anim){
                    edge.draw();
                }
            }
        }
        if (anim){
            this.animateEdges();
        }
    }
}