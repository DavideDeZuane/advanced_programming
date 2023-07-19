import { VerifyDuplicateKey } from '../middlewares/mongoose';
import mongoose, { Document, Model, Schema } from 'mongoose';
import { IComponent } from './class/Component';

const componentSchema: Schema<IComponent> = new Schema<IComponent>({
  name: {
    type: String,
    validate: {
      validator: function (value: string) {
        return /^[a-zA-Z\s0-9]+$/.test(value);
      },
      message: "Symbols not allowed"
    },
    required: true,
  },
  type: {
    type: String,
    enum:{
      values: ['Tipo X', 'Tipo Y', 'Tipo N'],
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
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
});

VerifyDuplicateKey(componentSchema);

export default mongoose.model<IComponent>('Component', componentSchema);