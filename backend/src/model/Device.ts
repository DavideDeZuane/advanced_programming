import mongoose, { Document, Model, Schema } from 'mongoose';
import { IDevicePrototype } from './DevicePrototype';

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
    required: true,
    ref: 'DevicePrototype'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
export default mongoose.model<IDevice>('Device', deviceSchema);
