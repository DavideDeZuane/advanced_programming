import mongoose, { Document, Error, Query, Schema, PreMiddlewareFunction, Model } from 'mongoose';
import { Interface } from 'readline';
import { CustomError } from './error.middleware';

function VerifyDuplicateKey(schem: any){
    schem.post('save', (error: any, doc: Interface, next: any):any => {
      console.log("Entro in VerifyDuplicateKey")
    if (error.name === 'MongoServerError' && error.code === 11000) {
        const duplicateField = Object.keys(error.keyValue)[0];
        console.log(duplicateField);
        next(new CustomError()
        .setCode("409")
        .setDescription("Duplicate key error on field: " + duplicateField)
        .setName("Duplicate key")
        .setType("/db/error/insert")
        .setTimeStamp(new Date()));
    } else {
        next();
    }
    })
}

function CheckExistenceFK(schem: any, mod: any, fk: any) {

    schem.pre('save', async function (this: any, next: any) {
      console.log("Entro in CheckExsistenceFK")
      const self = this;
      for (let foreign of self[fk]){
        console.log("Entro ciclo for");
        console.log()
        console.log(`Questo è foreign: ${[foreign]}`)
        const check = await mod.findById([foreign]).exec();
        console.log("Questo è check: " + check);
        console.log()
    
        if (check === null) {
          console.log("Sono entrato in if CheckExistenceFK")
          next(
            new CustomError()
              .setCode("DB_ERROR")
              .setDescription("Inexistent foreign key reference to: " + mod.modelName)
              .setName("Inexistent reference")
              .setType("/db/error/insert")
              .setTimeStamp(new Date())
          );
          console.log("Ho fatto il next");
        } 
      } next();
    });
  }
  
  function CheckSizeFK (schem: any, fk: any){
    schem.pre('validate', function(this: any, next: any){
      console.log("Entro in CheckSizeFK")
      const self = this;
      console.log("Dimensione di self[fk]: " + self[fk].length)
      if (self[fk].length > 1){
        console.log("Sono entrato in if CheckSizeFK")
        next(
          new CustomError()
            .setCode("DB_ERROR")
            .setDescription("Too many " + fk)
            .setName("Too many FK")
            .setType("/db/error/insert")
            .setTimeStamp(new Date())
        );
      } else {
        next()
      }
    });
  }


    

export { VerifyDuplicateKey, CheckExistenceFK, CheckSizeFK}
