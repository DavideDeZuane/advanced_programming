import mongoose, { Document, Model, Schema } from 'mongoose';
import Device from './Device';
import { IFile } from './class/File';
import { CustomError } from '../middlewares/error.middleware';
import { CheckExistenceFK, VerifyDuplicateKey, CheckSizeFK } from '../middlewares/mongoose';

const fileSchema: Schema<IFile> = new Schema<IFile>({
  name: {
    type: String,
    match: [/^[a-zA-Z0-9]+$/, 'Il campo deve essere alfanumerico'],
    required: true
  },
  device: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device',
    required: true
  }],
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

VerifyDuplicateKey(fileSchema);
CheckSizeFK(fileSchema, 'device');
CheckExistenceFK(fileSchema, Device, 'device');

export default mongoose.model<IFile>('File', fileSchema);
