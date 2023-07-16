import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express"
import Version from "../model/Version";
import { VersionClass } from "../model/class/Version";
import { addObj, getAll } from "../model/method/index";
import { CustomError } from "../middlewares/error.middleware";
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';


const addVersion = async (req:Request, res:Response) => {
    const version: VersionClass = new VersionClass(req.body.file, req.body.blob, req.body.versionNumber, new Date());
    //riga sotto va modificata
    version.blob = Buffer.from("Faccio un esempio di blob", 'utf-8')
    console.log(`File: ${req.body.file}`)
    try {
        await addObj(Version, version);
        res.send('Successfully: file added');
    } catch (error) {
        res.send(error);
    }
}

const getVersion =async (req:Request, res: Response) => {
    try{
        await getAll(Version,req, res)
      }catch(error) {
        res.send(error)
      }
    };

const version_controller = {
    addVersion,
    getVersion
}

export default version_controller;
