import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express"
import System, { ISystem } from "../model/System";
import { CustomError } from "../middlewares/error.middleware";
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';


const addSystem = async(req:Request, res:Response) => {
    const system:ISystem = req.body;
    try{
        let wwa= new System(system);
        console.log(wwa)
        await wwa.save()
    } catch(error) {
       res.send(error)
    }
}

const system_controller = {
    addSystem
}

export default system_controller;
