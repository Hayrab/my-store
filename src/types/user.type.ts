export type User = {
  id: string;
  created_at: Date;
  password?: string;
  fullname: string;
  email: string;
  role: string;
  image: string;
  phone?: string;
  type?: string;
};
