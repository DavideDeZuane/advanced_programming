import { Router, Request, Response } from 'express';
const router: Router = Router();

//##### GET METHOD #####

//all files
router.get('/files', (req: Request, res: Response) => {
    //return all files
});

//files by id
router.get('/files/:id', (req, res) => {
    const userId = req.params.id; // Ottieni l'ID del file dai parametri della richiesta
})  

//files by device id
router.get('/files/:device_id', (req, res) => {
    const prototypeId = req.params.device_id; // Ottieni l'ID del device dai parametri della richiesta
})

//##### POST METHOD ######

//insert new user
router.post('/addFile', (req: Request, res: Response) => {
    // Assume che il corpo della richiesta contenga i dettagli del nuovo file
    const newFile = req.body; 
    
    // Ritorna il nuovo utente come risposta JSON con il codice di stato 201 (Created)
    res.status(201).json(newFile); 
  });


//##### PUT METHOD #####

export default router;
