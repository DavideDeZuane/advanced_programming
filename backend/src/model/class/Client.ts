import mongoose, { Document, Schema } from 'mongoose';

export interface IClient extends Document {
  firstName: string;
  lastName: string;
  birthDate: Date;
  fiscalCode: string;
  vatNumber: string;
  address: string;
  createdAt: Date;
}

class ClientClass{
  public firstName: string;
  public lastName: string;
  public birthDate: Date;
  public fiscalCode: string;
  public vatNumber: string;
  public address: string;
  public createdAt: Date;

  constructor(
    firstName: string,
    lastName: string,
    birthDate: Date,
    fiscalCode: string,
    vatNumber: string,
    address: string,
    createdAt: Date
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.fiscalCode = fiscalCode;
    this.vatNumber = vatNumber;
    this.address = address;
    this.createdAt = createdAt;
  }
}

export { ClientClass };
