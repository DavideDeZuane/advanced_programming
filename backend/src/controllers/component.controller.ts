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
import { addObj, getAll, getById } from "../model/method/index";


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

const getComponent = async (req: Request, res: Response) => {
  try{
    await getAll(Component,req, res)
  }catch(error) {
    res.send(error)
  }
};

const getComponentById =async (req: Request, res: Response) => {
  try{
    await getById(Component, req, res)
  } catch(error){
    res.send(error)
  }
}
const component_controller = {
    addComponent,
    getComponent,
    getComponentById
}

export default component_controller;
