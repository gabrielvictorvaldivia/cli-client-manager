import readline from 'node:readline/promises'
import {stdin, stdout} from 'node:process'

const input = stdin;
const output = stdout;


async function runMenu() {

    const rl = readline.createInterface({input, output});

    console.log("Menu:");
    console.log("1 - Register customer");
    console.log("2 - List customers")
    console.log("3 - Exit")

    const answer = await rl.question("What you want to do ? ")

    if (answer === '3') {
        console.log("Thanks for you.");
        process.exit(0);
    } else
        console.log(`You chose: ${answer}`);
}

runMenu().finally();