//input is name
function messageReminder(id) {

    //open sheets
    var allSheets = SpreadsheetApp.getActiveSpreadsheet();
    var inputSheet = allSheets.getSheets()[0];

    var startRow = 4;
    var startCol = 3;

    var rangeRow = 1000;
    var rangeCol = 25;
    
    //select range
    var inputDataRange = inputSheet.getRange(startRow,startCol, rangeRow, rangeCol);
    var inputData = inputDataRange.getValues();

    var counterTot = 0;
    var scaduteCounter = 0;
    var outputString = "";
    var importoTotale = 0;

    //for each row check if a flatmate hasn't payed the bill yet
    for(var i in inputData){

        var row = inputData[i];
        var name = row[0];

        //if last row read the total amount
        if(name == ""){       
            outputString = outputString + "Per un totale di "+ importoTotale.toFixed(2) +"€";
            break;
        }

        var scadenza = row[1];
        var scadenzaDate = new Date(scadenza);
        var currentDate = new Date();
        var check = row[id-3];

        if(check == false){
            counterTot++;
            var importo = row[id - 1];
            importoTotale += importo;

            if(currentDate.valueOf() > scadenzaDate.valueOf()){
                scaduteCounter++;
                outputString = outputString + name + " " + importo+"€ (SCADUTA)\n";
            }
            else
                outputString = outputString + name + " " + importo+"€\n";

        }
    }
    outputString = "Hai "+counterTot+" bollette da pagare, di cui "+scaduteCounter+" scadute:\n" + outputString;
    return outputString;

}