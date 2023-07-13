import mongoose, { Document, Error, Query, Schema, PreMiddlewareFunction, Model } from 'mongoose';
import { Interface } from 'readline';
import { CustomError } from './error.middleware';

function VerifyDuplicateKey(schem: Schema<Interface>){
    schem.post('save', (error: any, doc: Document, next: any):any => {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        const duplicateField = Object.keys(error.keyValue)[0];
        console.log(duplicateField);
        next(new Error(`There was a duplicate key error on ${duplicateField}`));
    } else {
        next();
    }
    })
}


function CheckExistenceFK(schem: Schema<Interface>, mod:Model<Interface>) {
    schem.pre('save', async function (next:any) {
        const self = this;
        const Check = await mod.findById({_id: self._id}).exec();

        if(Check === null){
            next(new CustomError().setCode("DB_ERROR").setDescription("Il prototipo non esiste").setName("Prototipo inesistente").setType("/db/error/insert").setTimeStamp(new Date()))
          }
          else{
            next()
          }
        });
    }


    

export { VerifyDuplicateKey, CheckExistenceFK}