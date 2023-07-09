import { NextFunction, Request, Response } from "express"

import Client, { IClient } from "../model/Client";

const addClient = (req:Request, res:Response) => {
    const user:IClient = req.body;
    try{
        let wwa= new Client(user);
       console.log(wwa)
        wwa.save()
    }catch(error){
       console.log(error)
    }
    res.send('ci si prova')
}

const getClient = (req:Request, res:Response) => {

}

const client_controller = {
    getClient,
    addClient,
}

export default client_controller
