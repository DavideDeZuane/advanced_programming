import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express"
import Operation from "../model/Operation";
import { OperationClass } from "../model/class/Operation";
import { addObj, getAll } from "../model/method/index";
import { CustomError } from "../middlewares/error.middleware";
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';


const addOperation = async (req:Request, res:Response) => {
    console.log(req.body)
    const operation: OperationClass = new OperationClass(req.body.employees, req.body.systems, req.body.description, req.body.type, new Date());
    console.log(`Employees: ${req.body.employees}`)
    console.log(`System: ${req.body.systems}`)
    try {
        await addObj(Operation, operation);
        res.send('Successfully: system added');
      } catch (error) {
        res.send(error);
      }
}

const getOperation =async (req:Request, res: Response) => {getAll(Operation, req, res)}

const operation_controller = {
    addOperation,
    getOperation
}

export default operation_controller;
