import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { BrideInterface } from '../interface/bride.interface';
import { CreateBrideDto } from '../dto/create-bride.dto';

import { hundleUuid } from '../../../utils/helper';
import { Bride } from '../schemas/bride.schemas';


@Injectable()
export class BridesService {
  constructor(
    @InjectModel('Bride')
    private readonly brideModel: Model<Bride>
  ) { }

  async create(create: CreateBrideDto): Promise<BrideInterface> {
    const { bride_name } = create;

    const code = bride_name.replace(/&/g, '-')
      .replace(/\s+/g, '')
      .toLowerCase();

    const split = code.split("-");
    const initial = split.map(split => split.charAt(0))
      .join(".")
      .toUpperCase();

    return await this.brideModel.create({
      ...create,
      ...hundleUuid(),
      bride_code: code,
      bride_initial: initial
    });
  }

  async findBrideByCode(brideCode: string): Promise<BrideInterface | null> {
    const brideInfo = await this.brideModel.findOne({
      bride_code: brideCode
    }).exec();

    if (!brideInfo) {
      throw new BadRequestException("data tidak ada adada")
    }

    return brideInfo;
  }


  async findOneById(id: ObjectId): Promise<BrideInterface | any> {
    const weddingInfo = await this.brideModel.findById(id).exec();

    return weddingInfo;
  }
}