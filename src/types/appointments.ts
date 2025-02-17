export type AppointmentStatus =
  | "scheduled" // Programada
  | "confirmed" // Confirmada
  | "in-progress" // En progreso
  | "completed" // Completada
  | "cancelled" // Cancelada
  | "rescheduled" // Reprogramada
  | "no-show"; // No se presentó

export type AppointmentPriority = "low" | "medium" | "high" | "urgent";

export type AppointmentType =
  | "consultation"
  | "follow-up"
  | "evaluation"
  | "treatment"
  | "emergency";

export type AppointmentReminder = {
  type: "email" | "sms" | "push";
  timeBeforeAppointment: number; // minutos
  sent: boolean;
  sentAt?: Date;
};

export interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: "patient" | "doctor" | "staff";
}

export interface AppointmentNotes {
  content: string;
  createdAt: Date;
  createdBy: string;
  lastModified?: Date;
  isPrivate: boolean;
}

export interface Appointment {
  id: string;
  title: string;
  start: Date;
  end: Date;
  // Campos del modelo de peluquería
  stylistId: string;
  clientId: string;
  serviceId: string;
  // Campos adicionales para el calendario
  type?: AppointmentType;
  status?: AppointmentStatus;
  priority?: AppointmentPriority;
  participants?: Contact[];
  description?: string;
  location?: string;
  color?: string;
  isAllDay?: boolean;
}

export type AppointmentValidationError = {
  field: keyof Appointment;
  message: string;
};

export type AppointmentCreationResult = {
  success: boolean;
  appointment?: Appointment;
  errors?: AppointmentValidationError[];
};

export type AppointmentUpdateResult = {
  success: boolean;
  appointment?: Appointment;
  errors?: AppointmentValidationError[];
  previousStatus?: AppointmentStatus;
};

export type AppointmentDeleteResult = {
  success: boolean;
  errors?: string[];
};
