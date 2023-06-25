import { Controller, Post, Body, Get } from '@nestjs/common';
import { GuestService } from '../services/guests.service';
import { CreateGuestDto } from '../dto/create-guest.dto';
import { Guest } from '../interfaces/guest.interface';

@Controller('')
export class GuestsController {
  constructor(
    private readonly guestsService: GuestService
  ) { }

  @Post('guest')
  async create(@Body() createCatDto: CreateGuestDto): Promise<Guest> {
    return await this.guestsService.create(createCatDto);
  }

  @Get('guests')
  async findAll(): Promise<Guest[]> {
    return this.guestsService.findAll();
  }
}
