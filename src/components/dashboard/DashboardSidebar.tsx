import { NavLink } from "react-router-dom";

export default function DashboardSidebar() {
  return (
    <aside
      className="
        w-64
        border-r
        border-gray-200
        p-4
      "
    >
      <h2 className="font-semibold mb-4">
        Dashboard
      </h2>

      <nav className="flex flex-col gap-2">
        <NavLink
          to="/dashboard"
          className="hover:text-[#C37351]"
        >
          Meus Sebos
        </NavLink>
      </nav>
    </aside>
  );
}