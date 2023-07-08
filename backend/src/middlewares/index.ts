import { checkToken, checkRequiredPermissions } from "./auth";
import { checkJson, reqLog, errHandler, reqLogPlus} from "./utility";

const chain = [
    reqLog,
    checkJson,
    reqLogPlus,
    errHandler
]

const auth_chain = [
    checkToken,
    ...chain
]

export { chain, auth_chain, checkRequiredPermissions, checkToken };

