import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { OrderItemDto } from './dtos/order-item.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  getProducts() {
    return this.productRepository.find();
  }

  getProduct(id: number) {
    return this.productRepository.findOneBy({ id });
  }

  async createProduct(
    name: string,
    quantity: number,
    price: number,
    imageSrc: string,
  ) {
    const product = this.productRepository.create({
      name,
      quantity,
      price,
      imageSrc,
    });
    return await this.productRepository.save(product);
  }

  async deleteProduct(id: number) {
    const product = await this.getProduct(id);
    if (!product) throw new Error('No PRODUCT');
    return this.productRepository.remove(product);
  }

  async updateProduct(productId: number, attrs: Partial<Product>) {
    const product = await this.getProduct(productId);
    if (!product) throw new Error('No Product with that ID');

    if (attrs?.quantity) {
      attrs.quantity = product.quantity - attrs.quantity;
    }
    Object.assign(product, attrs);

    return await this.productRepository.save(product);
  }

  async handleOrderCreated(data: OrderItemDto[]) {
    return await Promise.all(
      data.map((product) => {
        return this.updateProduct(product.productId, {
          quantity: product.quantity,
        });
      }),
    );
  }
}
