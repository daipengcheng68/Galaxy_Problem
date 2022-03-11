import * as readline from 'readline';
import * as fs from 'fs';
// let fs = require('fs');
// let readLine = require('readline');
type GenericObject = { [key: string]: string }
type GenericObjectWithNumValue = { [key: string]: number }
let UniversRoman = {} as GenericObject;
let MetalInt = {} as GenericObjectWithNumValue;

/* ReadStream Interface to catch new line event */
let read = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    terminal: false
});

let romanInit = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];

const romanVal: GenericObjectWithNumValue = {
    'M': 1000,
    'D': 500,
    'C': 100,
    'X': 10,
    'L': 50,
    'V': 5,
    'I': 1,
};
let splitLine: string[] = [];

read.on('line', (line) => {
    splitLine = line.split(/\s+/);
    if (splitLine[splitLine.length - 1] !== "?") {       // for conditions  // use two equals after ! 
        // could use "switch"
        if (romanInit.indexOf(splitLine[splitLine.length - 1]) !== -1) {
            MerchantGalaxy.getUnitOfGalaxy(splitLine);
        }
        else if (splitLine[splitLine.length - 1] === 'Credits') {
            MerchantGalaxy.getUnitPriceInGalaxy(splitLine);
        }
        else {
            console.log(" I have no idea about that");
        }
        // getInfo(con);
    } else {                                // for questions
        MerchantGalaxy.checkQuestions(splitLine);
    }
});


export class MerchantGalaxy {
    construtor(){ }
    static getUnitOfGalaxy(line: string[]) {
        let findRoman = romanInit.indexOf(splitLine[splitLine.length - 1]);
        if (findRoman !== -1) {
            UniversRoman[line[0]] = line[2];
        }
        // console.log(UniversRoman);
    }

    static getUnitPriceInGalaxy(line: string[]) {
        let findIsInLine = line.indexOf('is');
        let creditValue: number = Number(line[findIsInLine + 1]);
        let sliceArray = line.splice(0, findIsInLine);
        let creditUnit = sliceArray.pop(); // devide the final element to get the univers unit for counting

        let intVal = this.romanToInt(sliceArray);
        if (intVal !== -1) {
            intVal = creditValue / intVal;
            MetalInt[creditUnit!] = intVal;
        }
    }

    static checkQuestions(splitLine: string[]) {
        
        let findStringIs = splitLine.indexOf('is');
        //How Much  
        if (splitLine.indexOf('much') !== -1) {
            let stringLen = splitLine.length - findStringIs - 2; //(total lenght -1 + startPos -1) 
            let sliceArray = splitLine.splice(findStringIs + 1, stringLen);

            let tValue = this.romanToInt(sliceArray);
            if (tValue > 0) {
                console.log(sliceArray.join(' ') + ' is ' + tValue);
            }
            else {
                console.log("I have no idea what you are talking about");
            }

        }

        //How Many
        if (splitLine.indexOf('many') !== -1) {
            let stringLen = splitLine.length - findStringIs - 2;
            let sliceArray = splitLine.splice(findStringIs + 1, stringLen);
            let creditUnit = sliceArray.pop();
            let tValue = this.romanToInt(sliceArray);

            tValue *= MetalInt[creditUnit!];
            if (tValue > 0) {
                console.log(sliceArray.join(' ') + ' ' + creditUnit + ' is ' + tValue + ' credits')
            }
            else {
                console.log("I have no idea what you are talking about");
            }
        }
    }

    static romanToInt(sliceArray: string[]) {
        var findRoman = "";
        var romanNum = [];
        // var finalValue = 0;
        for (var i = 0; i < sliceArray.length; i++) {
            //if (UniversRoman[sliceArray[i]]) { 
            if (UniversRoman.hasOwnProperty(sliceArray[i])) {
                findRoman += UniversRoman[sliceArray[i]];
                romanNum.push(UniversRoman[sliceArray[i]]);
            }
        }
        let result: number = 0;
        let a: number = 0;
        let b: number = 0;
        for (let i = 0; i < findRoman.length; i++) {

            if (romanVal.hasOwnProperty(findRoman[i])) {
                a = romanVal[findRoman[i]]!;
                //let a = Object.keys(romanVal).find(findRoman[i])
            }
            if (romanVal.hasOwnProperty(findRoman[i + 1])) {
                b = romanVal[findRoman[i + 1]]!;
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
}
