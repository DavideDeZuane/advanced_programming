import { Router, Request, Response } from 'express';
import Client, { IClient } from '../../model/Client';
import * as middlewares from '../../middlewares';
import { user_validation } from '../../middlewares/validation';

const clientRouter:Router = Router();

clientRouter.get('/', middlewares.chain, (req:Request, res: Response) => { res.send('root dei clienti') });
clientRouter.post('/', user_validation, async (req:Request, res:Response) => { 
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