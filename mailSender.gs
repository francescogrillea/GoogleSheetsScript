function mailSender() {

  var sheet = SpreadsheetApp.getActiveSheet();
  
  var startRow = 2; // First row of data to process
  var numRows = 1; // Numero di destinatari
  
  var startCol = 3; //first colum for names
  var numCol = 5;
  
  var dataRange = sheet.getRange(startRow, startCol, numRows, numCol);
  var data = dataRange.getValues();

  var mustSend = data[0][4];
  var msg = "=SE(G1 = false\; \"\"\; \"EMAIL_SENT\"\)";

  var currentRow = 2;
  for (var i in data) {
    var row = data[i];
    var emailAddress = row[0];
    var subject = row[1];
    var message = row[2];
    var emailSent = row[3];
    if(mustSend == "invio mail in corso..." && emailSent != "EMAIL_SENT"){
      MailApp.sendEmail(emailAddress, subject, message);  
      sheet.getRange(currentRow, 6).setValue(msg);
    }
    currentRow++;
  }




}