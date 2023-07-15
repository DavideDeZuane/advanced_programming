import mongoose, { Document, Model, Schema } from 'mongoose';
import Device from './Device';
import Client from './Client';
import { ISystem } from './class/System';
import { CustomError } from '../middlewares/error.middleware';
import { CheckExistenceFK, VerifyDuplicateKey, CheckSizeFK } from '../middlewares/mongoose';

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
  client: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

VerifyDuplicateKey(systemSchema);
CheckExistenceFK(systemSchema, Device, 'devices');
CheckSizeFK(systemSchema, 'client');
CheckExistenceFK(systemSchema, Client, 'client');

export default mongoose.model<ISystem>('System', systemSchema);;
