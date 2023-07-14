import mongoose, { Document, Model, Schema } from 'mongoose';
import DevicePrototype from './DevicePrototype';
import { IDevicePrototype } from '../model/class/devPrototype';
import { CheckExistenceFK, VerifyDuplicateKey } from '../middlewares/mongoose';

export interface IDevice extends Document {
  name: string;
  devicePrototypes: Array<mongoose.Types.ObjectId | IDevicePrototype>;
  createdAt: Date;
}

const deviceSchema: Schema<IDevice> = new Schema<IDevice>({
  name: {
    type: String,
    required: true
  },
  devicePrototypes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DevicePrototype'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

CheckExistenceFK(deviceSchema, DevicePrototype, 'devicePrototypes');
VerifyDuplicateKey(deviceSchema);


export default mongoose.model<IDevice>('Device', deviceSchema);
