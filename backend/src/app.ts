import express, { Express, Request, Response } from 'express';
import cors from 'cors'
import { seedClient } from './model/seeder/clientSeeder';
import { seedEmployee } from './model/seeder/employeeSeeder';
import { seedComponent } from './model/seeder/componentSeeder';
import { seedProto } from './model/seeder/prototypeDevSeeder';
import { seedDevice } from './model/seeder/deviceSeeder';
import { seedFile } from './model/seeder/fileSeeder';
import { seedVersion } from './model/seeder/versionSeeder';
import { seedOperation } from './model/seeder/operationSeeder';
import { seedSystem } from './model/seeder/systemSeeder';

import { clientRouter } from './routes'

import { chain, auth_chain, checkPermissions, checkToken, checkJson } from './middlewares/index';
import { AdminPermission } from './middlewares/auth.middleware';

import DB from './utils/Database';
import AppLogger from './utils/Logger';


const mongoose = require('mongoose');

const app:Express = express()

const port:string = process.env.SERVER_PORT || '3000';
const dbUri:string = 'mongodb://adprogramming:adprogramming@mongodb:27017/adprogramming' 

const db = DB.getIstance();
const logger = AppLogger.getInstance();

app.use(cors());
//se non aggiungiamo questo affinchè il corpo della richiesta venga analizzato ed assegnato a req.body altrimenti non gli viene assegnato.A
app.use(express.json())


app.use('/clients', clientRouter)


app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

app.get('/publicco', checkJson, chain, (req:Request, res:Response) => { console.log('questa rotta richiede i permessi di ruolo '); let obj = { campo: 'prova' }; res.json(obj)})
app.get('/public', checkToken, checkPermissions([AdminPermission.Read]), chain, (req:Request, res:Response) => { console.log('questa rotta richiede i permessi di ruolo '); let obj = { campo: 'prova' }; res.json(obj)})
app.get('/protected', auth_chain, (req:Request, res:Response) => { console.log(''); let obj = { campo: '' }; res.json(obj)})

app.get('/seedCliente', async(req:Request, res:Response) => {
  await seedClient();
  res.send("Aggiunto cliente");
}) 

app.get('/seedEmployee', async(req:Request, res:Response) => {
  await seedEmployee();
  res.send("Aggiunto impiegato");
}) 

app.get('/seedComponent', async(req:Request, res:Response) => {
  await seedComponent();
  res.send("Aggiunto componente");
})

app.get('/seedProto', async(req:Request, res:Response) => {
  await seedProto();
  res.send("Aggiunto prototipo");
})

app.get('/seedDevice', async(req:Request, res:Response) => {
  await seedDevice();
  res.send("Aggiunto device");
})

app.get('/seedFile', async(req:Request, res:Response) => {
  await seedFile();
  res.send("Aggiunto file");
})

app.get('/seedVersion', async(req:Request, res:Response) => {
  await seedVersion();
  res.send("Aggiunto versione");
})

app.get('/seedOperation', async(req:Request, res:Response) => {
  await seedOperation();
  res.send("Aggiunto operazione");
})

app.get('/seedSystem', async(req:Request, res:Response) => {
  await seedSystem();
  res.send("Aggiunto sistema");
})

app.get('/db', (req:Request, res:Response) => { 
  mongoose.connect(dbUri);
  //per testare connessione mongoDB
  async function proviamo(){
    const kittySchema = new mongoose.Schema({
        name: String
    });

    kittySchema.methods.speak = function speak() {
        const greeting = this.name
        ? 'Meow name is ' + this.name
        : 'I don\'t have a name';
        if (!res.headersSent) {
          res.send(greeting);
        }
    };

    const Kitten = mongoose.model('Kitten', kittySchema);

    const silence = new Kitten({ name: 'Silence' });
    console.log(silence.name); // 'Silence'

    const fluffy = new Kitten({ name: 'fluffy' });
    fluffy.speak(); // "Meow name is fluffy"


    await fluffy.save();
    fluffy.speak();

    /*const kittens = await Kitten.find();
    console.log(kittens);*/
    console.log(fluffy.name);
  }
  let test = proviamo();
  //res.send('provato');
  })

app.listen(port, () => {
  logger.info(`Server in ascolto sulla porta ${port}`)
});

