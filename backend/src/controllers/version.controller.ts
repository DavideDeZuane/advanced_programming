import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express"
import Version from "../model/Version";
import { VersionClass } from "../model/class/Version";
import { addObj, getAll, getById, update } from "../model/method/index";
import { validationResult } from "express-validator";

const addVersion = async (req:Request, res:Response) => {
    try{
            const version: VersionClass = new VersionClass(req.body.file, req.body.blob, req.body.versionNumber, new Date());
            //riga sotto va modificata
            version.blob = Buffer.from("Faccio un esempio di blob", 'utf-8')
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

//non so se è utile poichè coverrebbe creare un'altra versione
const updateVersion =async (req:Request, res: Response) => {
    try{
      await update(Version, req, res)
    } catch(error){
      res.send(error)
    }
  }

const version_controller = {
    addVersion,
    getVersion,
    getVersionById,
    updateVersion
}

export default version_controller;
