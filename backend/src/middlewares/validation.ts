import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import DevicePrototype from 'model/DevicePrototype';

const checkValidation = (req:Request, res:Response, next:NextFunction) => {
    let errors = validationResult(req);
    (!errors.isEmpty()) ? next(new Error()) : next();
}

/* le funzioni di express-validate vanno usate qui e poi una volta applicate tutte va utilizzato validationResult in questo modo si ottiene il risultato*/
/* la validazione in questo caso è di sola sintassi, ovvero che rispetti i caratteri definiti dall'applicazione poi quella semantica la implementaremo tramite mongoose */
/* fare un array di validazione per ogni tipologia di post che viene effettuta */ 
/* aggiungiamo quelli che sono i campi del client per esempio */
const user_validation = [
    body('first_name').trim().escape().isAlpha(),
    body('last_name').trim().escape().isAlpha(),
    body('birth_date').trim().isDate(),
    body('fiscal_code').trim().isVAT('IT'),
    body('address').trim().escape().isAlphanumeric(),
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

export {user_validation, employee_validation, compoenent_validation, prototype_validation, device_validation}