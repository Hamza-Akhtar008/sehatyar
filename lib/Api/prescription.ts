import axiosInstance from "./axios";

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}

export interface PrescriptionRequest {
  patientId: number;
  doctorId: number;
  diagnosis: string;
  medications: Medication[];
  tests: string[];
  bloodPressure: {
    high: string;
    low: string;
  };
  instructions: string;
}

export const postPrescription = async (data: PrescriptionRequest) => {
  try {
    const response = await axiosInstance.post("/prescription", data);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

//get prescription by user id
export const getPrescriptionsByUserId = async (userId: number) => {
  try {
    const response = await axiosInstance.get(`/prescription/user/${userId}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

//edit prescription by id
export const editPrescriptionById = async (prescriptionId: number, data: Partial<PrescriptionRequest>) => {
  try {
    const response = await axiosInstance.patch(`/prescription/${prescriptionId}`, data);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};