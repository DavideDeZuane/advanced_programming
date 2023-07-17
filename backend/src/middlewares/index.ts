import * as auth from "./auth/auth.middleware";
import { errHandler } from "./error.middleware";
import logging from "./morgan.middleware";
import * as validator from './validation/index'
import * as caching from './cache.middleware'

/* aggiungere l'auth ai vari metodi*/
const client = {
    POST: [
        logging.preLog,
        auth.checkToken,
        ...validator.client,
        validator.checkValidation,
        logging.postLog
    ],
    PUT: [
        logging.preLog,
        ...validator.client,
        validator.checkValidation,
        logging.postLog
    ],
    GET: [
        logging.preLog,
        caching.cacheMiddleware,
        logging.postLog 
    ]
}

const logging_chain = {
    POST: [
        logging.preLog,
        logging.postLog
    ],
    PUT: [
        logging.preLog,
        //aggiungi la validazione dei campi qui
        logging.postLog
    ],
    GET: [
        logging.preLog,
        caching.cacheMiddleware,
        logging.postLog 
    ]
}


const chain = [
    logging.preLog,
    logging.postLog,
]

const auth_chain = [
    logging.postLog,
]


export { chain, auth_chain, errHandler, client, logging_chain };

