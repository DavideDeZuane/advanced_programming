import { body, checkSchema } from 'express-validator';

const device = [
    body('name').trim().escape().isAlphanumeric('it-IT', {ignore: ' '}),
    //body('prototype').trim().escape().isAlphanumeric('it-IT', {ignore: ' '})
    
]

export default device

const deviceSchema = () => {
    return checkSchema({
    name: { 
        trim: true,
        escape: true,
        isAlphanumeric: { options: ['it-IT', {ignore: ' '}] },
        errorMessage: "Alphanumeric field"  
    },
    prototype: {
        trim: true,
        escape: true,
        isAlphanumeric: true,
        errorMessage: "Alphanumeric field"
    }    
})
}