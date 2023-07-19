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
    ],
    DELETE: [
        logging.preLog,
        logging.postLog
    ]
}

const component = {
    POST: [
        logging.preLog,
        ...validator.componentV,
        validator.checkValidation,
        logging.postLog
    ],
    PUT: [
        logging.preLog,
        ...validator.componentV,
        validator.checkValidation,
        logging.postLog
    ],
    GET: [
        logging.preLog,
        caching.cacheMiddleware,
        logging.postLog 
    ]
}

const proto = {
    POST: [
        logging.preLog,
        ...validator.dev_prototype,
        validator.checkValidation,
        logging.postLog
    ],
    PUT: [
        logging.preLog,
        ...validator.dev_prototype,
        validator.checkValidation,
        logging.postLog
    ],
    GET: [
        logging.preLog,
        caching.cacheMiddleware,
        logging.postLog 
    ]
}

const device = {
    POST: [
        logging.preLog,
        ...validator.device,
        validator.checkValidation,
        logging.postLog
    ],
    PUT: [
        logging.preLog,
        ...validator.device,
        validator.checkValidation,
        logging.postLog
    ],
    GET: [
        logging.preLog,
        caching.cacheMiddleware,
        logging.postLog 
    ]
}

const system = {
    POST: [
        logging.preLog,
        ...validator.system,
        validator.checkValidation,
        logging.postLog
    ],
    PUT: [
        logging.preLog,
        ...validator.system,
        validator.checkValidation,
        logging.postLog
    ],
    GET: [
        logging.preLog,
        caching.cacheMiddleware,
        logging.postLog 
    ]
}

const operation = {
    POST: [
        logging.preLog,
        ...validator.operation,
        validator.checkValidation,
        logging.postLog
    ],
    PUT: [
        logging.preLog,
        ...validator.operation,
        validator.checkValidation,
        logging.postLog
    ],
    GET: [
        logging.preLog,
        caching.cacheMiddleware,
        logging.postLog 
    ]
}

const employee = {
    POST: [
        logging.preLog,
        ...validator.employee,
        validator.checkValidation,
        logging.postLog
    ],
    PUT: [
        logging.preLog,
        ...validator.employee,
        validator.checkValidation,
        logging.postLog
    ],
    GET: [
        logging.preLog,
        caching.cacheMiddleware,
        logging.postLog 
    ]
}

const file = {
    POST: [
        logging.preLog,
        ...validator.file,
        validator.checkValidation,
        logging.postLog
    ],
    PUT: [
        logging.preLog,
        ...validator.file,
        validator.checkValidation,
        logging.postLog
    ],
    GET: [
        logging.preLog,
        caching.cacheMiddleware,
        logging.postLog 
    ]
}

const version = {
    POST: [
        logging.preLog,
        ...validator.version,
        validator.checkValidation,
        logging.postLog
    ],
    PUT: [
        logging.preLog,
        ...validator.version,
        validator.checkValidation,
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


export { chain, auth_chain, errHandler, client, component, device, proto, system, operation, employee, file, version};

