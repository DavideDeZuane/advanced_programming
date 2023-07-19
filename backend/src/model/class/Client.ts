import mongoose, { Document, Schema } from 'mongoose';
import Client from "../Client";

export interface IClient extends Document {
  firstName: string;
  lastName: string;
  birthDate: Date;
  fiscalCode: string;
  vatNumber: string;
  address: string;
  createdAt: Date;
  isDisabled: boolean;
}

class ClientClass{
  public firstName: string = '';
  public lastName: string= '';
  public birthDate: Date = new Date('01/01/1970');
  public fiscalCode: string = '';
  public vatNumber: string = '';
  public address: string = '';
  public createdAt: Date = new Date('01/01/1970');;

  constructor() {}

  public static builder(): ClientBuilder {
    return new ClientBuilder();
  }

  public toMongooseDocument(): IClient {
    return new Client(this);
  }

}


class ClientBuilder{
  private client: ClientClass;

  constructor() { this.client = new ClientClass() }

  setFirstName(name:string){
    this.client.firstName = name;
    return this;
  }

  setLastName(name:string){
    this.client.lastName = name;
    return this;
  }

  setFiscalCode(code:string){
    this.client.fiscalCode = code;
    return this;
  }

  setVatNumber(vat:string){
    this.client.vatNumber = vat;
    return this;
  }

  setAddress(address:string){
    this.client.address = address;
    return this;
  }

  setBirthDate(date:Date){
    this.client.birthDate = date;
    return this;
  }

  public build(): ClientClass {
    return this.client;
  }

}

export { ClientClass };
