import mongoose, { Document, Model, Schema } from 'mongoose';
import { IComponent } from './Component';

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

export default mongoose.model<IDevicePrototype>('DevicePrototype', devicePrototypeSchema);
