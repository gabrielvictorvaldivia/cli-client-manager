import readline from 'node:readline/promises';
import {stdin, stdout} from 'node:process';
import {v1 as uuidv4} from 'uuid';
import {getAddressByPostalCode} from "./providers/brasilApiClient.js";
import postalCodeValidator from "./util/validation/postalCodeValidator.js";
import nameValidator from "./util/validation/nameValidator.js";

const input = stdin;
const output = stdout;
const rl = readline.createInterface({input, output});

const customers = [];

async function promptInput(question, errorMessage, validatorCallback) {
    let answer = undefined
    while (true) {
        try {
            answer = await rl.question(question)

            if (!validatorCallback(answer)) {
                console.log(errorMessage)
                await rl.question("Press 'Enter' to retry...")
            } else {
                return answer
            }
        } catch (error) {
            console.error(error.message)
            await rl.question("Press 'Enter' to retry...")
        }
    }
}

async function listCustomers() {
    console.clear();
    console.log(customers);
    await rl.question("Press 'Enter' to continue...")
    runMenu()
}

async function startRegistration() {
    console.clear();

    const id = uuidv4();

    const name = await promptInput('Which is the customer name ? ', "You must give a valid name.", nameValidator)

    const postalCode = await promptInput('What is the customer postal code? ', "Invalid postal code. Please enter exactly 8 digits.", postalCodeValidator);
    const address = await getAddressByPostalCode(postalCode);

    customers.push({id, name, ...address});

    console.log(`Customer registered successfully.`);

    await rl.question("Press 'Enter' to continue...")
    runMenu()
}

async function runMenu() {
    console.clear();

    console.log("Menu:");
    console.log("1 - Register customer");
    console.log("2 - List customers")
    console.log("3 - Exit")

    const answer = await rl.question("What you want to do ? ");

    switch (answer) {
        case '1':
            startRegistration();
            break;
        case '2':
            listCustomers();
            break;
        case '3':
            process.exit(0);
            break;
        default:
            await rl.question("Invalid option. Press 'Enter' to try again..");
            runMenu();
    }
}

runMenu()