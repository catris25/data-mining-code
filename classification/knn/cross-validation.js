var fs = require('fs');
var thisData = [];
var thisFile = "dataset.csv";    

fs.readFile(thisFile, "utf8", function(error, train) {
    var rows = train.split("\n");
    
    // BEWARE ABOUT THE ROWS LENGTH
    // IT COULD BE -1 IT COULD BE NOT
	for (var i = 0; i < (rows.length-1); i++) {
	    var cells = rows[i].split(",");
	    thisData.push( cells );
        
	}
    
    console.log("data length :"+ thisData.length);

    var fold = 10;
    var testDataLength = (thisData.length) / fold;
    console.log(thisData.length+"/"+fold+"="+testDataLength);
    var splitData = new Array(fold-1);

    
    for(var i=0; i<fold; i++){
        splitData[i] = new Array();
             
        for(var j=0; j<testDataLength; j++){
            var p = (i+1)*j;    
            splitData[i].push(thisData[p]);
        }
    }
    

    
    for(var i=0; i<fold; i++){

        var fromIndex = i*testDataLength;
        var toIndex =  i*testDataLength+testDataLength;

        var testingData = thisData.slice(fromIndex, toIndex);

        var trainingData = new Array();

        for(var j=0; j<(thisData.length); j++){
            if(!(j>fromIndex && j<(toIndex-1))){
                trainingData.push(thisData[j]);
            }
        }

        kNN(trainingData, testingData);
    }
    
});


// knn function
function kNN(trainingData, testingData){
    var matrix = new Array();
    var res;
    var attrNum = testingData[0].length;
	console.log("attrNum :"+attrNum)

    for(var i=0; i<(testingData.length-1); i++){
        
        matrix[i] = new Array();

        for(var j=0; j<(trainingData.length-1); j++){
            var temp =0;
            for(var x=0; x<attrNum; x++){
                temp = temp+ Math.pow((testingData[i][x]-trainingData[j][x]), 2);
                // console.log("test: "+testingData[i][x]+" train: "+trainingData[j][x]);
            }
            res = Math.pow(temp, 0.5);
            
            matrix[i][j]= new Object();
            matrix[i][j].value = res;
			matrix[i][j].class = trainingData[j][attrNum-1];
            console.log(matrix[i][j]);
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

