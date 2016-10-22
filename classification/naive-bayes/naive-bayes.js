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


		// for(var i=0; i<attrNum; i++){

		// 	for(j=0; j<)
		// }
	
		for(var i=0; i<(attrNum); i++){

			for(var j=0; j<attrs.length; j++){
				
				classNames[j][0] = 0;
			}
			
			for(var x=0; x<trainingData.length; x++){
				console.log(attrs[i]);
				return;
				attrs[i][x] = new Array();

				for(var y=0; y<attrs.length; y++){
					// console.log("x:"+x+"...j:"+j+": "+trainingData[i][attrNum]);
					if(trainingData[x][attrNum]==classNames[y][1]){
						attrs[i][x].push(trainingData[x][i]);
						// console.log("breakout: "+trainingData[x][j]);
						classNames[y][0]++;
						break;
					}
				}

			}
		}
		// console.log(attrs);
		return;

	});

	// // calculating mean and var of EWS
	// for(var i=0; i<attrEWS.length; i++){
	// 	meanEWS[i] = math.mean(attrEWS[i]);
	// 	varEWS[i] = math.var(attrEWS[i]);

	// }

	// // calculating mean and var of BL
	// for(var i=0; i<attrBL.length; i++){
	// 	meanBL[i] = math.mean(attrBL[i]);
	// 	varBL[i] = math.var(attrBL[i]);
	// }

	// // calculating posterior probability
	// var posteriorEWS = allEWS/trainingData.length;
	// var posteriorBL = allBL/trainingData.length;
	
	// // calculating likelihood
	// var likeEWS = new Array();
	// var likeBL = new Array();

	// var pi = math.eval('pi');
	// var e = math.eval('e');

	// for(var i=0; i<attrEWS.length; i++)	{

	// 	likeEWS[i] = (1/math.sqrt(2*pi*varEWS[i])) * math.pow(e, -(math.pow((testingData[i]-meanEWS[i]),2))/(2*varEWS[i]));
	// }
	
	// for(var i=0; i<attrBL.length; i++)	{

	// 	likeBL[i] = (1/math.sqrt(2*pi*varBL[i])) * math.pow(e, -(math.pow((testingData[i]-meanBL[i]),2))/(2*varBL[i]));
	// }
	
	// var temp = 1;

	// for(var i=0; i<likeEWS.length; i++)	{
	// 	temp=temp*likeEWS[i];
	// }
	// var eviEWS = temp;	

	// var temp = 1;
	// for(var i=0; i<likeBL.length; i++)	{
	// 	temp=temp*likeBL[i];
	// }
	// var eviBL = temp;	
	
	// var probEWS = eviEWS*posteriorEWS;
	// var probBL = eviBL*posteriorBL;

	// console.log("P(EWS) = "+probEWS);
	// console.log("P(BL) = "+probBL);

	// // conclusion
	// console.log("Result:");
	// if(probEWS>probBL){
	// 	console.log("Testing data is predicted to be EWS.");
	// }else{
	// 	console.log("Testing data is predicted to be BL.");
	// }
});

