import { Module } from '@nestjs/common';
import Redis from "ioredis"
import * as genericPool from 'generic-pool';

export const REDIS_POOL_TOKEN = "REDIS_POOL";

const redisPoolProvider = {
    provide: REDIS_POOL_TOKEN,
    useFactory: () => {
      const factory = {
        create: async () => {
          console.log("Creating Redis client ...")
          const client = new Redis(`rediss://default:${process.env.REDIS_CLIENT_PASSWORD}@causal-arachnid-50143.upstash.io:6379`);
          console.log("connected");
          return client;
        },
        destroy: async (client: any) => {
          await client.quit();
        },
      };
  
      const opts = {
        max: 10, // nombre maximum de connexions dans le pool
        min: 2, // nombre minimum de connexions dans le pool
      };
  
      return genericPool.createPool(factory, opts);
    },
};

@Module({
    imports: [],
    controllers: [],
    providers: [redisPoolProvider],
    exports: [redisPoolProvider],
  })
  export class DatabaseModule {}
