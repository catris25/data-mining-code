// Lia Ristiana
// M0513027

// k nearest neighbor

var fs = require('fs');
var trainingData = [];
var testingData = [];
var trainingFile = "train.csv";
var testingFile = "test-A.csv";

// synchronous js??

// read training file and save data to array trainingData 
fs.readFile(trainingFile, "utf8", function(error, train) {
	var rows = train.split("\n");

	for (var i = 0; i < rows.length; i++) {
	  var cells = rows[i].split(",");
	  trainingData.push( cells );
	  
	}

	// read testing file and save data to array testingData 
	fs.readFile(testingFile, "utf8", function(error, test){
		var rows = test.split("\n");

		for (var i = 0; i < rows.length; i++) {
	  		var cells = rows[i].split(",");
	 		testingData.push( cells );
	 
		}
	

		// initialize array in the size of testing data
		var matrix = new Array(testingData.length-1);
		
		var res;
		for(var i=0; i<(testingData.length-1); i++){
			
			// initialize array in the size of training data inside array testing data
			matrix[i]=new Array(trainingData.length-1);
			
			var temp0 = testingData[i][0];
			var temp1 = testingData[i][1];
			var temp2 = testingData[i][2];
			var temp3 = testingData[i][3];
			var temp4 = testingData[i][4];
			var temp5 = testingData[i][5];
			var temp6 = testingData[i][6];
			var temp7 = testingData[i][7];

			// console.log("------------------------------------------");
			for(var j=0; j<(trainingData.length-1); j++){

				var a = Math.pow((temp0-trainingData[j][0]), 2);
				var b = Math.pow((temp1-trainingData[j][1]), 2);
				var c = Math.pow((temp2-trainingData[j][2]), 2);
				var d = Math.pow((temp3-trainingData[j][3]), 2);
				var e = Math.pow((temp4-trainingData[j][4]), 2);
				var f = Math.pow((temp5-trainingData[j][5]), 2);
				var g = Math.pow((temp6-trainingData[j][6]), 2);
				var h = Math.pow((temp7-trainingData[j][7]), 2);

				// calculating the euclidian distance
				res = Math.pow((a+b+c+d+e+f+g+h),0.5);

				matrix[i][j]= new Object();

				// assign euclidian distance and class to object
				matrix[i][j].value = res;
				matrix[i][j].class = trainingData[j][8];
				
				// console.log(matrix[i][j]);
			}
		}

		for(var i=0; i<(testingData.length-1); i++){
			var temp =matrix[i];

			// sort value in array of object per element of array testingData
			temp.sort(function(a, b) {
			   return parseFloat(a.value) - parseFloat(b.value);
			});
				
		}


		// predict class
		var k = 5;	// hyperparameter
		var n=0;
		var nOne=0;
		var nTwo=0;
		console.log("k= "+k);
		
		for(var i=0; i<(testingData.length-1); i++){

			var one=0;
			var two=0;
			for(var z=0; z<k; z++){
				
				// check the class of data from training 
				if(matrix[i][z].class==1){
					one++;

				}else if(matrix[i][z].class==2){
					two++;

				}	
			}

			// decide which class the testing data belongs 
			// from the greater number of class of data from training
			if(one>two){
				console.log("data-"+i+" class: 1. ("+one+")");
				nOne++;
			}else{
				console.log("data-"+i+" class: 2. ("+two+")");
				nTwo++;
			}
			
		}

		console.log("Result: ");
		console.log(">>"+nOne+" data are classified as 1");
		console.log(">>"+nTwo+" data are classified as 2");
	}); 

});
