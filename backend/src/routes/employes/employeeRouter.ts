import { Router, Request, Response } from 'express';
import * as middlewares from '../../middlewares';
import { employee_validation } from '../../middlewares/validation';


const router: Router = Router();

//##### GET METHOD ######

//all employes
router.get('/', middlewares.chain, (req:Request, res: Response) => {
    res.send('Route degli employee')
});

//employes profile by id
router.get('/:id', (req, res) => {
    const employesId = req.params.id; // Ottieni l'ID dell'impiegato dai parametri della richiesta
})

//employes by role
router.get('/:role', (req, res) => {
    const employesRole = req.params.role; // Ottieni il ruolo dell'impiegato dai parametri della richiesta
})

//employes by department
router.get('/:department', (req, res) => {
    const employesId = req.params.department; // Ottieni department dell'impiegato dai parametri della richiesta
})

//##### POST METHOD ######

//insert new employee
router.post('/', employee_validation, async (req: Request, res: Response) => {
    // Assume che il corpo della richiesta contenga i dettagli del nuovo impiegato
    const newEmployee = req.body; 
    
    // Ritorna il nuovo impiegato come risposta JSON con il codice di stato 201 (Created)
    res.status(201).json(newEmployee); 
  });

//##### PUT METHOD #####

export default router;