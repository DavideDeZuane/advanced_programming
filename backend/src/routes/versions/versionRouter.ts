import { Router, Request, Response } from 'express';
const router: Router = Router();

//##### GET METHOD #####

//all versions' file
router.get('/versions/:file_id', (req: Request, res: Response) => {
    //return all versions' file
});

//version by id
router.get('/versions/:id', (req, res) => {
    const versionId = req.params.id; // Ottieni l'ID della versione dai parametri della richiesta
})  

//##### POST METHOD ######

//insert new version
router.post('/addVersion', (req: Request, res: Response) => {

});

//##### PUT METHOD #####
//non penso abbia senso in quanto se modifichiamo una versione ne creiamo una nuova
export default router;
