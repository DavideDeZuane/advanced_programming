import mongoose, { Document, Model, Schema } from 'mongoose';
import Employee, { IEmployee } from './Employee';
import System, { ISystem } from './System';
import { CustomError } from '../middlewares/error.middleware';
import { CheckExistenceFK, VerifyDuplicateKey } from '../middlewares/mongoose';

export interface IOperation extends Document {
  employees: Array<mongoose.Types.ObjectId | IEmployee>;
  systems: mongoose.Types.ObjectId | ISystem;
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
  systems: {
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

VerifyDuplicateKey(operationSchema);
CheckExistenceFK(operationSchema, Employee, 'employees');
CheckExistenceFK(operationSchema, System, 'systems');

const Operation: Model<IOperation> = mongoose.model<IOperation>('Operation', operationSchema);
export default Operation;
