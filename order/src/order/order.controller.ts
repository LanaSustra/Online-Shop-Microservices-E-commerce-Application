import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderItemDto } from './dtos/order-item.dto';
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern('get-orders')
  getOrders() {
    console.log('fetching all orders');
    return this.orderService.getOrders();
  }

  @MessagePattern('get-order')
  getOrder(id: string) {
    console.log('get order with the id:', id);
    return this.orderService.getOrder(parseInt(id));
  }

  @MessagePattern('create-order')
  createOrder(data: CreateOrderDto) {
    console.log('create new order', data);
    return this.orderService.createOrder(data);
  }

  @MessagePattern('delete-order')
  deleteOrder(id: string) {
    console.log('delete order with id:', id);
    return this.orderService.deleteOrder(parseInt(id));
  }
}
