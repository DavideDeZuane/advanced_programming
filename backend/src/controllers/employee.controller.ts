import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express"
import Employee from "../model/Employee";
import { EmployeeClass, IEmployee } from "../model/class/Employee";
import { addObj, getAll, getById, update } from "../model/method/index";
import { validationResult } from "express-validator";


const addEmployee = async (req:Request, res:Response) => {
  try{
      const employee: EmployeeClass = new EmployeeClass(req.body.name, req.body.role, req.body.department, req.body.birthdate, req.body.fiscalCode, new Date());
      await addObj(Employee, employee, req, res);
      //res.send('Successfully: employee added');
    } catch(error){
      res.send(error)
    }
     
}

const getEmployee = async (req: Request, res: Response) => {
  try{
    await getAll(Employee,req, res)
  }catch(error) {
    res.send(error)
  }
};

const getEmployeeById =async (req: Request, res: Response) => {
  try{
    await getById(Employee, req, res)
  } catch(error){
    res.send(error)
  }
}

const updateEmployee =async (req:Request, res: Response) => {
  try{
    await update(Employee, req, res)
  } catch(error){
    res.send(error)
  }
}

const employee_controller = {
    addEmployee, 
    getEmployee,
    getEmployeeById,
    updateEmployee
}

export default employee_controller;
