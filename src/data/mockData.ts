import { Category, Service, Stylist, Client, Appointment } from "@/types";

export const categories: Category[] = [
  {
    id: 1,
    name: "Corte",
    parentId: null,
    level: 1,
    slug: "corte",
    fullPath: "corte",
    isLeaf: false,
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Dama",
    parentId: 1,
    level: 2,
    slug: "dama",
    fullPath: "corte/dama",
    isLeaf: false,
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: "Normal",
    parentId: 2,
    level: 3,
    slug: "normal",
    fullPath: "corte/dama/normal",
    isLeaf: true,
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: "Varón",
    parentId: 1,
    level: 2,
    slug: "varon",
    fullPath: "corte/varon",
    isLeaf: true,
    sortOrder: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    name: "Tinte",
    parentId: null,
    level: 1,
    slug: "tinte",
    fullPath: "tinte",
    isLeaf: true,
    sortOrder: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const services: Service[] = [
  {
    id: 1,
    categoryId: 3, // Corte Dama Normal
    duration: 30,
    price: 15000,
    isActive: true,
    fullName: "Corte Dama Normal",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    categoryId: 4, // Corte Varón
    duration: 30,
    price: 12000,
    isActive: true,
    fullName: "Corte Varón",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    categoryId: 5, // Tinte
    duration: 120,
    price: 45000,
    isActive: true,
    fullName: "Tinte",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const stylists: Stylist[] = [
  {
    id: "1",
    name: "Ana Martínez",
    color: "#FF5733",
    isVisible: true,
  },
  {
    id: "2",
    name: "Carlos Ruiz",
    color: "#33FF57",
    isVisible: true,
  },
  {
    id: "3",
    name: "Laura Sánchez",
    color: "#3357FF",
    isVisible: true,
  },
];

export const clients: Client[] = [
  {
    id: "1",
    name: "María González",
    email: "maria@email.com",
    phone: "555-0101",
  },
  {
    id: "2",
    name: "Juan Pérez",
    email: "juan@email.com",
    phone: "555-0102",
  },
  {
    id: "3",
    name: "Sofia López",
    email: "sofia@email.com",
    phone: "555-0103",
  },
];

export const appointments: Appointment[] = [
  // Lunes 17
  {
    id: "1",
    title: "Corte Dama Normal - María González",
    start: new Date(2025, 1, 17, 9, 0),
    end: new Date(2025, 1, 17, 9, 30),
    stylist: stylists[0],
    client: clients[0],
    service: services[0],
  },
  {
    id: "2",
    title: "Tinte - Juan Pérez",
    start: new Date(2025, 1, 17, 10, 0),
    end: new Date(2025, 1, 17, 12, 0),
    stylist: stylists[1],
    client: clients[1],
    service: services[2],
  },
  {
    id: "3",
    title: "Corte Varón - Sofia López",
    start: new Date(2025, 1, 17, 13, 0),
    end: new Date(2025, 1, 17, 13, 30),
    stylist: stylists[2],
    client: clients[2],
    service: services[1],
  },
  // Martes 18
  {
    id: "4",
    title: "Corte Dama Normal - María González",
    start: new Date(2025, 1, 18, 10, 30),
    end: new Date(2025, 1, 18, 11, 0),
    stylist: stylists[0],
    client: clients[0],
    service: services[0],
  },
  {
    id: "5",
    title: "Tinte - Sofia López",
    start: new Date(2025, 1, 18, 14, 0),
    end: new Date(2025, 1, 18, 16, 0),
    stylist: stylists[1],
    client: clients[2],
    service: services[2],
  },
  // Miércoles 19
  {
    id: "6",
    title: "Corte Varón - Juan Pérez",
    start: new Date(2025, 1, 19, 9, 30),
    end: new Date(2025, 1, 19, 10, 0),
    stylist: stylists[2],
    client: clients[1],
    service: services[1],
  },
  {
    id: "7",
    title: "Tinte - María González",
    start: new Date(2025, 1, 19, 11, 0),
    end: new Date(2025, 1, 19, 13, 0),
    stylist: stylists[0],
    client: clients[0],
    service: services[2],
  },
  {
    id: "8",
    title: "Corte Dama Normal - Sofia López",
    start: new Date(2025, 1, 19, 15, 0),
    end: new Date(2025, 1, 19, 15, 30),
    stylist: stylists[1],
    client: clients[2],
    service: services[0],
  },
  // Jueves 20
  {
    id: "9",
    title: "Tinte - Juan Pérez",
    start: new Date(2025, 1, 20, 10, 0),
    end: new Date(2025, 1, 20, 12, 0),
    stylist: stylists[2],
    client: clients[1],
    service: services[2],
  },
  {
    id: "10",
    title: "Corte Varón - María González",
    start: new Date(2025, 1, 20, 14, 0),
    end: new Date(2025, 1, 20, 14, 30),
    stylist: stylists[0],
    client: clients[0],
    service: services[1],
  },
  {
    id: "11",
    title: "Corte Dama Normal - Sofia López",
    start: new Date(2025, 1, 20, 16, 30),
    end: new Date(2025, 1, 20, 17, 0),
    stylist: stylists[1],
    client: clients[2],
    service: services[0],
  },
  // Viernes 21
  {
    id: "12",
    title: "Tinte - María González",
    start: new Date(2025, 1, 21, 9, 0),
    end: new Date(2025, 1, 21, 11, 0),
    stylist: stylists[0],
    client: clients[0],
    service: services[2],
  },
  {
    id: "13",
    title: "Corte Varón - Juan Pérez",
    start: new Date(2025, 1, 21, 13, 30),
    end: new Date(2025, 1, 21, 14, 0),
    stylist: stylists[2],
    client: clients[1],
    service: services[1],
  },
  {
    id: "14",
    title: "Corte Dama Normal - Sofia López",
    start: new Date(2025, 1, 21, 15, 30),
    end: new Date(2025, 1, 21, 16, 0),
    stylist: stylists[1],
    client: clients[2],
    service: services[0],
  },
  // Sábado 22
  {
    id: "15",
    title: "Tinte - Sofia López",
    start: new Date(2025, 1, 22, 10, 0),
    end: new Date(2025, 1, 22, 12, 0),
    stylist: stylists[2],
    client: clients[2],
    service: services[2],
  },
  {
    id: "16",
    title: "Corte Dama Normal - María González",
    start: new Date(2025, 1, 22, 14, 0),
    end: new Date(2025, 1, 22, 14, 30),
    stylist: stylists[0],
    client: clients[0],
    service: services[0],
  },
  {
    id: "17",
    title: "Corte Varón - Juan Pérez",
    start: new Date(2025, 1, 22, 16, 30),
    end: new Date(2025, 1, 22, 17, 0),
    stylist: stylists[1],
    client: clients[1],
    service: services[1],
  },
  // Domingo 23
  {
    id: "18",
    title: "Tinte - Juan Pérez",
    start: new Date(2025, 1, 23, 11, 0),
    end: new Date(2025, 1, 23, 13, 0),
    stylist: stylists[0],
    client: clients[1],
    service: services[2],
  },
  {
    id: "19",
    title: "Corte Varón - Sofia López",
    start: new Date(2025, 1, 23, 15, 0),
    end: new Date(2025, 1, 23, 15, 30),
    stylist: stylists[2],
    client: clients[2],
    service: services[1],
  },
  {
    id: "20",
    title: "Corte Dama Normal - María González",
    start: new Date(2025, 1, 23, 17, 0),
    end: new Date(2025, 1, 23, 17, 30),
    stylist: stylists[1],
    client: clients[0],
    service: services[0],
  },
];
