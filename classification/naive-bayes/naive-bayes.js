// Lia Ristiana
// M0513027

// naive bayes

var fs = require('fs');
var math = require('mathjs');

var trainingFile = "datasets/train-A.csv";
var testingFile = "datasets/test-A.csv";

// var trainingFile = "datasets/training-data.csv";
// var testingFile = "datasets/testing-data.csv";

var trainingData = [];
var testingData = [];


// read training file and save data to array trainingData 
fs.readFile(trainingFile, "utf8", function(error, training) {
	var rows = training.split("\n");

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
		// [0, 'EWS'],
		// [0, 'BL']

		[0, '1'],
		[0, '2']

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

		for(var a=0; a<testingData.length; a++){
			posterior[a] = new Array();
			for(var i=0; i<classNames.length; i++){
				posterior[a][i] = classNames[i][0]/trainingData.length;
			}	
		}
		

		// calculating likelihood
		var likelihood = new Array();

		var pi = math.eval('pi');
		var e = math.eval('e');

		for(var a=0; a<testingData.length; a++){
			likelihood[a] = new Array();
			for(var i=0; i<classNames.length; i++){

				likelihood[a][i] = new Array();
				for(var j=0; j<attrs[i].length; j++){
					likelihood[a][i][j] = (1/math.sqrt(2*pi*varValues[i][j]))*
					math.pow(e, -(math.pow((testingData[a][j]-meanValues[i][j]),2))/(2*varValues[i][j]));
					
				}
			}	
		}
		
		
		var evidence= new Array();
		for(var a=0; a<testingData.length; a++){
			evidence[a] = new Array();
			for(var i=0; i<classNames.length; i++){
			
				var temp = 1;

				for(var j=0; j<likelihood[a][i].length; j++){
					temp = temp*likelihood[a][i][j];
				}
				evidence[a][i] = temp;
			}	
		}
		
		// console.log(evidence);

		var probability = new Array();
		for(var a=0; a<testingData.length; a++){
			probability[a] = new Array();
			for(var i=0; i<classNames.length; i++){
				probability[a][i] = evidence[a][i]*posterior[a][i];
		
			}	
		}
		
		// CONCLUSION
		for(var a=0; a<testingData.length; a++){
			console.log("testing data-"+a);

			var probClass = classNames[0][1];
			var largerClass = probability[a][0];
			for(var i=0; i<classNames.length; i++){
				console.log("P("+classNames[i][1]+") = "+probability[a][i]);
				if(probability[a][i]>largerClass){
					largerClass = probability[a][i];
					probClass = classNames[i][1];
				}
				
			}
			console.log("class: "+probClass);	
		}
		
	});

});

