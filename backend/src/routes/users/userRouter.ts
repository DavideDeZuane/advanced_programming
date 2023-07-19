import { Router } from 'express';
import * as middlewares from '../../middlewares';
import * as controller from '../../controllers/index';
/* Eseguire gli import delle chain da utilizzare per queste rotte e inoltre definire le chiusure della chain ovvero i metodi del controller che andremo ad utilizzare */
/* 
PUT -> si usa questo metodo quando l'utente vuole modificare una risorsa e manda tutti i dati che modificano la risorsa
PATCH -> si usa per modificare la risotsa ma l'utente manda solo una parte dei dati che modifica la risosrsa
*/
const clientRouter:Router = Router();

clientRouter.get('/',        middlewares.client.GET,        controller.client.getClients)
            .post('/',       middlewares.client.POST,       controller.client.addClient)
            .get('/:id',     middlewares.client.GET,        controller.client.getById)
            .put('/:id',     middlewares.client.PUT,        controller.client.updateClient)
            .delete('/:id',  middlewares.client.DELETE,     controller.client.deleteClient)
;

//app.get('/public', checkToken, checkPermissions([AdminPermission.Read]), chain, (req:Request, res:Response) => { console.log('questa rotta richiede i permessi di ruolo '); let obj = { campo: 'prova' }; res.json(obj)})
export { clientRouter }