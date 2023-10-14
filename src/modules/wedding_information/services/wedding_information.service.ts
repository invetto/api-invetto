import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BrideWeddingInfoInterface, WeddingInformationInterface, createBrideWeddingInterface } from '../interface/wedding_information.interface';
import { CreateWeddingInformationDto } from '../dto/create-wedding-information.dto';

import { hundleApiGet, hundleApiPost, hundleUuid, notFoundRespone } from '@/utils/helper';
import { URL_API_SHEET } from '@/common/api-spreadsheet';
import { BrideServiceV2 } from '@/modules/brides/services/bride.v2.service';
import { BridesService } from '@/modules/brides/services/brides.service';
import { WeddingInformation } from '../schemas/wedding_information.schemas';

@Injectable()
export class WeddingInformationService {
  constructor(
    @InjectModel('WeddingInformation')
    private readonly weddingInformationModel: Model<WeddingInformation>,
    private readonly brideService: BridesService,
    private readonly brideServiceV2: BrideServiceV2
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

  async createWeddingInfoV2(dto: CreateWeddingInformationDto): Promise<WeddingInformationInterface> {
    try {
      const { brideId } = dto;
      const bride = await this.brideServiceV2.findOneById(brideId);

      const body = {
        ...dto,
        ...hundleUuid(),
        brideId: bride[0].uuid
      }

      const data = await hundleApiPost({
        tableName: "WeddingInformations",
        body: body,
        url: URL_API_SHEET
      });

      return await data;
    } catch (error) {
      return error;
    }
  }

  async findOneByIdV2(id: string): Promise<BrideWeddingInfoInterface> {
    try {
      const weddingInfo = await hundleApiGet({
        column: "uuid",
        tableName: "WeddingInformations",
        url: URL_API_SHEET,
        value: id
      });

      const bride = await this.brideServiceV2.findOneById(weddingInfo.brideId);

      return createBrideWeddingInterface(bride, weddingInfo);
    } catch (error) {
      throw error;
    }
  }
}
