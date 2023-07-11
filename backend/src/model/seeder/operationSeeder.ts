import mongoose, { Document, Model, Schema } from 'mongoose';
import Operation, {IOperation} from '../Operation';
import System, {ISystem} from '../System';
import Employee, { IEmployee } from '../Employee';

async function seed() {
    try {
      // Dati dei clienti da inserire
      const system = await System.findOne({name: "Sys 1"}).exec(); //exec fa una sorta di promessa per il ritorno
      const employee = await Employee.findOne({name: "Impiegato"}).exec(); //exec fa una sorta di promessa per il ritorno

      const operationData =
        {
          systems: system?._id,
          employees: employee?._id,
          description: 'Abbiamo fatto questo report',
          type: 'Sostituzione',
          createdAt: new Date()
        } as IOperation;
      
        //protoData.components.push(components)
        //const usClient = mongoose.model('Client', clientSchema);
        const md = new Operation(operationData);
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
const seedOperation = () => {
  mongoose.connect('mongodb://adprogramming:adprogramming@mongodb:27017/adprogramming')
    .then(() => {
      // Esegui la funzione di seeding
      seed();
    })
    .catch((error) => {
      console.error('Errore durante la connessione al database:', error);
    });
}
  
  export {seedOperation};