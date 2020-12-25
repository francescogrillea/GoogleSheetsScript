/*    
    Read input from a Google Sheet and send an email to all recipients.
    If message is empty or no subjects is selected, print an error.

    To execute: Tools-> Script Editor-> Select this function-> Edit-> Current project Triggers-> Create a Trigger-> Event: edit sheet.
*/

function mailSender(){

    var RESULT = "Email inviata";
    var ALIAS_SENDER = 'Casa Pisa';
    var N_SHEET = 3;        //sheet position

    var allSheets = SpreadsheetApp.getActiveSpreadsheet();  //open Spreadsheet
    var sheet = allSheets.getSheets()[N_SHEET - 1];   //get the N_SHEET sheet

    var START_ROW = 1;   //Be careful: starts from 1
    var N_ROW = 7; 
    var START_COL = 1;
    var N_COL = 9;
    
    var dataRange = sheet.getRange(START_ROW, START_COL, N_ROW, N_COL);
    var data = dataRange.getValues();
  
    //when a modify occurs, check if emails must be sent
    var mustSend = data[1][8];  
    if(mustSend == false)
        return;

    //generate mail Subject
    var subject = "";
    var newBill = data[0][4];
    var reminder = data[0][6];
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
        sheet.getRange(2, 8, 5, 1).setValue(ERROR_MSG);
        return;
    }

    var currentRow = 2;

    var ADDRESS_COL = 3;
    var MESSAGE_COL = 4;
    var RESULT_COL = 8;
    //send an email for each user
    for(var i in data){

        var row = data[i];
        var emailAddress = row[ADDRESS_COL - 1];

        if(emailAddress == "" || emailAddress == "Email Address")
            continue;

        var message = row[MESSAGE_COL - 1];
        var emailResult = row[RESULT_COL - 1];
        if(mustSend == true){
            MailApp.sendEmail(emailAddress, subject, message, {name: ALIAS_SENDER});
            sheet.getRange(currentRow, RESULT_COL).setValue(RESULT);
        }
        currentRow++;
    }

    //if a newBill occurs, modify tmp value in the cell A7
    if(newBill == true){
      var currentValue = data[6][1];
      sheet.getRange("A7").setValue(currentValue);
    }
    
  
}