import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

async function bootstrap() {
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
