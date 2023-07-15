import mongoose, { Document, Model, Schema } from 'mongoose';
import Employee from './Employee';
import System from './System';
import { IOperation } from '../model/class/Operation';
import { CustomError } from '../middlewares/error.middleware';
import { CheckExistenceFK, VerifyDuplicateKey, CheckSizeFK } from '../middlewares/mongoose';

const operationSchema: Schema<IOperation> = new Schema<IOperation>({
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  }],
  systems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'System',
    required: true
  }],
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
CheckSizeFK(operationSchema, 'systems')
CheckExistenceFK(operationSchema, System, 'systems');

export default mongoose.model<IOperation>('Operation', operationSchema);
