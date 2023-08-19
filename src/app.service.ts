import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Ciee Keepo ya, mending langsung ke https://bio.invetto.id';
  }
}
