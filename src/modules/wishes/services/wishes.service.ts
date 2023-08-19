import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateWishDto } from '../dto/create-wish.dto';
import { WishDocument } from '../schemas/wish.schemas';
import { Wish } from '../interfaces/wish.interface';

@Injectable()
export class WishesService {
  constructor(
    @InjectModel('Wish') private readonly wishModel: Model<WishDocument>
  ) { }

  async create(createWishDto: CreateWishDto): Promise<Wish> {
    return await this.wishModel.create(createWishDto);
  }

  async findAllByBride(bride: string): Promise<Wish[]> {
    return this.wishModel.find({ bride }).exec();
  }
}
