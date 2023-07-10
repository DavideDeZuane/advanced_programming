import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express"
import Client, { IClient } from "../model/Client";
import { CustomError } from "../middlewares/error.middleware";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';


const addClient = (req:Request, res:Response) => {
    const user:IClient = req.body;
    try{
        let wwa= new Client(user);
        console.log(wwa)
        wwa.save()
    } catch(error) {
       console.log(error)
    }
    res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
}

/* conviene farne uno unico che gestisce tutti gli errori in modo oppure dato che questo non rientra più nella catena di middleware conviene definirlo come metodo normale*/
const getClients = async (req:Request, res:Response, next:NextFunction) => {
    try
    {
        const clients = await Client.find({}).select('-createdAt -__v')
        res.json(clients)
    }
    catch(error)
    {
        if(error instanceof mongoose.Error.DocumentNotFoundError){
            res.json(
                new CustomError()
                                 .setDescription('Non è stato trovato alcun risultato')
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

const getById = (req:Request, res:Response, next:NextFunction) => {
    Client.findById(req.params.id).select('-createdAt -__v')
        .then((elem) => {res.json(elem)})
        .catch((err) => { console.log(err); res.json(err) }) 
}

/* per quanto riguarda l'aggiornametno conviene fare una PUT, si crea una richiesta di nuovo con tutti i campi in questo modo evitiamo di fare n validazioni */

const updateClient = async (req:Request, res:Response) => {
    console.log('entrato nel metodo');
    console.log(req.body);
    await Client.findByIdAndUpdate(req.params.id, req.body)
        .then( () => res.status(StatusCodes.OK).send('wasd')) 
        .catch( (err) => { console.log(err), res.send('wa'); })
}

const client_controller = {
    getById,
    getClients,
    addClient,
    updateClient
}

export default client_controller
