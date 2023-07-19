import { VerifyDuplicateKey } from '../middlewares/mongoose';
import mongoose, { Document, Schema } from 'mongoose';
import { IClient } from '../model/class/Client';

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
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
});

/*
Mongoose da la possibilità di definire dei pre e post middleware rispetto ad una funzione specifica, possono essere molto utili per il debugging e per il logging
*/
VerifyDuplicateKey(clientSchema);

export default mongoose.model<IClient>('Client', clientSchema);