var fs = require('fs');
var math = require('mathjs');

var thisData = [];
var thisFile = "dataset.csv";    

fs.readFile(thisFile, "utf8", function(error, data) {
    var rows = data.split("\n");
    var thisData= [];

    var i=0;
	while(rows[i]) {
	    var cells = rows[i].split(",");
	    thisData.push( cells );
        
        i++;
	}
    // console.log(thisData);
    

    // find sum of data from each attribute
    var sumAttr = new Array();
    for(var i=0; i<(thisData[0].length-1); i++){
        
        sumAttr[i] = thisData.map(function(d) {
            console.log("map");
            return parseFloat(d[i]); 
        })        
        .reduce(function(a,b) {
            console.log("reduce");          
            return (a + b) 
        });
        // console.log("attr-"+i+": "+sumAttr);
    }
    console.log(sumAttr);
    
    // find variance of data from each attribute
    // var varAttr = new Array();
    // for(var i=0; i<(thisData[0].length-1); i++){
        
    //     sumAttr[i] = thisData.map(function(d) {
    //         return parseFloat(d[i]); 
    //     })        
    //     .reduce(function(a,b) {          
    //         return (a + b) 
    //     });
    
    // }
    // console.log(sumAttr);
    
    
});