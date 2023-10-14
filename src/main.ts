import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { VersioningType } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const swaggerYaml = fs.readFileSync('./swagger-config.yml', 'utf8');
  const swaggerDocument = await yaml.load(swaggerYaml) as OpenAPIObject;

  SwaggerModule.setup('api/docs', app, swaggerDocument);

  app.enableVersioning({
    type: VersioningType.URI,
  });
  // setupSwagger(app);
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
