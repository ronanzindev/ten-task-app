import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './middlewares/logging.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  app.useGlobalInterceptors(new LoggingInterceptor())
  app.enableCors()
  const config = new DocumentBuilder()
    .setTitle("Task List API")
    .setDescription("Tasks List API Documentation")
    .setVersion("1.0")
    .addTag("tasks")
    .build()
  const documentFactory = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, documentFactory)
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
