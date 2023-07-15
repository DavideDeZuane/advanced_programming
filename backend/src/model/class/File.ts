import mongoose, { Document, Model, Schema } from 'mongoose';
import { IDevice } from './Device';

export interface IFile extends Document {
    name: string;
    device: Array<mongoose.Types.ObjectId | IDevice>;
    fileType: string;
    description?: string;
    createdAt: Date;
  }

class FileClass {
    public name: string;
    public device: Array<mongoose.Types.ObjectId>;
    public fileType: string;
    public createdAt: Date;
    public desscription?: string;
    
  
    constructor(
      name: string,
      device: Array<mongoose.Types.ObjectId>,
      fileType: string,
      createdAt: Date,
      desscription?: string
    ) {
      this.name = name;
      this.device = device;
      this.fileType = fileType;
      this.createdAt = createdAt;
      this.desscription = desscription
    }
  
  }
  
  export { FileClass }

