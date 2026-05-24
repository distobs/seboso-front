import type { ReactNode } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

type LayoutProps = {
  children: ReactNode;
  pageTitle: string;
  location: string;
};

export default function DashboardLayout({
  children,
  pageTitle,
  location,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <DashboardHeader location={location} />

      <div className="flex">
        <DashboardSidebar pageTitle={pageTitle} />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
