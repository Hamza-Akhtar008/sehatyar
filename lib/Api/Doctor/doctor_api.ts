
import axiosInstance from "../axios";

export async function ChangeDayAvailability(dayOfWeek: string, isActive: Boolean) {
    try {
        const response = await axiosInstance.patch('availability/toggle/day', {
            dayOfWeek,
            isActive,
        });
        return response.data;
    } catch (error: any) {
        throw error;
    }
}


export async function ChangeSlotAvailability(id: number, isActive: Boolean) {
    try {
        const response = await axiosInstance.patch(`availability/${id}`, {
            isActive:isActive,
                    });
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export async function registerDoctor(payload: any) {
    try {
        const response = await axiosInstance.patch('/doctor-profile', payload);
        return response.data;

    } catch (error: any) {
        throw error;
    }   
}

//get doctor profile by user id
// export const getDoctorProfileByUserId = async (userId: number) => {
//     try {
//         const response = await axiosInstance.get(`/doctor-profile/user/${userId}`);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching doctor profile by user ID:", error);
//         throw error;
//     }
// };

//get doctor profile by doctor id
export const getDoctorProfileByDoctorId = async (doctorId: number) => {
    try {
        const response = await axiosInstance.get(`/doctor-profile/${doctorId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching doctor profile by doctor ID:", error);
        throw error;
    }
};