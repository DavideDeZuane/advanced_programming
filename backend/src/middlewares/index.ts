import { checkToken, checkPermissions } from "./auth.middleware";
import { checkJson} from "./utility";
import { errHandler } from "./error.middleware";
import { preLog, postLog } from "./morgan.middlaware";

/* creare un builder per generare la catena di middleware */ 

/* spostare l'errHandler direttamente in app.use */ 
const chain = [
    preLog,
    postLog,
    errHandler
]

const POST_chain = [
    preLog,
    checkJson,
    postLog,
    errHandler
]

/* aggiungere un middleware che per prima cosa veriufica l'esistenza dell'oggetto che si vuole aggiornare */
const PATCH_chain = [
    preLog,
    checkJson,
    postLog

]

const auth_chain = [
    checkToken,
    postLog,
]

const auth_role_chain = [

]

export { POST_chain, PATCH_chain, chain, auth_chain, checkJson, checkPermissions, checkToken };

