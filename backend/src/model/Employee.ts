import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IEmployee extends Document {
  name: string;
  role: string;
  department: string;
  birthdate: Date;
  fiscalCode: string;
  createdAt: Date;
}

const CodiceFiscale = require('codice-fiscale-js');

const employeeSchema: Schema<IEmployee> = new Schema<IEmployee>({
  name: {
    type: String,
    match: [/^[a-zA-Z] + $/, 'Only letters'],
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
      validator: function (value: String): Boolean {
        return CodiceFiscale.isValid(value);
      },
      message: 'Invalid CF',
    },
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Employee: Model<IEmployee> = mongoose.model<IEmployee>('Employee', employeeSchema);
export default mongoose.model<IEmployee>('Employee', employeeSchema);
