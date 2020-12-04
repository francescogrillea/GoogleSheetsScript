function mailSender() {

  var sheet = SpreadsheetApp.getActiveSheet();
  
  var startRow = 2; // First row of data to process
  var numRows = 1; // Numero di destinatari
  
  var startCol = 2; //first colum for names
  var numCol = 3;
  
  var dataRange = sheet.getRange(startRow, startCol, numRows, numCol);
  
  var data = dataRange.getValues();

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var firstSheet = ss.getSheets()[0];
  var myName = firstSheet.getName();
  
  for (var i in data) {
    var row = data[i];
    var emailAddress = row[0];
    var subject = row[1];
    var message = myName;
    var emailSent = row[4]; 
    MailApp.sendEmail(emailAddress, subject, message);  
  }




}