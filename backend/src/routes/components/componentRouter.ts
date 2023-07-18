import { Router, Request, Response } from 'express';
import * as middlewares from '../../middlewares/index';

import * as controller from '../../controllers/index';

const componentRouter: Router = Router();

componentRouter.get('/',    middlewares.component.GET,    controller.component_controller.getComponent)
               .get('/:id', middlewares.component.GET,    controller.component_controller.getComponentById)
               .post('/',   middlewares.component.POST,   controller.component_controller.addComponent)
               .put('/:id', middlewares.component.PUT,    controller.component_controller.updateComponent)

export {componentRouter};