var fs = require('fs');
var math = require('mathjs');
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

    var accuracy = new Array();
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

        accuracy[i] = kNN(trainingData, testingData);
    }
    
    var totalAccu = math.mean(accuracy);
    console.log("total accuracy :"+totalAccu);
});


// knn function
function kNN(trainingData, testingData){
    var matrix = new Array();
    var res;
    var attrNum = testingData[0].length;
	

    for(var i=0; i<(testingData.length); i++){
        
        matrix[i] = new Array();

        for(var j=0; j<(trainingData.length); j++){
            var temp =0;
            for(var x=0; x<attrNum; x++){
                temp = temp+ Math.pow((testingData[i][x]-trainingData[j][x]), 2);
                // console.log("test: "+testingData[i][x]+" train: "+trainingData[j][x]);
            }
            res = Math.pow(temp, 0.5);
            
            matrix[i][j]= new Object();
            matrix[i][j].value = res;
			matrix[i][j].class = trainingData[j][attrNum-1];
            // console.log(matrix[i][j]);
        }
    }
    
    for(var i=0; i<(testingData.length); i++){
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
    var correct = 0;
    var incorrect = 0;
    console.log("k= "+k);
    
    for(var i=0; i<(testingData.length); i++){

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
            console.log("data-"+i+" class: 1. ("+one+") should be "+testingData[i][attrNum-1]);
            nOne++;
            if(testingData[i][attrNum-1]==1){
                correct++;
            }else{
                incorrect++;
            }
        }else{
            console.log("data-"+i+" class: 2. ("+two+") should be "+testingData[i][attrNum-1]);
            nTwo++;
            if(testingData[i][attrNum-1]==2){
                correct++;
            }else{
                incorrect++;
            }
        }
        
    }

    var accuracy = correct/testingData.length;
    console.log("Result: ");
    console.log(">>"+nOne+" data are classified as 1");
    console.log(">>"+nTwo+" data are classified as 2");
    console.log("<<"+correct+" data are correctly predicted.");
    console.log("<<"+incorrect+" data are incorrectly predicted.");
    console.log("accuracy is "+accuracy);

    return accuracy;
}

