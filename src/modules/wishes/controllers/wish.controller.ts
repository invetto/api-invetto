import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { WishesService } from '../services/wishes.service';
import { Wish } from '../interfaces/wish.interface';
import { CreateWishDto } from '../dto/create-wish.dto';
import { errorResponse, successResponse } from '../../../utils/helper';

@Controller()
export class WishesController {
  constructor(private readonly wishesService: WishesService) { }

  @Post('wish')
  async create(@Query() query: CreateWishDto): Promise<{ data: Wish }> {
    console.log(query)
    try {
      const create = this.wishesService.create(query);

      return successResponse({ data: create })
    } catch (error) {
      return errorResponse(error.message, error.status)
    }
  }

  @Get('wishes')
  async findAll(@Query('bride') bride: string): Promise<{ data: Wish[] }> {
    try {
      const data = await this.wishesService.findAllByBride(bride);
      return { data: data }
    } catch (error) {
      return errorResponse(error.message, error.status)
    }
  }
}
