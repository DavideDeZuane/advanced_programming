import mongoose, { Document, Model, Schema } from 'mongoose';
import { IFile } from './File';

export interface IVersion extends Document {
    file: mongoose.Types.ObjectId | IFile;
    blob: Buffer;
    versionNumber: string;
    createdAt: Date;
  }
  

class VersionClass {
    public file: Array<mongoose.Types.ObjectId | IFile>;
    public blob: Buffer;
    public versionNumber: string;
    public createdAt: Date;
    
  
    constructor(
      file: Array<mongoose.Types.ObjectId | IFile>,
      blob: Buffer,
      versionNumber: string,
      createdAt: Date,
    ) 
    {
      this.file = file;
      this.blob = blob;
      this.versionNumber = versionNumber;
      this.createdAt = createdAt;
    }

  }
  
  export { VersionClass }

