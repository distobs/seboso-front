import Header from "../layout/Header";
import DashboardSidebar from "./DashboardSidebar";

type Props = {
  children: React.ReactNode;
  location: string;
};

export default function DashboardLayout({
  children,
  location,
}: Props) {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Header location={location} />

      <div className="flex">
        <DashboardSidebar />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}