import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderItem } from './order-item/order-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite', // Specify the path to your SQLite db file
      entities: [OrderItem], // Add your entity classes here
      synchronize: true, // Auto create db schema
    }),
    OrderItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
