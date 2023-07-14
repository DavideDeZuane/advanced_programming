import { VerifyDuplicateKey } from '../middlewares/mongoose';
import mongoose, { Document, Model, Schema } from 'mongoose';
import { IComponent } from './class/Component';

const componentSchema: Schema<IComponent> = new Schema<IComponent>({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum:{
      values: ['Tipo 1', 'Tipo 2', 'Tipo N'],
      message: '{VALUE}: invalid type'
    },
    required: true
  },
  //per questi due attributi non so che tipo di validazione fare a lvl model
  description: String,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

VerifyDuplicateKey(componentSchema);

export default mongoose.model<IComponent>('Component', componentSchema);