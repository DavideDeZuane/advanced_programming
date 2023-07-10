import { Router, Request, Response } from 'express';
import * as middlewares from '../../middlewares';
import { component_validation } from '../../middlewares/validation';
import Component, { IComponent } from '../../model/Component';


const componentRouter: Router = Router();

/*
######### TO DO ##########
1) SI PUO IMPLEMENTARE UNA ROTTA PER VEDERE A QUALI PROTOTIPI SONO ASSOCIATI I COMPONENTI; 
*/


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

//##### POST METHOD ######

//insert new component
componentRouter.post('/', middlewares.chain,async (req: Request, res: Response) => {
    // Assume che il corpo della richiesta contenga i dettagli del nuovo componente
    const newComponent: IComponent = req.body; 
    try{
        let wwa= new Component(newComponent);
        console.log(wwa)
        wwa.save()
    } catch(error) {
       console.log(error)
    }
    // Ritorna il nuovo componente come risposta JSON con il codice di stato 201 (Created)
    res.status(201).json(newComponent); 
  });

export {componentRouter};
