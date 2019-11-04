var xmlns = "http://www.w3.org/2000/svg";
var mainSVG = document.getElementById("svg");
var zoomSize = 250;
var generated = false;
var clipped = false;
var center = {X:600/2,Y:600/2};
var circlenum = 10;
var angle = (2*Math.PI)/(circlenum-1);
var distCenter = 200;
var dfNodes = [["Homem de Ferro",0.162201],
	["Maquina de Combate",0.048603],
	["Pepper Potts",0.04023],
	["Monge de Ferro",0.047362],
	["Christine",0.014921],
	["Yinsen",0.026887],
	["Raza",0.020505],
	["Phil Coulson",0.010942],
	["Abu Bakar",0.025689],
	["Stan Lee",0.004434]];
var dfEdges = [['node0', 'node1'], ['node0', 'node2'], ['node0', 'node3'], ['node0', 'node4'], ['node0', 'node5'], ['node0', 'node6'],
	['node0', 'node7'], ['node0', 'node8'],['node0', 'node9'],['node1', 'node2'],['node1', 'node3'],['node1', 'node4'],['node2', 'node3'],
	['node2', 'node4'], ['node2', 'node7'],['node3', 'node4'],['node3', 'node6'],['node3', 'node7'],['node5', 'node6'],['node5', 'node8'],
	['node6', 'node8']];
				
function create(typeSVG,info){
	var newE = document.createElementNS(xmlns,typeSVG);
	for(var i in info){
		newE.setAttribute(i,info[i]);
	}
	return newE;
}
	
gSVG = create("g",{id:"graph"});
mainSVG.appendChild(gSVG);
helpText = create("text",{x:300,y:50,"font-size":"30",fill:"black",'text-anchor':'middle'});
mainSVG.appendChild(helpText);
helpText.innerHTML = "👆 Clique para dar Zoom";

var Node = function(id,cx,cy,r,name="",PR=0){
	this.id = id;
	this.cx = cx;
	this.cy = cy;
	this.r = r;
	this.rankX = false;
	this.rankY = false;
	this.infoInit = {id:this.id,cx:this.cx,cy:this.cy,r:this.r,fill:"#323232",stroke:"black","stroke-width":"1"};
	this.eSVG = create("circle",this.infoInit);
	this.text = name;
	this.tSVG = create("text",{x:this.cx,y:this.cy-8,"font-size":"14",fill:"black",'text-anchor':'middle'});
	this.pageRank = PR;
	this.targets = {};
}

Node.prototype.draw = function(){
	gSVG.appendChild(this.eSVG);
}

Node.prototype.drawText = function(){
	gSVG.appendChild(this.tSVG);
	this.tSVG.innerHTML = this.text;
}

Node.prototype.update = function(){
	this.eSVG.setAttribute("cx",this.cx);
	this.eSVG.setAttribute("cy",this.cy);
}

Node.prototype.turn = function(boole){
	for (i in this.targets){
		if (this.targets[i]===boole){}
		else{
			this.targets[i] = boole;
			if (!boole){
				var idAux = listOfEdges[i].nodeId2;
			}
			else{
				var idAux = listOfEdges[i].nodeId1;
			}
			listOfEdges[i].invertNodes();
			listOfNodes[idAux].targets[i]=!boole;
		}
	}
}

Node.prototype.getRanks = function(hashs){
	this.rankX = 1;
	this.rankY = 1;
	if (this.cx < hashs.xMin){this.rankX = 0;}
	else if (this.cx > hashs.xMax){this.rankX = 2;}
	if (this.cy < hashs.yMin){this.rankY = 0;}
	else if (this.cy > hashs.yMax){this.rankY = 2;}
}

Node.prototype.del = function(){
	delete listOfNodes[this.id];
	this.eSVG.remove();
	this.tSVG.remove();
}

function getListOfNodes(){
	var list1 = {};
	var node0 = new Node("node0",center.X,center.Y,5,dfNodes[0][0],dfNodes[0][1]);
	list1["node0"] = node0;
	for (i=1;i<circlenum;i++){
		var id1 = "node"+i.toString();
		var node = new Node(id1,center.X + distCenter*Math.cos(i*angle),center.Y + distCenter*Math.sin(i*angle),5,dfNodes[i][0],dfNodes[i][1]);
		list1[id1] = node;
	}
	return list1;
}


var Edge = function(id,nodeId1,nodeId2){
	this.id = id;
	this.nodeId1 = nodeId1;
	this.nodeId2 = nodeId2;
	this.x1 = listOfNodes[this.nodeId1].cx;
	this.y1 = listOfNodes[this.nodeId1].cy;
	this.x2 = listOfNodes[this.nodeId2].cx;
	this.y2 = listOfNodes[this.nodeId2].cy;
	this.infoInit = {id:this.id,x1:this.x1,y1:this.y1,x2:this.x2,y2:this.y2,stroke:"rgb(150, 150, 150)","stroke-width":"2"};
	this.eSVG = create("line",this.infoInit);
}

Edge.prototype.draw = function(){
	gSVG.appendChild(this.eSVG);
}

Edge.prototype.invertNodes = function(){
	var copy = this.nodeId1;
	this.nodeId1 = this.nodeId2;
	this.nodeId2 = copy;
	this.update();
}

Edge.prototype.update = function(){
	var node1 = document.getElementById(this.nodeId1);
	var node2 = document.getElementById(this.nodeId2);
	this.x1 = node1.getAttribute("cx");
	this.y1 = node1.getAttribute("cy");
	this.x2 = node2.getAttribute("cx");
	this.y2 = node2.getAttribute("cy");
	this.eSVG.setAttribute("x1",this.x1);
	this.eSVG.setAttribute("x2",this.x2);
	this.eSVG.setAttribute("y1",this.y1);
	this.eSVG.setAttribute("y2",this.y2);
}

Edge.prototype.del = function(){
	delete listOfEdges[this.id];
	delete listOfNodes[this.nodeId1].targets[this.id];
	delete listOfNodes[this.nodeId2].targets[this.id];
	this.eSVG.remove();
}

function getListOfEdges(){
	var list1 = {};
	for (i=0;i<dfEdges.length;i++){
		var id1 = "edge"+i.toString();
		var edge = new Edge(id1,dfEdges[i][0],dfEdges[i][1]);
		listOfNodes[dfEdges[i][0]].targets[id1] = true;
		listOfNodes[dfEdges[i][1]].targets[id1] = false;
		list1[id1] = edge;
	}
	return list1;
}


restartGraph();
function restartGraph(){
	if (!generated){
		listOfNodes = getListOfNodes();
		listOfEdges = getListOfEdges();
		for (i in listOfEdges){
			listOfEdges[i].draw();
		}
		for (j in listOfNodes){
			listOfNodes[j].draw();
			listOfNodes[j].drawText();
		}
		generated = true;
	}
	else{
		$("#svg").empty();
		var mainRect = create("rect",{x:0,y:0,width:"100%",height:"100%",fill:"transparent",stroke:"black","stroke-width":"3"});
		mainSVG.appendChild(mainRect);
		gSVG = create("g",{id:"graph"});
		mainSVG.appendChild(gSVG);
		helpText = create("text",{x:300,y:50,"font-size":"30",fill:"black",'text-anchor':'middle'});
		mainSVG.appendChild(helpText);
		helpText.innerHTML = "👆 Clique para dar Zoom";
		generated = false;
		clipped = false;
		restartGraph();
	}
}

function hashtag(event){
	var xMin = event.offsetX - zoomSize/2;
	var yMin = event.offsetY - zoomSize/2;
	var xMax = event.offsetX + zoomSize/2;
	var yMax = event.offsetY + zoomSize/2;
	return {xMin:xMin,yMin:yMin,xMax:xMax,yMax:yMax};
}

function getListOfRanks(hashs){
	var listRN = {};
	for (k=0;k<3;k++){
		listRN[["rankX",k].join("")] = [];
		listRN[["rankY",k].join("")] = [];
	}
	for (i in listOfNodes){
		listOfNodes[i].getRanks(hashs);
		listRN[["rankX",listOfNodes[i].rankX].join("")].push(i);
		listRN[["rankY",listOfNodes[i].rankY].join("")].push(i);
	}
	return listRN;
}

function intersectX(edgeCross,retaX){
	var x1 = parseFloat(edgeCross.x1);
	var x2 = parseFloat(edgeCross.x2);
	var y1 = parseFloat(edgeCross.y1);
	var y2 = parseFloat(edgeCross.y2);
	var cordX = retaX;
	var cordY = y1 + (y2 - y1) * (retaX - x1) / (x2 - x1);
	return {x:cordX,y:cordY};
}

function intersectY(edgeCross,retaY){
	var x1 = parseFloat(edgeCross.x1);
	var x2 = parseFloat(edgeCross.x2);
	var y1 = parseFloat(edgeCross.y1);
	var y2 = parseFloat(edgeCross.y2);
	var cordX = x1 + (x2 - x1) * (retaY - y1) / (y2 - y1);
	var cordY = retaY;
	return {x:cordX,y:cordY};
}

var invisibleNodes = 0;
var inviSide = 0;
function idInviNode(){
	var invi = ["invi",invisibleNodes].join("");
	invisibleNodes++;
	return invi;
}

function topCut(rank_Node,hashs){
	var yMin = hashs.yMin;
	if (rank_Node.rankY0.length!==0){
		for (i in rank_Node.rankY0){
			var n = rank_Node.rankY0[i];
			listOfNodes[n].turn(false);
			for (e in listOfNodes[n].targets){
				if (listOfNodes[listOfEdges[e].nodeId1].rankY===0){
					listOfEdges[e].del();
				}
				else{
					var inter = intersectY(listOfEdges[e],yMin);
					var newId = idInviNode();
					var inviNode = new Node(newId,inter.x,inter.y,inviSide);
					inviNode.draw();
					listOfNodes[newId] = inviNode;
					inviNode.targets[e] = false;
					inviNode.getRanks(hashs);
					listOfEdges[e].nodeId2 = newId;
					listOfEdges[e].update();
				}
			}
			listOfNodes[n].del();
		}
	}
}

function rightCut(rank_Node,hashs){
	var xMax = hashs.xMax;
	if (rank_Node.rankX2.length!==0){
		for (i in rank_Node.rankX2){
			var n = rank_Node.rankX2[i];
			listOfNodes[n].turn(false);
			for (e in listOfNodes[n].targets){
				if (listOfNodes[listOfEdges[e].nodeId1].rankX===2){
					listOfEdges[e].del();
				}
				else{
					var inter = intersectX(listOfEdges[e],xMax);
					var newId = idInviNode();
					var inviNode = new Node(newId,inter.x,inter.y,inviSide);
					inviNode.draw();
					listOfNodes[newId] = inviNode;
					inviNode.targets[e] = false;
					inviNode.getRanks(hashs);
					listOfEdges[e].nodeId2 = newId;
					listOfEdges[e].update();
				}
			}
			listOfNodes[n].del();
		}
	}
}

function botCut(rank_Node,hashs){
	var yMax = hashs.yMax;
	if (rank_Node.rankY2.length!==0){
		for (i in rank_Node.rankY2){
			var n = rank_Node.rankY2[i];
			listOfNodes[n].turn(false);
			for (e in listOfNodes[n].targets){
				if (listOfNodes[listOfEdges[e].nodeId1].rankY===2){
					listOfEdges[e].del();
				}
				else{
					var inter = intersectY(listOfEdges[e],yMax);
					var newId = idInviNode();
					var inviNode = new Node(newId,inter.x,inter.y,inviSide);
					inviNode.draw();
					listOfNodes[newId] = inviNode;
					inviNode.targets[e] = false;
					inviNode.getRanks(hashs);
					listOfEdges[e].nodeId2 = newId;
					listOfEdges[e].update();
				}
			}
			listOfNodes[n].del();
		}
	}
}

function leftCut(rank_Node,hashs){
	var xMin = hashs.xMin;
	if (rank_Node.rankX0.length!==0){
		for (i in rank_Node.rankX0){
			var n = rank_Node.rankX0[i];
			listOfNodes[n].turn(false);
			for (e in listOfNodes[n].targets){
				if (listOfNodes[listOfEdges[e].nodeId1].rankX===0){
					listOfEdges[e].del();
				}
				else{
					var inter = intersectX(listOfEdges[e],xMin);
					var newId = idInviNode();
					var inviNode = new Node(newId,inter.x,inter.y,inviSide);
					inviNode.draw();
					listOfNodes[newId] = inviNode;
					inviNode.targets[e] = false;
					inviNode.getRanks(hashs);
					listOfEdges[e].nodeId2 = newId;
					listOfEdges[e].update();
				}
			}
			listOfNodes[n].del();
		}
	}
}

function updateSVG(x0,y0){
	helpText.remove();
	var translate = ["translate(",-x0,-y0,")"].join(" ");
	var coef = 600/zoomSize;
	var scale = ["scale(",coef,")"].join("");
	var transf = [scale,translate].join(" ");
	var gg = document.getElementById("graph");
	gg.setAttribute("transform",transf);
	var mainRect = create("rect",{x:0,y:0,width:"100%",height:"100%",fill:"transparent",stroke:"black","stroke-width":"3"});
	mainSVG.appendChild(mainRect);
}

function clipper(event){
	if (!clipped){
		var hashs = hashtag(event);
		var listOfRanks = getListOfRanks(hashs);
		topCut(listOfRanks,hashs);
		listOfRanks = getListOfRanks(hashs);
		rightCut(listOfRanks,hashs);
		listOfRanks = getListOfRanks(hashs);
		botCut(listOfRanks,hashs);
		listOfRanks = getListOfRanks(hashs);
		leftCut(listOfRanks,hashs);
		updateSVG(hashs.xMin,hashs.yMin);
		clipped = true;
	}
	else{
		restartGraph();
		clipped = false;
	}
}