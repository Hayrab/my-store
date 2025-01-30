import {
  addData,
  deleteData,
  retrieveData,
  retrieveDataById,
  updateData,
} from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import verify from "@/utils/verify";
import {
  responseApiFailed,
  responseApiForbidden,
  responseApiNotAllowed,
  responseApiNotFound,
  responseApiSuccess,
} from "@/utils/responseApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": {
      const { product }: any = req.query;
      if (product && product[0]) {
        const data = await retrieveDataById("products", product[0]);
        responseApiSuccess(res, data);
      } else {
        const data = await retrieveData("products");
        responseApiSuccess(res, data);
      }

      break;
    }
    case "POST": {
      verify(req, res, true, async () => {
        let data = req.body;
        data.created_at = new Date();
        data.updated_at = new Date();
        data.price = parseInt(data.price);
        data.stock.filter((stock: any) => {
          stock.qty = parseInt(stock.qty);
        });
        await addData("products", data, (status: boolean, result: any) => {
          status
            ? responseApiSuccess(res, { id: result.id })
            : responseApiFailed(res);
        });
      });
    }
    case "PUT": {
      const { product }: any = req.query;
      const { data } = req.body;

      verify(req, res, true, async () => {
        await updateData("products", product[0], data, (status: boolean) => {
          status ? responseApiSuccess(res) : responseApiFailed(res);
        });
      });
      break;
    }
    case "DELETE": {
      const { product }: any = req.query;
      verify(req, res, true, async () => {
        await deleteData("products", product[0], (result: boolean) => {
          result ? responseApiSuccess(res) : responseApiFailed(res);
        });
      });

      break;
    }
    default: {
      responseApiNotAllowed(res);
      break;
    }
  }
}
