// Lia Ristiana
// k nearest neighbor for all kind of files

var fs = require('fs');
var trainingData = [];
var testingData = [];
var trainingFile = "train.csv";
var testingFile = "test-A.csv";

// read training file and save data to array trainingData 
fs.readFile(trainingFile, "utf8", function(error, train) {
    var rows = train.split("\n");

	for (var i = 0; i < rows.length; i++) {
	    var cells = rows[i].split(",");
	    trainingData.push( cells );
	  
	}
    
    fs.readFile(testingFile, "utf8", function(error, test){
        var rows = test.split("\n");

        for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].split(",");
            testingData.push( cells );
    
        }
        
        kNN(trainingData, testingData);   

    });    
});

// knn function
function kNN(trainingData, testingData){
    var matrix = new Array();
    var res;
    var attrNum = testingData[0].length;
    console.log("attrNum: "+attrNum);
	
    for(var i=0; i<(testingData.length-1); i++){
        
        matrix[i] = new Array(trainingData.length-1);

        for(var j=0; j<(trainingData.length-1); j++){
            var temp =0;
            for(var x=0; x<attrNum; x++){
                temp = temp+ Math.pow((testingData[i][x]-trainingData[j][x]), 2);
            }
            res = Math.pow(temp, 0.5);
            
            matrix[i][j]= new Object();
            matrix[i][j].value = res;
			matrix[i][j].class = trainingData[j][8];

        }
    }

    
    for(var i=0; i<(testingData.length-1); i++){
			var temp =matrix[i];

			// sort value in array of object per element of array testingData
			temp.sort(function(a, b) {
			   return parseFloat(a.value) - parseFloat(b.value);
			});
				
	}

    var k = 1;	// hyperparameter
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
}