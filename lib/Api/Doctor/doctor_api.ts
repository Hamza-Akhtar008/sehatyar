
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