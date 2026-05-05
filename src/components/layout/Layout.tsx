import Sidebar from './Sidebar';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children}: LayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo */}
      <main className="flex-1 p-6 bg-[#F5F5F5]">
        {children}
      </main>
    </div>
  )
}
