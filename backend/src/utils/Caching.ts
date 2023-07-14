import AppLogger from "./Logger";
import Redis from 'ioredis';

const opts = {
    host: 'redis',
    port: Number(process.env.PORT_REDIS) || 6379
}

interface RedisInterface {
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<void>;
    del(key: string): Promise<void>;
}

class RedisClient implements RedisInterface{
  
    private client: Redis;
    private logger: AppLogger;

  constructor() {
    this.logger = AppLogger.getInstance();
    this.client = new Redis(opts)
                        .on('error', (err)  => { this.logger.error('Error During Connection with Redis'); })
                        .on('connect', () => { this.logger.info('Connection succed with Redis')});
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}

class RedisProxy implements RedisInterface {
    
    private client: RedisClient;
    private static instance: RedisProxy;
    private logger: AppLogger;
  
    private constructor() {
        this.logger = AppLogger.getInstance();
        this.client = new RedisClient();
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
}

export default RedisProxy;
export { RedisClient }