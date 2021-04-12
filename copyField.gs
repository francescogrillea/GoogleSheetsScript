/*
    copy the value of sheetIndex[row_index_src][col_index_src] in the current cell
*/


function copyField (row_index_src, col_index_src){

    if(arguments.length != 2) 
        return "Error. Pass the two date sequences as argument"

    var sheetIndex = 0;
    
    var allSheets = SpreadsheetApp.getActiveSpreadsheet();
    var inputSheet = allSheets.getSheets()[sheetIndex];

    var myData = inputSheet.getRange(row_index_src, col_index_src).getValue();

    return myData;
}