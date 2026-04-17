import {save, getAll} from '../db/db.js'

export function registerClient(customer) {
    return save(customer)
}

export function listClients() {
    const formatCep = (cep) =>
        cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");

    const customers = getAll();

    for (let i = 0; i < customers.length; i++) {
        const customer = customers[i];
        const address = `${customer.street}, ${customer.neighborhood}, ${customer.city} - ${customer.state}, CEP: ${formatCep(customer.cep)}`;

        console.log(`${customer.name} | ${address}`)
    }
}