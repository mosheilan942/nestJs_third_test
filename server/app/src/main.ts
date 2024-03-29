import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { successColor } from './app.module';

const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: true, origin: 'http://127.0.0.1:5173' });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  console.log(`server is up and running at port http://localhost:${port}`);
  console.log(`🚀 Query endpoint ready at http://localhost:${port}/graphql`);
}
bootstrap();
