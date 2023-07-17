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
        console.log({all})
        if(all.length === 0 || !all){
          console.log("Entro nell'if")
          res.status(StatusCodes.BAD_REQUEST).json(
            new CustomError()
              .setDescription(`Inexistent ${model.modelName} elements`)
              .setStatusCode(StatusCodes.NO_CONTENT)
              .setTimeStamp(new Date())
              .setName('No content')
              .setType('/error/db')
              .toJson()
          );
        }else{
          redis.set(req.originalUrl, JSON.stringify(all))
          res.json(all);
        }
    }
    catch(error)
    {
      throw new CustomError()
        .setDescription('Errore generico')
        .setStatusCode(StatusCodes.INTERNAL_SERVER_ERROR)
        .setCode('DB_ERROR')
        .setTimeStamp(new Date())
        .setType('/error/db')
        .setName('Generic Error')
        .toJson();
    }   
}

const getById = async (model: any, req: Request, res: Response) => {
    try {
      const elem = await model.findById(req.params.id).select('-createdAt -__v');
      if (!elem) {
        res.status(StatusCodes.BAD_REQUEST).json(
          new CustomError()
            .setDescription(`Inexistent ${model.modelName} with this id`)
            .setStatusCode(StatusCodes.BAD_REQUEST)
            .setTimeStamp(new Date())
            .setName('No result')
            .setType('/error/db')
            .toJson()
        );
      }else res.json(elem);
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

  const update = async (model: any, req:Request, res:Response) => {
    try{
      logger.info(`Request modify for ${model.modelName} to resource: ${req.params.id}`)

      if(await model.findByIdAndUpdate(req.params.id, req.body) !== null){
        logger.info('Success update for resource');
        res.status(StatusCodes.OK).send(ReasonPhrases.OK);
        redis.flushall()
      } else {
        logger.warn('Error to update the resource')
        res.status(StatusCodes.BAD_REQUEST).json(
          new CustomError()
                          .setDescription(`Insert a valid ${model.modelName}`)
                          .setCode('DB_ERROR')
                          .setTimeStamp(new Date())
                          .setName('Inexistent document')
                          .setType('/error/db/update')
                          .setStatusCode(StatusCodes.BAD_REQUEST)
                          .toJson()
          )                
        }
    }
    catch(error){ 
        logger.warn('Error to update the resource')
        res.send('Errore generico nell\'aggiornamento');
  }
}
  

export {addObj, getAll, getById, update}