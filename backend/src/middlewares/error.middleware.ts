import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';


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

interface CustomErrorHandler extends ErrorRequestHandler {
    name:string;
    statusCode:number;
    code:string;
    description:string;
    timestamp:Date;
    type:string; 
}

/* quando viene chiaamto un next(error) Express cerca il middleware di gestione degli errori, definito da questa firma e lo gestisce lio */
const errHandler = function (err:CustomErrorHandler, req: Request, res: Response, next:NextFunction): void {
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

export {errHandler, CustomError}
