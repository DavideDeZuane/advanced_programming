# Progetto

## :dart: Obiettivo

L'obiettivo del progetto è quello di realizzare un API 


## Progettazione

### :electric_plug: Architettura API 

Nel realizzare il progetto si è deciso di seguire come pattern architetturale quello delle **Layered Architecture**. In questa architettura gli strati che la costituiscono hanno ognuno un compito specifico e una responsabilità specifica, quelli che andremo ad implementare sono:

- **Router Layer**: descrizione dei vari layer
- **Service Layer**
- **Data Access Layer**

```mermaid
graph TD;
    router[Router Layer] --- service[Service Layer];
    service --- data[Data Access Layer];
```

###  :whale: Architettura Docker 

L'infrastruttura `Docker` che si è implementata per realizzare il progetto, e che prevede l'utilizzo di `docker-compose` per la sua gestione, è la segunte:

```mermaid
graph LR;
    subgraph Docker Host
    Express.js ---  MongoDB;
    MongoDB --- MongoExpress;
    Angular --- Express.js;
    end
    subgraph External
    Auth0
    end
    Auth0 --- Angular
```
## Diagram

Lo schema di interazione base dell'applicazione è il seguente:

- L'utente si autentica alla Single Page Application, la quale esegue un redirect verso il servizio di autenticazione (Auth0)
- Una volta che il processo di autenteicazione è andato a buon fine il servizio di autenticazione fornisce all'applicazione un Token
- Questo token verrò consumato per fare le richieste alle API

```mermaid
sequenceDiagram
    actor Bob
    participant Angular
    participant Auth0
    participant API
    Bob ->> Angular: Auth
    activate Bob
    Angular->>Auth0: Redirect
    activate Auth0
    Auth0->>Angular: Token
    deactivate Auth0
    Angular ->> Bob: Authenticated
    deactivate Bob
    Bob ->> Angular: Action
    Angular ->> API: Request
    activate API
    API ->> Angular: Response
    deactivate API
```
