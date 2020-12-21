/*    
    Read input from a Google Sheet and send an email to all recipients.
    If message is empty or no subjects is selected, print an error.

    To execute: Tools-> Script Editor-> Select this function-> Edit-> Current project Triggers-> Create a Trigger-> Event: edit sheet.
*/

function mailSender(){

    var RESULT = "EMAIL_SENT";
    var ALIAS_SENDER = 'Casa Pisa';
    var N_SHEET = 3;        //sheet position

    var allSheets = SpreadsheetApp.getActiveSpreadsheet();  //open Spreadsheet
    var sheet = allSheets.getSheets()[N_SHEET - 1];   //get the N_SHEET sheet

    var startRow = 1;   //Be careful: starts from 1
    var numRows = 7; 
    var startCol = 1;
    var numCol = 9;
    
    var dataRange = sheet.getRange(startRow, startCol, numRows, numCol);
    var data = dataRange.getValues();
  
    //when a modify occurs, check if emails must be sent
    var mustSend = data[1][8];  
    if(mustSend == false)
        return;

    //generate mail Subject
    var subject = "";
    var newBill = false;
    var reminder = false;
    if(data[0][4] == true){
        newBill = true;
        subject = subject + "Nuove bollette"
    }

    if(data[0][6] == true){
        reminder = true;
        if(newBill == true)
            subject = subject + " + ";
        subject = subject + "Reminder";
    }

    //if no subject print Error in Error cell
    if(newBill == false && reminder == false){
        sheet.getRange(2, 8, 5, 1).setValue("Error: no subject or message.");
        sheet.getRange(2, 9).setValue(false);
        return;
    }

    var currentRow = 2;
    //send an email for each user
    for(var i in data){

        var row = data[i];
        var emailAddress = row[2];

        if(emailAddress == "" || emailAddress == "Email Address")
            continue;

        var message = row[3];
        var emailResult = row[7];
        if(mustSend == true){
            MailApp.sendEmail(emailAddress, subject, message, {name: ALIAS_SENDER});
            sheet.getRange(currentRow, 8).setValue(RESULT);
        }
        currentRow++;
    }

    //TODO- wait 5 seconds

    sheet.getRange(2, 9).setValue(false);

    //if a newBill occurs, modify tmp value in the cell A7
    if(newBill == true){
      var currentValue = data[6][1];
      sheet.getRange("A7").setValue(currentValue);
    }
    
  
}