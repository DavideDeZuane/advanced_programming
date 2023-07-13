import mongoose, { Document, Model, Schema } from 'mongoose';
import Device, { IDevice } from './Device';
import Client, { IClient } from './Client';
import { CustomError } from '../middlewares/error.middleware';
import { CheckExistenceFK, VerifyDuplicateKey } from '../middlewares/mongoose';

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

VerifyDuplicateKey(systemSchema);
CheckExistenceFK(systemSchema, Device, 'devices');
CheckExistenceFK(systemSchema, Client, 'client');

const System: Model<ISystem> = mongoose.model<ISystem>('System', systemSchema);
export default System;
