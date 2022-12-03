import {HttpAdapterHost, NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe, VersioningType} from "@nestjs/common";
import {AllExceptionsFilter} from "./exeptions/all-exceptions.filter";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  //prefix
  app.setGlobalPrefix('api');
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI
  })

  //swagger
  const config = new DocumentBuilder()
      .setTitle('Docs')
      .setDescription('The API description')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  //exeptions
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();


  await app.listen(PORT, () => console.log(`Server has been started on port: ${PORT}`));
}
bootstrap();
