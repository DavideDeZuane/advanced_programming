import morgan, { TokenIndexer, FormatFn } from 'morgan';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';


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

/* questo andrà posizionato alla fine di tutte le rotte o middleware in modo tale che venga chiamato solo se nessn middleare precedenti ha gestito l'errore */
const errHandler = function (err: any, req: Request, res: Response, next: NextFunction): void {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
}

export { reqLog, reqLogPlus, checkJson, errHandler }
