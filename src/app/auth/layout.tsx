import Logo from "@/assets/logo.png";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="select-none max-w-[360px] p-6 justify-center bg-[#f5f6fa] items-center rounded-md w-full shadow-2xl flex flex-col m-auto">
      <Image src={Logo} alt="logo" className="h-8 w-auto" />
      <div className="mt-3 w-full border border-b-gray-300" />
      {children}
    </div>
  );
}
