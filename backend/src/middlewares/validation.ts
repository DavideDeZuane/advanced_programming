import { ExpressValidator, Result, body, validationResult, checkSchema } from 'express-validator';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import DevicePrototype from 'model/DevicePrototype';
import { AppLogger } from '../utils';
import { CustomError } from './error.middleware';
import { StatusCodes } from 'http-status-codes';

const logger = AppLogger.getInstance();

const checkValidation = (req:Request, res:Response, next:NextFunction) => {
    let errors:Result;
    try 
    {
        errors = validationResult(req);
        logger.info('validazione superata');
        next();
    }
    catch(error)
    {
        next(new CustomError()
                            .setDescription('erroreeee')
                            .setStatusCode(StatusCodes.BAD_REQUEST)
                            .setName('Bad Input')
                            .setType('/error/middleware')
        );
    }
}

/* le funzioni di express-validate vanno usate qui e poi una volta applicate tutte va utilizzato validationResult in questo modo si ottiene il risultato*/
/* la validazione in questo caso è di sola sintassi, ovvero che rispetti i caratteri definiti dall'applicazione poi quella semantica la implementaremo tramite mongoose */
/* fare un array di validazione per ogni tipologia di post che viene effettuta */ 
/* aggiungiamo quelli che sono i campi del client per esempio */
const user_validation = [
    body('firstName').trim().escape().isAlpha().withMessage('Nome non valido'),
    body('lastName').trim().escape().isAlpha('it-IT', {ignore: ' '}).withMessage('Cognome non valido'),
    body('birthDate').isISO8601().withMessage('Data non valida'),
    body('fiscalCode').trim().escape().matches(/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i).withMessage('codice fiscale non valido'),
    body('address').trim().escape(),
    checkValidation
]


const employee_validation = [
    body('name').trim().escape().isAlpha(),
    body('role').trim().escape().isAlpha(),
    body('department').trim().escape().isAlpha(),
    body('birthdate').isISO8601().toDate(),
    body('fiscalCode').trim().isVAT('IT'),
    checkValidation
]

const component_validation = [
    body('name').trim().escape().isAlphanumeric(),
    body('type').trim().escape().isAlpha(),
    body('description').trim().escape(),
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
    body('description').trim().escape(),
    checkValidation
]

const version_validation = [
    body('file').trim().escape().isAlphanumeric(),
    //controlla se è giusta la seguente clausola
    body('blob').trim().escape(),
    body('versionNumber').trim().escape().isNumeric(),
    checkValidation
]

const operation_validation = [
    body('employees').trim().escape().isAlphanumeric(),
    body('systems').trim().escape().isAlphanumeric(),
    body('description').trim().escape(),
    body('type').trim().escape().isAlpha(),
    checkValidation
]

export {user_validation, employee_validation, component_validation, prototype_validation, 
    device_validation, system_validation, file_validation, version_validation, operation_validation, checkValidation}

    /*
    const userSchema = () => checkSchema({
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
    */