import { NextFunction, Request, Response } from "express"
import Client, { IClient } from "../model/Client";
import mongoose from "mongoose";
import { isatty } from "tty";
import { CustomError } from "../middlewares/error.middleware";
import httpStatus from "http-status";

const addClient = (req:Request, res:Response) => {
    const user:IClient = req.body;
    try{
        let wwa= new Client(user);
        console.log(wwa)
        wwa.save()
    } catch(error) {
       console.log(error)
    }
    res.send('ci si prova')
}

/* conviene farne uno unico che gestisce tutti gli errori in modo oppure dato che questo non rientra più nella catena di middleware conviene definirlo come metodo normale*/
const getClients = async (req:Request, res:Response, next:NextFunction) => {

    try
    {
        const clients = await Client.find({}).select('-_id -createdAt -__v')
        res.json(clients)
    }
    catch(error)
    {
        if(error instanceof mongoose.Error.DocumentNotFoundError){
            res.json(
                new CustomError().setDescription('Non è stato trovato alcun risultato')
                                 .setCode('DB_ERROR')
                                 .setTimeStamp(new Date())
                                 .setName('Documento non trovato')
                                 .setType('operational')
                                 .setStatusCode(404)
                                 .toJson()
            ) 
        }
    }
}

const client_controller = {
    getClients,
    addClient,
}

export default client_controller
