import { checkToken, checkRequiredPermissions } from "./auth";
import { checkJson, preLog, errHandler, postLog} from "./utility";


/* spostare l'errHandler direttamente in app.use */ 
const chain = [
    preLog,
    checkJson,
    postLog,
    errHandler
]

const auth_chain = [
    preLog,
    checkToken,
    postLog,
]

const auth_role_chain = [

]

export { chain, auth_chain, checkRequiredPermissions, checkToken };

