import { Module } from "@nestjs/common";
import { OrderItemController } from "./order-item.controller";
import { OrderItemService } from "./order-item.service";
import { OrderItem } from "./order-item.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite", // Specify the path to your SQLite database file
      entities: [OrderItem], // Add your entity classes here
      synchronize: true, // Automatically create database schema
    }),
    TypeOrmModule.forFeature([OrderItem]),
  ],
  controllers: [OrderItemController],
  providers: [OrderItemService],
})
export class OrderItemModule {}
