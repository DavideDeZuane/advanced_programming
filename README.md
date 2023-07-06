# Progetto

## Obiettivo

L'obiettivo del progetto è quello di realizzare un API 


## Progettazione

### Architettura API

Nel realizzare il progetto si è deciso di seguire come pattern architetturale quello delle **Layered Architecture**. In questa architettura gli strati che la costituiscono hanno ognuno un compito specifico e una responsabilità specifica, quelli che andremo ad implementare sono:

- **Router Layer**
- **Service Layer**
- **Data Access Layer**

```mermaid
graph TD;
    router[Router Layer] --- service[Service Layer];
    service --- data[Data Access Layer];
```

### Architettura Docker

L'infrastruttura `Docker` che si è implementato per realizzare il progetto è la segunte:

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

