import { retrieveData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const data = await retrieveData("products");

      res
        .status(200)
        .json({ status: true, statusCode: 200, message: "success", data });
      break;

    // case "PUT":
    //   const { user }: any = req.query;
    //   const token = req.headers.authorization?.split(" ")[1] || "";
    //   const { data } = req.body;
    //   jwt.verify(
    //     token,
    //     process.env.NEXTAUTH_SECRET || "",
    //     async (err: any, decode: any) => {
    //       if (decode && decode.role === "admin") {
    //         await updateData("users", user[1], data, (result: boolean) => {
    //           if (result) {
    //             res.status(200).json({
    //               status: true,
    //               statusCode: 200,
    //               message: "success",
    //               data,
    //             });
    //           } else {
    //             res.status(400).json({
    //               status: false,
    //               statusCode: 400,
    //               message: "Failed",
    //             });
    //           }
    //         });
    //       }
    //     }
    //   );
    //   break;

    // case "DELETE":
    //   const { user }: any = req.query;
    //   const token = req.headers.authorization?.split(" ")[1] || "";
    //   jwt.verify(
    //     token,
    //     process.env.NEXTAUTH_SECRET || "",
    //     async (err: any, decode: any) => {
    //       if (decode && decode.role === "admin") {
    //         await deleteData("users", user[1], (result: boolean) => {
    //           if (result) {
    //             res
    //               .status(200)
    //               .json({ status: true, statusCode: 200, message: "success" });
    //           } else {
    //             res.status(400).json({
    //               status: false,
    //               statusCode: 400,
    //               message: "Failed",
    //             });
    //           }
    //         });
    //       } else {
    //         res.status(403).json({
    //           status: false,
    //           statusCode: 403,
    //           message: "Access denied",
    //         });
    //       }
    //     }
    //   );

    //   break;

    default:
      res.status(405).json({
        status: true,
        statusCode: 405,
        message: "Method not allowed",
      });
      break;
  }
}
