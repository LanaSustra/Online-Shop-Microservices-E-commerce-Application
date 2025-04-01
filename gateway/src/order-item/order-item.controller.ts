import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { CreateOrderItemDto } from '../dtos/create-order-item.dto';

@Controller('order-item')
export class OrderItemController {
  @Client({
    transport: Transport.REDIS,
    options: {
      password: 'levi9radionica2024!',
    },
  })
  private client: ClientProxy;
  constructor() {}

  @Get('/')
  getOrderItems() {
    return this.client.send('order_item_all', {});
  }

  @Post('/')
  addOrderItem(@Body() body: CreateOrderItemDto) {
    return this.client.send('order_item_add_product', body);
  }

  @Delete('/:id')
  removeOrderItem(@Param('id') id: string) {
    return this.client.send('order_item_delete', id);
  }

  @Delete('/remove-product/:id')
  removeByProductId(@Param('id') productId: string) {
    return this.client.send('order_item_delete_by_product_id', productId);
  }
}
