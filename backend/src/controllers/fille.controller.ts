import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express"
import File from "../model/File";
import { FileClass } from "../model/class/File";
import { addObj } from "../model/method/index";
import { CustomError } from "../middlewares/error.middleware";
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';


const addFile = async (req:Request, res:Response) => {
    const file:FileClass = new FileClass(req.body.name, req.body.device, req.body.fileType, new Date(), req.body.description);
    console.log(`Device: ${req.body.device}`)
    try {
        await addObj(File, file);
        res.send('Successfully: file added');
      } catch (error) {
        res.send(error);
      }
}

const file_controller = {
    addFile
}

export default file_controller;
