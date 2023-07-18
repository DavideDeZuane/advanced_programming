import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express"
import Operation from "../model/Operation";
import { OperationClass } from "../model/class/Operation";
import { addObj, getAll, getById, update } from "../model/method/index";
import { validationResult } from "express-validator";


const addOperation = async (req:Request, res:Response) => {
  try{
        console.log(req.body)
        const operation: OperationClass = new OperationClass(req.body.employees, req.body.systems, req.body.description, req.body.type, new Date());
        console.log(`Employees: ${req.body.employees}`)
        console.log(`System: ${req.body.systems}`)
        await addObj(Operation, operation);
        res.send('Successfully: system added');
      } catch (error) {
        res.send(error);
      }
}

const getOperation =async (req:Request, res: Response) => {
  try{
    await getAll(Operation, req, res)
  }catch(error) {
    res.send(error)
  }
};

const getOperationById =async (req: Request, res: Response) => {
  try{
    await getById(Operation, req, res)
  } catch(error){
    res.send(error)
  }
}

const updateOperation =async (req:Request, res: Response) => {
  try{
    await update(Operation, req, res)
  } catch(error){
    res.send(error)
  }
}

const operation_controller = {
    addOperation,
    getOperation,
    getOperationById,
    updateOperation
}

export default operation_controller;
