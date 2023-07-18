import { body, checkSchema } from 'express-validator';

const operation = [
    body('employees').trim().escape().isAlphanumeric('it-IT', {ignore: ' '}),
    body('systems').trim().escape().isAlphanumeric('it-IT', {ignore: ' '}),
    body('description').trim().escape(),
    body('type').trim().escape().isAlpha('it-IT', {ignore: ' '}),
]

export default operation

const operationSchema = () => {
    return checkSchema({
    employees: { 
        trim: true,
        escape: true,
        isAlphanumeric: true,
        errorMessage: "Alphanumeric field"  
    },
    system: {
        trim: true,
        escape: true,
        isAlphanumeric: true,
        errorMessage: "Alphanumeric field"
    },
    description: {
        trim: true,
        escape: true
    },
    type: { 
        trim: true,
        escape: true,
        isAlpha: { options: ['it-IT', {ignore: ' '}] },
        errorMessage: "Letters only"
    }
})
}