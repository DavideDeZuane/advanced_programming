import { Router, Request, Response } from 'express';
const router: Router = Router();

/*
######### TO DO ##########
1) SI PUO IMPLEMENTARE UNA ROTTA PER VEDERE A QUALI PROTOTIPI SONO ASSOCIATI I COMPONENTI; 
*/


//##### GET METHOD ######

//all components
router.get('/', (req: Request, res: Response) => {
    //return all components
});

//components by id
router.get('/:id', (req, res) => {
    const componentId = req.params.id; // Ottieni l'ID del componente dai parametri della richiesta
})

//components by type
router.get('/:type', (req, res) => {
    const componentType = req.params.type; // Ottieni il tipo del componente dai parametri della richiesta
})

//##### POST METHOD ######

//insert new component
router.post('/', (req: Request, res: Response) => {
    // Assume che il corpo della richiesta contenga i dettagli del nuovo componente
    const newComponent = req.body; 
    
    // Ritorna il nuovo componente come risposta JSON con il codice di stato 201 (Created)
    res.status(201).json(newComponent); 
  });

export default router;
