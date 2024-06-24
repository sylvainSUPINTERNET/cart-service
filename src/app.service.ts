import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { REDIS_POOL_TOKEN } from './database/database.module';
import { CartDto } from './dto/cart.dto';
import { ICart } from './database/models/cart.model';
import { ITem } from './database/models/item.modeL';

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

      const itemsClean:ITem[] = cartDto.items.map( i => {
        return {
          name: i.name,
          price: i.price
        }
      });

      const cart:ICart = {
        uuid: cartDto.uuid,
        items: itemsClean,
        modifiedAt: cartDto.modifiedAt
      }
      
      // EX for seconds, PX for milliseconds
      // 10 days

      await client.set(cartDto.uuid, JSON.stringify({...cart}), 'EX', 864000);

      return cart;
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      this.redisPool.release(client);
    }
  }

  

}
