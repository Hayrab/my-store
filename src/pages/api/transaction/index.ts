// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import createTransaction from "@/lib/midtrans/transaction";
import { responseApiSuccess } from "@/utils/responseApi";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
  statusCode: number;
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const generateOrderId = `${Date.now()}-${Math.random().toString(16)}`;

    const parameter = {
      transaction_details: {
        order_id: generateOrderId,
        gross_amount: 10000,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: "budi",
        email: "budi.pra@example.com",
        phone: "08111222333",
      },
    };

    createTransaction(
      parameter,
      (transaction: { tokem: string; redirectURL: string }) => {
        console.log(transaction);
        responseApiSuccess(res, transaction);
      }
    );
  }
}
