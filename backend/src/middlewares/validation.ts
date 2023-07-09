import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import DevicePrototype from 'model/DevicePrototype';

const checkValidation = (req:Request, res:Response, next:NextFunction) => {
    let errors = validationResult(req);
    (!errors.isEmpty()) ? next(new Error()) : console.log('validazione superata'); next();
}

/* le funzioni di express-validate vanno usate qui e poi una volta applicate tutte va utilizzato validationResult in questo modo si ottiene il risultato*/
/* la validazione in questo caso è di sola sintassi, ovvero che rispetti i caratteri definiti dall'applicazione poi quella semantica la implementaremo tramite mongoose */
/* fare un array di validazione per ogni tipologia di post che viene effettuta */ 
/* aggiungiamo quelli che sono i campi del client per esempio */
const user_validation = [
    body('firstName').trim().escape().isAlpha(),
    body('lastName').trim().escape().isAlpha('it-IT', {ignore: ' '}),
    body('birthDate').isISO8601().toDate(),
    body('fiscalCode').trim().matches(/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/),
    body('address').trim(),
    checkValidation
]


const employee_validation = [
    body('name').trim().escape().isAlpha(),
    body('role').trim().escape().isAlpha(),
    body('department').trim().escape().isAlpha(),
    body('birthdate').trim().isDate(),
    body('fiscalCode').trim().isVAT('IT'),
    checkValidation
]

const compoenent_validation = [
    body('name').trim().escape().isAlphanumeric(),
    body('type').trim().escape().isAlpha(),
    body('description').trim().escape().isAlphanumeric(),
    body('price').trim().escape().isNumeric(),
    checkValidation
]

const prototype_validation = [
    body('name').trim().escape().isAlphanumeric(),
    body('components').trim().escape().isAlphanumeric(),
    checkValidation   
]

const device_validation = [
    body('name').trim().escape().isAlphanumeric(),
    body('prototype').trim().escape().isAlphanumeric(),
    checkValidation
]

const system_validation = [
    body('name').trim().escape().isAlphanumeric(),
    body('devices').trim().escape().isAlphanumeric(),
    body('address').trim().escape().isAlphanumeric(),
    body('client').trim().escape().isAlpha(),
    checkValidation
]

const file_validation = [
    body('name').trim().escape().isAlphanumeric(),
    body('device').trim().escape().isAlphanumeric(),
    body('fileType').trim().escape().isAlpha(),
    body('description').trim().escape().isAlphanumeric(),
    checkValidation
]

const version_validation = [
    body('file').trim().escape().isAlphanumeric(),
    //controlla se è giusta la seguente clausola
    body('blob').trim().escape().isBoolean(),
    body('versionNumber').trim().escape().isNumeric(),
    checkValidation
]

const operation_validation = [
    body('employees').trim().escape().isAlphanumeric(),
    body('system').trim().escape().isAlphanumeric(),
    body('description').trim().escape().isAlphanumeric(),
    body('type').trim().escape().isAlpha(),
    checkValidation
]

export {user_validation, employee_validation, compoenent_validation, prototype_validation, 
    device_validation, system_validation, file_validation, version_validation, operation_validation}