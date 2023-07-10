import { Router, Request, Response } from 'express';
import * as middlewares from '../../middlewares';
import * as controller from '../../controllers/index';

const systemRouter: Router = Router();

//##### GET METHOD ######

//all systems
systemRouter.get('/', middlewares.chain, (req: Request, res: Response) => {
    //return all systems
});

//systems by id
systemRouter.get('/:id', (req, res) => {
    const systemId = req.params.id; // Ottieni l'ID del sistema dai parametri della richiesta
})

//systems by client id
systemRouter.get('/:user_id', (req, res) => {
    const userId = req.params.user_id; // Ottieni l'ID del cliente dai parametri della richiesta
})


//##### POST METHOD ######

//insert new system
systemRouter.post('/', middlewares.chain, controller.system_controller.addSystem);

export { systemRouter };