/*
    @Overview: controlla se ci sono nuove bollette e in caso crea un apposito messaggio con importo da pagare e data di scadenza.

    @Param:
        indexSheet: foglio dove è presente lo storico delle bollette
        id: la colonna degli importi di ciascun coinquilino
        lastRow: ultima bolletta notificata
*/

function messageNew(indexSheet, id, lastNotified) {

    //open sheets
    var allSheets = SpreadsheetApp.getActiveSpreadsheet();
    var inputSheet = allSheets.getSheets()[indexSheet];

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
        
        var importo = row[id - 3];
        if(importo == "" || importo == null || importo == "-" || importo == '-')
            continue;
        
        counter++;
        outputString = outputString + name + ": " + importo +"€\n";
        //TODO - inserire data scadenza della bolletta
        //var scadenza = row[1];
        //var scadenzaDate = new Date(scadenza);
        //outputString = outputString + "entro "+ calculateDate() +"\n";
    }
    if(counter > 1)
        outputString = "Hai " + counter + " nuove bollette: \n"+outputString;
    else if(counter == 1)
        outputString = "Hai una nuova bolletta: \n"+outputString;
    else
        return "Nessuna nuova bolletta.\n";

    
    return outputString+"\n";
}