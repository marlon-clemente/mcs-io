import * as Navegation from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
// import { Container } from './styles';

type ModuleProps = React.ComponentProps<typeof Navegation.Item> & {
  label: string;
  children: React.ReactNode;
};

export const Module = ({ label, children }: ModuleProps) => {
  return (
    <Navegation.Item>
      <Navegation.Trigger className="hover:bg-gray-100 focus:shadow-gray-300 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
        <span className="text-sm font-medium text-zinc-900">{label}</span>
        <ChevronDown
          size={16}
          className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
          aria-hidden
        />
      </Navegation.Trigger>
      <Navegation.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto">
        {children}
      </Navegation.Content>
    </Navegation.Item>
  );
};
