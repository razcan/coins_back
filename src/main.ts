import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { CoinsModule } from './coins/coins.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  // app.setGlobalPrefix('api');
  // app.enableCors();  
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
