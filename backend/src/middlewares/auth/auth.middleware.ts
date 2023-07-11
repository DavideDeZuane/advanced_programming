import { auth, claimCheck, InsufficientScopeError, } from "express-oauth2-jwt-bearer";
import { NextFunction } from "express-serve-static-core";

const audiance = process.env.AUTH0_AUDIENCE || 'http://express.api'
const domain = process.env.AUTH0_DOMAIN || 'https://dev-mklwxkr2dddffknh.us.auth0.com'

const checkToken = auth({
    audience: audiance,
    issuerBaseURL: domain,
});

/* La seguente funzione va a verificare se l'utente ha i permessi per accedere alla rotta, i permessi sono specificati tramite un array */
const checkPermissions = (requiredPermissions:string[]) => {
    return (req:any, res:any, next:NextFunction) => 
    {
        /* claimCheck consente di verificare le rivendicazioni all'interno del JWT, prende come argomento una callback che accede alle rivendicazioni tramite l'oggetto payload */
        const permissionCheck = claimCheck((payload:any) => {
            console.log(payload);
            const permissions:string[] = payload.permissions || [];
            const hasPermissions = requiredPermissions.every((requiredPermission) => permissions.includes(requiredPermission));
  
            if (!hasPermissions) { throw new InsufficientScopeError(); }
            return hasPermissions;
        });
        permissionCheck(req, res, next);
    };
};


/* Permessi degli utenti definiti sui ruoli in auth0*/
const AdminPermission = {
    Read: 'read:route',
};
const UserPermission = {
    Read: ['read:route', 'read:route-admin']
}

export { checkToken, checkPermissions, AdminPermission, UserPermission }