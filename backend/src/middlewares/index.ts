import { checkToken, checkPermissions } from "./auth.middleware";
import { body, validationResult } from 'express-validator';
import { checkJson} from "./utility";
import { errHandler } from "./error.middleware";
import { preLog, postLog } from "./morgan.middlaware";
import { checkValidation, user_validation } from "./validation";
import MiddlewareChainBuilder from "./Builder";


const middlawareBuilder = new MiddlewareChainBuilder();

const POST_PUT_client = middlawareBuilder
            .use(preLog)
            .use(checkJson)
            .use(body('firstName').trim().escape().isAlpha())
            .use(body('lastName').trim().escape().isAlpha('it-IT', {ignore: ' '}))
            .use(body('birthDate').isISO8601().toDate())
            .use(body('fiscalCode').trim().matches(/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/))
            .use(body('address').trim())
            .use(checkValidation)
            .use(postLog)
            .build()

const GET_client = middlawareBuilder
            .use(preLog)
            .use(postLog)
            .build()
            
const chain = [
    preLog,
    postLog,
]

const auth_chain = [
    checkToken,
    postLog,
]


export { chain, auth_chain, errHandler, POST_PUT_client, GET_client };

