import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express"
import Device, { IDevice } from "../model/Device";
import { CustomError } from "../middlewares/error.middleware";
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';


const addDevice = (req:Request, res:Response) => {
    const device:IDevice = req.body;
    console.log(req.body);
    console.log();
    console.log(device);
    console.log();

    try{
        let wwa= new Device({
            name: device.name,
            devicePrototypes: device.devicePrototypes,
        });
        console.log(wwa)
        wwa.save()
    } catch(error) {
       console.log(error)
    }
    res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
}

const device_controller = {
    addDevice
}

export default device_controller;
