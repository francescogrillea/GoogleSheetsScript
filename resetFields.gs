function resetFields(){
    
    var sheet_name = "MailSystem";
    var DEFAULT_LINE = "";

    var allSheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();  //open Spreadsheet
    var sheet = null;
    for(var i = 0; i < allSheets.length; i++){
        if (allSheets[i].getName() == sheet_name){
            sheet = allSheets[i];
        }
    }

    var startRow = 1;   //Be careful: starts from 1
    var numRows = 8; 
    var startCol = 1;
    var numCol = 8;

    var dataRange = sheet.getRange(startRow, startCol, numRows, numCol);
    var data = dataRange.getValues();
  
    var mustSend = data[1][7];  
    if(mustSend == false)
        return;

    //wait 5seconds
    Utilities.sleep(5000)

    sheet.getRange(2, 7, 5, 1).setValue(DEFAULT_LINE);
    sheet.getRange(2, 8).setValue(false);


}