"use client";
import Logo from "@/assets/logo.png";
import { Avatar } from "@/components/avatar";
import { Badge } from "@/components/badge";
import { userStore } from "@/store/user";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

import * as Navigation from "@/components/navegation";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ChevronDown, LucideLogOut, LucideUserCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Header = () => {
  const { user } = userStore((state) => state);

  const router = useRouter();

  const logout = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      userStore.getState().removeUser();
      await axios.post("/api/auth/logout");
      router.push("/auth");
    },
  });

  return (
    <DropdownMenu.Root>
      <div className="max-w-[1200px] w-full p-4 mx-auto flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <Image src={Logo} className="h-8 w-auto" alt="" />
            <Badge variant="orange">Beta</Badge>
          </div>

          <div className="flex items-center gap-2.5">
            {/* <span className="text-sm font-medium text-zinc-100">Ignite</span>

        <ChevronDown className="text-zinc-600 size-4" /> */}
          </div>
        </div>

        <Navigation.Root>
          <NavigationMenu.List className="flex">
            <Navigation.Module label="Administrador">
              <ul className="one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr]">
                <li className="row-span-3 grid">
                  <NavigationMenu.Link asChild>
                    <a
                      className="focus:shadow-violet7 from-purple9 to-indigo9 flex
                    h-full w-full select-none flex-col justify-end rounded-[6px] bg-orange-300 p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px]"
                      href="/"
                    >
                      <svg
                        aria-hidden
                        width="38"
                        height="38"
                        viewBox="0 0 25 25"
                        fill="white"
                      >
                        <path d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"></path>
                        <path d="M12 0H4V8H12V0Z"></path>
                        <path d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"></path>
                      </svg>
                      <div className="mt-4 mb-[7px] text-[18px] font-medium leading-[1.2] text-white">
                        Radix Primitives
                      </div>
                      <p className="text-mauve4 text-[14px] leading-[1.3]">
                        Unstyled, accessible components for React.
                      </p>
                    </a>
                  </NavigationMenu.Link>
                </li>

                <Navigation.ItemList
                  title="Usuário"
                  description="Controle de usuários e permissões."
                />
                <Navigation.ItemList
                  title="Stitches"
                  description="CSS-in-JS with best-in-class developer experience."
                />
                <Navigation.ItemList
                  title="Stitches"
                  description="CSS-in-JS with best-in-class developer experience."
                />
              </ul>
            </Navigation.Module>
            <Navigation.Module label="Cadastros">Cadastros</Navigation.Module>

            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                Overview{" "}
                {/* <CaretDownIcon
                  className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                  aria-hidden
                /> */}
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute top-0 left-0 w-full sm:w-auto">
                <ul className="m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[600px] sm:grid-flow-col sm:grid-rows-3">
                  {/* <ListItem
                    title="Introduction"
                    href="/primitives/docs/overview/introduction"
                  >
                    Build high-quality, accessible design systems and web apps.
                  </ListItem>
                  <ListItem
                    title="Getting started"
                    href="/primitives/docs/overview/getting-started"
                  >
                    A quick tutorial to get you up and running with Radix
                    Primitives.
                  </ListItem>
                  <ListItem
                    title="Styling"
                    href="/primitives/docs/guides/styling"
                  >
                    Unstyled and compatible with any styling solution.
                  </ListItem>
                  <ListItem
                    title="Animation"
                    href="/primitives/docs/guides/animation"
                  >
                    Use CSS keyframes or any animation library of your choice.
                  </ListItem>
                  <ListItem
                    title="Accessibility"
                    href="/primitives/docs/overview/accessibility"
                  >
                    Tested in a range of browsers and assistive technologies.
                  </ListItem>
                  <ListItem
                    title="Releases"
                    href="/primitives/docs/overview/releases"
                  >
                    Radix Primitives releases and their changelogs.
                  </ListItem> */}
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
              <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
            </NavigationMenu.Indicator>
          </NavigationMenu.List>

          <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
            <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
          </div>
        </Navigation.Root>

        <DropdownMenu.Trigger className="flex gap-3 items-center">
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-sm font-medium">{user?.name}</span>
            <span className="text-xs text-zinc-400">{user?.email}</span>
          </div>
          <Avatar alt="Marlon Clemente" fallback="Marlon Clemente" />
          <ChevronDown className="size-4 text-zinc-600" />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            sideOffset={5}
          >
            <DropdownMenu.Item className="flex items-center px-4 gap-2 text-xs leading-[25px] text-mauve11">
              <LucideUserCircle size={16} />
              <span>Perfil</span>
            </DropdownMenu.Item>

            <DropdownMenu.Separator className="h-[1px] bg-gray-300 m-1 my-2" />

            <DropdownMenu.Item
              onClick={() => logout.mutate()}
              className="flex items-center px-4 gap-2 text-xs leading-[25px] text-mauve11"
            >
              <LucideLogOut size={16} />
              <span>Sair</span>
            </DropdownMenu.Item>

            <DropdownMenu.Arrow className="fill-white" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </div>
    </DropdownMenu.Root>
  );
};
