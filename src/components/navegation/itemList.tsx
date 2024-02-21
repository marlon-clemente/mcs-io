import React from "react";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";

type ItemListProps = React.ComponentProps<typeof NavigationMenu.Item> & {
  title: string;
  to?: string;
  titlePrefix?: React.ReactNode;
  description: string;
};

export const ItemList = ({
  description,
  title,
  to,
  titlePrefix,
}: ItemListProps) => {
  return (
    <NavigationMenu.Link asChild>
      <Link
        href={to || "/"}
        className="focus:shadow-[0_0_0_2px] focus:shadow-violet7 hover:bg-amber-50 block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors"
      >
        <span className="text-gray-900 mb-[5px] font-medium leading-[1.2]">
          {title}
        </span>
        <p className="text-mauve11 text-gray-500 leading-[1.4]">
          {description}
        </p>
      </Link>
    </NavigationMenu.Link>
  );
};
