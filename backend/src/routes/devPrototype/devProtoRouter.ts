import { Router, Request, Response } from 'express';
import * as middlewares from '../../middlewares';
import * as controller from '../../controllers/index';

const protoRouter: Router = Router();

protoRouter.get('/',        middlewares.proto.GET,      controller.prototype_controller.getPrototype)
           .get('/:id',     middlewares.proto.GET,      controller.prototype_controller.getPrototypeById)
           .post('/',       middlewares.proto.POST,     controller.prototype_controller.addPrototype)
           .put('/:id',     middlewares.proto.PUT,      controller.prototype_controller.updatePrototype)
           .delete('/:id',  middlewares.proto.DELETE,   controller.prototype_controller.deletePrototype)

export { protoRouter };