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

export const patchAppointment = async (data: FormData,id:string) => {
  try {
    const response = await axiosInstance.patch(`/appointments/${id}`, data,
 { headers: {
        "Content-Type": "multipart/form-data",
      },}

    );
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
};

// Get appointments for a specific patient by userId
export const getAppointmentsForPatient = async (userId: number | string) => {
  try {
    const response = await axiosInstance.get(`/appointments/patient/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments for patient:', error);
    throw error;
  }
};

// Get appointments for the logged-in doctors (token required)
export const getUpcomingAppointments = async (doctorId: number | string) => {
    try {
        const response = await axiosInstance.get(`/appointments/for/doctors?doctorId=${doctorId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching appointments for logged-in doctor:', error);
        throw error;
    }
};

// Get recent appointments for the logged-in doctor (token required)
export const getRecentAppointmentsForDoctor = async (token: string) => {
  try {
    const response = await axiosInstance.get('/appointments/doctor/recent', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recent appointments for doctor:', error);
    throw error;
  }
};
