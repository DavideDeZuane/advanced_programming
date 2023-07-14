import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express"
import { addObj } from "../model/method/index"
import DevicePrototype from "../model/DevicePrototype";
import { DevicePrototypeClass } from "../model/class/devPrototype";
import { CustomError } from "../middlewares/error.middleware";
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';


const addPrototype = async (req:Request, res:Response) => {
    const proto:DevicePrototypeClass = new DevicePrototypeClass(req.body.name, req.body.components, new Date());
    console.log(`Components: ${req.body.components}`)
    try {
        await addObj(DevicePrototype, proto);
        res.send('Successfully: prototipo added');
      } catch (error) {
        res.send(error);
      }
}

const prototype_controller = {
    addPrototype
}

export default prototype_controller;
