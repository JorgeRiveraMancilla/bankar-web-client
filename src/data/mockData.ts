import { Stylist, Client, Service, Appointment } from "@/types";

export const stylists: Stylist[] = [
  { id: "1", name: "Ana Martínez", specialty: "Colorista" },
  { id: "2", name: "Carlos Ruiz", specialty: "Corte" },
  { id: "3", name: "Laura Sánchez", specialty: "Peinados" },
];

export const clients: Client[] = [
  {
    id: "1",
    name: "María González",
    email: "maria@email.com",
    phone: "555-0101",
  },
  { id: "2", name: "Juan Pérez", email: "juan@email.com", phone: "555-0102" },
  { id: "3", name: "Sofia López", email: "sofia@email.com", phone: "555-0103" },
];

export const services: Service[] = [
  { id: "1", name: "Corte de cabello", duration: 30, price: 25 },
  { id: "2", name: "Tinte completo", duration: 120, price: 80 },
  { id: "3", name: "Peinado", duration: 45, price: 35 },
  { id: "4", name: "Mechas", duration: 150, price: 100 },
];

export const appointments: Appointment[] = [
  {
    id: "1",
    title: "Corte - María González",
    start: new Date(2024, 1, 13, 10, 0),
    end: new Date(2024, 1, 13, 10, 30),
    stylistId: "1",
    clientId: "1",
    serviceId: "1",
  },
  // Puedes agregar más citas aquí
];
