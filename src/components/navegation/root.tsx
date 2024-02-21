import * as NavigationMenu from "@radix-ui/react-navigation-menu";

type RootProps = React.ComponentProps<typeof NavigationMenu.Root> & {
  children: React.ReactNode;
};

export const Root = ({ children }: RootProps) => {
  return (
    <NavigationMenu.Root className="relative z-[1] flex w-screen justify-center">
      {children}
    </NavigationMenu.Root>
  );
};
