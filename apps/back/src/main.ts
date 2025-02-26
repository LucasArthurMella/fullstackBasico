import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());

  const globalPrefix = "/api/v1";
  app.setGlobalPrefix(globalPrefix)

  const port = configService.get('port') || 3000;

  const config = new DocumentBuilder()
    .setTitle('Fullstack Básico Backend API')
    .setDescription('')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);

  await app.listen(3000);

  Logger.log(
    `🚀 Application is running on: http://127.0.0.1:${port}${globalPrefix}`
  );
}
bootstrap();
