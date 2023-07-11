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


const addSystem = (req:Request, res:Response) => {
    const system:ISystem = req.body;
    try{
        let wwa= new System(system);
        console.log(wwa)
        wwa.save()
    } catch(error) {
       console.log(error)
    }
    res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
}

const system_controller = {
    addSystem
}

export default system_controller;