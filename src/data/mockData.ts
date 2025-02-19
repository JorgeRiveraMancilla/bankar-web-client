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
  },
  {
    id: "2",
    name: "Carlos Ruiz",
    color: "#33FF57",
  },
  {
    id: "3",
    name: "Laura Sánchez",
    color: "#3357FF",
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
];
