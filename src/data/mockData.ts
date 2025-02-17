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
    start: new Date(2025, 1, 17, 9, 0),
    end: new Date(2025, 1, 17, 9, 30),
    stylistId: "2",
    clientId: "1",
    serviceId: "1",
  },
  {
    id: "2",
    title: "Tinte completo - Juan Pérez",
    start: new Date(2025, 1, 17, 10, 0),
    end: new Date(2025, 1, 17, 12, 0),
    stylistId: "1",
    clientId: "2",
    serviceId: "2",
  },
  {
    id: "3",
    title: "Peinado - Sofia López",
    start: new Date(2025, 1, 17, 13, 0),
    end: new Date(2025, 1, 17, 13, 45),
    stylistId: "3",
    clientId: "3",
    serviceId: "3",
  },
  {
    id: "4",
    title: "Mechas - María González",
    start: new Date(2025, 1, 17, 14, 0),
    end: new Date(2025, 1, 17, 16, 30),
    stylistId: "1",
    clientId: "1",
    serviceId: "4",
  },
  {
    id: "5",
    title: "Corte - Juan Pérez",
    start: new Date(2025, 1, 18, 9, 0),
    end: new Date(2025, 1, 18, 9, 30),
    stylistId: "2",
    clientId: "2",
    serviceId: "1",
  },
  {
    id: "6",
    title: "Peinado - Sofia López",
    start: new Date(2025, 1, 18, 10, 0),
    end: new Date(2025, 1, 18, 10, 45),
    stylistId: "3",
    clientId: "3",
    serviceId: "3",
  },
  {
    id: "7",
    title: "Tinte completo - María González",
    start: new Date(2025, 1, 18, 11, 0),
    end: new Date(2025, 1, 18, 13, 0),
    stylistId: "1",
    clientId: "1",
    serviceId: "2",
  },
  {
    id: "8",
    title: "Mechas - Juan Pérez",
    start: new Date(2025, 1, 18, 14, 0),
    end: new Date(2025, 1, 18, 16, 30),
    stylistId: "1",
    clientId: "2",
    serviceId: "4",
  },
  {
    id: "9",
    title: "Corte - Sofia López",
    start: new Date(2025, 1, 19, 9, 0),
    end: new Date(2025, 1, 19, 9, 30),
    stylistId: "2",
    clientId: "3",
    serviceId: "1",
  },
  {
    id: "10",
    title: "Peinado - María González",
    start: new Date(2025, 1, 19, 10, 0),
    end: new Date(2025, 1, 19, 10, 45),
    stylistId: "3",
    clientId: "1",
    serviceId: "3",
  },
  {
    id: "11",
    title: "Tinte completo - Juan Pérez",
    start: new Date(2025, 1, 19, 11, 0),
    end: new Date(2025, 1, 19, 13, 0),
    stylistId: "1",
    clientId: "2",
    serviceId: "2",
  },
  {
    id: "12",
    title: "Mechas - Sofia López",
    start: new Date(2025, 1, 19, 14, 0),
    end: new Date(2025, 1, 19, 16, 30),
    stylistId: "1",
    clientId: "3",
    serviceId: "4",
  },
  {
    id: "13",
    title: "Corte - María González",
    start: new Date(2025, 1, 20, 9, 0),
    end: new Date(2025, 1, 20, 9, 30),
    stylistId: "2",
    clientId: "1",
    serviceId: "1",
  },
  {
    id: "14",
    title: "Peinado - Juan Pérez",
    start: new Date(2025, 1, 20, 10, 0),
    end: new Date(2025, 1, 20, 10, 45),
    stylistId: "3",
    clientId: "2",
    serviceId: "3",
  },
  {
    id: "15",
    title: "Tinte completo - Sofia López",
    start: new Date(2025, 1, 20, 11, 0),
    end: new Date(2025, 1, 20, 13, 0),
    stylistId: "1",
    clientId: "3",
    serviceId: "2",
  },
  {
    id: "16",
    title: "Mechas - María González",
    start: new Date(2025, 1, 20, 14, 0),
    end: new Date(2025, 1, 20, 16, 30),
    stylistId: "1",
    clientId: "1",
    serviceId: "4",
  },
  {
    id: "17",
    title: "Corte - Juan Pérez",
    start: new Date(2025, 1, 21, 9, 0),
    end: new Date(2025, 1, 21, 9, 30),
    stylistId: "2",
    clientId: "2",
    serviceId: "1",
  },
  {
    id: "18",
    title: "Peinado - Sofia López",
    start: new Date(2025, 1, 21, 10, 0),
    end: new Date(2025, 1, 21, 10, 45),
    stylistId: "3",
    clientId: "3",
    serviceId: "3",
  },
  {
    id: "19",
    title: "Tinte completo - María González",
    start: new Date(2025, 1, 21, 11, 0),
    end: new Date(2025, 1, 21, 13, 0),
    stylistId: "1",
    clientId: "1",
    serviceId: "2",
  },
  {
    id: "20",
    title: "Mechas - Juan Pérez",
    start: new Date(2025, 1, 21, 14, 0),
    end: new Date(2025, 1, 21, 16, 30),
    stylistId: "1",
    clientId: "2",
    serviceId: "4",
  },
  {
    id: "21",
    title: "Corte - Sofia López",
    start: new Date(2025, 1, 22, 9, 0),
    end: new Date(2025, 1, 22, 9, 30),
    stylistId: "2",
    clientId: "3",
    serviceId: "1",
  },
  {
    id: "22",
    title: "Peinado - María González",
    start: new Date(2025, 1, 22, 10, 0),
    end: new Date(2025, 1, 22, 10, 45),
    stylistId: "3",
    clientId: "1",
    serviceId: "3",
  },
  {
    id: "23",
    title: "Tinte completo - Juan Pérez",
    start: new Date(2025, 1, 22, 11, 0),
    end: new Date(2025, 1, 22, 13, 0),
    stylistId: "1",
    clientId: "2",
    serviceId: "2",
  },
  {
    id: "24",
    title: "Mechas - Sofia López",
    start: new Date(2025, 1, 22, 14, 0),
    end: new Date(2025, 1, 22, 16, 30),
    stylistId: "1",
    clientId: "3",
    serviceId: "4",
  },
  {
    id: "25",
    title: "Corte - María González",
    start: new Date(2025, 1, 23, 9, 0),
    end: new Date(2025, 1, 23, 9, 30),
    stylistId: "2",
    clientId: "1",
    serviceId: "1",
  },
  {
    id: "26",
    title: "Peinado - Juan Pérez",
    start: new Date(2025, 1, 23, 10, 0),
    end: new Date(2025, 1, 23, 10, 45),
    stylistId: "3",
    clientId: "2",
    serviceId: "3",
  },
  {
    id: "27",
    title: "Tinte completo - Sofia López",
    start: new Date(2025, 1, 23, 11, 0),
    end: new Date(2025, 1, 23, 13, 0),
    stylistId: "1",
    clientId: "3",
    serviceId: "2",
  },
  {
    id: "28",
    title: "Mechas - María González",
    start: new Date(2025, 1, 23, 14, 0),
    end: new Date(2025, 1, 23, 16, 30),
    stylistId: "1",
    clientId: "1",
    serviceId: "4",
  },
];
