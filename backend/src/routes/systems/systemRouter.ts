import { Router, Request, Response } from 'express';
const router: Router = Router();

//##### GET METHOD ######

//all systems
router.get('/systems', (req: Request, res: Response) => {
    //return all systems
});

//systems by id
router.get('/systems/:id', (req, res) => {
    const systemId = req.params.id; // Ottieni l'ID del sistema dai parametri della richiesta
})

//systems by client id
router.get('/systems/:user_id', (req, res) => {
    const userId = req.params.user_id; // Ottieni l'ID del cliente dai parametri della richiesta
})


//##### POST METHOD ######

//insert new system
router.post('/systems', (req: Request, res: Response) => {
    //NON SO SE CONVIENE PRENDERLI COME OGGETTI DEVICE
    const devices: string[] = req.query.devices as string[];

    res.status(201).json({ devices }); // Ritorna i componenti del nuovo sistema come risposta JSON con il codice di stato 201 (Created)
});

//##### PUT METHOD #####

export default router;