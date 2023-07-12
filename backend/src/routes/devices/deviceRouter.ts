import { Router, Request, Response } from 'express';
import * as middlewares from '../../middlewares';
import * as controller from '../../controllers/index';

const deviceRouter: Router = Router();


//##### GET METHOD ######

//all devidces
deviceRouter.get('/', middlewares.chain,(req: Request, res: Response) => {
    //return all devices
});

//devices by id
deviceRouter.get('/:id', (req, res) => {
    const deviceId = req.params.id; // Ottieni l'ID del device dai parametri della richiesta
})

//devices by prototipe id
deviceRouter.get('/:prototype_id', (req, res) => {
    const prototypeId = req.params.prototype_id; // Ottieni l'ID del prototipo dai parametri della richiesta
})

//##### POST METHOD ######

//insert new device
deviceRouter.post('/', middlewares.chain, controller.device.addDevice)

export {deviceRouter};