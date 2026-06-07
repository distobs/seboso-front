import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function DashboardSidebar() {
  const {
    isAdmin,
    isOwner,
    isEmployee,
  } = useAuth();

  const items = [
    {
      label: "Dashboard",
      to: "/dashboard",
      visible: true,
    },
    {
      label: "Livros",
      to: "/dashboard/books",
      visible: isAdmin || isOwner || isEmployee,
    },
    {
      label: "Funcionários",
      to: "/dashboard/employees",
      visible: isAdmin || isOwner,
    },
    {
      label: "Usuários",
      to: "/dashboard/users",
      visible: isAdmin,
    },
  ];

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
        {items
          .filter((item) => item.visible)
          .map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `
                  px-2 py-1 rounded
                  hover:text-[#C37351]
                  ${isActive ? "text-[#C37351] font-semibold" : ""}
                `
              }
            >
              {item.label}
            </NavLink>
          ))}
      </nav>
    </aside>
  );
}