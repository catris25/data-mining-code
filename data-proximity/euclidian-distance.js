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

	console.log("Calculating Euclidian Distance");
	
	var matrix = new Array();
	var tempX=0;
	var tempY=0;
	for(var i=0; i<inputData.length; i++){
		matrix[i]= new Array();

		tempX = inputData[i][0];
		tempY = inputData[i][1];

		for(var j=0; j<inputData.length; j++){
			var first = math.pow((tempX-inputData[j][0]),2);
			var second = math.pow((tempY-inputData[j][1]),2);
			matrix[i][j] = math.pow((first+second),0.5);
		}
	}

	console.log("Distance Matrix");
	console.log(matrix);
	
});

