import { Router, Request, Response } from 'express';
const router: Router = Router();

/*
######### TO DO ##########
1) SI PUO IMPLEMENTARE UNA ROTTA PER VEDERE A QUALI SISTEMI SONO ASSOCIATI I DEVICES; 
2) VEDERE DOVE IMPLEMENTARE LA ROTTA CHE PERMETTE DI COSTRUIRE IL SISTEMA (SELEZIONANDO PIÙ DEVICES)
*/


//##### GET METHOD ######

//all devidces
router.get('/devices', (req: Request, res: Response) => {
    //return all devices
});

//devices by id
router.get('/devices/:id', (req, res) => {
    const deviceId = req.params.id; // Ottieni l'ID del device dai parametri della richiesta
})

//##### POST METHOD ######

//insert new employee
router.post('/addDevice', (req: Request, res: Response) => {
    // Assume che il corpo della richiesta contenga i dettagli del nuovo device
    const newDevice = req.body; 
    
    // Ritorna il nuovo device come risposta JSON con il codice di stato 201 (Created)
    res.status(201).json(newDevice); 
  });

export default router;