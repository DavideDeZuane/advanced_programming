import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express"
import Employee, { IEmployee } from "../model/Employee";
import { CustomError } from "../middlewares/error.middleware";
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';


const addEmployee = async (req:Request, res:Response) => {
    const employee:IEmployee = req.body;
    try{
        let wwa= new Employee(employee);
        console.log(wwa)
        await wwa.save()
    } catch(error) {
       res.send(error)
    }
    res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
}

const employee_controller = {
    addEmployee
}

export default employee_controller;
