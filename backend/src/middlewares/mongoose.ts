import mongoose, { Document, Error, Query, Schema, PreMiddlewareFunction, Model } from 'mongoose';
import { Interface } from 'readline';
import { CustomError } from './error.middleware';

function VerifyDuplicateKey(schem: any){
    schem.post('save', (error: any, doc: Interface, next: any):any => {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        const duplicateField = Object.keys(error.keyValue)[0];
        console.log(duplicateField);
        next(new Error(`There was a duplicate key error on ${duplicateField}`));
    } else {
        next();
    }
    })
}


function CheckExistenceFK(schem: any, mod: any, fk: any) {

    schem.pre('save', async function (this: any, next: any) {

      const self = this;
      const check = await mod.findById(self[fk]).exec();
  
      if (check === null) {
        next(
          new CustomError()
            .setCode("DB_ERROR")
            .setDescription("Inexistent foreign key reference to: " + mod.modelName)
            .setName("Prototipo inesistente")
            .setType("/db/error/insert")
            .setTimeStamp(new Date())
        );
      } else {
        next();
      }
    });
  }
  


    

export { VerifyDuplicateKey, CheckExistenceFK}
