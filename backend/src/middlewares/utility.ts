import morgan, { TokenIndexer, FormatFn } from 'morgan';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import httpStatus from 'http-status-codes'

const checkJson = (req:Request, res:Response, next:NextFunction) => {   
    if(req.headers['content-type'] != 'application/json'){
    }
    try {
        CustomJSON.parse(req.body);
        next();
    } catch (error:any) {
        console.log(error);
        if(error instanceof CustomError){
            error.setStatusCode(httpStatus.BAD_REQUEST)
                 .setName('MALFORMED_JSON')
                 .setCode('10')
                 .setTimeStamp(new Date())
                 .setType('/errors/invalid-input')
                 .setDescription('Il payload contiene un JSON Object malformato, perfavore verificane la sintassi.');
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
    description:string;
    timestamp:Date;
    type:string;

    constructor(){
        super();
        this.name = 'CustomError';
        this.statusCode = 500;
        this.description = ''
        this.code = '';
        this.timestamp = new Date();
        this.type = 'generic'
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

    setDescription(description:string){
        this.description = description;
        return this;
    }

    setType(type:string){
        this.type = type;
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
                type: err.type, 
                name: err.name,
                code: err.code,
                description: err.description,
            },
            timestamp: err.timestamp,
        }
    }
    res.status(err.statusCode).json(response);
}

export { checkJson, errHandler }
