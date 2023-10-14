import { BadRequestException, HttpException } from "@nestjs/common"
import axios from "axios";
import * as uuid from 'uuid';
// import fetch from 'node-fetch';

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
  throw new HttpException(
    {
      success: false,
      message: 'error',
      error: data ? data + message : message,
    },
    statusCode
  );
}

const headers = {
  'Content-Type': 'application/json'
}

export const hundleApiPost = async ({ tableName, body, url }) => {
  const response = await axios.post(url + "/tabs/" + tableName, body, {
    headers: headers
  });

  return await response.data[0];
}

export const hundleApiGet = async ({ tableName, value, url, column }) => {
  try {
    const response = await axios.get(`${url}/tabs/${tableName}/${column}/${value}`);

    if (response.data && response.data.length > 0) {
      return response.data[0]; // Assuming you're expecting a single object
    } else {
      return null; // Handle the case where no data is found
    }
  } catch (error) {
    throw error; // Rethrow the error for better error handling
  }
}
