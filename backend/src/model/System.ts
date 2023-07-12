import mongoose, { Document, Model, Schema } from 'mongoose';
import Device, { IDevice } from './Device';
import Client, { IClient } from './Client';

export interface ISystem extends Document {
  name: string;
  devices: Array<mongoose.Types.ObjectId | IDevice>;
  address: string;
  client: mongoose.Types.ObjectId | IClient;
  createdAt: Date;
}

const systemSchema: Schema<ISystem> = new Schema<ISystem>({
  name: {
    type: String,
    required: true
  },
  devices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device'
  }],
  address: {
    type: String,
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

systemSchema.pre<ISystem>('save', async function (next:any) {
  const self = this;
  const VincoloClient = await Client.find({_id: self.client}).exec();
  const VincoloDevice = await Device.find({_id: self.devices}).exec();

  console.log(VincoloClient)
  console.log(VincoloClient.length)

  console.log(VincoloDevice)
  console.log(VincoloDevice.length)

  if(VincoloClient.length !== 0 && VincoloDevice.length !== 0){
    next()
  }
  else if (VincoloClient.length === 0){
    next(new Error(`Non esiste il client`))
  }
  else if (VincoloDevice.length === 0){
    next(new Error(`Non esiste il device`))
  }
});

systemSchema.post('save', (error:any, doc:ISystem, next:any):any => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    const duplicateField = Object.keys(error.keyValue)[0];
    console.log(duplicateField);
    next(new Error(`There was a duplicate key error on ${duplicateField}`));
  } else {
    next();
  }
});

const System: Model<ISystem> = mongoose.model<ISystem>('System', systemSchema);
export default System;
