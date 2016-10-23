// Lia Ristiana
// M0513027

var fs = require('fs');
var math = require('mathjs');

var dataFile = "dataset.csv";

var inputData = [];

// read file and save data to array
fs.readFile(dataFile, "utf8", function(error, data) {
	var rows = data.split("\n");

	for (var i = 0; i < (rows.length-1); i++) {
		var cells = rows[i].split(",");
		inputData.push( cells );

	}

	// $mahaDistance = $matrix*getInverse(getCovariance($pointA, $pointB))*getTranspose($matrix);

	console.log("Calculating Mahalanobis Distance");

	var matrix = new Array();

	for(var i=0; i<inputData.length; i++){
		matrix[i]= new Array();

		var temp = inputData[i][0];
		for(var j=0; j<inputData.length; j++){
			var diff = temp - inputData
			matrix[i][j] = math.pow((first+second),0.5);
		}
	}

});