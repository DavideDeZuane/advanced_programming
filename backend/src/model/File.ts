import mongoose, { Document, Model, Schema } from 'mongoose';
import Device, { IDevice } from './Device';
import { CustomError } from '../middlewares/error.middleware';
import { CheckExistenceFK, VerifyDuplicateKey } from '../middlewares/mongoose';

export interface IFile extends Document {
  name: string;
  device: Array<mongoose.Types.ObjectId | IDevice>;
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
  device: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device',
    validate: {
      validator: function(value:[mongoose.Schema.Types.ObjectId]) {
        let flag = 0;
        for (let ids of value){
          flag ++;
        }
        return flag <= 1
      },
      message: 'Too much devices. You can put only one!'
    },
    required: true,
    unique: true
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

fileSchema.pre<IFile>('save', async function (next:any) {
  const self = this;
  const Vincolo = await Device.find({_id: self.device}).exec();

  console.log(Vincolo)
  console.log(Vincolo.length)

  if(Vincolo.length === 0){
    next(new Error(`Non esiste il device`))
  }
  else{
    next()
  }
});

fileSchema.pre<IFile>('save', async function (next:any) {
  const self = this;
  const Vincolo = await Device.findById({_id: self.device}).exec();

  if(Vincolo === null){
    next(new CustomError().setCode("DB_ERROR").setDescription("Il device non esiste").setName("Device inesistente").setType("/db/error/insert").setTimeStamp(new Date()))
  }
  else{
    next()
  }
});

VerifyDuplicateKey(fileSchema);
CheckExistenceFK(fileSchema, Device, 'device');

export default mongoose.model<IFile>('File', fileSchema);
