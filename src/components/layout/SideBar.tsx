import React, { JSX } from "react";

import { NavigationMenu } from "./NavigationMenu";

export const SideBar = (): JSX.Element => {
  return (
    <aside className="hidden md:flex w-fit flex-col border-r">
      <div className="p-2">
        <NavigationMenu />
      </div>
    </aside>
  );
};
