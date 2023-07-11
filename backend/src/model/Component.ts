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

componentSchema.post('save', (error:any, doc:IComponent, next:any):any => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    const duplicateField = Object.keys(error.keyValue)[0];
    console.log(duplicateField);
    next(new Error(`There was a duplicate key error on ${duplicateField}`));
  } else {
    next();
  }
});

export default mongoose.model<IComponent>('Component', componentSchema);