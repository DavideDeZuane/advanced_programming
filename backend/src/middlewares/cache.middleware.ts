import { NextFunction, Request, Response } from 'express';
import { RedisProxy } from '../utils';
import { AppLogger } from '../utils/Logger';

const redis:RedisProxy = RedisProxy.getInstance();
const logger = AppLogger.getInstance();

const cacheMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    
    const cacheKey:string = req.originalUrl;
    let result = await redis.get(cacheKey)
    if(result && result !== "[]"){ 
        logger.info("Fetched from cache");
        res.json(JSON.parse(result))
    }
    else { next() }
}

export { cacheMiddleware }