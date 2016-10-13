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
    console.log(thisData);

});