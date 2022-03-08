let fs = require('fs');
let readLine = require('readline');

var UniversRoman = {};
var MetalInt = {};

/* ReadStream Interface to catch new line event */
let read = readLine.createInterface({
    input: fs.createReadStream('./input.txt'),
    terminal: false
});

let romanInit = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];

const romanVal = {
    'M': 1000,
    'D': 500,
    'C': 100,
    'X': 10,
    'L': 50,
    'V': 5,
    'I': 1,
};
let splitLine = []

read.on('line', (line) => {
    //console.log(line.trim())
    let conditionArr = line.split(' ');
    splitLine = line.split(/\s+/);
    if (splitLine[splitLine.length - 1] !== "?") {       // for conditions// use two equals after !

        if (romanInit.indexOf(splitLine[splitLine.length - 1]) !== -1) {
            currenyOfGalaxy(splitLine);
        }
        else if (splitLine[splitLine.length - 1] === 'Credits') {
            unitsOfGalaxy(splitLine);
        }
        // getInfo(con);
    } else {                                // for questions
        checkQuestions(conditionArr);
    }
});

function currenyOfGalaxy(line) {
    let findRoman = romanInit.indexOf(splitLine[splitLine.length - 1]);
    if (findRoman !== -1) {
        UniversRoman[line[0]] = line[2];
    }
    console.log(UniversRoman);
}

function unitsOfGalaxy(line) {
    /// here i have changed whole logic test it once

    /** else if (con[con.length - 1] == "Credits") {
            let Credits = parseInt(con[con.length - 2], 10);
            let a = [];
            let unk = 0;
            for (let j = 0; j < 3; j++) {
                let tem = 0;
                if (UniversRoman[con[j]]) {
                    a[j - tem] = UniversRoman[con[j]];
                } else {
                    unk = j;
                    tem++;
                }
            }
            let b = romanToInt(a);
            MetalInt[con[unk]] = Credits / b;
        }
    	
        **/

    let findIsInLine = line.indexOf('is');
    let creditValue = line[findIsInLine + 1];
    let sliceArray = line.splice(0, findIsInLine);
    let creditUnit = sliceArray.pop();

    var findRoman = "";
    var romanNum = [];
    // var finalValue = 0;

    for (var i = 0; i < sliceArray.length; i++) {
        if (UniversRoman[sliceArray[i]]) {
            findRoman += UniversRoman[sliceArray[i]];
            romanNum.push(UniversRoman[sliceArray[i]]);
        }
    }
    // console.log(cRoman, "cRoman")
    // console.log(cRomanArr, "cRomanArr")
    let intVal = romanToInt(findRoman);
    if (intVal !== -1) {
        intVal = creditValue / intVal;
        MetalInt[creditUnit] = intVal;
    }
}

function checkQuestions(con) {
    let UR = [];
    let result1;
    let ou = [];
    let op;
    let metal;

    console.log(MetalInt)
    if (UniversRoman[con[con.length - 2]]) {
        for (let q = 0; q < con.length - 2; q++) {
            if (con[q] === 'is') {
                for (let k = q + 1; k < con.length - 1; k++) {
                    UR[k - q - 1] = UniversRoman[con[k]];
                    ou[k - q - 1] = con[k];
                }
                result1 = romanToInt(UR);
                op = ou.join(" ");
                console.log(op + " is " + result1);
            }
        }
    }

    else if (MetalInt[con[con.length - 2]]) {
        metal = con[con.length - 2];
        for (let q = 0; q < con.length - 1; q++) {
            if (con[q] === 'is') {
                for (let tem = q + 1; tem < con.length - 2; tem++) {
                    if (UniversRoman[con[tem]]) {
                        UR[tem - q - 1] = UniversRoman[con[tem]];
                        ou[tem - q - 1] = con[tem];
                    }
                }
                result1 = romanToInt(UR) * MetalInt[con[con.length - 2]];
                op = ou.join(" ");
                console.log(op + " " + metal + " is " + result1 + " Credits");
            }
        }
    }
    else {
        console.log("I have no idea what you are talking about.")
    }
}

function romanToInt(roman) {
    let result = 0;
    for (let i = 0; i < roman.length; i++) {

        if (romanVal[roman[i]]) {
            var a = romanVal[roman[i]];
        }
        if (romanVal[roman[i + 1]]) {
            var b = romanVal[roman[i + 1]];
        }
        if (a < b) {
            result += (b - a);
            i += 1;
        } else {
            result += a;
        }
    }
    return result;
}