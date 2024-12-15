import {
  addData,
  deleteData,
  retrieveData,
  retrieveDataById,
  updateData,
} from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": {
      const { product }: any = req.query;
      if (product && product[0]) {
        const data = await retrieveDataById("products", product[0]);
        res.status(200).json({
          status: true,
          statusCode: 200,
          message: "success",
          data,
        });
      } else {
        const data = await retrieveData("products");
        res.status(200).json({
          status: true,
          statusCode: 200,
          message: "success",
          data,
        });
      }

      break;
    }
    case "POST": {
      const token = req.headers.authorization?.split(" ")[1] || "";
      jwt.verify(
        token,
        process.env.NEXTAUTH_SECRET || "",
        async (err: any, decode: any) => {
          if (decode && decode.role === "admin") {
            let data = req.body;
            data.created_at = new Date();
            data.updated_at = new Date();
            data.price = parseInt(data.price);
            data.stock.filter((stock: any) => {
              stock.qty = parseInt(stock.qty);
            });
            await addData("products", data, (status: boolean, result: any) => {
              status
                ? res.status(200).json({
                    status: true,
                    statusCode: 200,
                    message: "Success",
                    data: { id: result.id },
                  })
                : res.status(400).json({
                    status: false,
                    statusCode: 400,
                    message: "Failed",
                    data: {},
                  });
            });
          } else {
            res.status(403).json({
              status: false,
              statusCode: 403,
              message: "Access denied",
            });
          }
        }
      );
      break;
    }
    case "PUT": {
      const { product }: any = req.query;
      const { data } = req.body;
      const token = req.headers.authorization?.split(" ")[1] || "";
      jwt.verify(
        token,
        process.env.NEXTAUTH_SECRET || "",
        async (err: any, decode: any) => {
          if (decode && decode.role === "admin") {
            await updateData(
              "products",
              product[0],
              data,
              (status: boolean) => {
                status
                  ? res.status(200).json({
                      status: true,
                      statusCode: 200,
                      message: "Success",
                    })
                  : res.status(400).json({
                      status: false,
                      statusCode: 400,
                      message: "Failed",
                    });
              }
            );
          } else {
            res.status(403).json({
              status: false,
              statusCode: 403,
              message: "Access denied",
            });
          }
        }
      );
      break;
    }
    case "DELETE": {
      const { product }: any = req.query;
      const token = req.headers.authorization?.split(" ")[1] || "";
      jwt.verify(
        token,
        process.env.NEXTAUTH_SECRET || "",
        async (err: any, decode: any) => {
          if (decode && decode.role === "admin") {
            await deleteData("products", product[0], (result: boolean) => {
              if (result) {
                res
                  .status(200)
                  .json({ status: true, statusCode: 200, message: "success" });
              } else {
                res.status(400).json({
                  status: false,
                  statusCode: 400,
                  message: "Failed",
                });
              }
            });
          } else {
            res.status(403).json({
              status: false,
              statusCode: 403,
              message: "Access denied",
            });
          }
        }
      );

      break;
    }
    default: {
      res.status(405).json({
        status: true,
        statusCode: 405,
        message: "Method not allowed",
      });
      break;
    }
  }
}
