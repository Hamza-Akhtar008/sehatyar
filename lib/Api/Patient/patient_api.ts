


import axiosInstance from "../axios";

export async function getPatientProfile(id: string, token?: string) {
  try {
    const response = await axiosInstance.get(`patient-profile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
}


export const uploadMedicalHistoryFiles = async (  payload:FormData, appointmentId:string) => {

 

  try {
    const response = await axiosInstance.patch(`/appointments/${appointmentId}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data", // optional, axios sets it automatically
      },
    });

    return response.data; // return uploaded file info or success message
  } catch (error: any) {
    console.error("Upload failed:", error);
    throw error;
  }
};



export async function Fetchpatients(role?: string) {
  try {
    const response = await axiosInstance.get(`/users`, {
   
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
}
