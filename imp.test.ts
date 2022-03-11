// import * as galaxy  from './improve';
// var galaxy = require('./improve');
type GenericObject = { [key: string]: string };
type GenericObjectWithNumValue = { [key: string]: number };
let UniversRoman = {} as GenericObject;
let MetalInt = {} as GenericObjectWithNumValue;
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


describe("galaxy improve", function () {

    it("should check the transfer from roman to integer", () => {
        expect(MerchantGalaxy.romanToInt(["MCMIII"])).toEqual(1903);
    })

    it("should check the getInfo function", () => {
        expect(MerchantGalaxy.getUnitOfGalaxy(["glob", "is", "I"])).toEqual({ glob: 'I' });
    })

    it("should check the checkQuestions function", () => {
        expect(MerchantGalaxy.checkQuestions(["how", "much", "is", "glob", "?"])).toEqual("glob is 1")
    })
});

class MerchantGalaxy {
    static getUnitOfGalaxy(line: string[]) {
        let findRoman = romanInit.indexOf(splitLine[splitLine.length - 1]);
        if (findRoman !== -1) {
            UniversRoman[line[0]] = line[2];
        }
        // console.log(UniversRoman);
        return UniversRoman;
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
        let result: string = "";
        let findStringIs = splitLine.indexOf('is');
        //How Much  
        if (splitLine.indexOf('much') !== -1) {
            let stringLen = splitLine.length - findStringIs - 2; //(total lenght -1 + startPos -1) 
            let sliceArray = splitLine.splice(findStringIs + 1, stringLen);

            let tValue = this.romanToInt(sliceArray);
            if (tValue > 0) {
                console.log(sliceArray.join(' ') + ' is ' + tValue);
                result = sliceArray.join(' ') + ' is ' + tValue;
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
                console.log(sliceArray.join(' ') + ' ' + creditUnit + ' is ' + tValue + ' credits');
                result = sliceArray.join(' ') + ' ' + creditUnit + ' is ' + tValue + ' credits';
            }
            else {
                console.log("I have no idea what you are talking about");
                result = "I have no idea what you are talking about";
            }
        }
        return result;
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