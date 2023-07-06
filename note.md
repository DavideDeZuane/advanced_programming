## Architettura

L'architettura dell'applicazione segue la Layered Architecture. Gli strati che la costituiscono, ognuno con un compito specificio, sono i seguenti:

* **Strato di presentazione**: è quello che gestise l'interfaccia API ovvero espone gli endpoint con cui andare ad interagire (definizione delle rotte) e con la gestione dei logging
* **Strato di servizio**: è quello che continete la logica di business dell'applicazione e gestisce le operazioni di elaborazione dei dati.
* **Strato di accesso ai dati**: si occupa dell'accesso ai dati persistenti, tramite l'utilizzo di un ORM per semplificare l'interazione con il database.

## Angular

Per la configurazione di Angular abbiamo creato una configurazione su Auth0. Tramite il frontend andremo a recuperare un token che poi andrà consumato per le richieste alle API.
Quindi ottenitamo il token tramite il frontend e lo consumiamo per fare delle chiamate agli endpoint protetti delle API.

Creiamo un application API.

Occorre poi collegare le due

https://auth0.com/blog/complete-guide-to-angular-user-authentication/#Calling-an-API


Andando a configurare l'httpinterceptor tutte le chiamate che andremo a fare utilizzando HttpClient in angular verso le API avranno il token di accesso configurato 


Per avere un idea su come setuppare il progetto abbiamo il seguente esempio:

https://developer.auth0.com/resources/guides/api/express/basic-authorization#handle-authorization-exceptions


