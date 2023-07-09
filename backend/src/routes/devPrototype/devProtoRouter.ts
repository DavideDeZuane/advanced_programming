import { Router, Request, Response } from 'express';
import * as middlewares from '../../middlewares';
import { prototype_validation } from '../../middlewares/validation';

const router: Router = Router();

/*
######### TO DO ##########
1) SI PUO IMPLEMENTARE UNA ROTTA PER FARE UN FILTRAGGIO DEI PROTOTIPI CHE HANNO UNA/PIÙ COMPONENTI; 
*/


//##### GET METHOD ######

//all prototype
router.get('/', middlewares.chain,(req: Request, res: Response) => {
    //return all prototypes
});

//prototypes by id
router.get('/:id', (req, res) => {
    const prototypeId = req.params.id; // Ottieni l'ID del prototipo dai parametri della richiesta
})

//##### POST METHOD ######

//insert new prototype
router.post('/', prototype_validation,async (req: Request, res: Response) => {
    //NON SO SE CONVIENE PRENDERLI COME OGGETTI COMPONENTS
    const components: string[] = req.query.components as string[];

    res.status(201).json({ components }); // Ritorna i componenti del nuovo prototipo come risposta JSON con il codice di stato 201 (Created)
});

//##### PUT METHOD #####

export default router;