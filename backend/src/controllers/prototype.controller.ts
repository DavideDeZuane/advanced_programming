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


const addPrototype = async (req:Request, res:Response) => {
    const proto:IDevicePrototype = req.body;
    try{
        let wwa= new DevicePrototype(proto);
        //console.log(wwa)
        await wwa.save()
        res.send("Succesfully: prototype added")
    } catch(error) {
       res.send(error)
    }
}

const prototype_controller = {
    addPrototype
}

export default prototype_controller;
