import { body, checkSchema } from 'express-validator';

const employee = [
    body('name').trim().escape().isAlpha('it-IT', {ignore: ' '}),
    body('role').trim().escape().isAlpha(),
    body('department').trim().escape().isAlpha(),
    body('birthdate').isISO8601().toDate(),
    body('fiscalCode').trim().isVAT('IT'),
]


export default employee

const employeeSchema = () => {
    return checkSchema({
    name: { 
        trim: true,
        escape: true,
        isAlpha: { options: ['it-IT', {ignore: ' '}] },
        errorMessage: "Letters only"  
    },
    role: {
        trim: true,
        escape: true,
        isAlpha: true,
        errorMessage: "Letters only"
    },
    department: {
        trim: true,
        escape: true,
        isAlpha: true,
        errorMessage: "Letters only"
    },
    birthDate: { 
        isISO8601: true,
        toDate: true,
        errorMessage: "Invalid date"
    },
    fiscalCode: {
        trim: true,
        escape: true,
        isVAT: { options: ['IT'] }
    }
})
}