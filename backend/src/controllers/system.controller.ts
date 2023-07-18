import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express"
import System from "../model/System";
import { SystemClass } from "../model/class/System";
import { addObj, getAll, getById, update } from "../model/method/index";
import { validationResult } from "express-validator";


const addSystem = async(req:Request, res:Response) => {
  try{
        const system: SystemClass = new SystemClass(req.body.name, req.body.devices, req.body.address, req.body.client, new Date());
        console.log(`Devices: ${req.body.devices}`)
        console.log(`Client: ${req.body.client}`)
        await addObj(System, system);
        res.send('Successfully: system added');
      } catch (error) {
        res.send(error);
      }
}

const getSystem = async (req: Request, res: Response) => {
  try{
    await getAll(System,req, res)
  }catch(error) {
    res.send(error)
  }
};

const getSystemById =async (req: Request, res: Response) => {
  try{
    await getById(System, req, res)
  } catch(error){
    res.send(error)
  }
}

const updateSystem =async (req:Request, res: Response) => {
  try{
    await update(System, req, res)
  } catch(error){
    res.send(error)
  }
}

const system_controller = {
    addSystem,
    getSystem,
    getSystemById,
    updateSystem
}

export default system_controller;
