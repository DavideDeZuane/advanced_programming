import { checkToken, checkPermissions } from "./auth.middleware";
import { checkJson} from "./utility";
import { errHandler } from "./error.middleware";
import { preLog, postLog } from "./morgan.middlaware";

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

const auth_chain = [
    checkToken,
    postLog,
]

const auth_role_chain = [

]

export { POST_chain, chain, auth_chain, checkJson, checkPermissions, checkToken };

