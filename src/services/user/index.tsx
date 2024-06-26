import instance from "@/lib/axios/instance";

const userServices = {
  getAllUsers: () => instance.get("/api/user"),
  updateUsers: (id: string, data: any) =>
    instance.put("/api/user", { id, data }),
  deleteusers: (id: string) => instance.delete(`/api/user/${id}`),
};

export default userServices;
