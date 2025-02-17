export interface FormData {
  stylistId: string;
  clientId: string;
  serviceId: string;
  date: Date | undefined;
  hour: string;
  minute: string;
}

export interface TimeOption {
  value: string;
  label: string;
}

export interface AppointmentFormProps {
  formData: FormData;
  onChange: (field: keyof FormData, value: string | Date | undefined) => void;
}
