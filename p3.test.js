let child = require('child_process').exec;
const RomanInt = {
    'M': 1000,
    'D': 500,
    'C': 100,
    'X': 10,
    'L': 50,
    'V': 5,
    'I': 1,
};
var UniversRoman = {};
var MetalInt = {};

describe("galaxy", function () {

    it("should check the transfer from roman to integer", () => {
        expect(romanToInt("MCMIII")).toEqual(1903);
    })

    it("should check the getInfo function", () => {
        expect(getInfo(["glob", "is", "I"])).toEqual({ glob: 'I' });
    })

    it("should check the checkQuestions function", () => {
        expect(checkQuestions(["how", "much", "is", "glob", "?"])).toEqual("glob is 1")
    })
});

function checkQuestions(con) {
    let UR = [];
    let result1;
    let ou = [];
    let op;
    let metal;
    let r;
    if (UniversRoman[con[con.length - 2]]) {
        for (let q = 0; q < con.length - 2; q++) {
            if (con[q] == 'is') {
                for (let k = q + 1; k < con.length - 1; k++) {
                    UR[k - q - 1] = UniversRoman[con[k]];
                    ou[k-q-1] = con[k];
                }
                result1 = romanToInt(UR);
                op = ou.join(" ");
                r = (op + " is " +result1);
            }
        }
        return r;
    }

    else if (MetalInt[con[con.length - 2]]) {
        metal = con[con.length -2];
        for (let q = 0; q < con.length - 1; q++) {
            if (con[q] == 'is') {
                for (let tem = q + 1; tem < con.length - 2; tem++) {
                    if (UniversRoman[con[tem]]) {
                        UR[tem - q - 1] = UniversRoman[con[tem]];
                        ou[tem-q-1] = con[tem];
                    }
                }
                result1 = romanToInt(UR) * MetalInt[con[con.length - 2]];
                op = ou.join(" ");
                r = (op + " " + metal + " is " + result1 + " Credits");
                return r;
            }
        }
    }
    else {
        console.log("I have no idea what you are talking about.")
        result1 = "I have no idea what you are talking about.";
        return result1;
    }
    
}


function getInfo(con) {

    if (RomanInt[con[con.length - 1]]) {
        UniversRoman[con[0]] = con[con.length - 1];// glob: 'I'
        return UniversRoman;
    }
    else if (con[con.length - 1] == "Credits") {
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
        console.log(Credits);
        console.log(a);
        MetalInt[con[unk]] = Credits / b;
        return MetalInt;
    }

}


function romanToInt(roman) {
    let result = 0;
    for (let i = 0; i < roman.length; i++) {

        if (RomanInt[roman[i]]) {
            var a = RomanInt[roman[i]];
        }
        if (RomanInt[roman[i + 1]]) {
            var b = RomanInt[roman[i + 1]];
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


