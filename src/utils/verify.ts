import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { responseApiForbidden } from "./responseApi";

const verify = (
  req: NextApiRequest,
  res: NextApiResponse,
  isadmin: boolean,
  callback: Function
) => {
  const token = req.headers.authorization?.split(" ")[1] || "";
  token
    ? jwt.verify(
        token,
        process.env.NEXTAUTH_SECRET || "",
        async (err: any, decode: any) => {
          if (decode) {
            if (isadmin && decode.role !== "admin") {
              responseApiForbidden(res);
            }

            callback(decode);
          }
        }
      )
    : responseApiForbidden(res);
};

export default verify;
