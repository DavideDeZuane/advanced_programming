import mongoose, { Document, Model, Schema } from 'mongoose';
import System from '../System';
import { ISystem } from "../class/System";
import Device from '../Device';
import Client from '../Client';

async function seed() {
    try {
      // Dati dei clienti da inserire
      const device = await Device.findOne({name: "Sensore velocità analogico"}).exec(); //exec fa una sorta di promessa per il ritorno
      const client = await Client.findOne({name: "John"}).exec(); //exec fa una sorta di promessa per il ritorno

      const systemData =
        {
          client: client?._id,
          devices: device?._id,
          name: 'Sys. 1',
          address: 'Via sistema 4',
          createdAt: new Date()
        } as ISystem;
      
        //protoData.components.push(components)
        //const usClient = mongoose.model('Client', clientSchema);
        const md = new System(systemData);
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
const seedSystem = () => {
  mongoose.connect('mongodb://adprogramming:adprogramming@mongodb:27017/adprogramming')
    .then(() => {
      // Esegui la funzione di seeding
      seed();
    })
    .catch((error) => {
      console.error('Errore durante la connessione al database:', error);
    });
}
  
  export {seedSystem};