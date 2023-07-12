import mongoose, { Document, Model, Schema } from 'mongoose';
import DevicePrototype, { IDevicePrototype } from './DevicePrototype';
import { NextFunction } from 'express';
import { throws } from 'assert';
import { errHandler } from '../middlewares';

export interface IDevice extends Document {
  name: string;
  devicePrototypes: mongoose.Types.ObjectId | IDevicePrototype;
  createdAt: Date;
}

const deviceSchema: Schema<IDevice> = new Schema<IDevice>({
  name: {
    type: String,
    required: true
  },
  devicePrototypes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DevicePrototype'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

deviceSchema.pre<IDevice>('save', async function (next:any) {
  const self = this;
  const Vincolo = await DevicePrototype.findById({_id: self.devicePrototypes}).exec();
  console.log(Vincolo)

  if(Vincolo === null){
    self.invalidate('devicePrototypes', 'non abbiamo trovato questo prototipo');
    next('error')
  }
  else{
    next()
  }
});

deviceSchema.post('save', (error:any, doc:IDevice, next:any):any => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    const duplicateField = Object.keys(error.keyValue)[0];
    console.log(duplicateField);
    next(new Error(`There was a duplicate key error on ${duplicateField}`));
  } else {
    next();
  }
});


export default mongoose.model<IDevice>('Device', deviceSchema);
