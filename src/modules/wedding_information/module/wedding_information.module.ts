import { Module } from '@nestjs/common';
import { WeddingInformationService } from '../services/wedding_information.service';
import { WeddingInformationController } from '../controllers/wedding_information.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WeddingInformationSchema } from '../schemas/wedding_information.schemas';
import { BridesModule } from 'src/modules/brides/module/brides.module';
import { CustomValidationPipe } from '../../../utils/validation/custom-validation.pipe';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'WeddingInformation',
        schema: WeddingInformationSchema
      }
    ]),
    BridesModule
  ],
  providers: [WeddingInformationService, CustomValidationPipe],
  controllers: [WeddingInformationController]
})
export class WeddingInformationModule { }
