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
    data: any,
    req: Request,
    res: Response
  ) => {
    try {
      const object = new model(data);
      console.log("Oggetto: " + object)
      object.validateSync();
      await object.save();
      logger.info(`${model.modelName} created with id: ${model._id}`)
      res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
      redis.flushall()
    } catch (error) {
      if(error instanceof mongoose.Error.ValidationError){
        logger.warn('The data sent does not comply with the validation rules');
        res.send(error.errors);
    } 
    else if(error instanceof CustomError){
      res.status(StatusCodes.BAD_REQUEST).send(error)
    }
    else if(error instanceof Error){
        logger.warn(error.message);
        res.status(StatusCodes.CONFLICT).json(
            new CustomError()
                            .setStatusCode(StatusCodes.CONFLICT)
                            .setDescription(error.message)
                            .setCode('DB_ERROR')
                            .setType('/error/db/insert')
                            .setTimeStamp(new Date())
                            .setName('Duplicate Key')
                            .toJson()
        );
    }
}
}

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
        if(error instanceof mongoose.Error.DocumentNotFoundError){
            logger.error('There is no document')
            res.json(
                new CustomError()
                                .setDescription('No results were found')
                                .setCode('DB_ERROR')
                                .setTimeStamp(new Date())
                                .setName('Documento not found')
                                .setType('/error/db/fetch')
                                .setStatusCode(StatusCodes.NOT_FOUND)
                                .toJson()
            ) 
        }
        if(error instanceof mongoose.Error.MissingSchemaError){
            logger.error('The schema does not exist in the database')
            res.json(
                new CustomError()
                                .setDescription('There is no schema for the requested resource')
                                .setCode('DB_ERROR')
                                .setTimeStamp(new Date())
                                .setName('Schema non esistente')
                                .setType('/error/db')
                                .setStatusCode(StatusCodes.INTERNAL_SERVER_ERROR)
                                .toJson()
            )
        }
        if(error instanceof Error){
            logger.error('Generic error')
            res.json(
                new CustomError()
                               .setDescription('Generic error following database query')
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

      const obj = await model.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Restituisce il documento aggiornato
        runValidators: true, // Esegue la validazione del documento
      });
  
      if (obj !== null) {
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
      if (error instanceof mongoose.Error.ValidationError){
        logger.warn('Error to update the resource')
        res.status(StatusCodes.BAD_REQUEST).json(
          new CustomError()
                          .setDescription(`Validation failed`)
                          .setCode('DB_ERROR')
                          .setTimeStamp(new Date())
                          .setName('Validation failed')
                          .setType('/error/db/update')
                          .setStatusCode(StatusCodes.BAD_REQUEST)
                          .toJson()
          )                
      } else {
        logger.warn('Error to update the resource')
        res.send('General update error');
      }
  }
}

const deleteByID = async (model: any, req:Request, res:Response) => {
  try{
      await model.findByIdAndUpdate(req.params.id, { isDisabled: true });
      logger.warn(`${model.modelName} with id ${req.params.id} disabled`);
      redis.flushall()
      res.status(StatusCodes.OK).send(`${model.modelName} deleted`)
  } catch(error: any){
      res.send(new Error(error));
  }
  
}
  

export {addObj, getAll, getById, update, deleteByID}