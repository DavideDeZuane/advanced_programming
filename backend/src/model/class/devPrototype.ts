import mongoose, { Document, Model, Schema } from 'mongoose';
import { IComponent } from './Component';

export interface IDevicePrototype extends Document {
  name: string;
  components: Array<mongoose.Types.ObjectId | IComponent>;
  createdAt: Date;
}



class DevicePrototypeClass {
  public name: string;
  public components: Array<mongoose.Types.ObjectId>;
  public createdAt: Date;

  constructor(
    name: string,
    components: Array<mongoose.Types.ObjectId>,
    createdAt: Date
  ) {
    this.name = name;
    this.components = components;
    this.createdAt = createdAt;
  }

}

export { DevicePrototypeClass };
