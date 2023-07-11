import mongoose, { MongooseError } from "mongoose";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from "express"

import Client, { IClient } from "../model/Client";
import { CustomError } from "../middlewares/error.middleware";
import { AppLogger } from "../utils";
import { MongoError, MongoServerError } from "mongodb";

const logger = AppLogger.getInstance();

const addClient = async (req:Request, res:Response) => {
    let client:IClient;
    try{
        client = new Client(req.body);
        client.validateSync()
        await client.save()
        logger.info(`Creato Cliente con id: ${client._id}`)
        res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
    } catch(error) {
        if(error instanceof mongoose.Error.ValidationError){
            logger.warn('I dati inviati non rispettano le regole di validazione');
            res.send(error.errors);
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

const getClients = async (req:Request, res:Response) => {
    try
    {
        let clients = await Client.find({}).select('-createdAt -__v') ;
        res.json(clients);
    }
    catch(error)
    {
        logger.warn('Errore nel trovare i clienti richiesti')
        if(error instanceof mongoose.Error.DocumentNotFoundError){
            res.json(
                new CustomError()
                                .setDescription('Non è stato trovato alcun risultato')
                                .setCode('DB_ERROR')
                                .setTimeStamp(new Date())
                                .setName('Documento non trovato')
                                .setType('/error/db/fetch')
                                .setStatusCode(404)
                                .toJson()
            ) 
        }
        if(error instanceof mongoose.Error.MissingSchemaError){
            res.json(
                new CustomError()
                                .setDescription('Non esiste alcuno schema per la risorsa richiesta')
                                .setCode('DB_ERROR')
                                .setTimeStamp(new Date())
                                .setName('Schema non esistente')
                                .setType('/error/db')
                                .setStatusCode(404)
                                .toJson()
            )
        }
        res.send('errore generico')
    }
}

const getById = (req:Request, res:Response, next:NextFunction) => {
    Client.findById(req.params.id).select('-createdAt -__v')
        .then((elem) => {res.json(elem)})
        .catch((err) => { 
            logger.warn(`Non è stato trovato alcun utente con id: ${req.params.id}`); 
            res.json(err) 
        }) 
}

/* per quanto riguarda l'aggiornametno conviene fare una PUT, si crea una richiesta di nuovo con tutti i campi in questo modo evitiamo di fare n validazioni */

const updateClient = async (req:Request, res:Response) => {
    logger.info(`Richiesta di modifica per la risorsa   \clients\\${req.params.id}`)
    await Client.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            logger.info('Successo nell\'aggiornamento della risorsa');
            res.status(StatusCodes.OK).send(ReasonPhrases.OK);
        }) 
        .catch((err) => { 
            logger.warn('Errore nell\'aggiornamento della risorsa')
            if(err instanceof mongoose.Error.DocumentNotFoundError){
                res.json(
                    new CustomError()
                                    .setDescription('Non è stato trovato alcun risultato')
                                    .setCode('DB_ERROR')
                                    .setTimeStamp(new Date())
                                    .setName('Documento non trovato')
                                    .setType('/error/db/update')
                                    .setStatusCode(404)
                                    .toJson()
                )                
            }
            res.send('Errore generico nell\'aggiornamento'); 
        })
}

const client_controller = {
    getById,
    getClients,
    addClient,
    updateClient
}

export default client_controller
