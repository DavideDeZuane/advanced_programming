import { Router, Request, Response } from 'express';
import Client, { IClient } from '../../model/Client';
import DB from '../../config/database';

const clientRouter:Router = Router();

clientRouter.get('/', (req:Request, res: Response) => { res.send('root dei clienti') });
clientRouter.post('/', async (req:Request, res:Response) => { 
  const user:IClient = req.body;
  try{
    let wwa= new Client(user);
    console.log(wwa)
    await wwa.save()
  }catch(error){
    console.log(error)
  }
  res.send('ci si prova')
});

/*
##################################################
# Parametric Route
##################################################
*/
clientRouter.get('/:id', (req:Request, res:Response) => {
    const userId = req.params.id; // Ottieni l'ID dell'utente dai parametri della richiesta
    res.send('wasd')
});
clientRouter.patch('/:id', (req:Request, res:Response) => {
  //aggiungere la validazione dei campi 
  res.send(req.params.id)
});


export { clientRouter }