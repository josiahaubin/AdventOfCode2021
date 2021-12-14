const fsp = require("fs").promises;
const path = require("path");

main();

async function main() {
    let input = await parseInput();
    console.log("Part One:", partOne(input));
    console.log("Part Two:", partTwo(input));
}

async function parseInput() {
    const rawInput = await fsp.readFile(path.resolve(__dirname, "day-7-input.txt"), "utf8");
    const input = rawInput.split(",").map((x) => parseInt(x));
    console.log(input);
    return input;
}

function partOne(input) {
    let sumArr = [];
    let reducer = (accumulator, curr) => accumulator + curr;

    for (let i = 0; i < input.length; i++) {
        let distanceArr = [];
        const horizontalPosition = input[i];

        for (let index = 0; index < input.length; index++) {
            const postion = input[index];
            if (i == index) { continue; }
            let distance = Math.abs(horizontalPosition - postion);
            distanceArr.push(distance);
        }

        let leastDistanceVal = distanceArr.reduce(reducer);
        sumArr.push(leastDistanceVal)
    }

    return Math.min(...sumArr);
}

function partTwo(input) {
    let sumArr = [];
    let reducer = (accumulator, curr) => accumulator + curr;

    for (let i = 0; i < input.length; i++) {
        let distanceArr = [];
        const horizontalPosition = input[i];

        for (let index = 0; index < input.length; index++) {
            const postion = input[index];
            let distance = Math.abs(horizontalPosition - postion) * (1 + Math.abs(horizontalPosition - postion)) / 2;
            distanceArr.push(distance);
        }

        let leastDistanceVal = distanceArr.reduce(reducer);
        sumArr.push(leastDistanceVal)
    }

    return Math.min(...sumArr);
}