import readline from 'node:readline/promises';
import {stdin, stdout} from 'node:process';
import axios from "axios";

const input = stdin;
const output = stdout;
const rl = readline.createInterface({input, output});

const customers = [];

async function getAddress(postalCode) {
    /*
        {
            "cep": "89010025",
            "state": "SC",
            "city": "Blumenau",
            "neighborhood": "Centro",
            "street": "Rua Doutor Luiz de Freitas Melro",
            ...
        }
     */
    const {data: {cep, state, city, neighborhood, street}} =
        await axios.get(`https://brasilapi.com.br/api/cep/v2/${postalCode}`);

    return {cep, state, city, neighborhood, street};
}

async function listCustomers() {
    console.clear();
    console.log(customers);
    await rl.question("Press 'Enter' to continue...")
    runMenu()
}

async function startRegistration() {
    console.clear();

    const name = await rl.question('Which is the customer name ? ');

    const postalCode = await rl.question('Which is the customer postal code? ? ');
    const address = await getAddress(postalCode);

    const id = customers.length > 0
        ? customers[customers.length - 1].id + 1
        : 1;

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