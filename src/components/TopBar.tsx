import React from "react";

import { Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { NavigationMenu } from "./NavigationMenu";

interface TopBarProps {
  isMobile: boolean;
}

export function TopBar({ isMobile }: TopBarProps) {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="py-4">
                <NavigationMenu />
              </div>
            </SheetContent>
          </Sheet>
        )}

        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-2xl">
            BanKar
          </Link>
        </div>
      </div>
    </header>
  );
}
