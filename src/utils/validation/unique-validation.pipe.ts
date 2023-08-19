import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UniqueValidationPipe implements PipeTransform {
  constructor(@InjectModel('YourModelName') private readonly model: Model<any>) { }

  async transform(value: any, metadata: ArgumentMetadata) {
    const field = metadata.data; // Data key to validate
    const query = { [field]: value };
    const existingData = await this.model.findOne(query).exec();

    if (existingData) {
      throw new BadRequestException(`${field} '${value}' already exists.`);
    }

    return value;
  }
}
