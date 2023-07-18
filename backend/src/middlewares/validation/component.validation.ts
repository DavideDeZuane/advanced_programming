import { body, checkSchema } from 'express-validator';

const componentV = [
    body('name').trim().escape().isAlphanumeric('it-IT', {ignore: ' '}),
    body('type').trim().escape().isAlpha('it-IT', {ignore: ' '}),
    body('description').trim().escape(),
    body('price').trim().escape().isNumeric(),
]

export default componentV

const componentSchema = () => {
    return checkSchema({
    name: { 
        trim: true,
        escape: true,
        isAlphanumeric: { options: ['it-IT', {ignore: ' '}] },
        errorMessage: "Alphanumeric field"  
    },
    type: {
        trim: true,
        escape: true,
        isAlpha: { options: ['it-IT', {ignore: ' '}] },
        errorMessage: "Letters only"
    },
    description: { 
        trim: true,
        escape: true
    },
    price: {
        trim: true,
        escape: true,
        isNumeric: true,
        errorMessage: "Numeric field"
    }
    
})
}