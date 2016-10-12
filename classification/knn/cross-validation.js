var fs = require('fs');
var math = require('mathjs');
var thisData = [];
var thisFile = "iris.csv";    

fs.readFile(thisFile, "utf8", function(error, train) {
    var rows = train.split("\n");
    
    // BEWARE ABOUT THE ROWS LENGTH
    // IT COULD BE -1 IT COULD BE NOT
	for (var i = 0; i < (rows.length-1); i++) {
	    var cells = rows[i].split(",");
	    thisData.push( cells );
        
	}
    console.log(thisData);
    
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
    console.log("TOTAL ACCURACY = "+totalAccu);
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
            }
            res = Math.pow(temp, 0.5);
            
            matrix[i][j]= new Object();
            matrix[i][j].value = res;
			matrix[i][j].class = trainingData[j][attrNum-1];
        }
    }
    
    for(var i=0; i<(testingData.length); i++){
        var temp =matrix[i];

        // sort value in array of object per element of array testingData
        temp.sort(function(a, b) {
            return parseFloat(a.value) - parseFloat(b.value);
        });
				
	}

    var k = 9;	// hyperparameter
    var n=0;
    var correct = 0;
    var incorrect = 0;
    // console.log("k= "+k);
    
    
    for(var i=0; i<(testingData.length); i++){

        var classes = [
            // [0,'1'],
            // [0,'2']
            [0, 'Iris-setosa'],
            [0, 'Iris-versicolor'],
            [0, 'Iris-virginica']
        ];

        for(var j=0; j<k; j++){

            for(var x=0; x<classes.length; x++){
                if(matrix[i][j].class==classes[x][1]){
                    classes[x][0]++;
                }
            }
            	
        }

        // decide which class the testing data belongs 
        // from the greater number of class of data from training
        
        var largest= classes[0][0];
        var classifiedAs = classes[0][1];

        for (var j = 0; j < classes.length; j++) {
            
            if (largest < classes[j][0] ) {
                largest = classes[j][0];
                classifiedAs = classes[j][1];
            }
        }       
        
        if(testingData[i][attrNum-1]==classifiedAs){
            // console.log("data-"+i+" is predicted to be "+classifiedAs);
            correct++;
        }else{
            console.log("data-"+i+" is predicted to be "+classifiedAs+". Should be "+testingData[i][attrNum-1]);
            incorrect++;
        }        
    }

    var accuracy = correct/testingData.length;
    // console.log("Result: ");
    // console.log("<<"+correct+" data are correctly predicted.");
    // console.log("<<"+incorrect+" data are incorrectly predicted.");
    console.log("accuracy = "+accuracy);

    return accuracy;
}


