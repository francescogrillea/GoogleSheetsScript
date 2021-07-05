/*
    copy the value of sheet_index[row_index][col_index] in the current cell

    sheet_index starts from 0
    row_index   starts from 1
    col_index   starts from 1
*/


function copyField (sheet_index, row_index, col_index){

    if(arguments.length != 3) 
        return "Error. Use copyFiled(sheet_index;row_index;col_index)"
    
    var allSheets = SpreadsheetApp.getActiveSpreadsheet();
    var inputSheet = allSheets.getSheets()[sheet_index];

    var myData = inputSheet.getRange(row_index, col_index).getValue();

    if(myData == "-")
        myData = 0;

    return myData;
}