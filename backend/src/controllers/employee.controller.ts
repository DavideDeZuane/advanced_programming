import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express"
import Employee from "../model/Employee";
import { EmployeeClass, IEmployee } from "../model/class/Employee";
import { addObj, getAll } from "../model/method/index";
import { CustomError } from "../middlewares/error.middleware";
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';


const addEmployee = async (req:Request, res:Response) => {
    const employee: EmployeeClass = new EmployeeClass(req.body.name, req.body.role, req.body.department, req.body.birthDate, req.body.fiscalCode, new Date());
    try {
        await addObj(Employee, employee);
        res.send('Successfully: device added');
      } catch (error) {
        res.send(error);
      }
}

const getEmployee = async (req: Request, res: Response) => {
  try{
    await getAll(Employee,req, res)
  }catch(error) {
    res.send(error)
  }
};

const employee_controller = {
    addEmployee, 
    getEmployee
}

export default employee_controller;
