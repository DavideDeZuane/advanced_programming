import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express"
import { ComponentClass } from "../model/class/Component";
import { CustomError } from "../middlewares/error.middleware";
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';
import Component from "../model/Component";


const addComponent = async(req:Request, res:Response) => {
    //crea nuovo oggetto di tipo "quello della classe"
    const component:ComponentClass = new ComponentClass(req.body.name, req.body.type, new Date(), req.body.description, req.body.price);
    try{
        //crea oggetto di tipo "quello model" per eseguire i metodi di mongoose
        let wwa= new Component(component);
        console.log(component)
        await wwa.save()
        res.send("Succesfully: component added")

    } catch(error) {
       res.send(error)
    }
}

const component_controller = {
    addComponent
}

export default component_controller;
