/*
    @Overview: controlla se ci sono nuove bollette e in caso crea un apposito messaggio con importo da pagare e data di scadenza.

    @Param:
        id: la colonna degli importi di ciascun coinquilino
        lastRow: ultima bolletta notificata
*/
function messageNew(id, lastNotified) {

    //open sheets
    var allSheets = SpreadsheetApp.getActiveSpreadsheet();
    var inputSheet = allSheets.getSheets()[0];

    var startRow = lastNotified;
    var startCol = 3;

    var rangeRow = 10;
    var rangeCol = 22;
    
    //select range
    var inputDataRange = inputSheet.getRange(startRow,startCol, rangeRow, rangeCol);
    var inputData = inputDataRange.getValues();

    var counter = 0;
    var outputString = "";

    for(var i in inputData){

        var row = inputData[i];
        var name = row[0];
        if(name == "")
            break;
        counter++;
        var scadenza = row[1];
        var scadenzaDate = new Date(scadenza);
        var importo = row[id - 3];

        outputString = outputString + name + ": " + importo +"€\n";
        //TODO - inserire data scadenza della bolletta
        //outputString = outputString + name + ": " + importo +"€ entro "+ calculateDate() +"\n";
    }
    if(counter > 1)
        outputString = "Hai " + counter + " nuove bollette: \n"+outputString;
    else if(counter == 1)
        outputString = "Hai una nuova bolletta: \n"+outputString;
    else
        return "";

    
    return outputString+"\n";
}