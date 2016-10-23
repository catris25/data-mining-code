// Lia Ristiana
// M0513027

// naive bayes

var fs = require('fs');
var math = require('mathjs');

var trainingFile = "datasets/training-data.csv";
var testingFile = "datasets/testing-data.csv";
var trainingData = [];
var testingData = [];


// read training file and save data to array trainingData 
fs.readFile(trainingFile, "utf8", function(error, train) {
	var rows = train.split("\n");

	for (var i = 0; i < (rows.length-1); i++) {
		var cells = rows[i].split(",");
		trainingData.push( cells );

	}

	fs.readFile(testingFile, "utf8", function(error, test){
		var rows = test.split("\n");
		for (var i = 0; i < (rows.length-1); i++) {
		  	var cells = rows[i].split(",");
		  	testingData.push( cells );
				  
		}
		

		var attrNum = testingData[0].length;
		var classNames = [
		[0, 'EWS'],
		[0, 'BL']

		];
	
		var meanClass = new Array();
		var varClass = new Array();
		var attrs = new Array();

		for(var i=0; i<classNames.length; i++){
			meanClass[i] = new Array();
			varClass[i] = new Array();
			attrs[i] = new Array();
		}



		for(var i=0; i<classNames.length; i++){

			for(var j=0; j<attrNum; j++){
				attrs[i][j] = new Array();

				classNames[i][0]=0;

				for(var x=0; x<trainingData.length; x++){
					if(trainingData[x][attrNum]==classNames[i][1]){
						
						attrs[i][j].push(trainingData[x][j]);
						classNames[i][0]++;
					}
				}
			}
		}

		// calculating mean and variance
		var meanValues = new Array();
		var varValues = new Array()

		for(var i=0; i<classNames.length; i++){
			meanValues[i] = new Array();
			varValues[i] = new Array();

			for(var j=0; j<attrs[i].length; j++){
				meanValues[i][j] = math.mean(attrs[i][j]);
				varValues[i][j] = math.var(attrs[i][j]);
			}
		}

		// calculating posterior probability
		var posterior = new Array();

		for(var i=0; i<classNames.length; i++){
			posterior[i] = classNames[i][0]/trainingData.length;
		}

		// calculating likelihood
		var likelihood = new Array();

		var pi = math.eval('pi');
		var e = math.eval('e');

		for(var i=0; i<classNames.length; i++){

			likelihood[i] = new Array();
			for(var j=0; j<attrs[i].length; j++){
				likelihood[i][j] = (1/math.sqrt(2*pi*varValues[i][j]))*
				math.pow(e, -(math.pow((testingData[0][j]-meanValues[i][j]),2))/(2*varValues[i][j]));
				
			}
		}

		
		var evidence= new Array();
		for(var i=0; i<classNames.length; i++){
			
			var temp = 1;

			for(var j=0; j<likelihood[i].length; j++){
				temp = temp*likelihood[i][j];
			}
			evidence[i] = temp;
		}

		// console.log(evidence);

		var probability = new Array();
		for(var i=0; i<classNames.length; i++){
			probability[i] = evidence[i]*posterior[i];
		}
		// console.log(probability);


		// CONCLUSION
		for(var i=0; i<classNames.length; i++){
			console.log("P("+classNames[i][1]+") = "+probability[i]);
		}
	});

	// // conclusion
	// console.log("Result:");
	// if(probEWS>probBL){
	// 	console.log("Testing data is predicted to be EWS.");
	// }else{
	// 	console.log("Testing data is predicted to be BL.");
	// }
});

