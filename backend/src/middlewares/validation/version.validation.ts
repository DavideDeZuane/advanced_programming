import { body, checkSchema } from 'express-validator';

const version = [
    body('file').trim().escape().isAlphanumeric(),
    body('blob').trim().escape(),
    body('versionNumber').trim().escape().isNumeric()
]

export default version

const versionSchema = () => {
    return checkSchema({
    file: { 
        trim: true,
        escape: true,
        isAlphanumeric: true,
        errorMessage: "Alphanumeric field. Space not allowed"  
    },
    blob: {
        trim: true,
        escape: true,
    },
    versionNumber: { 
        trim: true,
        escape: true,
        isNumeric: true,
        errorMessage: "Numeric field"
    }
})
}