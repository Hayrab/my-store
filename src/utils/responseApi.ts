import { NextApiResponse } from "next";

const responseApi = (
  res: NextApiResponse,
  status: boolean,
  statusCode: number,
  message: string,
  data: any = {}
) => {
  res.status(statusCode).json({
    status,
    statusCode,
    message,
    data,
  });
};

export const responseApiSuccess = (res: NextApiResponse, data: any = {}) => {
  responseApi(res, true, 200, "Success", data);
};
export const responseApiFailed = (res: NextApiResponse) => {
  responseApi(res, false, 400, "Failed");
};

export const responseApiForbidden = (res: NextApiResponse) => {
  responseApi(res, false, 403, "Forbidden");
};

export const responseApiNotFound = (res: NextApiResponse) => {
  responseApi(res, false, 404, "Not Found");
};

export const responseApiNotAllowed = (res: NextApiResponse) => {
  responseApi(res, false, 405, "Method Not Allowed");
};
