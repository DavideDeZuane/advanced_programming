import { checkToken, checkPermissions } from "./auth.middleware";
import { body, validationResult } from 'express-validator';
import { checkJson} from "./utility";
import { errHandler } from "./error.middleware";
import { preLog, postLog } from "./morgan.middlaware";
import { checkValidation } from "./validation";

const POST_PUT_client = [
    preLog,
    checkJson,
    body('firstName').trim().escape().isAlpha('it-IT'),
    body('lastName').trim().escape().isAlpha('it-IT', {ignore: ' '}),
    body('birthDate').isISO8601().toDate(),
    body('fiscalCode').trim().matches(/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/),
    body('address').trim(),
    checkValidation,
    postLog
]
const GET_client = [
    preLog,
    postLog
]

const chain = [
    preLog,
    postLog,
]

const auth_chain = [
    checkToken,
    postLog,
]


export { chain, auth_chain, errHandler, POST_PUT_client, GET_client };

