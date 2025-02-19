export interface BaseAppointment {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

export interface Appointment extends BaseAppointment {
  stylist: Stylist;
  client: Client;
  service: Service;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Category {
  id: number;
  name: string;
  parentId: number | null;
  level: number;
  slug: string;
  fullPath: string;
  isLeaf: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: number;
  categoryId: number;
  duration: number;
  price: number;
  isActive: boolean;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Stylist {
  id: string;
  name: string;
  color: string;
}

export interface AppointmentFormData {
  stylistId: string;
  clientId: string;
  serviceId: string;
  date: Date | undefined;
  hour: string;
  minute: string;
}

export interface AppointmentFormProps {
  formData: AppointmentFormData;
  onChange: (
    field: keyof AppointmentFormData,
    value: string | Date | undefined
  ) => void;
}
