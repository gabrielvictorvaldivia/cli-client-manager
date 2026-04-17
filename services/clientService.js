import {save} from '../db/db.js'

function registerClient(customer) {
    return save(customer)
}

export default registerClient