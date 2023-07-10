import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express"
import Component, { IComponent } from "../model/Component";
import { CustomError } from "../middlewares/error.middleware";
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';


const addComponent = (req:Request, res:Response) => {
    const component:IComponent = req.body;
    try{
        let wwa= new Component(component);
        console.log(wwa)
        wwa.save()
    } catch(error) {
       console.log(error)
    }
    res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
}

const component_controller = {
    addComponent
}

export default component_controller;
