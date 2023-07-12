import { body, checkSchema } from 'express-validator';

const client = [
    body('firstName').trim().escape().isAlpha('it-IT'),
    body('lastName').trim().escape().isAlpha('it-IT', {ignore: ' '}),
    body('birthDate').isISO8601().toDate(),
    body('fiscalCode').trim().matches(/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/),
    body('address').trim(),
]

export default client

const userSchema = () => {
    return checkSchema({
    firstName: { 
        trim: true,
        escape: true,
        isAlpha: true,
        errorMessage: "Deve contentere solo lettere"  
    },
    lastName: {
        trim: true,
        escape: true,
        isAlpha: { options: ['it-IT', {ignore: ''}] },
        errorMessage: "Deve contentere solo lettere"
    },
    birthDate: { 
        isISO8601: true,
        toDate: true,
        errorMessage: "Deve essere una data antecedente a quella di oggi"
    },
    fiscalCode: {
        trim: true,
        escape: true,
        isVAT: { options: ['IT'] }
    },
    address: {
        trim: true,
        escape: true,
    }
})
}