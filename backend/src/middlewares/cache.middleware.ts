import { NextFunction, Request, Response } from 'express';
import { RedisProxy } from '../utils';

const redis:RedisProxy = RedisProxy.getInstance();

const cacheMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    
    const cacheKey:string = req.originalUrl;
    let result = await redis.get(cacheKey)
    if(result){ res.json(JSON.parse(result)) }
    else { next() }
}

export { cacheMiddleware }