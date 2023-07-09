import { Request, Response, NextFunction } from 'express';
import { CustomError } from './error.middleware';
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

export { checkJson }
