import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CartDto } from './dto/cart.dto';
import { ICart } from './database/models/cart.model';

export interface IError {
  message: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
) {}


@Post()
async createCart(@Body() cartDto: CartDto): Promise<ICart|IError> {
  try {
    const cart = await this.appService.createCart(cartDto);
    return cart;
  } catch ( e ) {
    new Promise<IError>((_resolve, reject) => {
      reject({
        message: e.message
      });
    });
  }

}
/*
@Get()
async getHello(): Promise<string> { 
  const client = await this.redisPool.acquire();

    try {

      // EX for seconds, PX for milliseconds
      // 10 days
      await client.set("test", "HELLO WORLD", 'EX', 864000);

      const result = await new Promise<string>((resolve, reject) => {
        client.get("test", (err: any, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
      return result;

    } catch ( e ) {
      console.error(e);
      throw e;

    } finally  {
      this.redisPool.release(client);
    }
  }*/

}
