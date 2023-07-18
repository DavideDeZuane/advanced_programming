import { body, checkSchema } from 'express-validator';

const system = [
    body('name').trim().escape().isAlphanumeric('it-IT', {ignore: ' '}),
    body('devices').trim().escape().isAlphanumeric(),
    body('address').trim().escape().isAlphanumeric('it-IT', {ignore: ' '}),
    body('client').trim().escape().isAlphanumeric()
]

export default system

const systemSchema = () => {
    return checkSchema({
    name: { 
        trim: true,
        escape: true,
        isAlphanumeric: { options: ['it-IT', {ignore: ' '}] },
        errorMessage: "Alphanumeric field"  
    },
    devices: {
        trim: true,
        escape: true,
        isAlphanumeric: true,
        errorMessage: "Alphanumeric field"
    },
    address: {
        trim: true,
        escape: true,
        isAlphanumeric: true,
        errorMessage: "Alphanumeric field"
    },
    client: { 
        trim: true,
        escape: true,
        isAlphanumeric: { options: ['it-IT', {ignore: ' '}] },
        errorMessage: "Alphanumeric field"
    }
})
}