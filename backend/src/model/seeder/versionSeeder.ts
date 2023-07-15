import mongoose, { Document, Model, Schema } from 'mongoose';
import Version from '../Version';
import { IVersion } from "../class/Version";

import File from '../File';

async function seed() {
    try {
      // Dati dei clienti da inserire
      const fileProva = await File.findOne({name: "sva"}).exec(); //exec fa una sorta di promessa per il ritorno

      const versionData =
        {
            file: fileProva?._id,
            blob: Buffer.from('Contenuto del blob della versione'),
            versionNumber: '1.0',
            createdAt: new Date()
        } as IVersion;
      
        //protoData.components.push(components)
        //const usClient = mongoose.model('Client', clientSchema);
        const md = new Version(versionData);
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
const seedVersion = () => {
  mongoose.connect('mongodb://adprogramming:adprogramming@mongodb:27017/adprogramming')
    .then(() => {
      // Esegui la funzione di seeding
      seed();
    })
    .catch((error) => {
      console.error('Errore durante la connessione al database:', error);
    });
}
  
  export {seedVersion};