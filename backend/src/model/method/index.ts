import mongoose, { Document, Error, Query, Schema, PreMiddlewareFunction, Model, model } from 'mongoose';
import { Interface } from 'readline';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Request, Response } from "express"
import { CustomError } from "../../middlewares/error.middleware";
import { AppLogger, RedisProxy } from "../../utils/";

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

const getById = async (model: any, req: Request, res: Response) => {
  await model.findById(req.params.id).select('-createdAt -__v')
      .then((elem: any) => {
        console.log(elem)
          if(elem !== null){
              logger.info(`Return the element: ${model.modelName}`);
              console.log("mando json")
              res.json(elem)
          }
          if(elem === null){ 
              res.status(StatusCodes.NO_CONTENT).json(
                  new CustomError()
                                  .setDescription(`Inexistence ${model.modelName} with this id`)
                                  .setStatusCode(StatusCodes.NOT_FOUND)
                                  .setTimeStamp(new Date())
                                  .setName('No result')
                                  .setType('/error/db')
                                  .toJson()
              )
              console.log("Mandato custom error")
          }
      })
      .catch((err: any) => { 
          /* Se per esempio non è presente la connessione al database da questo errore*/
          logger.error(`Altro errore`); 
          res.json(err) 
      }) 
}

  export {addObj, getAll, getById}