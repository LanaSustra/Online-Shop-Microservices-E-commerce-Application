import { Controller } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";
import { OrderItemService } from "./order-item.service";
import { AddOrderItemDto } from "../dtos/add-order-item.dto";

@Controller("order-item")
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @MessagePattern("order_item_all")
  getOrderItems() {
    return this.orderItemService.findAll();
  }

  @MessagePattern("order_item_add_product")
  addOrderItem(input: AddOrderItemDto) {
    return this.orderItemService.create(input);
  }

  @MessagePattern("order_item_delete")
  removeOrderItem(id: string) {
    return this.orderItemService.remove(parseInt(id));
  }

  @MessagePattern("order_item_delete_by_product_id")
  removeByProductId(id: string) {
    return this.orderItemService.removeByProductId(parseInt(id));
  }

  @EventPattern("order-created")
  handleOrderCreated() {
    this.orderItemService.handleOrderCreated();
  }
}
