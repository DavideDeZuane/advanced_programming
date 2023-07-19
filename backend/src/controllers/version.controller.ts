import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express"
import Version from "../model/Version";
import { VersionClass } from "../model/class/Version";
import { addObj, getAll, getById, update } from "../model/method/index";
import { validationResult } from "express-validator";

const addVersion = async (req:Request, res:Response) => {
    try{
            const version: VersionClass = new VersionClass(req.body.file, req.body.blob, req.body.versionNumber, new Date());
            console.log(`File: ${req.body.file}`)
            await addObj(Version, version, req, res);
            //res.send('Successfully: version added');
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

const getVersionById =async (req: Request, res: Response) => {
    try{
        await getById(Version, req, res)
    } catch(error){
        res.send(error)
    }
}


const version_controller = {
    addVersion,
    getVersion,
    getVersionById
}

export default version_controller;
