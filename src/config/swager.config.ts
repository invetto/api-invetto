import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('API for Invetto.id')
    .setDescription('API documentation for Invetto.id')
    .setVersion('1.0')
    .addTag('bride', 'Bride related operations')
    .addTag('information', 'Information related operations')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
}
