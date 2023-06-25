import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WishSchema } from '../schemas/wish.schemas';
import { WishesController } from '../controllers/wish.controller';
import { WishesService } from '../services/wishes.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Wish', schema: WishSchema }
    ])
  ],
  controllers: [WishesController],
  providers: [WishesService]
})

export class WishesModule { }
