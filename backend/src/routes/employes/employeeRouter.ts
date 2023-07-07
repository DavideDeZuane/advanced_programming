import { Router, Request, Response } from 'express';
const router: Router = Router();

//##### GET METHOD ######

//all employes
router.get('/employes', (req: Request, res: Response) => {
    //return all employes
});

//employes profile by id
router.get('/employes/:id', (req, res) => {
    const employesId = req.params.id; // Ottieni l'ID dell'impiegato dai parametri della richiesta
})

//employes by role
router.get('/employes/:role', (req, res) => {
    const employesRole = req.params.role; // Ottieni il ruolo dell'impiegato dai parametri della richiesta
})

//employes by department
router.get('/employes/:department', (req, res) => {
    const employesId = req.params.department; // Ottieni department dell'impiegato dai parametri della richiesta
})

//##### POST METHOD ######

//insert new employee
router.post('/addEmployee', (req: Request, res: Response) => {
    // Assume che il corpo della richiesta contenga i dettagli del nuovo impiegato
    const newEmployee = req.body; 
    
    // Ritorna il nuovo impiegato come risposta JSON con il codice di stato 201 (Created)
    res.status(201).json(newEmployee); 
  });

export default router;