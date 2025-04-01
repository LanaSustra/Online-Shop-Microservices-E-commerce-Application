import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateProductDto } from './dtos/create-product.dto';
import { CreateOrderDto } from './dtos/create-order.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('get-products')
  getProducts() {
    console.log('fetching all products');
    return this.productService.getProducts();
  }

  @MessagePattern('get-product')
  getProduct(id: string) {
    console.log('get product with the id:', id);
    return this.productService.getProduct(parseInt(id));
  }

  @MessagePattern('create-product')
  createProduct(data: CreateProductDto) {
    console.log('create new product', data);
    return this.productService.createProduct(
      data.name,
      data.quantity,
      data.price,
      data.imageSrc,
    );
  }

  @MessagePattern('delete-product')
  deleteProduct(id: string) {
    console.log('delete product with id:', id);
    return this.productService.deleteProduct(parseInt(id));
  }

  @MessagePattern('update-product')
  updateProduct(data: { id: string; body: CreateProductDto }) {
    console.log(
      `updating product with id: ${data.id} and with body name ${data.body.name}`,
    );
    return this.productService.updateProduct(parseInt(data.id), data.body);
  }

  @EventPattern('order-created')
  handleOrder(data: CreateOrderDto) {
    console.log('Event WORKS: came from order microservice:', data);
    this.productService.handleOrderCreated(data.orderedProducts);
  }
}
