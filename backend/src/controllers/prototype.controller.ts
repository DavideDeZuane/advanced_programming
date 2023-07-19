import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express"
import { addObj, deleteByID, getAll, getById, update } from "../model/method/index"
import DevicePrototype from "../model/DevicePrototype";
import { DevicePrototypeClass } from "../model/class/devPrototype";
import { validationResult } from "express-validator";


const addPrototype = async (req:Request, res:Response) => {
  try{
      const proto:DevicePrototypeClass = new DevicePrototypeClass(req.body.name, req.body.components, new Date(), false);
      console.log(`Components: ${req.body.components}`)
      await addObj(DevicePrototype, proto, req, res);
      //res.send('Successfully: prototype added');
    } catch (error) {
      res.send(error);
    }
}
  
const getPrototype = async (req: Request, res: Response) => {
  try{
    await getAll(DevicePrototype, req, res)
  }catch(error) {
    res.send(error)
  }
};

const getPrototypeById =async (req: Request, res: Response) => {
  try{
    await getById(DevicePrototype, req, res)
  } catch(error){
    res.send(error)
  }
}

const updatePrototype =async (req:Request, res: Response) => {
  try{
    await update(DevicePrototype, req, res)
  } catch(error){
    res.send(error)
  }
}

const deletePrototype =async (req:Request, res: Response) => {
  try{
    await deleteByID(DevicePrototype, req, res)
  }catch(error){
    res.send(error)
  }
}

const prototype_controller = {
    addPrototype,
    getPrototype,
    getPrototypeById,
    updatePrototype,
    deletePrototype
}

export default prototype_controller;
