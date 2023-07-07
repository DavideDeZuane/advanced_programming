import { checkToken } from "./auth";
import { checkJson, reqLog, errHandler, reqLogPlus } from "./utility";

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

export { chain };
export { auth_chain}

