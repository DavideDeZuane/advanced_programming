import mongoose, { Document, Model, Schema } from 'mongoose';
import DevicePrototype from './DevicePrototype';
import { IDevice } from './class/Device';
import { CheckExistenceFK, VerifyDuplicateKey, CheckSizeFK } from '../middlewares/mongoose';

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
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
});

CheckSizeFK(deviceSchema, 'devicePrototypes')
CheckExistenceFK(deviceSchema, DevicePrototype, 'devicePrototypes');
VerifyDuplicateKey(deviceSchema);


export default mongoose.model<IDevice>('Device', deviceSchema);
