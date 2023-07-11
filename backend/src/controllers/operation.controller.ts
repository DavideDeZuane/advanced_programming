import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express"
import Operation, { IOperation } from "../model/Operation";
import { CustomError } from "../middlewares/error.middleware";
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';


const addOperation = (req:Request, res:Response) => {
    console.log(req.body)
    const operation:IOperation = req.body;
    console.log(operation)
    try{
        let wwa= new Operation(operation);
        console.log(wwa)
        wwa.save()
    } catch(error) {
       console.log(error)
    }
    res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
}

const operation_controller = {
    addOperation
}

export default operation_controller;
