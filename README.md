# Progetto

## Obiettivo

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

### :whale: Architettura Docker

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
### Sequence Diagram
```mermaid
sequenceDiagram
    actor Bob
    participant Angular
    participant Auth0 
    Bob->>Angular: Request
    Angular->>Auth0: Authentication
```
