import mongoose, { Document, Error, Query, Schema, PreMiddlewareFunction, Model, model } from 'mongoose';
import { Interface } from 'readline';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Request, Response } from "express"
import { CustomError } from "../../middlewares/error.middleware";
import { AppLogger, RedisProxy } from "../../utils/";


const addObj = async (
    model:any,
    data: any
  ) => {
    try {
      const object = new model(data);
      console.log("Oggetto: " + object)
      await object.save();
    } catch (error) {
      throw error;
    }
  };

  const getAll = async (model: any, req: Request, res: Response) => {
    const logger = AppLogger.getInstance();
    const redis = RedisProxy.getInstance()
    try
    {
        let all = await model.find({}).select('-createdAt -__v') ;
        if(all.length === 0){
            res.status(StatusCodes.NO_CONTENT).send(ReasonPhrases.NO_CONTENT);
        }
        redis.set(req.originalUrl, JSON.stringify(all))
        res.json(all);
    }
    catch(error)
    {
        if(error instanceof mongoose.Error.DocumentNotFoundError){
            logger.error('Non è presente alcun documento')
            res.json(
                new CustomError()
                                .setDescription('Non è stato trovato alcun risultato')
                                .setCode('DB_ERROR')
                                .setTimeStamp(new Date())
                                .setName('Documento non trovato')
                                .setType('/error/db/fetch')
                                .setStatusCode(StatusCodes.NOT_FOUND)
                                .toJson()
            ) 
        }
        if(error instanceof mongoose.Error.MissingSchemaError){
            logger.error('Lo schema non esiste nel database')
            res.json(
                new CustomError()
                                .setDescription('Non esiste alcuno schema per la risorsa richiesta')
                                .setCode('DB_ERROR')
                                .setTimeStamp(new Date())
                                .setName('Schema non esistente')
                                .setType('/error/db')
                                .setStatusCode(StatusCodes.INTERNAL_SERVER_ERROR)
                                .toJson()
            )
        }
        if(error instanceof Error){
            logger.error('Errore Generico')
            res.json(
                new CustomError()
                               .setDescription('Errore generico in seguito all\'interrogazione sul database')
                               .setStatusCode(StatusCodes.INTERNAL_SERVER_ERROR)
                               .setCode('DB_ERROR')
                               .setTimeStamp(new Date())
                               .setType('/error/db')
                               .setName('Generic Error')
                               .toJson()
                )
        }
    }
}

  export {addObj, getAll}