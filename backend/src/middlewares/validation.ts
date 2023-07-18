import { ExpressValidator, Result, body, validationResult, checkSchema } from 'express-validator';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';


/* le funzioni di express-validate vanno usate qui e poi una volta applicate tutte va utilizzato validationResult in questo modo si ottiene il risultato*/
/* la validazione in questo caso è di sola sintassi, ovvero che rispetti i caratteri definiti dall'applicazione poi quella semantica la implementaremo tramite mongoose */
/* fare un array di validazione per ogni tipologia di post che viene effettuta */ 
/* aggiungiamo quelli che sono i campi del client per esempio */
const employee_validation = [
    body('name').trim().escape().isAlpha(),
    body('role').trim().escape().isAlpha(),
    body('department').trim().escape().isAlpha(),
    body('birthdate').isISO8601().toDate(),
    body('fiscalCode').trim().isVAT('IT'),
]

const component_validation = [
    body('name').trim().escape().isAlphanumeric(),
    body('type').trim().escape().isAlpha(),
    body('description').trim().escape(),
    body('price').trim().escape().isNumeric(),
]

const prototype_validation = [
    body('name').trim().escape().isAlphanumeric(),
    body('components').trim().escape().isAlphanumeric(),
]

const device_validation = [
    body('name').trim().escape().isAlphanumeric(),
    body('prototype').trim().escape().isAlphanumeric(),
    
]

const system_validation = [
    body('name').trim().escape().isAlphanumeric(),
    body('devices').trim().escape().isAlphanumeric(),
    body('address').trim().escape().isAlphanumeric(),
    body('client').trim().escape().isAlphanumeric(),
    
]

const file_validation = [
    body('name').trim().escape().isAlphanumeric(),
    body('device').trim().escape().isAlphanumeric(),
    body('fileType').trim().escape().isAlpha(),
    body('description').trim().escape(),
    
]

const version_validation = [
    body('file').trim().escape().isAlphanumeric(),
    //controlla se è giusta la seguente clausola
    body('blob').trim().escape(),
    body('versionNumber').trim().escape().isNumeric(),
    
]

const operation_validation = [
    body('employees').trim().escape().isAlphanumeric(),
    body('systems').trim().escape().isAlphanumeric(),
    body('description').trim().escape(),
    body('type').trim().escape().isAlpha(),
]

export {employee_validation, component_validation, prototype_validation, 
    device_validation, system_validation, file_validation, version_validation, operation_validation,  }

