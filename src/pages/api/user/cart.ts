import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveDataById, updateData } from "@/lib/firebase/service";
import verify from "@/utils/verify";
import {
  responseApiNotAllowed,
  responseApiNotFound,
  responseApiSuccess,
} from "@/utils/responseApi";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": {
      verify(req, res, false, async (decoded: { id: string }) => {
        const user: any = await retrieveDataById("users", decoded.id);
        user ? responseApiSuccess(res, user.carts) : responseApiNotFound(res);
      });
      break;
    }
    case "PUT": {
      verify(req, res, false, async (decoded: { id: string }) => {
        const { data } = req.body;
        await updateData("users", decoded.id, data, (result: boolean) => {
          result ? responseApiSuccess(res, data) : responseApiNotFound(res);
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

export const config = {
  api: {
    externalResolver: true,
  },
};
