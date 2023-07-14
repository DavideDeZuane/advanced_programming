import mongoose, { Document, Error, Query, Schema, PreMiddlewareFunction, Model, model } from 'mongoose';
import { Interface } from 'readline';
import { CustomError } from '../../middlewares/error.middleware';

const addObj = async (
    model:any,
    data: any
  ) => {
    try {
      const object = new model(data);
      console.log("Oggetto: " + object)
      await object.save();
    } catch (error) {
      throw error;
    }
  };

  export {addObj}