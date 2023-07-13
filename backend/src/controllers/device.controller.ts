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
import { send } from "process";


const addDevice = async (req:Request, res:Response) => {
    const device:IDevice = req.body;

    try{
        let wwa= new Device({
            name: device.name,
            devicePrototypes: device.devicePrototypes,
        });
        await wwa.save();
        res.send("Succesfully: device added")
    } catch(error) {
        res.send(error)
    }
}

const device = {
    addDevice
}

export default device;
