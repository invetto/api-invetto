import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { WeddingInformationService } from '../services/wedding_information.service';
import { CreateWeddingInformationDto } from '../dto/create-wedding-information.dto';
import { BrideWeddingInfoInterface, WeddingInformationInterface } from '../interface/wedding_information.interface';


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
}


