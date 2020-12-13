//input is coinquilino column

//start: da dove partire
//id del counquilino
function messageNew(start, id) {

    //open sheets
    var allSheets = SpreadsheetApp.getActiveSpreadsheet();
    var inputSheet = allSheets.getSheets()[0];

    var startRow = start;
    var startCol = 2;

    
    //select range
    var inputDataRange = inputSheet.getRange(startRow,startCol, 100, 15);
    var inputData = inputDataRange.getValues();

    var counter = 0;
    var outputString = "";

    for(var i in inputData){

        var row = inputData[i];
        var name = row[0];
        if(name == "scadenza: superata / nei prossimi 15gg")
            break;
        counter++;
        var scadenza = row[1];
        var scadenzaDate = new Date(scadenza);
        var importo = row[id + 1];

        outputString = outputString + name + ": " + importo +"€\n";
    }
    if(counter > 1)
        outputString = "Hai " + counter + " nuove bollette: \n"+outputString;
    else if(counter == 1)
        outputString = "Hai una nuova bolletta: \n"+outputString;
    else
        return "";

    //update value
    //var newRow = start+counter;
    //var outputSheet = allSheets.getSheets()[2];
    //outputSheet.getRange('A7').setValue(newRow);
    
    return outputString+"\n";
}