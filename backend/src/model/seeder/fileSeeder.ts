import mongoose, { Document, Model, Schema } from 'mongoose';
import File, {IFile} from '../File';
import Device, { IDevice } from '../Device';

async function seed() {
    try {
      // Dati dei clienti da inserire
      const dev = await Device.findOne({name: "Sensore velocità analogico"}).exec(); //exec fa una sorta di promessa per il ritorno
      const fileData =
        {
          device: [dev],
          name: 'sva',
          fileType: 'txt',
          description: 'Descriviamo il sensore vel analogico',
          createdAt: new Date()
        } as IFile;
      
        //const usClient = mongoose.model('Client', clientSchema);
        const md = new File(fileData);
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
const seedFile = () => {
  mongoose.connect('mongodb://adprogramming:adprogramming@mongodb:27017/adprogramming')
    .then(() => {
      // Esegui la funzione di seeding
      seed();
    })
    .catch((error) => {
      console.error('Errore durante la connessione al database:', error);
    });
}
  
  export {seedFile};