import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IComponent extends Document {
  name: string;
  type: string;
  description?: string;
  price?: number;
  createdAt: Date;
}

const componentSchema: Schema<IComponent> = new Schema<IComponent>({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: String,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IComponent>('Component', componentSchema);