import { Router, Request, Response } from 'express';
import * as middlewares from '../../middlewares';
import * as controller from '../../controllers/index';

const systemRouter: Router = Router();

systemRouter.get('/',       middlewares.system.GET,  controller.system_controller.getSystem)
            .get('/:id',    middlewares.system.GET,  controller.system_controller.getSystemById)
            .post('/',      middlewares.system.POST, controller.system_controller.addSystem)
            .put('/:id',    middlewares.system.PUT,  controller.system_controller.updateSystem)

export { systemRouter };