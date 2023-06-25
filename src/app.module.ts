import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './database/mongo.module';
import { GuestsModule } from './modules/guests/module/guests.module';
import { WishesModule } from './modules/wishes/module/wishes.module';

@Module({
  imports: [
    MongoModule,
    GuestsModule,
    WishesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
