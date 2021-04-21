import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TokenExpiredError } from './auth/dto/tokenExpiredError-dto';
import { useContainer } from 'class-validator';
import { NotFoundInterceptor } from './shared/interceptors/not-found.Interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalInterceptors(new NotFoundInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        strategy: 'exposeAll',
        excludeExtraneousValues: true,
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('nest-starter')
    .setDescription('The nest-starts API description')
    .setVersion('0.1.0')
    .addTag('auth')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [TokenExpiredError],
  });
  SwaggerModule.setup('swagger', app, document);
  app.enableShutdownHooks();
  await app.listen(3000);
}
bootstrap();
