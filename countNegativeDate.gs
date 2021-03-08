/*
    Read two date arrays A and B and returns the number of
    time that A[i] < B[i]
*/


function countNegativeDates (A, B){

    if(arguments.length != 2) 
        return "Error. Pass the two date sequences as argument"

    if(A.length != B.length)
        return "Error. Select valid dates"

    var escape = ["", "?"];
    var counter = 0;

    for (var i = 0; i < A.length; i++){

        if(escape.includes(B[i]) == true)
            continue;

        var a_date = new Date(A[i]);
        var b_date = new Date(B[i]);

        if(a_date < b_date)
            counter++;
    }

    return counter;
}