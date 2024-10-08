export type Product = {
  category: string;
  created_at: Date;
  id: string;
  image: string;
  name: string;
  status: boolean;
  stock: [{ size: string; qty: number }];
  updated_at: Date;
  price: number;
};
