import { Router, Request, Response } from 'express';
import * as middlewares from '../../middlewares';
import * as controller from '../../controllers/index';

const protoRouter: Router = Router();

/*
######### TO DO ##########
1) SI PUO IMPLEMENTARE UNA ROTTA PER FARE UN FILTRAGGIO DEI PROTOTIPI CHE HANNO UNA/PIÙ COMPONENTI; 
*/


//##### GET METHOD ######

//all prototype
protoRouter.get('/', middlewares.chain,(req: Request, res: Response) => {
    //return all prototypes
});

//prototypes by id
protoRouter.get('/:id', (req, res) => {
    const prototypeId = req.params.id; // Ottieni l'ID del prototipo dai parametri della richiesta
})

//##### POST METHOD ######

//insert new prototype
protoRouter.post('/', middlewares.chain, controller.prototype_controller.addPrototype);

export { protoRouter };