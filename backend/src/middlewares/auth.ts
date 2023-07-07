import { auth } from "express-oauth2-jwt-bearer";

const audiance = process.env.AUTH0_AUDIENCE || 'http://express.api'
const domain = process.env.AUTH0_DOMAIN || 'https://dev-mklwxkr2dddffknh.us.auth0.com'

export const checkToken = auth({
    audience: audiance,
    issuerBaseURL: domain,
});
