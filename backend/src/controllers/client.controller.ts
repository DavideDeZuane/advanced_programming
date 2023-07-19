import mongoose from "mongoose";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Request, Response } from "express"
import Client from "../model/Client";
import { ClientClass } from "../model/class/Client";
import { CustomError } from "../middlewares/error.middleware";
import { AppLogger, RedisProxy } from "../utils";
import { addObj, getAll, getById, update } from "../model/method/index";

const logger = AppLogger.getInstance();
const redis = RedisProxy.getInstance()

const addClient = async (req:Request, res:Response) => {
    try {
        //crea nuovo oggetto di tipo "quello della classe"
        const client:ClientClass = new ClientClass(req.body.firstName, req.body.lastName, req.body.birthDate, 
                                                   req.body.fiscalCode, req.body.vatNumber, req.body.address, 
                                                   new Date());
        await addObj(Client, client, req, res);
        //res.send('Successfully: component added');
      } catch (error) {
        res.send(error);
      }
}

const getClients = async (req:Request, res:Response) => {
    try{
        await getAll(Client,req, res)
      }catch(error) {
        //forse qui non c'è bisogno del res.send in quanto in get all è gestito anche il caso in cui error è 
        //istanza di Error
        res.send(error)
      }
    };

const getClientById = async (req:Request, res:Response) => {
    try{
        await getById(Client, req, res)
      } catch(error){
        res.send(error)
      }
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
    getClientById,
    getClients,
    addClient,
    updateClient
}

export default client
