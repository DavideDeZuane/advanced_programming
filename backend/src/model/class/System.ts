import mongoose, { Document, Model, Schema } from 'mongoose';
import { IDevice } from './Device';
import { IClient } from './Client';
import { add } from 'winston';

export interface ISystem extends Document {
  name: string;
  devices: Array<mongoose.Types.ObjectId | IDevice>;
  address: string;
  client: Array<mongoose.Types.ObjectId | IClient>;
  createdAt: Date;
  }



class SystemClass {
  public name: string;
  public devices: Array<mongoose.Types.ObjectId>;
  public address: string;
  public client: Array<mongoose.Types.ObjectId>
  public createdAt: Date;

  constructor(
    name: string,
    devices: Array<mongoose.Types.ObjectId>,
    address: string,
    client: Array<mongoose.Types.ObjectId>,
    createdAt: Date
  ) {
    this.name = name;
    this.devices = devices;
    this.address = address;
    this.client = client;
    this.createdAt = createdAt
  }

}

export { SystemClass }