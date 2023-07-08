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

const clientSchema: Schema<IClient> = new Schema<IClient>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  fiscalCode: {
    type: String,
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

const Client: Model<IClient> = mongoose.model<IClient>('Client', clientSchema);

export default mongoose.model<IClient>('Example', clientSchema);