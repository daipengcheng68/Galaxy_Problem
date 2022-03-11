var fs = require('fs');
var readLine = require('readline');
var UniversRoman = {};
var MetalInt = {};
/* ReadStream Interface to catch new line event */
var read = readLine.createInterface({
    input: fs.createReadStream('./input.txt'),
    terminal: false
});
var romanInit = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
var romanVal = {
    'M': 1000,
    'D': 500,
    'C': 100,
    'X': 10,
    'L': 50,
    'V': 5,
    'I': 1
};
var splitLine = [];
read.on('line', function (line) {
    splitLine = line.split(/\s+/);
    if (splitLine[splitLine.length - 1] !== "?") { // for conditions  // use two equals after ! 
        // could use "switch"
        if (romanInit.indexOf(splitLine[splitLine.length - 1]) !== -1) {
            getUnitOfGalaxy(splitLine);
        }
        else if (splitLine[splitLine.length - 1] === 'Credits') {
            getUnitPriceInGalaxy(splitLine);
        }
        else {
            console.log(" I have no idea about that");
        }
        // getInfo(con);
    }
    else { // for questions
        checkQuestions(splitLine);
    }
});
function getUnitOfGalaxy(line) {
    var findRoman = romanInit.indexOf(splitLine[splitLine.length - 1]);
    if (findRoman !== -1) {
        UniversRoman[line[0]] = line[2];
    }
    // console.log(UniversRoman);
}
function getUnitPriceInGalaxy(line) {
    var findIsInLine = line.indexOf('is');
    var creditValue = line[findIsInLine + 1];
    var sliceArray = line.splice(0, findIsInLine);
    var creditUnit = sliceArray.pop(); // devide the final element to get the univers unit for counting
    var intVal = romanToInt(sliceArray);
    if (intVal !== -1) {
        intVal = creditValue / intVal;
        MetalInt[creditUnit] = intVal;
    }
}
function checkQuestions(splitLine) {
    var findStringIs = splitLine.indexOf('is');
    //How Much  
    if (splitLine.indexOf('much') !== -1) {
        var stringLen = splitLine.length - findStringIs - 2; //(total lenght -1 + startPos -1) 
        var sliceArray = splitLine.splice(findStringIs + 1, stringLen);
        var tValue = romanToInt(sliceArray);
        if (tValue > 0) {
            console.log(sliceArray.join(' ') + ' is ' + tValue);
        }
        else {
            console.log("I have no idea what you are talking about");
        }
    }
    //How Many
    if (splitLine.indexOf('many') !== -1) {
        var stringLen = splitLine.length - findStringIs - 2;
        var sliceArray = splitLine.splice(findStringIs + 1, stringLen);
        var creditUnit = sliceArray.pop();
        var tValue = romanToInt(sliceArray);
        tValue *= MetalInt[creditUnit];
        if (tValue > 0) {
            console.log(sliceArray.join(' ') + ' ' + creditUnit + ' is ' + tValue + ' credits');
        }
        else {
            console.log("I have no idea what you are talking about");
        }
    }
}
function romanToInt(sliceArray) {
    var findRoman = "";
    var romanNum = [];
    // var finalValue = 0;
    for (var i = 0; i < sliceArray.length; i++) {
        if (UniversRoman[sliceArray[i]]) {
            findRoman += UniversRoman[sliceArray[i]];
            romanNum.push(UniversRoman[sliceArray[i]]);
        }
    }
    var result = 0;
    for (var i_1 = 0; i_1 < findRoman.length; i_1++) {
        if (romanVal[findRoman[i_1]]) {
            var a = romanVal[findRoman[i_1]];
        }
        if (romanVal[findRoman[i_1 + 1]]) {
            var b = romanVal[findRoman[i_1 + 1]];
        }
        if (a < b) {
            result += (b - a);
            i_1 += 1;
        }
        else {
            result += a;
        }
    }
    return result;
}
