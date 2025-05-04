const midtransClient = require("midtrans-client");
// Create Snap API instance
let snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction: false,
  serverKey: process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY || "",
});

export default snap;
