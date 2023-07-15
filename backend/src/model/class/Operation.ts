import mongoose, { Document, Schema } from 'mongoose';
import { IEmployee } from './Employee';
import { ISystem } from './System';

export interface IOperation extends Document {
    employees: Array<mongoose.Types.ObjectId | IEmployee>;
    systems: Array<mongoose.Types.ObjectId | ISystem>;
    description: string;
    type: string;
    createdAt: Date;
  }

class OperationClass {
  public employees: Array<mongoose.Types.ObjectId | IEmployee>;
  public systems: Array<mongoose.Types.ObjectId | ISystem>;
  public description: string;
  public type: string;
  public createdAt: Date;

  constructor(
    employees: Array<mongoose.Types.ObjectId | IEmployee>,
    systems: Array<mongoose.Types.ObjectId | ISystem>,
    description: string,
    type: string,
    createdAt: Date
  ) {
    this.employees = employees;
    this.systems = systems;
    this.description = description;
    this.type = type;
    this.createdAt = createdAt;
  }
}

export { OperationClass };
  