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
    console.log("Questo è il req.body: " + req.body);
    try{
        let wwa= new File(file);
        console.log("Questo è il wwa: " + wwa)
        await wwa.save()
        res.send("Succesfully: file added")

    } catch(error) {
        console.log("Sono entrato nel catch")
       res.send(error)
    }
}

const file_controller = {
    addFile
}

export default file_controller;
