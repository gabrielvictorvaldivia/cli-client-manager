import {v4 as uuid} from 'uuid';

const customers = [];

export function save(client) {
    const id = uuid();

    customers.push({id, ...client});

    console.log(`Client registered successfully.`);
    return id;
}

export function getAll() {
    return customers;
}