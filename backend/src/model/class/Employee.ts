import mongoose, { Document, Schema } from 'mongoose';

export interface IEmployee extends Document {
  name: string;
  role: string;
  department: string;
  birthdate: Date;
  fiscalCode: string;
  createdAt: Date;
}

class EmployeeClass{
  public name: string;
  public role: string;
  public department: string;
  public birthdate: Date;
  public fiscalCode: string;
  public createdAt: Date;

  constructor(
    name: string,
    role: string,
    department: string,
    birthdate: Date,
    fiscalCode: string,
    createdAt: Date
  ) {
    this.name = name;
    this.role = role;
    this.department = department;
    this.birthdate = birthdate;
    this.fiscalCode = fiscalCode;
    this.createdAt = createdAt;
  }
}

export { EmployeeClass };
