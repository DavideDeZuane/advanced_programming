import mongoose, { Document, Model, Schema } from 'mongoose';
import Component from './Component';
import { CheckExistenceFK, VerifyDuplicateKey } from '../middlewares/mongoose';
import { IDevicePrototype} from "../model/class/devPrototype"

const devicePrototypeSchema: Schema<IDevicePrototype> = new Schema<IDevicePrototype>({
  name: {
    type: String,
    required: true
  },
  components: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Component'
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

VerifyDuplicateKey(devicePrototypeSchema);
CheckExistenceFK(devicePrototypeSchema, Component, 'components');

export default mongoose.model<IDevicePrototype>('DevicePrototype', devicePrototypeSchema);
