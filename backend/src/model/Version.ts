import mongoose, { Document, Model, Schema } from 'mongoose';
import File from './File';
import { IVersion } from './class/Version';
import { CustomError } from '../middlewares/error.middleware';
import { CheckExistenceFK, VerifyDuplicateKey, CheckSizeFK } from '../middlewares/mongoose';

const versionSchema: Schema<IVersion> = new Schema<IVersion>({
  file: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    required: true
  }],
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

VerifyDuplicateKey(versionSchema);
CheckSizeFK(versionSchema, 'file')
CheckExistenceFK(versionSchema, File, 'file')

const Version: Model<IVersion> = mongoose.model<IVersion>('Version', versionSchema);
export default Version;
