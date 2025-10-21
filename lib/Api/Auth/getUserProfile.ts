import axiosInstance from "../axios";

export async function getUserProfile(id: number, token: string) {
  try {
    const response = await axiosInstance.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
}
