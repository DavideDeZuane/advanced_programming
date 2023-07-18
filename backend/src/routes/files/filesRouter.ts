import { Router, Request, Response } from 'express';
import * as middlewares from '../../middlewares';
import * as controller from '../../controllers/index';

const fileRouter: Router = Router();

fileRouter.get('/',     middlewares.file.GET,  controller.file_controller.getFile)
          .get('/:id',  middlewares.file.GET,  controller.file_controller.getFileById)
          .post('/',    middlewares.file.POST, controller.file_controller.addFile) 
          .put('/:id',  middlewares.file.PUT,  controller.file_controller.updateFile)

export { fileRouter };
