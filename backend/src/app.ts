import express, { Express, Request, Response } from 'express';
import cors from 'cors'

import { seed } from './model/seeder';
import { clientRouter } from './routes';
import { componentRouter} from './routes'
import { chain, auth_chain, checkPermissions, checkToken, checkJson } from './middlewares/index';
import { AdminPermission } from './middlewares/auth.middleware';

import { DB, AppLogger } from './utils/index';
import { errHandler } from './middlewares/error.middleware';


const mongoose = require('mongoose');


/*
TODO 
- [ ] Aggiungere i cookie per la gestione delle sessioni
- [ ] Aggiungere il package https per configuirare il server https  
- [ ] vedere l'utilizzo di helmet per aggiungere degli header di sicurezza
*/

const app:Express = express()

const port:string = process.env.SERVER_PORT || '3000';
const dbUri:string = 'mongodb://adprogramming:adprogramming@mongodb:27017/adprogramming' 

const db = DB.getIstance();
const logger = AppLogger.getInstance();

app.use(cors());
app.use(express.json())
app.use(errHandler)

app.use('/clients', clientRouter)
app.use('/components', componentRouter)

app.get('/publicco', checkJson, chain, (req:Request, res:Response) => { console.log('questa rotta richiede i permessi di ruolo '); let obj = { campo: 'prova' }; res.json(obj)})
app.get('/public', checkToken, checkPermissions([AdminPermission.Read]), chain, (req:Request, res:Response) => { console.log('questa rotta richiede i permessi di ruolo '); let obj = { campo: 'prova' }; res.json(obj)})
app.get('/protected', auth_chain, (req:Request, res:Response) => { console.log(''); let obj = { campo: '' }; res.json(obj)})

app.get('/seed', async(req:Request, res:Response) => {
  await seed();
  res.send("Aggiunto cliente");
})

app.listen(port, () => {
  logger.info(`Server in ascolto sulla porta ${port}`)
});

