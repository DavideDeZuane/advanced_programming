import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express"
import {DeviceClass } from "../model/class/Device";
import Device from "../model/Device";
import { addObj } from "../model/method/index";
import { CustomError } from "../middlewares/error.middleware";
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';
import { send } from "process";


const addDevice = async (req:Request, res:Response) => {
    const device: DeviceClass = new DeviceClass(req.body.name, req.body.devicePrototypes, new Date());
    console.log(`Prototipo: ${req.body.devicePrototypes}`)
    try {
        await addObj(Device, device);
        res.send('Successfully: device added');
      } catch (error) {
        res.send(error);
      }
}

const device_controller = {
    addDevice
}

export default device_controller;
