import mongoose, { Document, Model, Schema } from 'mongoose';
import Component, { IComponent } from './Component';
import { CheckExistenceFK, VerifyDuplicateKey } from '../middlewares/mongoose';

export interface IDevicePrototype extends Document {
  name: string;
  components: Array<mongoose.Types.ObjectId | IComponent>;
  createdAt: Date;
}

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
  }
});

VerifyDuplicateKey(devicePrototypeSchema);
CheckExistenceFK(devicePrototypeSchema, Component, 'components');

export default mongoose.model<IDevicePrototype>('DevicePrototype', devicePrototypeSchema);
