import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IComponent extends Document {
  name: string;
  type: string;
  description?: string;
  price?: number;
  createdAt: Date;
  isDisabled: boolean;
}



class ComponentClass {
  public name: string;
  public type: string;
  isDisabled: boolean
  public description?: string;
  public price?: number;
  public createdAt: Date;

  constructor(
    name: string,
    type: string,
    createdAt: Date,
    isDisabled: boolean,
    description?: string,
    price?: number
  ) {
    this.name = name;
    this.type = type;
    this.createdAt = createdAt;
    this.description = description;
    this.price = price;
    this.isDisabled = isDisabled;
  }

}

export { ComponentClass };
