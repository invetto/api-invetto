import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoURI } from '../config/mongo-uri';

@Module({
  imports: [
    MongooseModule.forRoot(mongoURI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    })
  ],
})

export class MongoModule { }
