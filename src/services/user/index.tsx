import instance from "@/lib/axios/instance";

const endPoint = {
  user: "/api/user",
  profile: "/api/user/profile",
  cart: "/api/user/cart",
};

const userServices = {
  getAllUsers: () => instance.get(endPoint.user),
  updateUsers: (id: string, data: any) =>
    instance.put(`${endPoint.user}/${id}`, { data }),
  deleteusers: (id: string) => instance.delete(`${endPoint.user}/${id}`),
  getProfile: () => instance.get(endPoint.profile),
  updateProfile: (data: any) => instance.put(endPoint.profile, { data }),
  getCart: () => instance.get(endPoint.cart),
  addToCart: (data: any) => instance.put(endPoint.cart, { data }),
};

export default userServices;
