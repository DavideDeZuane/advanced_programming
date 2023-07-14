import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IComponent extends Document {
  name: string;
  type: string;
  description?: string;
  price?: number;
  createdAt: Date;
}



class ComponentClass {
  public name: string;
  public type: string;
  public description?: string;
  public price?: number;
  public createdAt: Date;

  constructor(
    name: string,
    type: string,
    createdAt: Date,
    description?: string,
    price?: number
  ) {
    this.name = name;
    this.type = type;
    this.createdAt = createdAt;
    this.description = description;
    this.price = price;
  }

}

export { ComponentClass };
