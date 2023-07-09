import mongoose, { Document, Model, Schema } from 'mongoose';
import { IEmployee } from './Employee';
import { ISystem } from './System';

export interface IOperation extends Document {
  employees: Array<mongoose.Types.ObjectId | IEmployee>;
  system: mongoose.Types.ObjectId | ISystem;
  description: string;
  type: string;
  createdAt: Date;
}

const operationSchema: Schema<IOperation> = new Schema<IOperation>({
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  }],
  system: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'System',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum:{
      values: ['Riparazione', 'Sostituzione', 'Instaurazione nuovo device', 'Costruzione impianto', 'Operazione z'],
      message: '{VALUE}: invalid operation'
    },
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Operation: Model<IOperation> = mongoose.model<IOperation>('Operation', operationSchema);
export default Operation;
