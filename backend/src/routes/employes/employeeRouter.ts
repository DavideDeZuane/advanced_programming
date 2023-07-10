import { Router, Request, Response } from 'express';
import * as middlewares from '../../middlewares';
import Employee, { IEmployee } from '../../model/Employee';

const employeeRouter: Router = Router();

//##### GET METHOD ######

//all employes
employeeRouter.get('/', middlewares.chain, (req:Request, res: Response) => {
    res.send('Route degli employee')
});

//employes profile by id
employeeRouter.get('/:id', (req, res) => {
    const employesId = req.params.id; // Ottieni l'ID dell'impiegato dai parametri della richiesta
})

//employes by role
employeeRouter.get('/:role', (req, res) => {
    const employesRole = req.params.role; // Ottieni il ruolo dell'impiegato dai parametri della richiesta
})

//employes by department
employeeRouter.get('/:department', (req, res) => {
    const employesId = req.params.department; // Ottieni department dell'impiegato dai parametri della richiesta
})

//##### POST METHOD ######

//insert new employee
employeeRouter.post('/', middlewares.chain,async (req: Request, res: Response) => {
    // Assume che il corpo della richiesta contenga i dettagli del nuovo componente
    const newEmployee: IEmployee = req.body; 
    try{
        let wwa= new Employee(newEmployee);
        console.log(wwa)
        wwa.save()
    } catch(error) {
       console.log(error)
    }
    // Ritorna il nuovo componente come risposta JSON con il codice di stato 201 (Created)
    res.status(201).json(newEmployee);  
  });

//##### PUT METHOD #####

export {employeeRouter};