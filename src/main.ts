import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from './config/config.type';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<AllConfigType>);
  const corsOrigin = configService.getOrThrow('app.corsOrigin', {
    infer: true,
  });
  app.enableCors({
    origin: corsOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Apollo-Require-Preflight',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const port = configService.get('app.port', { infer: true });
  await app.listen(port);

  logger.log(`🚀 Server running on http://localhost:${port}/graphql`);
}
bootstrap();
