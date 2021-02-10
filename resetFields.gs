function resetFields(){
    
    var N_SHEET = 4;
    var DEFAULT_LINE = "";

    var allSheets = SpreadsheetApp.getActiveSpreadsheet();  //open Spreadsheet
    var sheet = allSheets.getSheets()[N_SHEET - 1];   //get the N_SHEET sheet

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

    sheet.getRange(2, 7, 6, 1).setValue(DEFAULT_LINE);
    sheet.getRange(2, 8).setValue(false);


}