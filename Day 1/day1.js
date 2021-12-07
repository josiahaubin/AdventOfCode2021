const fsp = require("fs").promises;
const path = require("path");

main();

async function main() {
    let arr = await parseInput();
    let nums = arr.map(ea => Number(ea))
    console.log("Part One:", partOne(nums));
    console.log("Part Two:", partTwo(nums));
}

async function parseInput() {
    const rawInput = await fsp.readFile(path.resolve(__dirname, "day-1-input.txt"), "utf8")
    const input = rawInput.split("\n")
    //console.log(input)
    return input
}

function partOne(arr) {
    let total = 0;
    for (let i = 0; i <= arr.length; i++) {
        const currentDepth = arr[i];
        const previousDepth = arr[i - 1]

        if (i == 0) {
            continue;
        } else {
            if (currentDepth > previousDepth) {
                total++;
            }
        }
    }
    return total;
}

function partTwo(arr) {
    let total = 0;
    for (let i = 0; i <= arr.length; i++) {
        const p1Depth = arr[i];
        const p2Depth = arr[i + 1];
        const p3Depth = arr[i + 2];
        const n1Depth = p2Depth;
        const n2Depth = p3Depth;
        const n3Depth = arr[i + 3]

        if ((i + 2) > arr.length) {
            return total;
        }

        let firstSum = p1Depth + p2Depth + p3Depth;
        let secondSum = n1Depth + n2Depth + n3Depth;

        if (secondSum > firstSum) {
            total++
        }
    }
}