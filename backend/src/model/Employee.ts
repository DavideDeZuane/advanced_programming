import { VerifyDuplicateKey } from '../middlewares/mongoose';
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IEmployee extends Document {
  name: string;
  role: string;
  department: string;
  birthdate: Date;
  fiscalCode: string;
  createdAt: Date;
}

const employeeSchema: Schema<IEmployee> = new Schema<IEmployee>({
  name: {
    type:String,
    required: true
  },
  role: {
    type: String,
    enum:{
      values: ['Admin', "Employee", "Worker"],
      message: '{VALUE}: invalid role'
    },
    required: true
  },
  department: {
    type: String,
    enum:{
      values: ['Office', 'Production'],
      message: '{VALUE}: invalid department'
    },
    required: true
  },
  birthdate: {
    type: Date,
    validate: {
      validator: function (value: Date): Boolean {
        return value < new Date();
      },
      message: 'Invalid date'
    },
    required: true
  },
  fiscalCode: {
    type: String,
    validate: {
      validator: function (value: string) {
        // Utilizza la regex per verificare se la Partita IVA è valida
        return /^[0-9]{11}$/.test(value);
      },
      message: 'La Partita IVA non è valida.'
    },
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

VerifyDuplicateKey(employeeSchema);

export default mongoose.model<IEmployee>('Employee', employeeSchema);
