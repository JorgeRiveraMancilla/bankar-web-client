export interface BaseAppointment {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

export interface Stylist {
  id: string;
  name: string;
  color: string;
  isVisible: boolean;
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

// Nuevo tipo para el adicional
export interface ServiceAddon {
  id: number;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceAddonRelation {
  id: number;
  serviceId: number;
  addonId: number;
  isActive: boolean;
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
  availableAddons?: ServiceAddon[];
}

export interface AppointmentAddon {
  id: number;
  appointmentId: string;
  addonId: number;
  price: number;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment extends BaseAppointment {
  stylist: Stylist;
  client: Client;
  service: Service;
  addons: AppointmentAddon[];
  totalDuration?: number;
  totalPrice?: number;
}

export interface AppointmentFormData {
  stylistId: string;
  clientId: string;
  serviceId: string;
  date: Date | undefined;
  hour: string;
  minute: string;
  addonIds: number[];
}

export interface ServiceAddon {
  id: number;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceAddonRelation {
  id: number;
  serviceId: number;
  addonId: number;
  isActive: boolean;
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
  availableAddons?: ServiceAddon[];
}

export interface AppointmentAddon {
  id: number;
  appointmentId: string;
  addonId: number;
  price: number;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment extends BaseAppointment {
  stylist: Stylist;
  client: Client;
  service: Service;
  addons: AppointmentAddon[];
  totalDuration?: number;
  totalPrice?: number;
}

export interface AppointmentFormData {
  stylistId: string;
  clientId: string;
  serviceId: string;
  date: Date | undefined;
  hour: string;
  minute: string;
  addonIds: number[];
}
