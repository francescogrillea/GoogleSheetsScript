/*
    Message generator
*/

//input is coinquilino column
function generateMessage(input) {

    //open sheets
    var allSheets = SpreadsheetApp.getActiveSpreadsheet();
    var inputSheet = allSheets.getSheets()[0];
    var outputSheet = allSheets.getSheets()[2];

    var startRow = 3;
    var startCol = 2;
    
    var inputDataRange = inputSheet.getRange(startRow,startCol, 100, 15);
    var inputData = inputDataRange.getValues();

    var counter = 0;
    var outputString = "";

    for(var i in inputData){

        var row = inputData[i];
        var bolletta = row[0];

        if(bolletta == "scadenza: superata / nei prossimi 15gg"){
            outputString = outputString + "Per un totale di "+ row[input + 1]+"€";
            break;
        }
            
        var scadenza = row[1];    
        var check = row[input];     
        
        //TO-DO if check == false and data scadenza - data Oggi  <= 15
        if(check == false){
            var importo = row[input + 1];
            outputString = outputString + bolletta + " " + importo+"€\n";
            counter++;
        }
    }
    outputString = "Hai "+counter+" bollette da pagare:\n" + outputString;
    return outputString;

}