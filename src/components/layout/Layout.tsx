import Header from "./Header";
import Sidebar from "./Sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">

      <Header />
      
      <div className="flex">

        <Sidebar />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}