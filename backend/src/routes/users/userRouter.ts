import { Router, Request, Response } from 'express';
const router: Router = Router();

//##### GET METHOD #####

//all clients
router.get('/clients', (req: Request, res: Response) => {
    //return all clients
});

//users profile by id
router.get('/users/:id', (req, res) => {
    const userId = req.params.id; // Ottieni l'ID dell'utente dai parametri della richiesta
})  

//##### POST METHOD ######

//insert new user
router.post('/addUser', (req: Request, res: Response) => {
    // Assume che il corpo della richiesta contenga i dettagli del nuovo utente
    const newUser = req.body; 
    
    // Ritorna il nuovo utente come risposta JSON con il codice di stato 201 (Created)
    res.status(201).json(newUser); 
  });

/*
//##### PUT METHOD #####

//update user's address
router.put('/users/:id/address', (req, res) => {
    // Ottieni l'ID dell'utente dai parametri della richiesta
    const userId = req.params.id; 
    // Ottieni il nuovo indirizzo dall'oggetto di richiesta (body)
    const newAddress = req.body.address; 
  
    const successMessage = `Indirizzo dell'utente con ID ${userId} aggiornato con successo.`;
    res.send(successMessage); // Invia un messaggio di conferma
  });
*/

export default router;
