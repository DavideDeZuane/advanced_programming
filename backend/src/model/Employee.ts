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
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  fiscalCode: {
    type: String,
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
