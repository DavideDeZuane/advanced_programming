import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express"
import File, { IFile } from "../model/File";
import { CustomError } from "../middlewares/error.middleware";
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';


const addFile = async (req:Request, res:Response) => {
    const file:IFile = req.body;
    try{
        let wwa= new File(file);
        console.log(wwa)
        await wwa.save()
    } catch(error) {
       res.send(error)
    }
}

const file_controller = {
    addFile
}

export default file_controller;
