import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { retrieveDataById, updateData } from "@/lib/firebase/service";
import { compare, hash } from "bcrypt";
import verify from "@/utils/verify";
import {
  responseApiFailed,
  responseApiNotAllowed,
  responseApiNotFound,
  responseApiSuccess,
} from "@/utils/responseApi";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      {
        verify(req, res, false, async (decoded: { id: string }) => {
          const profile = await retrieveDataById("users", decoded.id);
          if (profile) {
            profile.id = decoded.id;
            responseApiSuccess(res, profile);
          }
          if (!profile) {
            responseApiNotFound(res);
          }
        });
      }
      break;

    case "PUT":
      {
        const { data } = req.body;
        verify(req, res, false, async (decoded: { id: string }) => {
          if (data.password) {
            const passwordConfirm = await compare(
              data.oldPassword,
              data.encryptedPassword
            );
            if (!passwordConfirm) {
              responseApiFailed(res);
            }
            delete data.oldPassword;
            delete data.encryptedPassword;
            data.password = await hash(data.password, 10);
          }

          await updateData("users", decoded.id, data, (result: boolean) => {
            result ? responseApiSuccess(res, data) : responseApiFailed(res);
          });
        });
      }
      break;
    default: {
      responseApiNotAllowed(res);
      break;
    }
  }
}
