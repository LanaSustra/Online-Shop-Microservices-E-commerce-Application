import { ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderedProducts: OrderItemDto[];
}
