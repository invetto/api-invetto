import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GuestDocument } from '../schema/guest.schema';
import { CreateGuestDto } from '../dto/create-guest.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Guest } from '../interfaces/guest.interface';

@Injectable()
export class GuestService {
  constructor(
    @InjectModel('Guest') private guestModel: Model<GuestDocument>
  ) { }

  async create(createGuestDto: CreateGuestDto): Promise<Guest> {
    const guest = plainToClass(CreateGuestDto, createGuestDto);
    // console.log(guest)
    const errors = await validate(guest);

    if (errors.length > 0) {
      throw new BadRequestException("Nama boleh kosong");
    }

    return await this.guestModel.create(createGuestDto)
  }

  async findAll(): Promise<Guest[]> {
    return this.guestModel.find().exec();
  }
}
