import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express"
import System from "../model/System";
import { SystemClass } from "../model/class/System";
import { addObj } from "../model/method/index";
import { CustomError } from "../middlewares/error.middleware";
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';


const addSystem = async(req:Request, res:Response) => {
    const system: SystemClass = new SystemClass(req.body.name, req.body.devices, req.body.address, req.body.client, new Date());
    console.log(`Devices: ${req.body.devices}`)
    console.log(`Client: ${req.body.client}`)
    try {
        await addObj(System, system);
        res.send('Successfully: system added');
      } catch (error) {
        res.send(error);
      }
}

const system_controller = {
    addSystem
}

export default system_controller;
