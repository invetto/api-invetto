import { URL_API_SHEET } from '@/common/api-spreadsheet';
import { Injectable } from '@nestjs/common';
import { CreateBrideDto } from '../dto/create-bride.dto';
import { BrideInterface } from '../interface/bride.interface';
import { errorResponse, hundleApiGet, hundleApiPost, hundleUuid } from '@/utils/helper';

@Injectable()
export class BrideServiceV2 {
  async sendDataToSheet(dto: CreateBrideDto): Promise<BrideInterface> {
    const { bride_name } = dto;

    // const code = bride_name.replace(/&/g, '-')
    //   .replace(/\s+/g, '')
    //   .toLowerCase();

    // const split = code.split("-");
    // const boy = split[0];
    // const girl = split[1];
    // const initial = split.map(split => split.charAt(0))
    //   .join(".")
    //   .toUpperCase();

    try {
      const body = {
        ...dto,
        ...hundleUuid(),
        // girl_name: girl,
        // boy_name: boy,
        // bride_code: code,
        // bride_initial: initial
      }

      const data = await hundleApiPost({
        tableName: "Brides",
        body: body,
        url: URL_API_SHEET
      });

      return await data;
    } catch (error) {
      return errorResponse(error);
    }
  }

  async getDataFromSheet(): Promise<BrideInterface> {
    try {
      const brides = await fetch(URL_API_SHEET + "/tabs/Brides");
      const responseData = await brides.json();

      return responseData;
    } catch (error) {
      return errorResponse(error);
    }
  }

  async findOneByCode(brideCode: string): Promise<BrideInterface> {
    try {
      const bride = await fetch(URL_API_SHEET + "/bride_code/" + brideCode);

      const responseData = await bride.json();
      return responseData;
    } catch (error) {
      return errorResponse(error);
    }
  }

  async findOneById(id: string): Promise<BrideInterface> {
    try {
      // const bride = await fetch(URL_API_SHEET + "/uuid/" + id);
      const bride = await hundleApiGet({
        column: "uuid",
        tableName: "Brides",
        url: URL_API_SHEET,
        value: id
      });

      return await bride;
    } catch (error) {
      return errorResponse(error);
    }
  }
}
