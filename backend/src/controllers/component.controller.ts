import mongoose from "mongoose";
import { NextFunction, Request, Response, response } from "express"
import { ComponentClass } from "../model/class/Component";
import { CustomError } from "../middlewares/error.middleware";
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';
import Component from "../model/Component";
import { addObj, getAll } from "../model/method/index";


const addComponent = async(req:Request, res:Response) => {
    //crea nuovo oggetto di tipo "quello della classe"
    const component:ComponentClass = new ComponentClass(req.body.name, req.body.type, new Date(), req.body.description, req.body.price);
    try {
        await addObj(Component, component);
        res.send('Successfully: device added');
      } catch (error) {
        res.send(error);
      }
}

const getComponent = async (req: Request, res: Response) => {getAll(Component, req, res)};

const component_controller = {
    addComponent,
    getComponent
}

export default component_controller;
