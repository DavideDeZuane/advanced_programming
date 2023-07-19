import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express"
import {DeviceClass } from "../model/class/Device";
import Device from "../model/Device";
import { addObj, deleteByID, getAll, getById, update } from "../model/method/index";
import { validationResult } from "express-validator";


const addDevice = async (req:Request, res:Response) => {
  try {
        const device: DeviceClass = new DeviceClass(req.body.name, req.body.devicePrototypes, new Date(), false);
        console.log(`Prototipo: ${req.body.devicePrototypes}`)
        await addObj(Device, device, req, res);    
        //res.send('Successfully: device added');
      } catch (error) {
        res.send(error);
      }
}

const getDevice = async (req: Request, res: Response) => {
  try{
    await getAll(Device,req, res)
  }catch(error) {
    res.send(error)
  }
};

const getDeviceById =async (req: Request, res: Response) => {
  try{
    await getById(Device, req, res)
  } catch(error){
    res.send(error)
  }
}

const updateDevice =async (req:Request, res: Response) => {
  try{
    await update(Device, req, res)
  } catch(error){
    res.send(error)
  }
}

const deleteDevice =async (req:Request, res: Response) => {
  try{
    await deleteByID(Device, req, res)
  }catch(error){
    res.send(error)
  }
}

const device_controller = {
    addDevice,
    getDevice,
    getDeviceById,
    updateDevice,
    deleteDevice
}

export default device_controller;
