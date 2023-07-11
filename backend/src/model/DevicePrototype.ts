import mongoose, { Document, Model, Schema } from 'mongoose';
import Component, { IComponent } from './Component';

export interface IDevicePrototype extends Document {
  name: string;
  components: Array<mongoose.Types.ObjectId | IComponent>;
  createdAt: Date;
}

const devicePrototypeSchema: Schema<IDevicePrototype> = new Schema<IDevicePrototype>({
  name: {
    type: String,
    required: true
  },
  components: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Component'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

devicePrototypeSchema.post('save', (error:any, doc:IDevicePrototype, next:any):any => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    const duplicateField = Object.keys(error.keyValue)[0];
    console.log(duplicateField);
    next(new Error(`There was a duplicate key error on ${duplicateField}`));
  } else {
    next();
  }
});

devicePrototypeSchema.pre<IDevicePrototype>('save', async function (next:any) {
  const self = this;
  const Vincolo = await Component.find({_id: self.components}).exec();
  console.log(Vincolo)
  //riparti da qua
  if(Vincolo.length !== self.components.length || Vincolo === null || Vincolo.length === 0){
    next(new Error(`Non esiste il componente`))
  }
  else{
    next()
  }
});

export default mongoose.model<IDevicePrototype>('DevicePrototype', devicePrototypeSchema);
