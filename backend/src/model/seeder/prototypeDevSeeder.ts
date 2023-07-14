import mongoose, { Document, Model, Schema } from 'mongoose';
import DevicePrototype from '../DevicePrototype';
import { IDevicePrototype } from '../../model/class/devPrototype';
import Component from '../Component';

async function seed() {
    try {
      // Dati dei clienti da inserire
      const components = await Component.findOne({name: "Temperatura"}).exec(); //exec fa una sorta di promessa per il ritorno
      const protoData =
        {
          components: components?._id,
          name: 'Sensore velocità',
          createdAt: new Date()
        } as IDevicePrototype;
      
        //protoData.components.push(components)
        //const usClient = mongoose.model('Client', clientSchema);
        const md = new DevicePrototype(protoData);
        await md.save();
  
      console.log('Seeding completato!');
    } catch (error) {
      console.error('Errore durante il seeding:', error);
    } finally {
      // Chiudi la connessione al database dopo il seeding
      mongoose.connection.close();
    }
  }
  
  // Connessione al database
const seedProto = () => {
  mongoose.connect('mongodb://adprogramming:adprogramming@mongodb:27017/adprogramming')
    .then(() => {
      // Esegui la funzione di seeding
      seed();
    })
    .catch((error) => {
      console.error('Errore durante la connessione al database:', error);
    });
}
  
  export {seedProto};