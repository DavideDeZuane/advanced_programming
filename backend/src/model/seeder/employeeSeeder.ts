import mongoose, { Document, Model, Schema } from 'mongoose';
import Employee, {IEmployee} from '../Employee';

async function seed() {
    try {
      // Dati dei clienti da inserire
      const employeeData =
        {
          name: 'Impiegato',
          role: 'Employee',
          department: 'Office',
          birthdate: new Date('1990-10-10'),
          fiscalCode: '12345678901',
          createdAt: new Date()
        } as IEmployee;
      
        //const usClient = mongoose.model('Client', clientSchema);
        const md = new Employee(employeeData);
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
const seedEmployee = () => {
  mongoose.connect('mongodb://adprogramming:adprogramming@mongodb:27017/adprogramming')
    .then(() => {
      // Esegui la funzione di seeding
      seed();
    })
    .catch((error) => {
      console.error('Errore durante la connessione al database:', error);
    });
}
  
  export {seedEmployee};