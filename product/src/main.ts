import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // await app.listen(3000);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        password: 'levi9radionica2024!',
      },
    },
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen();
}
bootstrap();
