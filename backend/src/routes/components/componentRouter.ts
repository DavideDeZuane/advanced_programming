import { Router, Request, Response } from 'express';
import * as middlewares from '../../middlewares/index';

import * as controller from '../../controllers/index';

const componentRouter: Router = Router();

/*
######### TO DO ##########
1) SI PUO IMPLEMENTARE UNA ROTTA PER VEDERE A QUALI PROTOTIPI SONO ASSOCIATI I COMPONENTI; 

//##### GET METHOD ######

//all components
componentRouter.get('/', middlewares.chain,(req: Request, res: Response) => {
    //return all components
});

//components by id
componentRouter.get('/:id', (req, res) => {
    const componentId = req.params.id; // Ottieni l'ID del componente dai parametri della richiesta
})

//components by type
componentRouter.get('/:type', (req, res) => {
    const componentType = req.params.type; // Ottieni il tipo del componente dai parametri della richiesta
})
*/
//##### POST METHOD ######

//insert new component
componentRouter.get('/',    middlewares.logging_chain.GET,    controller.component_controller.getComponent)
               .get('/:id', middlewares.logging_chain.GET,    controller.component_controller.getComponentById)
               .post('/',   middlewares.logging_chain.POST,   controller.component_controller.addComponent)
               .put('/:id', middlewares.logging_chain.PUT,    controller.component_controller.updateComponent)

export {componentRouter};