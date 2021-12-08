const fsp = require("fs").promises;
const path = require("path");

main();

async function main() {
    let arr = await parseInput();
    let arrSplit = arr.map(ea => ea.split(" "));
    let input = cleanData(arrSplit);
    console.log("Part One:", partOne(input));
    console.log("Part Two:", partTwo(input));
}

async function parseInput() {
    const rawInput = await fsp.readFile(path.resolve(__dirname, "day-2-input.txt"), "utf8");
    const input = rawInput.split("\n");
    //console.log(input);
    return input;
}

function cleanData(input) {
    for (let i = 0; i < input.length; i++) {
        const item = input[i];
        let num = item[1];
        let newNum = Number(num);
        input[i][1] = newNum;
    }
    return input;
}

function partOne(input) {
    let horizontalPosition = 0;
    let verticalPostion = 0;

    for (let i = 0; i < input.length; i++) {
        const directionArr = input[i];
        let movementDirection = directionArr[0];
        let speed = directionArr[1];

        if (movementDirection == "forward") {
            horizontalPosition = horizontalPosition + speed;
        }
        if (movementDirection == "down") {
            verticalPostion = verticalPostion + speed;
        }
        if (movementDirection == "up") {
            verticalPostion = verticalPostion - speed;
        }
    }

    return horizontalPosition * verticalPostion;
}

function partTwo(input) {
    let horizontalPosition = 0;
    let depth = 0;
    let aim = 0;
    for (let i = 0; i < input.length; i++) {
        const directionArr = input[i];
        let movementDirection = directionArr[0];
        let speed = directionArr[1];

        if (movementDirection == "forward") {
            horizontalPosition = horizontalPosition + speed;
            depth = depth + (aim * speed);
        }
        if (movementDirection == "down") {
            aim = aim + speed;
        }
        if (movementDirection == "up") {
            aim = aim - speed;
        }
    }

    return horizontalPosition * depth
}