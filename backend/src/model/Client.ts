import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IClient extends Document {
  firstName: string;
  lastName: string;
  birthDate: Date;
  fiscalCode: string;
  vatNumber: string;
  address: string;
  createdAt: Date;
}

//il pacchetto per la validazione del codice fiscale italiano
//npm install codice-fiscale-js
const CodiceFiscale = require('codice-fiscale-js');

const clientSchema: Schema<IClient> = new Schema<IClient>({
  firstName: {
    type: String,
    match: [/^[a-zA-Z] + $/, 'Only letters'],
    required: true
  },
  lastName: {
    type: String,
    match: [/^[a-zA-Z] + $/, 'Only letters'],
    required: true
  },
  birthDate: {
    type: Date,
    validate: {
      validator: function (value: Date): Boolean {
        return value < new Date();
      },
      message: 'Invalid date'
    },
    required: true
  },
  fiscalCode: {
    type: String,
    validate: {
      validator: function (value: String): Boolean {
        return CodiceFiscale.isValid(value);
      },
      message: 'Invalid CF',
    },
    required: true,
    unique: true
  },
  vatNumber: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IClient>('Client', clientSchema);