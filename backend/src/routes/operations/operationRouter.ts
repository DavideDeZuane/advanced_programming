import { Router, Request, Response } from 'express';
import * as middlewares from '../../middlewares';
import { operation_validation } from '../../middlewares/validation';

const router: Router = Router();

//##### GET METHOD ######

//all operations
router.get('/', middlewares.chain, (req: Request, res: Response) => {
    //return all operations
});

//operation by id
router.get('/:id', (req, res) => {
    const operationId = req.params.id; // Ottieni l'ID dell'operazione dai parametri della richiesta
})

//operation by client id
router.get('/:user_id', (req, res) => {
    const clientId = req.params.user_id; // Ottieni l'ID del cliente dai parametri della richiesta
})

//operation by employee id
router.get('/:employee_id', (req, res) => {
    const employee_id = req.params.employee_id; // Ottieni l'ID del employee dai parametri della richiesta
})


//##### POST METHOD ######

//insert new operation
router.post('/', operation_validation, async (req: Request, res: Response) => {

    res.status(201)
});

//##### PUT METHOD #####

export default router;