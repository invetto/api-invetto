import { Body, Controller, Get, Param, Post, Version } from "@nestjs/common";
import { BridesService } from "../services/brides.service";
import { CreateBrideDto } from "../dto/create-bride.dto";
import { BrideInterface } from "../interface/bride.interface";
import { BrideServiceV2 } from "../services/bride.v2.service";
import { errorResponse } from "@/utils/helper";

@Controller()
export class BridesController {
  constructor(
    private readonly bridesService: BridesService,
    private readonly brideServiceV2: BrideServiceV2
  ) { }

  @Post('bride')
  async createBride(@Body() createBrideDto: CreateBrideDto): Promise<BrideInterface> {
    try {
      return await this.bridesService.create(createBrideDto);
    } catch (error) {
      return error
    }
  }

  @Get('bride/:brideCode')
  async findBrideByCode(@Param('brideCode') brideCode: string): Promise<BrideInterface> {
    try {
      return await this.bridesService.findBrideByCode(brideCode);
    } catch (error) {
      return error
    }
  }

  @Post('bride')
  @Version('2')
  async sendData(@Body() createBrideDto: CreateBrideDto): Promise<BrideInterface> {
    try {
      const response = await this.brideServiceV2.sendDataToSheet(createBrideDto);

      return response;
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Get('brides')
  @Version('2')
  async fetchData(): Promise<BrideInterface> {
    try {
      const response = await this.brideServiceV2.getDataFromSheet();

      return response;
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Get('bride/:brideCode')
  @Version('2')
  async findOneByCodeParam(@Param('brideCode') brideCode: string): Promise<BrideInterface> {
    try {
      const response = await this.brideServiceV2.findOneByCode(brideCode);

      return response;
    } catch (error) {
      return errorResponse(error);
    }
  }

}