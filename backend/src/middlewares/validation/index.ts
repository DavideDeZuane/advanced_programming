import client from "./client.validation";
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

export { client, checkValidation }