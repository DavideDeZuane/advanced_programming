import { Router, Request, Response } from 'express';
import Client, { IClient } from '../../model/Client';
import * as middlewares from '../../middlewares';
import * as controller from '../../controllers/index';

/* Eseguire gli import delle chain da utilizzare per queste rotte e inoltre definire le chiusure della chain ovvero i metodi del controller che andremo ad utilizzare */

const clientRouter:Router = Router();

clientRouter.get('/', middlewares.chain, controller.client_controller.getClients)
            .post('/', middlewares.POST_chain, controller.client_controller.addClient)
            .get('/:id',)
            .patch('/:id',);
            
export { clientRouter }