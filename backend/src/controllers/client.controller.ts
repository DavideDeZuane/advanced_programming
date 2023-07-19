import mongoose from "mongoose";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Request, Response } from "express"
import Client from "../model/Client";
import { ClientClass, IClient } from "../model/class/Client";
import { CustomError } from "../middlewares/error.middleware";
import { AppLogger, RedisProxy } from "../utils";
import { addObj, getAll, update } from "../model/method/index";

const logger = AppLogger.getInstance();
const redis = RedisProxy.getInstance()

const addClient = async (req:Request, res:Response) => {
    let client:IClient;
    try{
        client = ClientClass.builder()
            .setFirstName(req.body.firstName)
            .setLastName(req.body.lastName)
            .setAddress(req.body.address)
            .setFiscalCode(req.body.fiscalCode)
            .setVatNumber(req.body.vatNumber)
            .build()
            .toMongooseDocument()
        ;

        client.validateSync()
        await client.save()
        logger.info(`Creato Cliente con id: ${client._id}`)
        res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
        redis.flushall()
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

const deleteClient = async (req:Request, res:Response) => {
    try{
        await Client.findByIdAndUpdate(req.params.id, { isDisabled: true });
        logger.warn(`User with id ${req.params.id} disabled`);
        redis.flushall()
        res.status(StatusCodes.OK).send('Client deleted')
    } catch(error){
        res.send(new Error());
    }
    
}

const getClients = async (req:Request, res:Response) => {
    try
    {
        let clients = await Client.find().where("isDisabled", false).select('-createdAt -__v -isDisabled') ;
        if(clients.length !== 0){
            redis.set(req.originalUrl, JSON.stringify(clients))
            res.json(clients);
        }
        if(clients.length === 0){
            res.status(StatusCodes.NO_CONTENT).send(ReasonPhrases.NO_CONTENT);
        }
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

const getById = async (req:Request, res:Response) => {
    await Client.findById(req.params.id).where('isDisabled', false).select('-createdAt -__v -isDisabled')
        .then((elem) => {
            if(elem !== null){
                logger.info('Ritorno l\'utente');
                res.json(elem)
            }
            if(elem === null){ 
                res.status(StatusCodes.NO_CONTENT).json(
                    new CustomError()
                                    .setDescription('Non esiste alcun cliente con l\'id specificato')
                                    .setStatusCode(StatusCodes.NOT_FOUND)
                                    .setTimeStamp(new Date())
                                    .setName('Nessun risultato')
                                    .setType('/error/db')
                                    .toJson()
                )
            }
        })
        .catch((err) => { 
            /* Se per esempio non è presente la connessione al database da questo errore*/
            logger.error(`Altro errore`); 
            res.json(err) 
        }) 
}

/* per quanto riguarda l'aggiornametno conviene fare una PUT, si crea una richiesta di nuovo con tutti i campi in questo modo evitiamo di fare n validazioni */
const updateClient = async (req:Request, res:Response) => {
    try{
        await update(Client, req, res)
      } catch(error){
        res.send(error)
      }
    }

const client = {
    getById,
    getClients,
    addClient,
    updateClient,
    deleteClient
}

export default client
