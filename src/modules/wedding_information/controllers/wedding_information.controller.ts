import { Controller, Post, Body, Get, Param, Version } from '@nestjs/common';
import { WeddingInformationService } from '../services/wedding_information.service';
import { CreateWeddingInformationDto } from '../dto/create-wedding-information.dto';
import { BrideWeddingInfoInterface, WeddingInformationInterface } from '../interface/wedding_information.interface';
import { errorResponse } from '@/utils/helper';


@Controller('wedding-information')
export class WeddingInformationController {
  constructor(
    private readonly weddingInformationService: WeddingInformationService
  ) { }

  @Post()
  async create(@Body() createWeddingInfoDto: CreateWeddingInformationDto): Promise<BrideWeddingInfoInterface> {
    try {
      const info = await this.weddingInformationService.create(createWeddingInfoDto);

      return info;
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<WeddingInformationInterface> {
    try {
      const weddingInfo = await this.weddingInformationService.findOneById(id);

      return weddingInfo;
    } catch (error) {
      return error;
    }
  }

  @Post()
  @Version('2')
  async createWeddingInfo(@Body() dto: CreateWeddingInformationDto): Promise<WeddingInformationInterface> {
    try {
      const response = await this.weddingInformationService.createWeddingInfoV2(dto);

      return response;
    } catch (error) {
      return errorResponse(error.response.message);
    }
  }

  @Get(':id')
  @Version('2')
  async getWeddingInfoById(@Param('id') id: string): Promise<BrideWeddingInfoInterface> {
    try {
      const response = await this.weddingInformationService.findOneByIdV2(id);

      return response;
    } catch (error) {
      throw error;
    }
  }
}


