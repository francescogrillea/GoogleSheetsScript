/*
    Message generator
*/

//input is coinquilino column
function generateMessage(input) {

    //open sheets
    var allSheets = SpreadsheetApp.getActiveSpreadsheet();
    var inputSheet = allSheets.getSheets()[0];

    var startRow = 3;
    var startCol = 2;
    
    //select range
    var inputDataRange = inputSheet.getRange(startRow,startCol, 100, 15);
    var inputData = inputDataRange.getValues();

    var counterTot = 0;
    var scaduteCounter = 0;
    var outputString = "";

    //for each row check if a flatmate hasn't payed the bill yet
    for(var i in inputData){

        var row = inputData[i];
        var name = row[0];      //bill ID

        //if last row read the total amount
        if(name == "scadenza: superata / nei prossimi 15gg"){       
            outputString = outputString + "Per un totale di "+ row[input + 1]+"€";
            break;
        }

        var scadenza = row[1];      //bill deadline
        var scadenzaDate = new Date(scadenza);
        var currentDate = new Date();
        var check = row[input];     //has been payed from flatmate i

        if(check == false){
            counterTot++;
            var importo = row[input + 1];

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