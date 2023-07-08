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

            error.setStatusCode(httpStatus.BAD_REQUEST)
                 .setName('MALFORMED_JSON')
                 .setCode('10')
                 .setTimeStamp(new Date())
                 .setMsg('Il payload contiene un JSON Object malformato, perfavore verificane la sintassi.');

        }
        next(error);
    }
}

/* creare un enum che riporti name e codici di errore */



class CustomJSON {

    static parse<T>(jsonString: string): T {
        try {
            const data = JSON.parse(jsonString) as T;
            return data
        } catch(err:any){
            throw new CustomError();
        }    
    }

  }





class CustomError extends Error {

    name:string;
    statusCode:number;
    code:string;
    msg:string;
    timestamp:Date;

    constructor(){
        super();
        this.name = 'CustomError';
        this.statusCode = 500;
        this.msg = ''
        this.code = '';
        this.timestamp = new Date();
    }

    setName(name:string){
        this.name = name;
        return this;
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
    var response:object = {};
    if(err instanceof CustomError){
        response = {
            error: {
                status_code: err.statusCode,
                message: err.message,
                code: err.code,
                description: err.msg, 
            },
            timestamp: err.timestamp,
        }
    }
    res.status(err.statusCode).json(response);
}

export { preLog, postLog, checkJson, errHandler }
