class Node{
    constructor(mycx,mycy,myname=""){
        var infoInit = {id:"node"+Node.getCurrentId(),cx:mycx,cy:mycy,r:5,fill:"rgb(150,150,150)",stroke:"black","stroke-width":"1",cursor:"pointer"};
        Node.setCurrentId();
        this.svg = create("circle",infoInit);
	    //var text = myname;
        //this.tsvg = create("text",{x:mycx,y:mycy-8,"font-size":"14",fill:"black",'text-anchor':'middle'});
        this._edges = [];
        this.esvg = [];
    }
    draw(mainSVG){
        mainSVG.appendChild(this.svg);
    }
    get edges(){
        return this._edges;
    }
    set edges(n){
        this._edges.push(n);
    }
    doEdges(){

    }

    static currentId = 0;
    static setCurrentId(){
        this.currentId += 1;
    }
    static getCurrentId(){
        return this.currentId;
    }

    static listOfNodes = [];
    static setListOfNodes(n){
        this.listOfNodes.push(n);
    }
    static getListOfNodes(){
        return this.listOfNodes;
    }
}