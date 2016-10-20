// fisher score

var fs = require('fs');
var math = require('mathjs');
var inputData = [];
var fileName = "players.csv";

// read file
fs.readFile(fileName, "utf8", function(error, data) {
	var rows = data.split("\n");

	for (var i = 0; i < (rows.length-1); i++) {
	  var cells = rows[i].split(",");
	  inputData.push( cells );
	  
	}


	// var className = ['tested_positive', 'tested_negative'];
	var className = ['soccer', 'sumo'];


	// create array to store data per attribute per class
	var attrFirst=new Array();
	var attrSecond=new Array();
	// this needs to be minused by 1 because the last attribute is class
	var attrNum = inputData[0].length-1;

	var sortedData = sortData(inputData);
	
	sortedData[0] = linearScaling(sortedData[0]);
	sortedData[1] = linearScaling(sortedData[1]);
	// sortedData[2] = linearScaling(sortedData[2]);
	
	
	
	var classIndex = sortedData.length-1;
	for(var i=0; i<attrNum; i++){
		var cFirst = 0;
		var cSecond = 0;	

		attrFirst[i] = new Array();
		attrSecond[i] = new Array();

		for(var j=0; j<inputData.length; j++){
			if(sortedData[classIndex][j]==className[0]){
				attrFirst[i].push(sortedData[i][j]);
				cFirst++;
			}else{
				attrSecond[i].push(sortedData[i][j]);
				cSecond++;
			}
		}
	}

	var meanAttr = new Array();
	for(var i=0; i<attrNum;i++){
		
		var temp= [];
		for(var j=0; j<attrNum; j++){
			temp.push(attrFirst[i][j]);
			temp.push(attrSecond[i][j]);
		}
		
		meanAttr[i] = math.mean(temp);
	}

	

	var meanFirst = new Array();
	var varFirst = new Array();

	var meanSecond = new Array();
	var varSecond = new Array();

	for(var i=0; i<attrFirst.length; i++){
		meanFirst[i] = math.mean(attrFirst[i]);
		varFirst[i] = math.var(attrFirst[i]);
	}

	
	for(var i=0; i<attrSecond.length; i++){
		meanSecond[i] = math.mean(attrSecond[i]);
		varSecond[i] = math.var(attrSecond[i]);
	}
	// console.log(className[0]+" : "+cFirst);
	// console.log(className[1]+" : "+cSecond);

	var fisherScore = new Array();
	for(var i=0; i<attrNum; i++){
		fisherScore[i]=(cFirst*cSecond)/(cFirst+cSecond)*(math.pow((meanFirst[i]-meanSecond[i]),2))/(varFirst[i]*cFirst+varSecond[i]*cSecond);
		console.log("fisherScore["+i+"] : "+fisherScore[i]);
	}

	
});



function linearScaling(unscaledData){
	// console.log("unscaledData:"+unscaledData);
	var minValue = math.min(unscaledData);
	var maxValue = math.max(unscaledData);
	var range = maxValue-minValue;
	console.log("max: "+maxValue+" min: "+minValue);

	// x_baru = ( x_lama – min ) / (max – min)
	for(var i=0; i<unscaledData.length; i++){
		var newX = (unscaledData[i]-minValue)/range;
		
		unscaledData[i] = newX;
	}
	console.log("scaled :"+unscaledData[0]);
	return unscaledData;
}

function sortData(inputData){
	var attrNum = inputData[0].length-1;

	// sort data to be placed per attribute
    var sortedData = new Array();
    for(var i=0; i<(attrNum+1); i++){

		sortedData[i]= new Array();
		for(var j=0; j<(inputData.length); j++){
			
			sortedData[i].push(inputData[j][i]);
		}
		
	}


	return sortedData;
}

// function max() {
//     var args = Array.prototype.slice.call(arguments);
//     return Math.max.apply(Math, args.filter(function(val) {
//        return !isNaN(val);
//     }));
// }