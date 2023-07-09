import mongoose, { Document, Model, Schema } from 'mongoose';
import { IDevice } from './Device';

export interface IFile extends Document {
  name: string;
  device: mongoose.Types.ObjectId | IDevice;
  fileType: string;
  description?: string;
  createdAt: Date;
}

const fileSchema: Schema<IFile> = new Schema<IFile>({
  name: {
    type: String,
    match: [/^[a-zA-Z0-9]+$/, 'Il campo deve essere alfanumerico'],
    required: true
  },
  device: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device',
    required: true
  },
  fileType: {
    type: String,
    enum:{
      values: ['csv', 'doc', 'docx', 'pdf', 'txt', 'xls', 'xlsx'],
      message: '{VALUE}: invalid file type.'
    },
    required: true
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const File: Model<IFile> = mongoose.model<IFile>('File', fileSchema);
export default mongoose.model<IFile>('File', fileSchema);
