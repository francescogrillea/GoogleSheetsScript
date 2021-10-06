/*
    @Overview: controlla se ci sono nuove bollette per il singolo coinquilino.

    @Param:
        counter_new_bill: how many new bills are
        bill_col: bill's name column
        deadline_col: deadlines column
        amount_col: amounts of the flatmate column

        each of this parameters are arrays
*/

function messageNew(counter_new_bill, bill_col, deadline_col, amount_col) {

    var outputString = "";
    var counter = parseInt(counter_new_bill);

    for(var i = bill_col.length - parseInt(counter_new_bill); i < bill_col.length; i++){
        importo = amount_col[i];
        if(importo == "" || parseInt(importo) == 0 || importo == "-")
            continue;
        outputString = outputString + bill_col[i] + ": " + parseFloat(importo) +"€\n";
    }

    if(counter > 1)
        outputString = "Hai " + counter + " nuove bollette: \n"+outputString;
    else if(counter == 1)
        outputString = "Hai una nuova bolletta: \n"+outputString;
    else
        return "";

    
    return outputString+"\n";
}