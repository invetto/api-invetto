import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './database/mongo.module';
import { GuestsModule } from './modules/guests/module/guests.module';
import { WishesModule } from './modules/wishes/module/wishes.module';
import { BridesModule } from './modules/brides/module/brides.module';
import { WeddingInformationModule } from './modules/wedding_information/module/wedding_information.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TransformResponseInterceptor } from './utils/interceptor/transform-response.interceptor';
import { ValidationInterceptor } from './utils/interceptor/validation.interceptor';

@Module({
  imports: [
    MongoModule,
    GuestsModule,
    WishesModule,
    BridesModule,
    WeddingInformationModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ValidationInterceptor,
    },
  ],
})

export class AppModule { }
