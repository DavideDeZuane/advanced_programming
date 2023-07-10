import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IEmployee extends Document {
  name: string;
  role: string;
  department: string;
  birthdate: Date;
  fiscalCode: string;
  createdAt: Date;
}

const CodiceFiscale = require('codice-fiscale-js');

const employeeSchema: Schema<IEmployee> = new Schema<IEmployee>({
  name: {
    function: function(value:string) {return /^[a-zA-Z\s]{2,50}$/.test(value);},
    message: 'Il nome non è valido. Deve contenere solo lettere, spazi, apostrofi o trattini e avere una lunghezza compresa tra 2 e 50 caratteri.',
    required: true
  },
  role: {
    type: String,
    enum:{
      values: ['Admin', "Employee", "Worker"],
      message: '{VALUE}: invalid role'
    },
    required: true
  },
  department: {
    type: String,
    enum:{
      values: ['Office', 'Production'],
      message: '{VALUE}: invalid department'
    },
    required: true
  },
  birthdate: {
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
      validator: function (value: string) {
        // Utilizza la regex per verificare se la Partita IVA è valida
        return /^[0-9]{11}$/.test(value);
      },
      message: 'La Partita IVA non è valida.'
    },
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Employee: Model<IEmployee> = mongoose.model<IEmployee>('Employee', employeeSchema);
export default mongoose.model<IEmployee>('Employee', employeeSchema);
