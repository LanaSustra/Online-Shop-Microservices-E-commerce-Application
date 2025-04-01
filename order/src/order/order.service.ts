import { Injectable } from '@nestjs/common';
import { Client, Transport, ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dtos/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
@Injectable()
export class OrderService {
  @Client({
    transport: Transport.REDIS,
    options: {
      password: 'levi9radionica2024!',
    },
  })
  private client: ClientProxy;
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}

  getOrders() {
    return this.repo.find();
  }

  getOrder(id: number) {
    return this.repo.findOneBy({ id });
  }

  async createOrder(body: CreateOrderDto) {
    const eventData = [];

    body.orderedProducts.forEach((product) => {
      eventData.push({
        productId: product.productId,
        quantity: product.quantity,
      });
    });

    const order = this.repo.create({ orderedProducts: body.orderedProducts });
    if (order) {
      this.client.emit('order-created', body);
    }
    return await this.repo.save(order);
  }

  async deleteOrder(id: number) {
    const order = await this.getOrder(id);
    if (!order) throw new Error('No Order with that ID');
    return this.repo.remove(order);
  }
}
