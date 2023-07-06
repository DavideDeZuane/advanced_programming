import { Router, Request, Response } from 'express';
const router: Router = Router();

/*
######### TO DO ##########
1) SI PUO IMPLEMENTARE UNA ROTTA PER VEDERE A QUALE DEVICE È ASSOCIATO UN PROTOTYPE; 
*/


//##### GET METHOD ######

//all prototype
router.get('/prototypes', (req: Request, res: Response) => {
    //return all prototypes
});

//prototypes by id
router.get('/prototypes/:id', (req, res) => {
    const prototypeId = req.params.id; // Ottieni l'ID del prototipo dai parametri della richiesta
})

//##### POST METHOD ######

//insert new prototype
router.post('/addPrototype', (req: Request, res: Response) => {
    // Assume che il corpo della richiesta contenga i dettagli del nuovo prototipo
    const newPrototype = req.body; 
    
    // Ritorna il nuovo prototipo come risposta JSON con il codice di stato 201 (Created)
    res.status(201).json(newPrototype); 
  });

export default router;