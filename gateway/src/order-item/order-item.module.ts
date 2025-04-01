import { Module } from '@nestjs/common';
import { OrderItemController } from './order-item.controller';
import { OrderItemService } from './order-item.service';

@Module({
  providers: [OrderItemService],
  imports: [],
  controllers: [OrderItemController]
})
export class OrderItemModule {}
