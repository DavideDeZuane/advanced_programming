import mongoose, { Document, Model, Schema } from 'mongoose';
import Employee, { IEmployee } from './Employee';
import System, { ISystem } from './System';
import { CustomError } from '../middlewares/error.middleware';

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

operationSchema.pre<IOperation>('save', async function (next:any) {
  const self = this;
  const VincoloSystem = await System.find({_id: self.systems}).exec();
  const VincoloEmployee = await Employee.find({_id: self.employees}).exec();

  console.log(VincoloSystem)
  console.log(VincoloSystem.length)

  console.log(VincoloEmployee)
  console.log(VincoloEmployee.length)

  if(VincoloSystem.length !== 0 && VincoloEmployee.length !== 0){
    next()
  }
  else if (VincoloSystem.length === 0){
    next(new Error(`Non esiste il system`))
  }
  else if (VincoloEmployee.length === 0){
    next(new Error(`Non esiste l'employee`))
  }
});

operationSchema.pre<IOperation>('save', async function (next:any) {
  const self = this;
  const VincoloEmployes = await Employee.find({_id: self.employees}).exec();
  const VincoloSystem = await System.findById({_id: self.systems})

  if(VincoloEmployes.length === self.employees.length && VincoloSystem !== null){
    next()
  }
  else if (VincoloEmployes.length !== self.employees.length){
    next(new CustomError().setCode("DB_ERROR").setDescription("Il device non esiste").setName("Device inesistente").setType("/db/error/insert").setTimeStamp(new Date()))
  }
  else if (VincoloSystem !== null){
    next(new CustomError().setCode("DB_ERROR").setDescription("Il cliente non esiste").setName("Cliente inesistente").setType("/db/error/insert").setTimeStamp(new Date()))
  }
});

operationSchema.post('save', (error:any, doc:IOperation, next:any):any => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    const duplicateField = Object.keys(error.keyValue)[0];
    console.log(duplicateField);
    next(new Error(`There was a duplicate key error on ${duplicateField}`));
  } else {
    next();
  }
});

const Operation: Model<IOperation> = mongoose.model<IOperation>('Operation', operationSchema);
export default Operation;
