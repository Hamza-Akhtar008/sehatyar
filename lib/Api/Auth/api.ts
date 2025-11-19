
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


export async function registerDoctor0(payload: FormData) {
    const token = localStorage.getItem("authToken");
    try {

        const response = await axiosInstance.post('/doctor-profile/by/clinic', payload,
            
        );
        return response.data;

    } catch (error: any) {
        throw error;
    }   
}

export async function registerDoctorIndividual(payload: FormData) {
    const token = localStorage.getItem("authToken");
    try {

        const response = await axiosInstance.post('doctor-profile/individual/doctor', payload,
            
        );
        return response.data;

    } catch (error: any) {
        throw error;
    }   
}