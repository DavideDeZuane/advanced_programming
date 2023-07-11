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

const validator = {
  firstName: {
    function: function(value:string) {return /^[a-zA-Z\s]{2,50}$/.test(value);},
    message: 'Il nome non è valido. Deve contenere solo lettere, spazi, apostrofi o trattini e avere una lunghezza compresa tra 2 e 50 caratteri.' 
  },
  lastName: {
    function: function(value:string) {return /^[a-zA-Z\s]{2,50}$/.test(value);},
    message: 'Il cognome non è valido. Deve contenere solo lettere, spazi, apostrofi o trattini e avere una lunghezza compresa tra 2 e 50 caratteri.' 
  },
  fiscalCode: {
    function: function(value:string) { return /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/.test(value);},
    message: 'Il codice fiscale non è valido. Assicurati che sia nel formato corretto.'
  },
  birthDate: {
    function:function (value: Date): Boolean { return value < new Date(); },
    message: 'La Data di Nascita non è valida.',
  }
}


const clientSchema: Schema<IClient> = new Schema<IClient>({
  firstName: {
    type: String,
    validate: {
      validator: validator.firstName.function,
      message: validator.firstName.message
    },
    required: true
  },
  lastName: {
    type: String,
    validate: {
      validator: validator.lastName.function,
      message: validator.lastName.message
    },
    required: true
  },
  birthDate: {
    type: Date,
    validate: {
      validator: validator.birthDate.function,
      message: validator.birthDate.message
    },
    required: true
  },
  fiscalCode: {
    type: String,
    validate: {
      validator: validator.fiscalCode.function,
      message: validator.fiscalCode.message
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

interface DuplicateKeyError extends Error {
  code: number;
  name: 'MongoServerError';
  keyValue: Record<string, any>;
}

clientSchema.post('save', (error:any, doc:IClient, next:any):any => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    const duplicateField = Object.keys(error.keyValue)[0];
    console.log(duplicateField);
    next(new Error(`There was a duplicate key error on ${duplicateField}`));
  } else {
    next();
  }
});

export default mongoose.model<IClient>('Client', clientSchema);