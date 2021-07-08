/*    
    Read input from a Google Sheet and send an email to all recipients.
    If message is empty or no subjects is selected, print an error.

    To execute: Tools-> Script Editor-> Select this function-> Edit-> Current project Triggers-> Create a Trigger-> Event: edit sheet.
*/

function mailSender(){

    var RESULT = "Email inviata";
    var ALIAS_SENDER = 'Casa Pisa';
    var IGNORE_USER = ["Hai 0 bollette da pagare", "Nessuna nuova bolletta"];
    var SHEET_NAME = "MailSystem";
    var SHEET_LINK = "https://docs.google.com/spreadsheets/d/1taX0s2mz8e-8gzj9kDSj6mCkYaC0eS0crvhgXsRE6U8/edit?usp=sharing";

    var allSheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();  //open Spreadsheet
    var sheet = null;

    //find the correct sheet
    for(var i = 0; i < allSheets.length; i++){
        if(allSheets[i].getName() == SHEET_NAME){
            sheet = allSheets[i];
            break;
        }
    }

    var START_ROW = 1;
    var N_ROW = 8; 
    var START_COL = 1;
    var N_COL = 8;
    
    var dataRange = sheet.getRange(START_ROW, START_COL, N_ROW, N_COL);
    var data = dataRange.getValues();
  
    //when a modify occurs, check if emails must be sent
    var mustSend = data[1][7];  
    if(mustSend == false)
        return;

    //generate mail Subject
    var subject = "";
    var newBill = data[0][3];
    var reminder = data[0][5];
    if(newBill == true)
        subject = subject + "Nuove bollette"

    if(reminder == true){
        if(newBill == true)
            subject = subject + " + ";
        subject = subject + "Reminder";
    }

    //if no subject print Error in Error cell
    if(newBill == false && reminder == false){
        var ERROR_MSG = "Error: no subject or message.";
        sheet.getRange(2, 7, 6, 1).setValue(ERROR_MSG);
        return;
    }

    var currentRow = 0;

    var ADDRESS_COL = 2;
    var MESSAGE_COL = 3;
    var RESULT_COL = 7;
    //send an email for each user
    for(var i in data){

        currentRow++;
        var row = data[i];
        var emailAddress = row[ADDRESS_COL - 1];

        var message = row[MESSAGE_COL - 1];

        if(message.startsWith(IGNORE_USER[0]) || message.startsWith(IGNORE_USER[1]))
            continue;

        message = message + "\n\nPer maggiori informazioni consultare il foglio google su " + SHEET_LINK + " \n";
        if(mustSend == true){
            try{
                MailApp.sendEmail(emailAddress, subject, message, {name: ALIAS_SENDER});
                sheet.getRange(currentRow, RESULT_COL).setValue(RESULT);
            }catch(e){
                //sheet.getRange(currentRow, RESULT_COL).setValue("An error occurred"+e);
            }
        }
    }

    //if a newBill occurs, modify tmp value in the cell A7
    if(newBill == true){
      var currentValue = data[7][1];
      currentValue++;
      sheet.getRange("A8").setValue(currentValue);
    }
  
}