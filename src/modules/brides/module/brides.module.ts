import { Module } from '@nestjs/common';
import { BridesService } from '../services/brides.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BridesController } from '../controllers/bride.controller';
import { BrideSchema } from '../schemas/bride.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Bride',
        schema: BrideSchema
      }
    ])
  ],
  controllers: [BridesController],
  providers: [BridesService],
  exports: [BridesService]
})
export class BridesModule {

}
