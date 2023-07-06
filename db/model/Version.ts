import mongoose, { Document, Model, Schema } from 'mongoose';
import { IFile } from './File';

export interface IVersion extends Document {
  file: mongoose.Types.ObjectId | IFile;
  blob: Buffer;
  versionNumber: string;
  createdAt: Date;
}

const versionSchema: Schema<IVersion> = new Schema<IVersion>({
  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    required: true
  },
  blob: {
    type: Buffer,
    required: true
  },
  versionNumber: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Version: Model<IVersion> = mongoose.model<IVersion>('Version', versionSchema);
export default Version;
