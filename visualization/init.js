function print(p){
    console.log(p);
}

function randInt(a,b){
    return a+Math.floor(Math.random()*(b+1));
}

function create(typeSVG,info){
    var xmlns = "http://www.w3.org/2000/svg";
    var newE = document.createElementNS(xmlns,typeSVG);
    for(var i in info){
        newE.setAttribute(i,info[i]);
    }
    return newE;
}