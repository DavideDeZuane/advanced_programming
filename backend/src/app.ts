import express, { Express, Request, Response } from 'express';
import cors from 'cors'
import {seedClients} from './model/Client';


import { chain, auth_chain, checkRequiredPermissions, checkToken } from './middlewares/index';
import { AdminPermission } from './middlewares/auth';

const mongoose = require('mongoose');

const app:Express = express()

const port:string = process.env.SERVER_PORT || '3000';
const dbUri:string = 'mongodb://adprogramming:adprogramming@mongodb:27017/adprogramming' 



app.use(cors());
//se non aggiungiamo questo affinchè il corpo della richiesta venga analizzato ed assegnato a req.body altrimenti non gli viene assegnato.A
app.use(express.json())



app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

app.get('/public',checkToken, checkRequiredPermissions([AdminPermission.Read]), chain, (req:Request, res:Response) => { console.log('questa rotta richiede i permessi di ruolo '); let obj = { campo: 'prova' }; res.json(obj)})
app.get('/protected', auth_chain, (req:Request, res:Response) => { console.log(''); let obj = { campo: '' }; res.json(obj)})

app.get('/dbPrCliente', async(req:Request, res:Response) => {
  await seedClients();
  res.send("Aggiunto Mario");
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
  console.log(`Example app listening on port ${port}`)
});

