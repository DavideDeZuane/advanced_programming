import { checkToken } from "./auth";
import { checkJson, reqLog, errHandler, reqLogPlus, sanitizeInput } from "./utility";

const chain = [
    reqLog,
    checkJson,
    reqLogPlus,
    errHandler
]

const auth_chain = [
    ...chain, 
    checkToken
]

export { chain, auth_chain, sanitizeInput };

