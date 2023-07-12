import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express"
import Version, { IVersion } from "../model/Version";
import { CustomError } from "../middlewares/error.middleware";
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';


const addVersion = async (req:Request, res:Response) => {
    const version:IVersion = req.body;
    //riga sotto va modificata
    version.blob = Buffer.from("Faccio un esempio di blob", 'utf-8')
    try{
        let wwa= new Version(version);
        console.log(wwa)
        await wwa.save()
    } catch(error) {
       res.send(error)
    }
    res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
}

const version_controller = {
    addVersion
}

export default version_controller;
