import { Header } from "@/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={"theme-light flex flex-col flex-1 gap-8 w-full"}>
      <Header />
      <div className="max-w-[1200px] w-full p-4 mx-auto flex items-center bg-white border shadow">
        {children}
      </div>
    </main>
  );
}
