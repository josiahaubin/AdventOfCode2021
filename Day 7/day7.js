const fsp = require("fs").promises;
const path = require("path");

main();

async function main() {
    let input = await parseInput();
    console.log("Part One:", partOne(input));
    // console.log("Part Two:", partTwo(input));
}

async function parseInput() {
    const rawInput = await fsp.readFile(path.resolve(__dirname, "day-7-input.txt"), "utf8");
    const input = rawInput.split(",").map((x) => parseInt(x));
    console.log(input);
    // return input;
}

function partOne(input) {
    //use absolute value, at each index, check abs value from all other and sum them together, push into new array. then find lowest val of that array

    //https://stackoverflow.com/questions/24909371/move-item-in-array-to-last-position
}