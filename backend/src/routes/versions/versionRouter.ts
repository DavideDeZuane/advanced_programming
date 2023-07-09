import { Router, Request, Response } from 'express';
import * as middlewares from '../../middlewares';
import { version_validation } from '../../middlewares/validation';

const router: Router = Router();

//##### GET METHOD #####

//all versions' file
router.get('/:file_id', middlewares.chain, (req: Request, res: Response) => {
    //return all versions' file
});

//version by id
router.get('/:id', (req, res) => {
    const versionId = req.params.id; // Ottieni l'ID della versione dai parametri della richiesta
})  

//##### POST METHOD ######

//insert new version
router.post('/', version_validation, async (req: Request, res: Response) => {

});

//##### PUT METHOD #####
//non penso abbia senso in quanto se modifichiamo una versione ne creiamo una nuova
export default router;
