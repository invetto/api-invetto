import { BadRequestException, HttpException } from "@nestjs/common"
import * as uuid from 'uuid';

export const successResponse = ({ data, message = 'success', statusCode = 200 }) => {
  return {
    success: true,
    message: message,
    statusCode: statusCode,
    data: data
  }
}

export const errorResponse = (message = 'internal server error', statusCode = 500) => {
  throw new HttpException({
    success: false,
    statusCode: statusCode,
    message: message,
  }, statusCode)
}

export const hundleUuid = () => {
  return {
    uuid: uuid.v4()
  };
}

export function errorMessage(error: BadRequestException) {
  const { message, error: errorType, status, name } = error.getResponse() as any;

  return {
    message,
    error: errorType,
    status,
    name,
  };
}

export const notFoundRespone = (data = null, message = "Data Not Found", statusCode = 403,) => {
  // const errorMessage = `data ${data} not found`;
  throw new HttpException(
    {
      success: false,
      message: 'error',
      error: data ? data + message : message,
    },
    statusCode
  );
};
