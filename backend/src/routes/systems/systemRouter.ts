import { Router, Request, Response } from 'express';
import * as middlewares from '../../middlewares';
import * as controller from '../../controllers/index';

const systemRouter: Router = Router();

//##### GET METHOD ######
/*
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

*/
//##### POST METHOD ######

//insert new system
systemRouter.get('/',       middlewares.logging_chain.GET,  controller.system_controller.getSystem)
            .get('/:id',    middlewares.logging_chain.GET,  controller.system_controller.getSystemById)
            .post('/',      middlewares.logging_chain.POST, controller.system_controller.addSystem);

export { systemRouter };