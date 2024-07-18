import instance from "@/lib/axios/instance";

const userServices = {
  getAllUsers: () => instance.get("/api/user"),
  updateUsers: (id: string, data: any, token: string) =>
    instance.put(
      `/api/user/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  deleteusers: (id: string, token: string) =>
    instance.delete(`/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default userServices;
