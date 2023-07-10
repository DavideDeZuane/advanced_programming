import mongoose, { Document, Model, Schema } from 'mongoose';
import Device, {IDevice} from '../Device';
import DevicePrototype, {IDevicePrototype} from '../DevicePrototype';

async function seed() {
    try {
      // Dati dei clienti da inserire
      const devicePro = await DevicePrototype.findOne({name: "Sensore velocità"}).exec(); //exec fa una sorta di promessa per il ritorno
      const deviceData =
        {
          devicePrototypes: devicePro?._id,
          name: 'Sensore velocità analogico',
          createdAt: new Date()
        } as IDevice;
      
        //protoData.components.push(components)
        //const usClient = mongoose.model('Client', clientSchema);
        const md = new Device(deviceData);
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
const seedDevice = () => {
  mongoose.connect('mongodb://adprogramming:adprogramming@mongodb:27017/adprogramming')
    .then(() => {
      // Esegui la funzione di seeding
      seed();
    })
    .catch((error) => {
      console.error('Errore durante la connessione al database:', error);
    });
}
  
  export {seedDevice};