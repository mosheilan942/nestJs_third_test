import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { successColor } from "./app.module";

const port = 3000
export const JWT_KEY = process.env.JWT_ACCESS_SECRET;



async function bootstrap() {
  console.log("JWT_KEY", JWT_KEY);

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe)
  await app.listen(port);
  console.log(successColor(`server is up and running at port http://localhost:${port}`));
  console.log(successColor(`🚀 Query endpoint ready at http://localhost:${port}/graphql`));
  
}
bootstrap();