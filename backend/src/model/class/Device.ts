import mongoose, { Document, Model, Schema } from 'mongoose';
import { IDevicePrototype } from './devPrototype';

export interface IDevice extends Document {
  name: string;
  devicePrototypes: Array<mongoose.Types.ObjectId | IDevicePrototype>;
  createdAt: Date;
  isDisabled: boolean;
  }



class DeviceClass {
  public name: string;
  public devicePrototypes: Array<mongoose.Types.ObjectId>;
  public createdAt: Date;
  public isDisabled: boolean

  constructor(
    name: string,
    devicePrototypes: Array<mongoose.Types.ObjectId>,
    createdAt: Date,
    isDisabled: boolean
  ) {
    this.name = name;
    this.devicePrototypes = devicePrototypes;
    this.createdAt = createdAt
    this.isDisabled = isDisabled
  }

}

export { DeviceClass };
