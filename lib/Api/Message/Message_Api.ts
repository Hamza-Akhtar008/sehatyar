
import axiosInstance from "../axios";

export async function UploadFile(form: FormData) {
	try {
		const response = await axiosInstance.post('/messages/send/file',form);
		return response.data;
	} catch (error: any) {
		throw error;
	}
}
