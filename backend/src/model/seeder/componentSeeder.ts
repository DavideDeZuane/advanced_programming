import mongoose, { Document, Model, Schema } from 'mongoose';
import Component from '../Component';
import { IComponent } from '../class/Component';

async function seed() {
    try {
      // Dati dei clienti da inserire
      const componentData =
        {
          name: 'Temperatura',
          type: 'Tipo 1',
          description: 'Misura la temperatura',
          price: 5.0,
          createdAt: new Date()
        } as IComponent;
      
        //const usClient = mongoose.model('Client', clientSchema);
        const md = new Component(componentData);
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
const seedComponent = () => {
  mongoose.connect('mongodb://adprogramming:adprogramming@mongodb:27017/adprogramming')
    .then(() => {
      // Esegui la funzione di seeding
      seed();
    })
    .catch((error) => {
      console.error('Errore durante la connessione al database:', error);
    });
}
  
  export {seedComponent};