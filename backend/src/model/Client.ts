import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IClient extends Document {
  firstName: string;
  lastName: string;
  birthDate: Date;
  fiscalCode: string;
  vatNumber: string;
  address: string;
  createdAt: Date;
}

const clientSchema: Schema<IClient> = new Schema<IClient>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  fiscalCode: {
    type: String,
    required: true,
    unique: true
  },
  vatNumber: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Client: Model<IClient> = mongoose.model<IClient>('Client', clientSchema);
/*
async function proviamo(){

  const tester = new Client({ 
    firstName: 'Mario',
    lastName: 'Rossi',
    birthDate: new Date('1995-06-10'),
    fiscalCode: 'RSSMRA95H10L483P',
    vatNumber: '12345678901',
    address: 'Via Prova 456',
    createdAt: new Date() 
  });
  console.log(tester.firstName); // 'Mario'

  await tester.save();

}
*/

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
    
      const usClient = mongoose.model('Client', clientSchema);
      const md = new usClient(clientsData);
      await md.save();
      
    // Inserisci i clienti nel database
    //await Client.insertMany(clientsData);

    console.log('Seeding completato!');
  } catch (error) {
    console.error('Errore durante il seeding:', error);
  } finally {
    // Chiudi la connessione al database dopo il seeding
    mongoose.connection.close();
  }
}

// Connessione al database
mongoose.connect('mongodb://adprogramming:adprogramming@mongodb:27017/adprogramming')
  .then(() => {
    // Esegui la funzione di seeding
    seedClients();
  })
  .catch((error) => {
    console.error('Errore durante la connessione al database:', error);
  });

export {Client, seedClients};