import AppLogger from "./Logger";
import Redis, { Callback } from 'ioredis';

const opts = {
    host: 'redis',
    port: Number(process.env.PORT_REDIS) || 6379
}

interface RedisInterface {
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<void>;
    del(key: string): Promise<void>;
    flushall(callback?:Callback):Promise<void>;
}

class RedisProxy implements RedisInterface {
    
    private client: Redis;
    private static instance: RedisProxy;
    private logger: AppLogger;
  
    private constructor() {
        this.logger = AppLogger.getInstance();
        this.logger = AppLogger.getInstance();
        this.client = new Redis(opts)
                            .on('error', (err)  => { this.logger.error('Error During Connection with Redis'); })
                            .on('connect', () => { this.logger.info('Connection succed with Redis')});
    }

    public static getInstance(): RedisProxy {
        if (!RedisProxy.instance) {
          RedisProxy.instance = new RedisProxy();
        }
        return RedisProxy.instance;
      }
  
    async get(key: string): Promise<string | null> {
        this.logger.info('Attemping to fetch data from Redis');
        return await this.client.get(key);
    }
  
    async set(key: string, value: string): Promise<void> {
        try
        {
            await this.client.set(key, value);
            this.logger.info('Data added to Redis');
        } 
        catch(err)
        {
            this.logger.error('Error while adding data to Redis')
        }
        
    }
  
    async del(key: string): Promise<void> {
      await this.client.del(key);
    }

    async flushall(callback?: Callback | undefined): Promise<void> {
      this.logger.warn('Deleting content of redis cache');
      await this.client.flushall().then(
        (value) => { if(value == 'OK') console.log('empty cache') }
      ); 
    }
}

export default RedisProxy;