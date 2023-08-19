import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { BridesService } from "../services/brides.service";
import { CreateBrideDto } from "../dto/create-bride.dto";
import { BrideInterface } from "../interface/bride.interface";

@Controller('bride')
export class BridesController {
  constructor(
    private readonly bridesService: BridesService
  ) { }

  @Post()
  async createBride(@Body() createBrideDto: CreateBrideDto): Promise<BrideInterface | any> {
    try {
      return await this.bridesService.create(createBrideDto);
    } catch (error) {
      return error
    }
  }

  @Get(':brideCode')
  async findBrideByCode(@Param('brideCode') brideCode: string): Promise<BrideInterface> {
    try {
      return await this.bridesService.findBrideByCode(brideCode);
    } catch (error) {
      return error
    }
  }

}