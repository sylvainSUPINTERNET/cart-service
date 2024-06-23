import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { REDIS_POOL_TOKEN } from './database/database.module';
import { CartDto } from './dto/cart.dto';
import { ICart } from './database/models/cart.model';


@Injectable()
export class AppService {
  constructor(
    @Inject(REDIS_POOL_TOKEN) private readonly redisPool: any,
) {}

  async createCart(cartDto:CartDto): Promise<ICart> {
    const client = await this.redisPool.acquire();
    try {

      if ( !cartDto.uuid ) {
        cartDto.uuid = uuidv4();
      }

      if ( !cartDto.items ) {
       cartDto.items = [];
      }

      cartDto.modifiedAt = new Date().toISOString();

      return await client.set(cartDto.uuid, JSON.stringify({ ...cartDto }));
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      this.redisPool.release(client);
    }
  }

  

}
