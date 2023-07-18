import { body, checkSchema } from 'express-validator';

const dev_prototype = [
    body('name').trim().escape().isAlphanumeric('it-IT', {ignore: ' '}),
    body('components').trim().escape().isAlphanumeric('it-IT', {ignore: ' '})
]

export default dev_prototype

const prototypeSchema = () => {
    return checkSchema({
    name: { 
        trim: true,
        escape: true,
        isAlphanumeric: { options: ['it-IT', {ignore: ' '}] },
        errorMessage: "Alphanumeric field"  
    },
    components: {
        trim: true,
        escape: true,
        isAlphanumeric: true,
        errorMessage: "Alphanumeric field"
    }    
})
}