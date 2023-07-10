import { Router, Request, Response } from 'express';
import Client, { IClient } from '../../model/Client';
import * as middlewares from '../../middlewares';
import * as controller from '../../controllers/index';

/* Eseguire gli import delle chain da utilizzare per queste rotte e inoltre definire le chiusure della chain ovvero i metodi del controller che andremo ad utilizzare */
/* 
PUT -> si usa questo metodo quando l'utente vuole modificare una risorsa e manda tutti i dati che modificano la risorsa
PATCH -> si usa per modificare la risotsa ma l'utente manda solo una parte dei dati che modifica la risosrsa
*/
const clientRouter:Router = Router();

clientRouter.get('/', middlewares.chain, controller.client_controller.getClients)
            .post('/', middlewares.POST_chain, controller.client_controller.addClient)
            .get('/:id',middlewares.chain, controller.client_controller.getById)
            .patch('/:id',middlewares.PATCH_chain, controller.client_controller.updateClient)
            
export { clientRouter }