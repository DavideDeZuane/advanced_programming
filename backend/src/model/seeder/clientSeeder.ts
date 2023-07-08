import mongoose, { Document, Model, Schema } from 'mongoose';
import Client, {IClient} from '../Client';

async function seedClients() {
    try {
      // Dati dei clienti da inserire
      const clientsData =
        {
          firstName: 'John',
          lastName: 'Doe',
          birthDate: new Date('1990-01-01'),
          fiscalCode: 'ABCD1234E',
          vatNumber: '12345678901',
          address: 'Via Example 123',
          createdAt: new Date()
        } as IClient;
      
        //const usClient = mongoose.model('Client', clientSchema);
        const md = new Client(clientsData);
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
const seed = () => {
  mongoose.connect('mongodb://adprogramming:adprogramming@mongodb:27017/adprogramming')
    .then(() => {
      // Esegui la funzione di seeding
      seedClients();
    })
    .catch((error) => {
      console.error('Errore durante la connessione al database:', error);
    });
}
  
  export {seed};