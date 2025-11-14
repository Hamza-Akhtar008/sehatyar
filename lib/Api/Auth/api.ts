
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
        const response = await axiosInstance.post('/doctor-profile', payload,
            {
                headers: {
                   "Content-Type": "multipart/form-data"
                },
            }
        );
        return response.data;

    } catch (error: any) {
        throw error;
    }   
}


export async function registerDoctor0(payload: any) {
    const token = localStorage.getItem("authToken");
    try {

        const response = await axiosInstance.post('/doctor-profile/by/clinic', payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                   "Content-Type": "multipart/form-data"
                },
            }
        );
        return response.data;

    } catch (error: any) {
        throw error;
    }   
}