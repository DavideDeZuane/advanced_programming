import mongoose, { Document, Model, Schema } from 'mongoose';
import { IDevicePrototype } from './DevicePrototype';

export interface IDevice extends Document {
  name: string;
  prototype: mongoose.Types.ObjectId | IDevicePrototype;
  createdAt: Date;
}

const deviceSchema: Schema<IDevice> = new Schema<IDevice>({
  name: {
    type: String,
    required: true
  },
  prototype: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DevicePrototype',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Device: Model<IDevice> = mongoose.model<IDevice>('Device', deviceSchema);
export default Device;
