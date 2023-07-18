import { Router, Request, Response } from 'express';
import * as middlewares from '../../middlewares';
import * as controller from '../../controllers/index';

const operationRouter: Router = Router();

operationRouter.get('/',    middlewares.operation.GET,  controller.operation_controller.getOperation)
               .get('/:id', middlewares.operation.GET,  controller.operation_controller.getOperationById)
               .post('/',   middlewares.operation.POST, controller.operation_controller.addOperation)
               .put('/:id', middlewares.operation.PUT,  controller.operation_controller.updateOperation)
//##### PUT METHOD #####

export { operationRouter };