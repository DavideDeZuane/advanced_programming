import mongoose, { Document, Error, Query, Schema, PreMiddlewareFunction, Model, model } from 'mongoose';
import { Interface } from 'readline';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Request, Response } from "express"
import { CustomError } from "../../middlewares/error.middleware";
import { AppLogger, RedisProxy } from "../../utils/";

//######## VEDI IN GET ALL CI SONO TUTTI QUEGLI ERRORI IN CUI NON ENTRA MAI

const logger = AppLogger.getInstance();
const redis = RedisProxy.getInstance()

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
    try
    {
        let all = await model.find({}).select('-createdAt -__v') ;
        if(all.length === 0){
            res.send(
                new CustomError()
                  .setDescription(`Inexistence ${model.modelName}s`)
                  .setStatusCode(StatusCodes.NO_CONTENT)
                  .setTimeStamp(new Date())
                  .setName('Empty')
                  .setType('/error/db')
                  .toJson()
              );
        }
        redis.set(req.originalUrl, JSON.stringify(all))
        res.json(all);
    }
    catch(error)
    {
        console.log(error)
        //questo penso che non serva poichè non ci entra mai
        if(error instanceof mongoose.Error.DocumentNotFoundError){
            logger.error('Non è presente alcun documento')
            
            throw new CustomError()
                                .setDescription('Non è stato trovato alcun risultato')
                                .setCode('DB_ERROR')
                                .setTimeStamp(new Date())
                                .setName('Documento non trovato')
                                .setType('/error/db/fetch')
                                .setStatusCode(StatusCodes.NOT_FOUND)
                                .toJson()
        }
        //questo penso che non serva poichè non ci entra mai
        if(error instanceof mongoose.Error.MissingSchemaError){
            logger.error('Lo schema non esiste nel database')
            throw new CustomError()
                                .setDescription('Non esiste alcuno schema per la risorsa richiesta')
                                .setCode('DB_ERROR')
                                .setTimeStamp(new Date())
                                .setName('Schema non esistente')
                                .setType('/error/db')
                                .setStatusCode(StatusCodes.INTERNAL_SERVER_ERROR)
                                .toJson()
        }
        if(error instanceof Error){
            logger.error('Errore Generico')
            throw new CustomError()
                               .setDescription('Errore generico in seguito all\'interrogazione sul database')
                               .setStatusCode(StatusCodes.INTERNAL_SERVER_ERROR)
                               .setCode('DB_ERROR')
                               .setTimeStamp(new Date())
                               .setType('/error/db')
                               .setName('Generic Error')
                               .toJson()

        }
    }
}

const getById = async (model: any, req: Request, res: Response) => {
    try {
      const elem = await model.findById(req.params.id).select('-createdAt -__v');
      if (!elem) {
        return res.status(StatusCodes.NOT_FOUND).json(
          new CustomError()
            .setDescription(`Inexistence ${model.modelName} with this id`)
            .setStatusCode(StatusCodes.NOT_FOUND)
            .setTimeStamp(new Date())
            .setName('No result')
            .setType('/error/db')
            .toJson()
        );
      }
      res.json(elem);
    } catch (error) {
      console.log(error);
      throw new CustomError()
        .setDescription('Errore generico')
        .setStatusCode(StatusCodes.INTERNAL_SERVER_ERROR)
        .setCode('DB_ERROR')
        .setTimeStamp(new Date())
        .setType('/error/db')
        .setName('Generic Error')
        .toJson();
    }
  };
  

  export {addObj, getAll, getById}