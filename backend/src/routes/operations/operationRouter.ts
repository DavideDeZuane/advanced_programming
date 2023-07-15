import { Router, Request, Response } from 'express';
import * as middlewares from '../../middlewares';
import * as controller from '../../controllers/index';

const operationRouter: Router = Router();

//##### GET METHOD ######
/*
//all operations
operationRouter.get('/', middlewares.chain, (req: Request, res: Response) => {
    //return all operations
});

//operation by id
operationRouter.get('/:id', (req, res) => {
    const operationId = req.params.id; // Ottieni l'ID dell'operazione dai parametri della richiesta
})

//operation by client id
operationRouter.get('/:user_id', (req, res) => {
    const clientId = req.params.user_id; // Ottieni l'ID del cliente dai parametri della richiesta
})

//operation by employee id
operationRouter.get('/:employee_id', (req, res) => {
    const employee_id = req.params.employee_id; // Ottieni l'ID del employee dai parametri della richiesta
})


//##### POST METHOD ######
*/
//insert new operation
operationRouter.get('/',    middlewares.logging_chain.GET,  controller.operation_controller.getOperation)
               .post('/',   middlewares.logging_chain.POST, controller.operation_controller.addOperation)
//##### PUT METHOD #####

export { operationRouter };