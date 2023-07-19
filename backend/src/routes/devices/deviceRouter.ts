import { Router, Request, Response } from 'express';
import * as middlewares from '../../middlewares';
import * as controller from '../../controllers/index';

const deviceRouter: Router = Router();

deviceRouter.get('/',       middlewares.device.GET,     controller.device_controller.getDevice)
            .get('/:id',    middlewares.device.GET,     controller.device_controller.getDeviceById)
            .post('/',      middlewares.device.POST,    controller.device_controller.addDevice)
            .put('/:id',    middlewares.device.PUT,     controller.device_controller.updateDevice)
            .delete('/:id', middlewares.device.DELETE,  controller.device_controller.deleteDevice)

export {deviceRouter};