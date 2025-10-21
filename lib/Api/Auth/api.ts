
import axiosInstance from "../axios";

export async function login(email: string, password: string) {
	try {
		const response = await axiosInstance.post('/auth/login', {
			email,
			password,
		});
		return response.data;
	} catch (error: any) {
		throw error;
	}
}


export async function registerDoctor(payload: any) {
    try {
        const response = await axiosInstance.post('/doctor-profile', payload);
        return response.data;

    } catch (error: any) {
        throw error;
    }   
}