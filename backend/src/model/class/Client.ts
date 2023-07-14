import { VerifyDuplicateKey } from '../../middlewares/mongoose';
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

class Client implements Partial<IClient> {
  private _firstName: string;
  private _lastName: string;
  private _birthDate: Date;
  private _fiscalCode: string;
  private _vatNumber: string;
  private _address: string;
  private _createdAt: Date;

  constructor(
    firstName: string,
    lastName: string,
    birthDate: Date,
    fiscalCode: string,
    vatNumber: string,
    address: string,
    createdAt: Date
  ) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthDate = birthDate;
    this._fiscalCode = fiscalCode;
    this._vatNumber = vatNumber;
    this._address = address;
    this._createdAt = createdAt;
  }

  // Getter methods
  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get birthDate(): Date {
    return this._birthDate;
  }

  get fiscalCode(): string {
    return this._fiscalCode;
  }

  get vatNumber(): string {
    return this._vatNumber;
  }

  get address(): string {
    return this._address;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  // Setter methods
  set firstName(value: string) {
    this._firstName = value;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  set birthDate(value: Date) {
    this._birthDate = value;
  }

  set fiscalCode(value: string) {
    this._fiscalCode = value;
  }

  set vatNumber(value: string) {
    this._vatNumber = value;
  }

  set address(value: string) {
    this._address = value;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }
}

export { Client };
