import client from "./client.validation";
import componentV from "./component.validation";
import device from "./device.validation";
import employee from "./employee.validation";
import file from "./file.validation";
import operation from "./operation.validation";
import dev_prototype from "./prototype.validation";
import system from "./system.validation";
import version from "./version.validation";
import { Result, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { AppLogger } from '../../utils';
import { CustomError } from '..//error.middleware';
import { StatusCodes } from 'http-status-codes';

const logger = AppLogger.getInstance();

const checkValidation = (req:Request, res:Response, next:NextFunction) => {
    let errors:Result;
    try 
    {
        errors = validationResult(req);
        console.log(errors)
        if (errors.isEmpty()){
            logger.info('Validation over');
            next();
        } else {
            next(new CustomError()
                            .setDescription('Validazione non riuscita')
                            .setStatusCode(StatusCodes.BAD_REQUEST)
                            .setName('Bad Input')
                            .setType('/error/middleware')
        );
        }
    }
    catch(error)
    {
        console.log("Entro nel catch")
        next(error)
    }
}

export { client, componentV, device, dev_prototype, employee, file, operation, system, version, checkValidation }