import axiosInstance from "./axios";

export interface AppointmentRequest {
  patientName: string;
  phoneNumber: string;
  email: string;
  paymentMethod: string;
  amount: string;
  notes: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentFor: string;
  doctorId: number;
  userId: number;
}

export const postAppointment = async (data: AppointmentRequest) => {
  try {
    const response = await axiosInstance.post("/appointments", data);
    return response.data;
  } catch (error: any) {
  
    throw error?.response?.data || error;
  }
};




// Get appointments for the logged-in doctor (token required)
export const getAppointmentsForLoggedInDoctor = async () => {
    try {
        const response = await axiosInstance.get('/appointments/for/doctor');
        return response.data;
    } catch (error) {
        console.error('Error fetching appointments for logged-in doctor:', error);
        throw error;
    }
}