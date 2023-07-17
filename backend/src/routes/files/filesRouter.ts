import { Router, Request, Response } from 'express';
import * as middlewares from '../../middlewares';
import * as controller from '../../controllers/index';

const fileRouter: Router = Router();

//##### GET METHOD #####
/*
//all files
fileRouter.get('/', middlewares.chain, (req: Request, res: Response) => {
    //return all files
});

//files by id
fileRouter.get('/:id', (req, res) => {
    const fileId = req.params.id; // Ottieni l'ID del file dai parametri della richiesta
})  

//files by device id
fileRouter.get('/:device_id', (req, res) => {
    const device_id = req.params.device_id; // Ottieni l'ID del device dai parametri della richiesta
})

//##### POST METHOD ######
*/
//insert new file
fileRouter.get('/',     middlewares.logging_chain.GET,  controller.file_controller.getFile)
          .get('/:id',  middlewares.logging_chain.GET,  controller.file_controller.getFileById)
          .post('/',    middlewares.logging_chain.POST, controller.file_controller.addFile) 

export { fileRouter };
