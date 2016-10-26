// Lia Ristiana
// split dataset based on their respective classes

var fs = require('fs');
var inputData = [];
var inputFile = "datasets/ews-bl.csv";

// read training file and save data to array trainingData 
fs.readFile(inputFile, "utf8", function(error, data) {
    var rows = data.split("\n");

	for (var i = 0; i < rows.length; i++) {
	    var cells = rows[i].split(",");
	    inputData.push( cells );
	  
	}

	var classNames = ['EWS', 'BL'];
	var attr = new Array();
	var attrNum = inputData[0].length;
	var fileName;

	for(var i=0; i<classNames.length; i++){

		attrs = [];
		var temp="";
		for (var j=0; j<inputData.length; j++){
			
			if(inputData[j][attrNum-1]==classNames[i]){
				temp = temp+ inputData[j]+"\n";

				// attrs.push(inputData[j]+"\n");	
			}
			
		}
		// console.log(temp);
		
		fileName = "class-"+classNames[i]+".csv";
		fs.writeFile("datasets/split/"+fileName, temp, function(err) {
    		if(err) {
        		return console.log(err);
    		}

    		console.log("File "+fileName+" was saved successfully!");
		}); 

		
	}
});