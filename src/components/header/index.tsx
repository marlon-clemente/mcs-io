import Logo from "@/assets/logo.png";
import { Avatar } from "@/components/avatar";
import { Badge } from "@/components/badge";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export const Header = () => (
  <div className="max-w-[1200px] w-full p-4 mx-auto flex items-center justify-between">
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

    <div className="flex items-center gap-3">
      <div className="flex flex-col items-end gap-0.5">
        <span className="text-sm font-medium">Administrador</span>
        <span className="text-xs text-zinc-400">marlon.klemente@gmail.com</span>
      </div>
      <Avatar alt="Marlon Clemente" fallback="Marlon Clemente" />
      <ChevronDown className="size-4 text-zinc-600" />
    </div>
  </div>
);
