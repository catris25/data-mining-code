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

	console.log(inputData);

	// create array to store data per attribute per class
	var attrSoccer=new Array();
	var attrSumo=new Array();
	var attrNum = 2;
	
	for(var i=0; i<(attrNum); i++){

		attrSoccer[i]= new Array();
		attrSumo[i] = new Array();

		// counting how many EWS and BL data there are each
		var allSoccer = 0;
		var allSumo = 0;
		for(var j=0; j<(inputData.length); j++){
			if(inputData[j][attrNum]=='soccer'){
				attrSoccer[i].push(inputData[j][i]);
				allSoccer++;
							
			}else{
				attrSumo[i].push(inputData[j][i]);
				allSumo++;
				
			}
		}
		
	}

	var meanSoccer = new Array();
	var varSoccer = new Array();

	var meanSumo = new Array();
	var varSumo = new Array();

	for(var i=0; i<attrSoccer.length; i++){
		meanSoccer[i] = math.mean(attrSoccer[i]);
		varSoccer[i] = math.var(attrSoccer[i]);
		console.log("soccer "+i+" : "+meanSoccer[i]+", "+varSoccer[i]);
	}

	
	for(var i=0; i<attrSumo.length; i++){
		meanSumo[i] = math.mean(attrSumo[i]);
		varSumo[i] = math.var(attrSumo[i]);
		console.log("sumo "+i+" : "+meanSumo[i]+", "+varSumo[i]);
	}
	console.log("soccer : "+allSoccer);
	console.log("sumo : "+allSumo);

// (math.pow((meanSoccer[i]-meanSumo[i]),2))
	var fisherScore = new Array();
	for(var i=0; i<2; i++){
		fisherScore[i]=(allSoccer*allSumo)/(allSoccer+allSumo)*(math.pow((meanSoccer[i]-meanSumo[i]),2))/(varSumo[i]*allSumo+varSoccer[i]*allSoccer);
		var printRumus = "("+allSoccer+"*"+allSumo+")/("+allSoccer+"+"+allSumo+")*("+meanSoccer[i]+"-"+meanSumo[i]+")^2/("+varSumo[i]+"*"+allSumo+"+"+varSoccer[i]+"*"+allSoccer+");";
		console.log(printRumus);
		console.log("fisherScore["+i+"] : "+fisherScore[i]);
	}
																

	
});
