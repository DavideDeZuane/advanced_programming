import express, { Express, Request, Response } from 'express';
import { REPLCommand } from 'repl';
//import mongoose from 'mongoose';
const mongoose = require('mongoose');
const cors = require('cors')

const app:Express = express()
const port = 3000

const dbUri:string = 'mongodb://adprogramming:adprogramming@mongodb/admin' 



app.use(cors());
app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

app.get('/public', (req:Request, res:Response) => { let obj = { campo: 'prova' }; res.json(obj)})

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

