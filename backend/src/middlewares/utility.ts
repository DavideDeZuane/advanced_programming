import morgan, { TokenIndexer, FormatFn } from 'morgan';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { body, validationResult } from 'express-validator';


const logPlus:FormatFn = (tokens:TokenIndexer, req, res) => {
    return `${tokens.method(req, res)} - ${tokens.status(req, res)} - ${tokens.url(req, res)} \n${tokens['response-time'](req, res)}ms - ${tokens['total-time'](req, res)}ms`;
}

const reqLog = morgan('combined');
const reqLogPlus = morgan(logPlus); 

const checkJson = (req:Request, res:Response, next:NextFunction) => {   
    if(req.headers['content-type'] != 'application/json'){
        var error = new Error();
        next(error)
    }
    try {
        console.log(req.body)
        JSON.parse(JSON.stringify(req.body));
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid JSON' });
    }
}


/* le funzioni di express-validate vanno usate qui e poi una volta applicate tutte va utilizzato validationResult in questo modo si ottiene il risultato*/
/* la validazione in questo caso è di sola sintassi, ovvero che rispetti i caratteri definiti dall'applicazione poi quella semantica la implementaremo tramite mongoose */

/* fare un array di validazione per ogni tipologia di post che viene effettuta */ 
/* aggiungiamo quelli che sono i campi del client per esempio */
const user_validation = [
    body('first_name').escape(),
    body('last_name').escape(),
    body('birth_date').isDate(),
    body('fiscal_code').isVAT('IT'),
    body('address')
]


/* la funzione escpae viene utilizzata per eseguire l'escape dei caratteri speciali presenti nei datim questo per prevenire che vengano interpretati come in JS (vengono convertiti in entità HTML 
    mentre l afunzione trim rimuove gli spazi bianchi inizili e finali del campo, ugtile quando si lavora con input utente*/
const sanitizeInput = (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);

    next()

}

/* questo andrà posizionato alla fine di tutte le rotte o middleware in modo tale che venga chiamato solo se nessn middleare precedenti ha gestito l'errore */
const errHandler = function (err: any, req: Request, res: Response, next: NextFunction): void {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
}

export { reqLog, reqLogPlus, checkJson, errHandler, sanitizeInput, }
