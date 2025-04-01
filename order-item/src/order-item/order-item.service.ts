import { Injectable } from "@nestjs/common";
import { OrderItem } from "./order-item.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddOrderItemDto } from "../dtos/add-order-item.dto";

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem) private repo: Repository<OrderItem>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  findByProductId(productId: number) {
    return this.repo.find({ where: { productId } });
  }

  async update(productId: number, attrs: Partial<OrderItem>) {
    const product = await this.findByProductId(productId);
    if (!product) throw new Error("No Product in the Order!");
    Object.assign(product[0], attrs);
    return await this.repo.save(product);
  }

  async remove(id: number) {
    const orderItem = await this.findOne(id);
    if (!orderItem) throw new Error("No Order Item with that ID!");
    return this.repo.remove(orderItem);
  }

  async removeByProductId(id: number) {
    const orderItem = await this.findByProductId(id);
    if (!orderItem) throw new Error("No Product in the Order!");
    return this.repo.remove(orderItem);
  }

  async create(body: AddOrderItemDto) {
    const productId = body.productId;
    if (!productId) throw new Error("Product ID is not provided!");
    const quantity = body.quantity;
    if (!quantity) throw new Error("Quantity is not provided!");
    const products = await this.findByProductId(productId);
    // if product is already in order just add to the quantity
    if (products.length === 0) {
      const orderItem = this.repo.create({ productId, quantity });
      return await this.repo.save(orderItem);
    } else {
      products[0].quantity += quantity;
      return await this.repo.save(products[0]);
    }
  }

  async handleOrderCreated() {
    const orderItems = await this.findAll();
    if (!orderItems) throw new Error("No Order Items found!");
    return this.repo.remove(orderItems);
  }
}
