import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express"
import File from "../model/File";
import { FileClass } from "../model/class/File";
import { addObj, getAll, getById, update } from "../model/method/index";
import { validationResult } from "express-validator";


const addFile = async (req:Request, res:Response) => {
  try {
        const file:FileClass = new FileClass(req.body.name, req.body.device, req.body.fileType, new Date(), req.body.description);
        console.log(`Device: ${req.body.device}`)
        await addObj(File, file, req, res);
        //res.send('Successfully: file added');
      } catch (error) {
        res.send(error);
      }
}

const getFile =async (req:Request, res: Response) => {
  try{
    await getAll(File,req, res)
  }catch(error) {
    res.send(error)
  }
};

const getFileById =async (req: Request, res: Response) => {
  try{
    await getById(File, req, res)
  } catch(error){
    res.send(error)
  }
}

const updateFile =async (req:Request, res: Response) => {
  try{
    await update(File, req, res)
  } catch(error){
    res.send(error)
  }
}

const file_controller = {
    addFile, 
    getFile,
    getFileById,
    updateFile
}

export default file_controller;
