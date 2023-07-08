import { auth, claimCheck, InsufficientScopeError, } from "express-oauth2-jwt-bearer";
import { NextFunction } from "express-serve-static-core";

const audiance = process.env.AUTH0_AUDIENCE || 'http://express.api'
const domain = process.env.AUTH0_DOMAIN || 'https://dev-mklwxkr2dddffknh.us.auth0.com'

const checkToken = auth({
    audience: audiance,
    issuerBaseURL: domain,
});

const checkRequiredPermissions = (requiredPermissions:string[]) => {
    return (req:any, res:any, next:NextFunction) => 
    {
        const permissionCheck = claimCheck((payload:any) => {
        const permissions:string[] = payload.permissions || [];
  
        const hasPermissions = requiredPermissions.every((requiredPermission) =>
            permissions.includes(requiredPermission)
        );
  
        if (!hasPermissions) { throw new InsufficientScopeError(); }
        return hasPermissions;
        });
  
        permissionCheck(req, res, next);
    };
};

const AdminPermission = {
    Read: 'read:route',
};

export { checkToken, checkRequiredPermissions, AdminPermission }