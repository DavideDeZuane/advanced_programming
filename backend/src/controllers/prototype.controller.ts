import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express"
import DevicePrototype, { IDevicePrototype } from "../model/DevicePrototype";
import { CustomError } from "../middlewares/error.middleware";
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';


const addPrototype = (req:Request, res:Response) => {
    const proto:IDevicePrototype [] = req.body;
    try{
        let wwa= new DevicePrototype(proto);
        console.log(wwa)
        wwa.save()
    } catch(error) {
       console.log(error)
    }
    res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
}

const prototype_controller = {
    addPrototype
}

export default prototype_controller;
