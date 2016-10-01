// Lia Ristiana
// M0513027

// naive bayes

var fs = require('fs');
var math = require('mathjs');
var trainingData = [];
var trainingFile = "data.csv";
var testingData = [0.4964, 0.2509, 2.714, 0.1805];


// read training file and save data to array trainingData 
fs.readFile(trainingFile, "utf8", function(error, train) {
	var rows = train.split("\n");

	for (var i = 0; i < (rows.length-1); i++) {
	  var cells = rows[i].split(",");
	  trainingData.push( cells );
	  
	}

	var attrNum = 4;

	console.log(trainingData);

	var meanEWS = new Array();
	var varEWS = new Array();

	var meanBL = new Array();
	var varBL = new Array();

	var attrEWS=new Array();
	var attrBL=new Array();

	
	for(var i=0; i<(attrNum); i++){

		attrEWS[i]= new Array();
		attrBL[i] = new Array();

		for(var j=0; j<(trainingData.length); j++){
			if(trainingData[j][4]=='EWS'){
				console.log("EWS"+trainingData[j][i]);
				attrEWS[i].push(trainingData[j][i]);
				
							
			}else{
				console.log("BL"+trainingData[j][i]);
				attrBL[i].push(trainingData[j][i]);
				
			}
		}
		
	}

	for(var i=0; i<attrEWS.length; i++){
		meanEWS[i] = math.mean(attrEWS[i]);
		varEWS[i] = math.var(attrEWS[i]);

	}

	for(var i=0; i<attrBL.length; i++){
		meanBL[i] = math.mean(attrBL[i]);
		varBL[i] = math.var(attrBL[i]);
	}
	
	var likeEWS = new Array();
	var likeBL = new Array();

	var pi = math.eval('pi');
	var e = math.eval('e');

	for(var i=0; i<attrEWS.length; i++)	{

		likeEWS[i] = (1/math.sqrt(2*pi*varEWS[i])) * math.pow(e, -(math.pow((testingData[i]-meanEWS[i]),2))/(2*varEWS[i]));
		// console.log(i+". "+likeEWS[i])
	}
	
	for(var i=0; i<attrBL.length; i++)	{

		likeBL[i] = (1/math.sqrt(2*pi*varBL[i])) * math.pow(e, -(math.pow((testingData[i]-meanBL[i]),2))/(2*varBL[i]));
		// console.log(i+". "+likeBL[i])
	}
	
	var temp = 1;
	for(var i=0; i<likeEWS.length; i++)	{
		temp=temp*likeEWS[i];
	}
	var eviEWS = temp;	

	var temp = 1;
	for(var i=0; i<likeBL.length; i++)	{
		temp=temp*likeBL[i];
	}
	var eviBL = temp;	
	


});

