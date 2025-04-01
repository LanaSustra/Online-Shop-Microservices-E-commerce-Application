import { IsNumber, ValidateNested } from 'class-validator';
import { OrderItemDto } from './order-item.dto';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @ValidateNested()
  @Type(() => OrderItemDto)
  orderedProducts: OrderItemDto[];
}
