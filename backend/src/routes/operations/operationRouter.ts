import { Router, Request, Response } from 'express';
const router: Router = Router();

//##### GET METHOD ######

//all operations
router.get('/operations', (req: Request, res: Response) => {
    //return all operations
});

//operation by id
router.get('/operations/:id', (req, res) => {
    const operationId = req.params.id; // Ottieni l'ID dell'operazione dai parametri della richiesta
})

//operation by client id
router.get('/operations/:user_id', (req, res) => {
    const clientId = req.params.user_id; // Ottieni l'ID del cliente dai parametri della richiesta
})

//operation by employee id
router.get('/operations/:employee_id', (req, res) => {
    const employee_id = req.params.employee_id; // Ottieni l'ID del employee dai parametri della richiesta
})


//##### POST METHOD ######

//insert new operation
router.post('/operations', (req: Request, res: Response) => {

    res.status(201)
});

//##### PUT METHOD #####

export default router;