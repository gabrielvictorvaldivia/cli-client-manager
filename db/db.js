import { v4 as uuid } from 'uuid';
import fs from 'fs';

const filePath = 'db.json';

export function save(client) {
    const customers = getAll();

    const id = uuid();
    customers.push({ id, ...client });

    fs.writeFileSync(filePath, JSON.stringify(customers, null, 2));

    console.log('Client registered successfully.');
    return id;
}

export function getAll() {
    if (!fs.existsSync(filePath)) {
        return [];
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}