import { body, checkSchema } from 'express-validator';

const file = [
    body('name').trim().escape().isAlphanumeric('it-IT', {ignore: ' '}),
    body('device').trim().escape().isAlphanumeric('it-IT', {ignore: ' '}),
    body('fileType').trim().escape().isAlpha(),
    body('description').trim().escape(),
]

export default file

const fileSchema = () => {
    return checkSchema({
    name: { 
        trim: true,
        escape: true,
        isAlphanumeric: { options: ['it-IT', {ignore: ' '}] },
        errorMessage: "Alphanumeric field"  
    },
    device: {
        trim: true,
        escape: true,
        isAlphanumeric: true,
        errorMessage: "Alphanumeric field"
    },
    fileType: { 
        trim: true,
        escape: true,
        isAlpha: true,
        errorMessage: "Letters only"
    },
    description: {
        trim: true,
        escape: true
    }
})
}