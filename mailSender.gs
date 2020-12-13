function mailSender(){

    var esito = "EMAIL_SENT";

    var allSheets = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = allSheets.getSheets()[2];

    var startRow = 1;
    var numRows = 7; 
    var startCol = 1;
    var numCol = 9;
    
    var dataRange = sheet.getRange(startRow, startCol, numRows, numCol);
    var data = dataRange.getValues();
  
    var mustSend = data[1][8];      //casella di controllo
    if(mustSend == false)
        return;

    //generate mail Subject
    var subject = "Casa Pisa- ";
    var nuovaBolletta = false;
    var reminder = false;
    if(data[0][4] == true){
        nuovaBolletta = true;
        subject = subject + "Nuove bollette"
    }

    if(data[0][6] == true){
        reminder == true;
        if(nuovaBolletta == true)
            subject = subject + " + ";
        subject = subject + "Reminder";
    }

    var currentRow = 2;

    for(var i in data){

        var row = data[i];
        var emailAddress = row[2];

        if(emailAddress == "" || emailAddress == "Email Address")
            continue;

        var message = row[3];
        var emailSent = row[7];
        if(mustSend == true && emailSent != esito){
            MailApp.sendEmail(emailAddress, subject, message);
            sheet.getRange(currentRow, 8).setValue(esito);
        }
        currentRow++;
    }
    
    //spend time randomly
    for (var i = 0; i < 100; i++){ }

    sheet.getRange(2, 9).setValue(false);

    for (var i = 2; i < 7; i++)
        sheet.getRange(i, 8).setValue("");
    
    if(nuovaBolletta == true){
      var currentValue = data[6][1];
      sheet.getRange("A7").setValue(currentValue);
    }
    
  
}