## Angular

Per la configurazione di Angular abbiamo creato una configurazione su Auth0. Tramite il frontend andremo a recuperare un token che poi andrà consumato per le richieste alle API.
Quindi ottenitamo il token tramite il frontend e lo consumiamo per fare delle chiamate agli endpoint protetti delle API.

Creiamo un application API.

Occorre poi collegare le due

https://auth0.com/blog/complete-guide-to-angular-user-authentication/#Calling-an-API


Andando a configurare l'httpinterceptor tutte le chiamate che andremo a fare utilizzando HttpClient in angular verso le API avranno il token di accesso configurato 
