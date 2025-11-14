import axiosInstance from "../axios"

export async function FetchDoctorbyClinic() {
  try {
    const response = await axiosInstance.get(`doctor-profile/by/clinic`)
    return response.data
  } catch (error: any) {
    throw error
  }
}



export async function FetchUserbyClinic(role:string) {
  try {
    const response = await axiosInstance.get(`/users/by/clinic/?role=${role}`)
    return response.data
  } catch (error: any) {
    throw error
  }
}