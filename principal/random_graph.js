function newRandomNode(){
    var mycx = 10+Math.floor(Math.random()*(width-19));
    var mycy = 10+Math.floor(Math.random()*(height-19));
    var node = new Node(mycx,mycy);
    node.draw(mainSVG);
    Node.setListOfNodes(node);
}

function randomGraph(mainSVG,p){
    var n = 20;
    newRandomNode(mainSVG,0);
    var setRandom = setInterval(function() {
        newRandomNode(mainSVG);
        for(i=0;i<Node.getListOfNodes().length-2;i++){
            if (Math.random()<=p){
                Node.getListOfNodes()[Node.getListOfNodes().length-1].edges = Node.getListOfNodes()[i];
            }
        }
        Node.getListOfNodes()[Node.getListOfNodes().length-1].doEdges(mainSVG);
    },2000);

}