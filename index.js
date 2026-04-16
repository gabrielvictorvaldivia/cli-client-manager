import readline from 'node:readline/promises';
import {stdin, stdout} from 'node:process';
import axios from "axios";
import {v1 as uuidv4} from 'uuid';
import postalCodeValidator from "./util/validation/postalCodeValidator.js";
import {getAddressByPostalCode} from "./providers/brasilApiClient.js";

const input = stdin;
const output = stdout;
const rl = readline.createInterface({input, output});

const customers = [];

async function promptInput(questionMessage, rl, validatorCallback) {
    while (true) {
        try {
            const data = await rl.question(questionMessage)
            const {passed, message} = await validatorCallback(data)

            if (!passed) {
                console.log(message)
                await rl.question("Press 'Enter' to retry...")
            } else {
                return data
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

    const name = await rl.question('Which is the customer name ? ');

    const postalCode = await promptInput('What is the customer postal code? ', rl, postalCodeValidator);
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