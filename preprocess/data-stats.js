var fs = require('fs');
var math = require('mathjs');

var thisData = [];
var thisFile = "diabetes.csv";    

fs.readFile(thisFile, "utf8", function(error, data) {
    var rows = data.split("\n");
    var thisData= [];

    var i=0;
	while(rows[i]) {
	    var cells = rows[i].split(",");
	    thisData.push( cells );
        
        i++;
	}

    var attrNum = thisData[0].length;

    // sort data to be placed per attribute
    var sortedData = new Array();
    for(var i=0; i<(attrNum); i++){

		sortedData[i]= new Array();
		for(var j=0; j<(thisData.length); j++){
			
				sortedData[i].push(thisData[j][i]);
		}
		
	}

    // var statsData = new Stats().push(sortedData); 

    // find sum of each attribute
    var sumAttr = new Array();
    console.log("SUM OF");
    // needs to be minused by 1 for the last row is class, not attribute
    for(var i=0; i<(attrNum-1); i++){
        sumAttr[i] = math.sum(sortedData[i]);
        console.log(i+": "+sumAttr[i]);
    }

    // find mean of each attribute
    var meanAttr = new Array();
    console.log("MEAN OF");
    
    for(var i=0; i<(attrNum-1); i++){
        meanAttr[i] = math.mean(sortedData[i]);
        console.log(i+": "+meanAttr[i]);
    }

    // find variance of each attribute
    var varAttr = new Array();
    console.log("VARIANCE OF");
    
    for(var i=0; i<(attrNum-1); i++){
        varAttr[i] = math.var(sortedData[i]);
        console.log(i+": "+varAttr[i]);
    }


    // find min and max of each attribute
    var minAttr = new Array();
    var maxAttr = new Array();
    console.log("MIN AND MAX OF");
    
    for(var i=0; i<(attrNum-1); i++){
        minAttr[i] = math.min(sortedData[i]);
        maxAttr[i] = math.max(sortedData[i]);
        console.log(i+": min "+minAttr[i]+" max "+maxAttr[i]);
    }

    // find quartiles of each attribute
    var quartileAttr = new Array();
    console.log("QUARTILES OF");
    
    for(var i=0; i<(attrNum-1); i++){
        quartileAttr[i] = new Array();

        quartileAttr[i][0] = math.quantileSeq(sortedData[i],1/4);
        quartileAttr[i][1] = math.quantileSeq(sortedData[i],2/4);
        quartileAttr[i][2] = math.quantileSeq(sortedData[i],3/4);
        
        console.log(i+": Q1->"+quartileAttr[i][0].toFixed(5)+" Q2->"+quartileAttr[i][1].toFixed(5)+" Q3->"+quartileAttr[i][2].toFixed(5));
    }
    

    // find modes of each attribute
    // var modeAttr = new Array();
    // console.log("MODES OF");
    
    // for(var i=0; i<(attrNum-1); i++){
    //     modeAttr[i] = new Array();

    //     modeAttr[i] = math.mode(sortedData[i]);
        
    //     console.log(i+": "+modeAttr[i]);
    // }

    // find interquartile range
    var iqAttr = new Array();
    for(var i=0; i<(attrNum-1); i++){

        iqAttr[i] = quartileAttr[i][2]-quartileAttr[i][0];
    }

    // find outlier values
    // x < Q1 - 1.5(Q3-Q1) atau x > Q3 + 1.5(Q3-Q1)
    var cOutlier=0; 
    var outlierAttr = new Array();
    for(var i=0; i<(attrNum-1); i++){
        outlierAttr[i] = new Array();
        for(var j=0; j<(sortedData[0].length); j++){
            var temp1 = quartileAttr[i][0]-1.5*iqAttr[i];
            var temp2 = quartileAttr[i][2]+1.5*iqAttr[i];
            
            if(outlierAttr[i][j]<temp1 || outlierAttr[i][j]>temp2){
                console.log(outlierAttr[i][j]+"outlier");
                cOutlier++;
            }
        }
         
    }
    console.log("found "+cOutlier+" outlier values");

});