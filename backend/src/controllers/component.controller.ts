import mongoose from "mongoose";
import { NextFunction, Request, Response, response } from "express"
import { ComponentClass } from "../model/class/Component";
import Component from "../model/Component";
import { addObj, getAll, getById, update } from "../model/method/index";


const addComponent = async(req:Request, res:Response) => {
  try {
        //crea nuovo oggetto di tipo "quello della classe"
        const component:ComponentClass = new ComponentClass(req.body.name, req.body.type, new Date(), req.body.description, req.body.price);
        await addObj(Component, component, req, res);
        //res.send('Successfully: component added');
      } catch (error) {
        res.send(error);
      }
}

const getComponent = async (req: Request, res: Response) => {
  try{
    await getAll(Component,req, res)
  }catch(error) {
    //forse qui non c'è bisogno del res.send in quanto in get all è gestito anche il caso in cui error è 
    //istanza di Error
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

const updateComponent =async (req:Request, res: Response) => {
  try{
    await update(Component, req, res)
  } catch(error){
    res.send(error)
  }
}

const component_controller = {
    addComponent,
    getComponent,
    getComponentById,
    updateComponent
}

export default component_controller;
