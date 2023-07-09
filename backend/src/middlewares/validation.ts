import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

const checkValidation = (req:Request, res:Response, next:NextFunction) => {
    let errors = validationResult(req);
    (!errors.isEmpty()) ? next(new Error()) : next();
}

/* le funzioni di express-validate vanno usate qui e poi una volta applicate tutte va utilizzato validationResult in questo modo si ottiene il risultato*/
/* la validazione in questo caso è di sola sintassi, ovvero che rispetti i caratteri definiti dall'applicazione poi quella semantica la implementaremo tramite mongoose */
/* fare un array di validazione per ogni tipologia di post che viene effettuta */ 
/* aggiungiamo quelli che sono i campi del client per esempio */
const user_validation = [
    body('first_name').trim().escape(),
    body('last_name').trim().escape(),
    body('birth_date').trim().isDate(),
    body('fiscal_code').trim().isVAT('IT'),
    body('address').trim(),
    checkValidation
]

const employee_validation = [
    
]