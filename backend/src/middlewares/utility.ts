import morgan, { TokenIndexer, FormatFn } from 'morgan';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import httpStatus from 'http-status-codes'

const logPlus:FormatFn = (tokens:TokenIndexer, req, res) => {
    return `${tokens.method(req, res)} - ${tokens.status(req, res)} - ${tokens.url(req, res)} \n${tokens['response-time'](req, res)}ms - ${tokens['total-time'](req, res)}ms`;
}

const preLog = morgan('combined');
const postLog = morgan(logPlus); 

const checkJson = (req:Request, res:Response, next:NextFunction) => {   
    if(req.headers['content-type'] != 'application/json'){
    }
    try {
        console.log(req.body)
        CustomJSON.parse(req.body);
        next();
    } catch (error:any) {
        console.log(error);
        if(error instanceof CustomError){

            error.setStatusCode(400)
                 .setTimeStamp(new Date())
                 .setCode('MALFORMED_JSON')
                 .setMsg('Il payload contiene un JSON Object malformato, perfavore verificane la sintassi.');

        }
        next(error);
    }
}



class CustomJSON {

    static parse<T>(jsonString: string): T {
        try {
            const data = JSON.parse(jsonString) as T;
            return data
        } catch(err:any){
            throw new CustomError('Invalid JSON');
        }    
    }

  }





class CustomError extends Error {

    name:string;
    statusCode:number;
    code:string;
    msg:string;
    timestamp:Date;

    constructor(message:string){
        super(message);
        this.name = 'CustomError';
        this.statusCode = 500;
        this.msg = ''
        this.code = '';
        this.timestamp = new Date();
    }

    setStatusCode(statusCode:number){
        this.statusCode = statusCode;
        return this;
    }

    setTimeStamp(date:Date){
        this.timestamp = date;
        return this;
    }

    setCode(code:string){
        this.code = code;
        return this;
    }

    setMsg(message:string){
        this.msg = message;
        return this;
    }


}

/* quando viene chiaamto un next(error) Express cerca il middleware di gestione degli errori, definito da questa firma e lo gestisce lio */
const errHandler = function (err:any, req: Request, res: Response, next:NextFunction): void {
    console.log(err)
    if(err instanceof CustomError){
        console.log('sono entrato in handler');
    }
    res.status(err.statusCode).json({
        error: {
            status_code: err.statusCode,
            message: err.message,
            timestamp: err.timestamp,
            code: err.code,
            description: err.msg, 
        }
    });
}

export { preLog, postLog, checkJson, errHandler }
