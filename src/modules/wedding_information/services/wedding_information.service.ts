import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BrideWeddingInfoInterface, WeddingInformationInterface, createBrideWeddingInterface } from '../interface/wedding_information.interface';
import { CreateWeddingInformationDto } from '../dto/create-wedding-information.dto';

import { hundleUuid, notFoundRespone } from 'src/utils/helper';
import { BridesService } from 'src/modules/brides/services/brides.service';
import { WeddingInformation } from '../schemas/wedding_information.schemas';

@Injectable()
export class WeddingInformationService {
  constructor(
    @InjectModel('WeddingInformation')
    private readonly weddingInformationModel: Model<WeddingInformation>,
    private readonly brideService: BridesService
  ) { }

  async create(createWeddingInfoDto: CreateWeddingInformationDto): Promise<BrideWeddingInfoInterface> {
    const { bride } = createWeddingInfoDto;
    const findBride = await this.brideService.findOneById(bride);

    const createdWeddingInfo = await this.weddingInformationModel.create({
      ...createWeddingInfoDto,
      ...hundleUuid(),
      bride: findBride._id,
    });

    return createBrideWeddingInterface(findBride, createdWeddingInfo);
  }


  async findOneById(id: string): Promise<WeddingInformationInterface> {
    const weddingInfo = await this.weddingInformationModel.findById(id)
      .exec();

    if (!weddingInfo) {
      return notFoundRespone();
    }

    return weddingInfo;
  }

}
