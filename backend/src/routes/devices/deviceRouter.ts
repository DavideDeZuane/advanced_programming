import { Router, Request, Response } from 'express';
import * as middlewares from '../../middlewares';
import { device_validation } from '../../middlewares/validation';

const router: Router = Router();


//##### GET METHOD ######

//all devidces
router.get('/', middlewares.chain,(req: Request, res: Response) => {
    //return all devices
});

//devices by id
router.get('/:id', (req, res) => {
    const deviceId = req.params.id; // Ottieni l'ID del device dai parametri della richiesta
})

//devices by prototipe id
router.get('/:prototype_id', (req, res) => {
    const prototypeId = req.params.prototype_id; // Ottieni l'ID del prototipo dai parametri della richiesta
})

//##### POST METHOD ######

//insert new device
router.post('/', device_validation,async (req: Request, res: Response) => {
    // Assume che il corpo della richiesta contenga i dettagli del nuovo device
    const newDevice = req.body; 
    
    // Ritorna il nuovo device come risposta JSON con il codice di stato 201 (Created)
    res.status(201).json(newDevice); 
  });

  //##### PUT METHOD #####

export default router;