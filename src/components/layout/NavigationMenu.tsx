"use client";

import React, { JSX } from "react";

import {
  LayoutDashboard,
  Scissors,
  Package,
  Users,
  UserCircle,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/tailwind-merge";

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Agenda", href: "/agenda", icon: Calendar },
  { name: "Productos", href: "/productos", icon: Package },
  { name: "Servicios", href: "/servicios", icon: Scissors },
  { name: "Clientes", href: "/clientes", icon: Users },
  { name: "Estilistas", href: "/estilistas", icon: UserCircle },
];

export const NavigationMenu = (): JSX.Element => {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};
