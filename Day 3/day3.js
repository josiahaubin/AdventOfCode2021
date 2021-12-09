const fsp = require("fs").promises;
const path = require("path");

main();

async function main() {
    let arr = await parseInput();
    let input = arr.map(ea => ea.replace('\r', ''))
    console.log("Part One:", partOne(input));
    console.log("Part Two:", partTwo(input));
}

async function parseInput() {
    const rawInput = await fsp.readFile(path.resolve(__dirname, "day-3-input.txt"), "utf8");
    const input = rawInput.split("\n");
    console.log(input);
    return input;
}

function calculateHighestCount(bitArray) {
    let oneCounter = 0;
    let zeroCounter = 0;

    for (let i = 0; i < bitArray.length; i++) {
        const bit = bitArray[i];
        if (bit == '1') {
            oneCounter++
        } else {
            zeroCounter++
        }
    }

    if (oneCounter > zeroCounter) {
        return '1'
    } else if (zeroCounter > oneCounter) {
        return '0'
    } else if (zeroCounter == oneCounter) {
        return '1'
    }
}

function getBits(bitIndex, input) {
    let bitArray = [];
    for (let i = 0; i < input.length; i++) {
        const bitString = input[i];
        bitArray.push(bitString[bitIndex])
    }

    return calculateHighestCount(bitArray)
}

function generateFrequency(input){
    return input.reduce((out, curr) => {
      const digits = curr.split("");
      if (out.length > 0) {
        const newOut = out.map((digitObj, digitIndex) => {
          return { ...digitObj, [digits[digitIndex]]: digitObj[digits[digitIndex]] + 1 };
        });
        return newOut;
      } else {
        return digits
          .map((_) => {
            return { "0": 0, "1": 0 };
          })
          .map((digitObj, digitIndex) => {
            return { ...digitObj, [digits[digitIndex]]: 1 };
          });
      }
    }, []);
  }

function partOne(input) {
    let gammaRate = '';
    let epsilonRate = '';
    let bitIndex = 0;

    while (bitIndex < 12) {
        let bit = getBits(bitIndex, input);

        if (bit == '1') {
            gammaRate += bit;
            epsilonRate += '0';
        }
        else if (bit == '0') {
            gammaRate += bit;
            epsilonRate += '1';
        }

        bitIndex++
    }

    return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
}

function partTwo(input) {
    const genBin = progressiveFilter("0", "1")
    const scrubBin = progressiveFilter("1", "0")

    const genDigit = parseInt(genBin, 2);
    const scrubDigit = parseInt(scrubBin, 2);

    return genDigit * scrubDigit;

    function progressiveFilter(passNum, failNum) {
        let newArr = input;
        let digit = 0;
        while (newArr.length > 1) {
            const freq = generateFrequency(newArr);
            const digitCount = freq[digit];
            newArr = newArr.filter((num) => num[digit] === (digitCount["0"] > digitCount["1"] ? passNum : failNum));
            digit++;
        }

        return newArr[0];
    }
}
