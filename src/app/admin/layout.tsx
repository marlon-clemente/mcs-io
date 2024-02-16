export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={"theme-light flex flex-col flex-1 w-full"}>
      <div className="p-4 bg-gray-200 h-16 flex justify-center items-center w-full shadow-sm">
        <span>PORTAL ADMINISTRATIVO</span>
      </div>
      <div className="py-4 px-40">{children}</div>
    </main>
  );
}
