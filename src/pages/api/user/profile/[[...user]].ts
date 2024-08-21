import type { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "@/services/auth/services";
import jwt from "jsonwebtoken";
import { retrieveDataById, updateData } from "@/lib/firebase/service";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded) {
          const profile = await retrieveDataById("users", decoded.id);
          if (profile) {
            profile.id = decoded.id;
            res.status(200).json({
              status: false,
              statusCode: 200,
              message: "Succes",
              data: profile,
            });
          }
          if (!profile) {
            res.status(404).json({
              status: false,
              statusCode: 404,
              message: "Not Found",
              data: {},
            });
          }
        }
        if (!decoded) {
          res.status(403).json({
            status: false,
            statusCode: 403,
            message: "Access denied",
            data: {},
          });
        }
      }
    );
  } else if (req.method === "PUT") {
    const { user }: any = req.query;
    const token = req.headers.authorization?.split(" ")[1] || "";
    const { data } = req.body;
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decode: any) => {
        if (decode) {
          await updateData("users", user[0], data, (result: boolean) => {
            if (result) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "success",
                data,
              });
            } else {
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "Failed",
              });
            }
          });
        }
      }
    );
  }
  // switch(req.method){
  //   case "GET":
  //     {
  //       const token = req.headers.authorization?.split(" ")[1] || "";
  //       jwt.verify(
  //         token,
  //         process.env.NEXTAUTH_SECRET || "",
  //         async (err: any, decoded: any) => {
  //           if (decoded) {
  //             const profile = await retrieveDataById("users", decoded.id);
  //             if (profile) {
  //               profile.id = decoded.id;
  //               res.status(200).json({
  //                 status: false,
  //                 statusCode: 200,
  //                 message: "Succes",
  //                 data: profile,
  //               });
  //             }
  //             if (!profile) {
  //               res.status(404).json({
  //                 status: false,
  //                 statusCode: 404,
  //                 message: "Not Found",
  //                 data: {},
  //               });
  //             }
  //           }
  //           if (!decoded) {
  //             res.status(403).json({
  //               status: false,
  //               statusCode: 403,
  //               message: "Access denied",
  //               data: {},
  //             });
  //           }
  //         }
  //       );
  //     }
  //     break;
  //   case "PUT":
  //       {
  //             const { user }: any = req.query;
  //             const token = req.headers.authorization?.split(" ")[1] || "";
  //             const { data } = req.body;
  //             jwt.verify(
  //               token,
  //               process.env.NEXTAUTH_SECRET || "",
  //               async (err: any, decode: any) => {
  //                 if (decode) {
  //                   await updateData(
  //                     "users",
  //                     user[1],
  //                     data,
  //                     (result: boolean) => {
  //                       if (result) {
  //                         res.status(200).json({
  //                           status: true,
  //                           statusCode: 200,
  //                           message: "success",
  //                           data,
  //                         });
  //                       } else {
  //                         res.status(400).json({
  //                           status: false,
  //                           statusCode: 400,
  //                           message: "Failed",
  //                         });
  //                       }
  //                     }
  //                   );
  //                 }
  //               }
  //             );
  //       }
  //      break;
  // }
}
