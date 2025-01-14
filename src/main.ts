import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { config } from './app/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Tasks App')
    .setDescription('Tasks App API documentation')
    .setVersion('1.0')
    .addTag('tasks')
    .build();
  
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentFactory);
  
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(config.PORT);
  
  logger.log(`App running on port ${process.env.PORT}`);
}
bootstrap();
