import mongoose, { Document, Model, Schema } from 'mongoose';
import File, { IFile } from './File';

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
    validate: {
      validator: function(value: string) {
        const numero = parseFloat(value);
        return !isNaN(numero) && numero >= 1.0;
      },
      message: 'Il valore di versionNumber deve essere un numero effettivo con un valore minimo di 1.0.'
    },
    required: [true, 'Inserire il numero di versione']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

versionSchema.pre<IVersion>('save', async function (next:any) {
  const self = this;
  const Vincolo = await File.find({_id: self.file}).exec();

  console.log(Vincolo)
  console.log(Vincolo.length)

  if(Vincolo.length === 0){
    next(new Error(`Non esiste il file`))
  }
  else{
    next()
  }
});

versionSchema.post('save', (error:any, doc:IVersion, next:any):any => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    const duplicateField = Object.keys(error.keyValue)[0];
    console.log(duplicateField);
    next(new Error(`There was a duplicate key error on ${duplicateField}`));
  } else {
    next();
  }
});

const Version: Model<IVersion> = mongoose.model<IVersion>('Version', versionSchema);
export default Version;
