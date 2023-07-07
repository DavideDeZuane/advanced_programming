import { Router, Request, Response } from 'express';
const router: Router = Router();


//##### GET METHOD ######

//all devidces
router.get('/devices', (req: Request, res: Response) => {
    //return all devices
});

//devices by id
router.get('/devices/:id', (req, res) => {
    const deviceId = req.params.id; // Ottieni l'ID del device dai parametri della richiesta
})

//devices by prototipe id
router.get('/devices/:prototype_id', (req, res) => {
    const prototypeId = req.params.prototype_id; // Ottieni l'ID del prototipo dai parametri della richiesta
})

//##### POST METHOD ######

//insert new device
router.post('/devices', (req: Request, res: Response) => {
    // Assume che il corpo della richiesta contenga i dettagli del nuovo device
    const newDevice = req.body; 
    
    // Ritorna il nuovo device come risposta JSON con il codice di stato 201 (Created)
    res.status(201).json(newDevice); 
  });

  //##### PUT METHOD #####

export default router;