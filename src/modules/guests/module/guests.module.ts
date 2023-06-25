import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GuestsController } from '../controllers/guests.controller';
import { GuestSchema } from '../schema/guest.schema';
import { GuestService } from '../services/guests.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Guest', schema: GuestSchema }
    ])
  ],
  controllers: [GuestsController],
  providers: [GuestService],
})

export class GuestsModule { }
