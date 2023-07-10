import { Router, Request, Response } from 'express';
import * as middlewares from '../../middlewares';
import * as controller from '../../controllers/index';

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
employeeRouter.post('/', middlewares.chain, controller.employee_controller.addEmployee);


export {employeeRouter};