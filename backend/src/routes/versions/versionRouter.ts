import { Router, Request, Response } from 'express';
import * as middlewares from '../../middlewares';
import * as controller from '../../controllers/index';

const versionRouter: Router = Router();
/*
//##### GET METHOD #####

//all versions' file
versionRouter.get('/:file_id', middlewares.chain, (req: Request, res: Response) => {
    //return all versions' file
});

//version by id
versionRouter.get('/:id', (req, res) => {
    const versionId = req.params.id; // Ottieni l'ID della versione dai parametri della richiesta
})  

//##### POST METHOD ######
*/
//insert new version
versionRouter.get('/',      middlewares.logging_chain.GET,  controller.version_controller.getVersion)
             .get('/:id',   middlewares.logging_chain.GET,  controller.version_controller.getVersionById)
             .post('/',     middlewares.logging_chain.POST, controller.version_controller.addVersion)
             .put('/:id',   middlewares.logging_chain.PUT,  controller.version_controller.updateVersion)


//##### PUT METHOD #####
//non penso abbia senso in quanto se modifichiamo una versione ne creiamo una nuova
export { versionRouter };
