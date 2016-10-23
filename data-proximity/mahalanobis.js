var fs = require('fs');
var math = require('mathjs');
var mahalanobis = require("mahalanobis");

var dataFile = "dataset.csv";

var inputData = [];

// read file and save data to array
fs.readFile(dataFile, "utf8", function(error, data) {
	var rows = data.split("\n");

	for (var i = 0; i < (rows.length-1); i++) {
		var cells = rows[i].split(",");
		inputData.push( cells );

	}

	for (var i = 0; i < inputData.length; i++) {
		for(var j=0; j<inputData[i].length; j++){
			inputData[i][j] = parseFloat(inputData[i][j]);	
		}
        
    }

	console.log("Calculating Mahalanobis Distance");

	var distances = mahalanobis(inputData);
 
	distances.forEach(function(distance,i){
		console.log(i + ": " + distance);
	});
	
});