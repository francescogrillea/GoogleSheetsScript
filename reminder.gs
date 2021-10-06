/*
    @Overview: controlla quali bollette non sono state pagate dal singolo inquilino.

    @Param:
        bill_col: bill's name column
        deadline_col: deadlines column
        checkbox_col: checkboxs of the flatmate column
        amount_col: amounts of the flatmate column

        each of this parameters are arrays
*/


function messageReminder(bill_col, deadline_col, checkbox_col, amount_col) {

    var counterTot = 0;
    var scaduteCounter = 0;
    var outputString = "";
    var importoTotale = 0;
    var importo = 0;

    for (var i = 0; i < checkbox_col.length; i++){

        //boh =  boh + String(checkbox_col[i]);
        //not payed yet
        if(String(checkbox_col[i]) == "false"){
            
            counterTot++;
            importo = parseFloat(amount_col[i]);
            importoTotale = parseFloat(importoTotale+importo);
            bill_name = bill_col[i];
            var scadenzaDate = new Date(deadline_col[i]);
            var currentDate = new Date();
            
            //deadline has passed
            if(currentDate.valueOf() > scadenzaDate.valueOf()){
                scaduteCounter++;
                outputString = outputString + bill_name + " " + importo+"€ (SCADUTA)\n";
            }
            else
                outputString = outputString + bill_name + " " + importo+"€\n";

        }
    }
    
    outputString = "Hai "+counterTot+" bollette da pagare, di cui "+scaduteCounter+" scadute:\n" + outputString;
    outputString = outputString+"Per un totale di "+importoTotale.toFixed(2)+"€ \n";
    return outputString;
}