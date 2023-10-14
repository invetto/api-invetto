import { Module } from '@nestjs/common';
import { BridesService } from '../services/brides.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BridesController } from '../controllers/bride.controller';
import { BrideSchema } from '../schemas/bride.schemas';
import { BrideServiceV2 } from '../services/bride.v2.service';

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
  providers: [BridesService, BrideServiceV2],
  exports: [BridesService, BrideServiceV2]
})
export class BridesModule {

}
