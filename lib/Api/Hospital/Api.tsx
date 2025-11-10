
import axiosInstance from "../axios";

export async function AddHospital(name: string, address: string,phone:string,isClinic:Boolean) {
    try {
        const response = await axiosInstance.post('hospital', {
            name:name,
            address:address,
            phone:phone,
            isClinic:isClinic
        });
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export async function GetHospital( doctorId:string) {
    try {
        const response = await axiosInstance.get(`/hospital/doctor/${doctorId}`);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const deleteHospital = async (hospitalId: string | number) => {
  try {
    const response = await axiosInstance.delete(`/hospital/${hospitalId}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};